import * as firebase from "firebase/app";
import "firebase/firestore";
import {v4 as uuid} from 'uuid';

export interface IDataDefaults {
    _selected?: boolean;
}

export interface IData extends IDataDefaults {
    id: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPagination {
    count: number;
    rowPerPage: number;
    page: number;

    orderBy?: string;
    direction?: "desc" | "asc";
    first?: firebase.firestore.DocumentSnapshot;
    last?: firebase.firestore.DocumentSnapshot;
}

export interface IDataSubCollections {
    key: string;
    defaults: any;
}

export interface IDatabaseConfig {
    name: string;
    statsName?: string;
    defaults?: IDataDefaults,
    subCollections?: IDataSubCollections[];
    softDelete?: boolean;
}

export interface IDataStats {
    total: number | firebase.firestore.FieldValue;
}

export interface IResult<T> {
    data: T[];
    pagination: IPagination;
}

class Database {
    public static statsName: string = '_stats';
    public static defaults: IDataDefaults = {
        _selected: false
    };

    public db: firebase.firestore.Firestore;
    public collection: firebase.firestore.CollectionReference;
    public pagination: IPagination = {
        count: 0,
        rowPerPage: 5,
        page: 0,

        orderBy: 'createdAt',
        direction: 'desc',
    };

    constructor(public readonly config: IDatabaseConfig) {
        if (!this.config.defaults)
            this.config.defaults = Database.defaults;

        if (!this.config.statsName)
            this.config.statsName = Database.statsName;

        this.db = firebase.firestore();
        this.collection = this.db.collection(this.config.name);
    }

    private _add<T extends IData>(data: T, batch: firebase.firestore.WriteBatch): T {
        data.id = uuid();
        let _data = this._sanitize(data) as T;
        _data = this._timestamp(_data, ['createdAt', 'updatedAt']);

        const doc = this.collection.doc(_data.id);
        batch.set(doc, _data);

        return this._defaults(data);
    }

    private _update<T extends IData>(data: T, batch: firebase.firestore.WriteBatch): T {
        let _data = this._sanitize(data);
        _data = this._timestamp(_data, ['updatedAt'], ['createdAt']);

        let doc = this.collection.doc(_data.id);
        batch.set(doc, _data, {merge: true});

        return data;
    }

    private _delete<T extends IData>(data: string | T, batch: firebase.firestore.WriteBatch): void {
        const id: string = typeof data === 'string' ? data : data.id;
        const doc = this.collection.doc(id);

        if (this.config.softDelete) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp;
            batch.update(doc, 'deleted', true);
            batch.update(doc, 'deletedAt', timestamp());
        } else batch.delete(doc);
    }

    private _stats(total: number, batch: firebase.firestore.WriteBatch) {
        const increment = firebase.firestore.FieldValue.increment(total);

        const doc = this.collection.doc(this.config.statsName);
        const stats: IDataStats = {
            total: increment
        };

        batch.set(doc, stats, {merge: true});
    }

    private _sanitize(data: any): any {
        let _data = {...data};
        let regex: RegExp = /\_\w+/;

        Object.keys(_data).forEach(key => {
            if (regex.test(key))
                return delete _data[key];
            if (Array.isArray(_data[key]))
                return _data[key] = _data[key].map((item: any) => this._sanitize(item));
            if (typeof _data[key] === 'object')
                return _data[key] = this._sanitize(_data[key]);
        });

        return _data;
    }

    private _timestamp<T extends IData, K extends keyof T>(data: T, adds: K[], remove: K[] = []): T {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp;
        const times = adds.reduce((total, key) =>
            ({...total, [`${key}`]: timestamp()}), {});

        if (remove.length)
            remove.forEach(key => delete data[key]);

        return Object.assign(data, times);
    }

    private _defaults<T extends IData>(data: T, exten: any = {}): T {
        let _data = {...data} as any;

        if (this.config.subCollections) {
            this.config.subCollections.forEach(({key, defaults}) => {
                if (Array.isArray(_data[key]))
                    return _data[key].map((item: any) => Object.assign(item, defaults));
                if (typeof _data[key] === 'object')
                    return Object.assign(_data[key], defaults);
            });
        }

        Object.assign(_data, this.config.defaults, exten);
        return _data as T;
    }

    public async add<T extends IData>(data: T | T[]): Promise<T | T[]> {
        const batch = this.db.batch();

        if (Array.isArray(data)) {
            this._stats(data.length - 1, batch);
            data = data.map(item => this._add(item, batch))
        } else {
            this._stats(1, batch);
            this._add(data, batch)
        }
        ;

        await batch.commit();
        return data;
    }

    public async update<T extends IData>(data: T | T): Promise<T | T[]> {
        const batch = this.db.batch();

        if (Array.isArray(data))
            data.map(item => this._update(item, batch));
        else
            this._update(data, batch);

        await batch.commit();
        return data;
    }


    public async get<T extends IData>(id: string | string[]): Promise<T | T[]> {
        let data: T | T[];
        if (Array.isArray(id)) {
            let snapshots = await this.collection.where('id', 'in', id).get();
            data = snapshots.docs.map(item => this._defaults(item.data() as T));
        } else {
            let snapshot = await this.collection.doc(id).get();
            data = this._defaults(snapshot.data() as T);
        }

        return data;
    }

    public async delete<T extends IData>(data: string | T | T[]): Promise<void> {
        const batch = this.db.batch();

        if (Array.isArray(data)) {
            this._stats(data.length - 1, batch);
            data.map(item => this._delete(item, batch));
        } else {
            this._stats(-1, batch);
            this._delete(data, batch);
        }

        await batch.commit();
    }

    public async all<T extends IData>(pagination: IPagination = this.pagination): Promise<IResult<T>> {
        const query = this._query(pagination);
        const snapshots = await query.get();

        const results: IResult<T> = {
            data: snapshots.docs.map(item => this._defaults(item.data() as T)),
            pagination: await this._setPagination(pagination, snapshots)
        };
        return results;
    }

    private _query(pagination: IPagination): firebase.firestore.Query {
        pagination.rowPerPage = pagination.rowPerPage
            ? pagination.rowPerPage
            : this.pagination.rowPerPage;

        pagination.orderBy = pagination.orderBy ? pagination.orderBy
            : (this.pagination.orderBy ? this.pagination.orderBy : 'createdAt');
        pagination.direction = pagination.direction ? pagination.direction
            : (this.pagination.direction ? this.pagination.direction : 'desc');

        const {first, last} = this.pagination;
        let query = this.collection.orderBy(pagination.orderBy, pagination.direction);

        if (this.pagination.page > pagination.page && first) query = query.endBefore(first);
        else if (last) query = query.startAfter(last);

        if (pagination.rowPerPage)
            query = query.limit(pagination.rowPerPage);

        return query;
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

    private async _getStats(): Promise<IDataStats> {
        const snapshot = await this.collection.doc(this.config.statsName).get();
        return snapshot.data() as IDataStats;
    }
}

export default Database;
