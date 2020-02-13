import * as firebase from "firebase/app";
import "firebase/firestore";
import {v4 as uuid} from 'uuid';

export interface IData {
    id: string;

    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}

export interface IFilter {
    name: string;
    key: string;
    condition: "==" | "<" | ">" | "<=" | ">=" | "in" | "array-contains" | "array-contains-any";
    value: any;
}

export interface ISort {
    key: string;
    order: "desc" | "asc";
}

export interface IPagination {
    count: number;
    rowPerPage: number;
    page: number;

    filter?: IFilter | IFilter[];
    sort?: ISort | ISort[];

    first?: firebase.firestore.DocumentSnapshot | number;
    last?: firebase.firestore.DocumentSnapshot | number;
}

export interface IStats {
    total: number | firebase.firestore.FieldValue;
}

export interface IResult<T> {
    data: T[];
    pagination: IPagination;
}

export interface IDataConfig<T extends IData> {
    path: string;

    pagination?: IPagination;
    statsPath?: string;
    softDelete?: boolean;
    onStats?: (action: string, documents: T | T[], batch: firebase.firestore.WriteBatch) => void;
}

class Database<T extends IData, S extends IStats> {
    public db: firebase.firestore.Firestore;
    public collection: firebase.firestore.CollectionReference;
    public stats: firebase.firestore.DocumentReference;

    public path: string;
    public pagination: IPagination = {
        count: 0,
        rowPerPage: 5,
        page: 0,
        sort: {key: 'createdAt', order: 'desc'}
    };
    public statsPath: string = '__stats';
    public softDelete: boolean = false;
    public onStats: Function | null = null;

    constructor(public readonly config: IDataConfig<T>) {
        this.path = this.config.path;
        if (this.config.pagination) this.pagination = this.config.pagination;
        if (this.config.statsPath) this.statsPath = this.config.statsPath;
        if (typeof this.config.softDelete !== 'undefined')
            this.softDelete = this.config.softDelete;
        if (this.config.onStats) this.onStats = this.config.onStats;

        this.db = firebase.firestore();
        this.collection = this.db.collection(this.path);
        this.stats = this.collection.doc(this.statsPath);
    }

    private _add(data: T, batch: firebase.firestore.WriteBatch): T {
        data.id = uuid();
        let _data = this._sanitize(data) as T;
        _data = this._timestamp(_data, ['createdAt', 'updatedAt']);

        const doc = this.collection.doc(_data.id);
        batch.set(doc, _data);

        return data;
    }

    private _update(_data: T, batch: firebase.firestore.WriteBatch): T {
        let data = this._sanitize(_data);
        data = this._timestamp(data, ['updatedAt'], ['createdAt']);

        batch.set(this.collection.doc(data.id), data, {merge: true});

        return data;
    }

    private _delete(data: string | T, batch: firebase.firestore.WriteBatch): void {
        const id: string = typeof data === 'string' ? data : data.id;
        const doc = this.collection.doc(id);

        if (this.softDelete) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp;
            batch.update(doc, 'deleted', true);
            batch.update(doc, 'deletedAt', timestamp());
        } else batch.delete(doc);
    }

    private _setStats(action: string, docs: string | T | T[], batch: firebase.firestore.WriteBatch) {
        if (this.onStats)
            return this.onStats(action, docs, batch);

        let total = 0;
        if (action === 'add') total = 1;
        if (action === 'delete') total = -1;

        const increment = firebase.firestore.FieldValue.increment(total);
        const stats: IStats = {total: increment};

        batch.set(this.stats, stats, {merge: true});
    }

    private async _getStats(): Promise<S> {
        const snapshot = await this.stats.get();
        return snapshot.data() as S;
    }

    private _sanitize(_data: T): T {
        let data = {..._data} as any;
        let regex: RegExp = /\_\w+/;

        Object.keys(data).forEach(key => {
            if (regex.test(key))
                return delete data[key];
            if (Array.isArray(data[key]))
                return data[key] = data[key].map((item: any) => this._sanitize(item));
            if (typeof data[key] === 'object')
                return data[key] = this._sanitize(data[key]);
        });

        return data as T;
    }

    private _timestamp<K extends keyof T>(data: T, add: K[], remove: K[] = []): T {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp;
        const times = add.reduce((total, key) =>
            ({...total, [`${key}`]: timestamp()}), {});

        if (remove.length)
            remove.forEach(key => delete data[key]);

        return Object.assign(data, times);
    }

    public async add(data: T | T[]): Promise<T | T[]> {
        const batch = this.db.batch();

        if (Array.isArray(data))
            data = data.map(item => this._add(item, batch));
        else
            this._add(data, batch);

        this._setStats('add', data, batch);
        await batch.commit();

        return data;
    }

    public async update(data: T | T): Promise<T | T[]> {
        const batch = this.db.batch();

        if (Array.isArray(data))
            data.map(item => this._update(item, batch));
        else
            this._update(data, batch);

        await batch.commit();
        return data;
    }

    public async get(id: string | string[]): Promise<T | T[]> {
        let data: T | T[];
        if (Array.isArray(id)) {
            let snapshots = await this.collection.where('id', 'in', id).get();
            data = snapshots.docs.map(item => item.data() as T);
        } else {
            let snapshot = await this.collection.doc(id).get();
            data = snapshot.data() as T;
        }

        return data;
    }

    public async delete(data: string | T | T[]): Promise<void> {
        const batch = this.db.batch();

        if (Array.isArray(data))
            data.map(item => this._delete(item, batch));
        else
            this._delete(data, batch);

        this._setStats('delete', data, batch);
        await batch.commit();
    }

    public async all(pagination?: IPagination): Promise<IResult<T>> {
        pagination = {...this.pagination, ...pagination};
        const snapshots = await this._query(pagination);
        return {
            data: snapshots.docs.map(item => item.data() as T),
            pagination: await this._setPagination(pagination, snapshots)
        } as IResult<T>
    }

    private _query(pagination: IPagination): Promise<firebase.firestore.QuerySnapshot> {
        let query = this.collection.orderBy('createdAt', 'desc');

        // sort
        if (Array.isArray(pagination.sort))
            pagination.sort.forEach(sort => query = query.orderBy(sort.key, sort.order));
        else if (pagination.sort)
            query = query.orderBy(pagination.sort.key, pagination.sort.order);

        // filter
        if (Array.isArray(pagination.filter)) {
            pagination.filter.forEach(filter =>
                query = query.where(filter.key, filter.condition, filter.value));
        } else if (pagination.filter) {
            let {key, condition, value} = pagination.filter;
            query = query.where(key, condition, value)
        }

        // pagination
        if (pagination.page >= 1) {
            if (this.pagination.first) query = query.startAfter(this.pagination.first);
            else if (this.pagination.last) query = query.endBefore(this.pagination.last);
        }

        query = query.limit(pagination.rowPerPage || this.pagination.rowPerPage);
        return query.get();
    }

    private async _setPagination(pagination: IPagination, snapshots: firebase.firestore.QuerySnapshot): Promise<IPagination> {
        const stats = await this._getStats();

        return this.pagination = {
            ...this.pagination,
            ...pagination,

            count: stats.total as number,
            first: snapshots.docs[0],
            last: snapshots.docs[snapshots.docs.length - 1],
        };
    }
}

export default Database;
