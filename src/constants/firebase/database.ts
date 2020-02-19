import * as firebase from "firebase/app";
import "firebase/firestore";
import {v4 as uuid} from 'uuid';
import {IDogStatus} from "../../store/dogs/dogs.types";

// ------------------------------------
// Types
// ------------------------------------
export interface IDefaults {
    key: string;
    values: any;
}

export interface IDataDefaults {
    _selected?: boolean;
    _deleted?: boolean;
    _new?: boolean;
    _prev?: any;
}

export function IDataDefaultsFactory(values?: Partial<IDataDefaults>): IDataDefaults {
    return {
        _selected: false,
        _deleted: false,
        _new: true,
    }
}

export interface IData extends IDataDefaults {
    id: string;

    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}

export function IDataFactory(values?: Partial<IData>): IData {
    return {
        id: uuid(),
        ...IDataDefaultsFactory(),
        ...values,
    }
}

export interface IFilter {
    name: string;
    key: string;
    condition: "==" | "<" | ">" | "<=" | ">=" | "in" | "array-contains" | "array-contains-any";
    value: any;
}

interface IFilterFactoryParams extends Omit<IFilter, 'name'> {
    name?: string;
}

export function IFilterFactory(values: IFilterFactoryParams): IFilter {
    return {
        name: values.key || '',
        condition: "==",
        ...values,
    }
}

export interface ISort {
    key: string;
    order: "desc" | "asc";
}

export function ISortFactory(values?: Partial<ISort>): ISort {
    return {
        key: 'createdAt',
        order: 'desc',
        ...values,
    }
}

export interface IPagination {
    count: number;
    rowPerPage: number;
    page: number;
    first?: firebase.firestore.DocumentSnapshot | number;
    last?: firebase.firestore.DocumentSnapshot | number;
}

export function IPaginationFactory(values?: Partial<IPagination>): IPagination {
    return {
        count: 0,
        rowPerPage: 5,
        page: 0,
        ...values,
    }
}

export interface IStats {
    total: number | firebase.firestore.FieldValue;
}

export function IStatsFactory(values?: Partial<IStats>): IStats {
    return {
        total: 0,
        ...values,
    }
}

export interface IResult<T> {
    data: T[];
    pagination?: IPagination;
    sort?: ISort | ISort[];
    filter?: IFilter | IFilter[];
}

export interface IDataConfig<T extends IData, S extends IStats> {
    path: string;

    defaults?: IDefaults[];
    pagination?: IPagination;
    statsPath?: string;
    softDelete?: boolean;
    statsFactory?: (config: Partial<S>) => S;
    countStats?: (multiple: number, stats: S, documents: T) => S;
}

// TODO
// replace this with the IDataDefaultsFactory()
export const DataDefaults: IDataDefaults = {
    _selected: false,
    _deleted: false,
    _new: true,
};

// ------------------------------------
// Database Class
// ------------------------------------
class Database<T extends IData, S extends IStats> {
    public db: firebase.firestore.Firestore;
    public collection: firebase.firestore.CollectionReference;
    public stats: firebase.firestore.DocumentReference;

    public path: string;
    public defaults: IDefaults[] = [
        {key: '_root', values: DataDefaults},
    ];
    public statsPath: string = '_stats';
    public softDelete: boolean = false;
    public statsFactory: Function | null = null;
    public countStats: Function | null = null;

    constructor(public readonly config: IDataConfig<T, S>) {
        this.path = this.config.path;
        if (this.config.defaults) this.defaults = this.config.defaults;
        if (this.config.statsPath) this.statsPath = this.config.statsPath;
        if (typeof this.config.softDelete !== 'undefined')
            this.softDelete = this.config.softDelete;
        if (this.config.statsFactory) this.statsFactory = this.config.statsFactory;
        if (this.config.countStats) this.countStats = this.config.countStats;

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
        const countStats = this.countStats ? this.countStats : this._countStats;
        const multiple = action === 'add' ? 1 : action === 'delete' ? -1 : 0;
        let stats = this.statsFactory
            ? this.statsFactory({total: 0})
            : {total: 0} as S;

        if (Array.isArray(docs))
            docs.forEach(doc => stats = countStats(multiple, stats, doc));
        else stats = countStats(multiple, stats, docs);

        Object.keys(stats).forEach(key => {
            let value = +stats[key];
            stats[key] = firebase.firestore.FieldValue.increment(value);
        });

        batch.set(this.stats, stats, {merge: true});
    }

    private _countStats(action: string, stats: S | Partial<S>, doc: T): (S | Partial<S>) {
        switch (action) {
            case 'add':
                stats.total = stats.total ? +stats.total + 1 : 1;
                break;

            case 'delete':
                stats.total = stats.total ? +stats.total - 1 : -1;
                break;

            case 'updated':
                break;
        }

        return stats;
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

        this._setStats('updated', data, batch);
        await batch.commit();
        return data;
    }

    public async get(id: string | string[]): Promise<T | T[]> {
        let data: T | T[];
        if (Array.isArray(id)) {
            let snapshots = await this.collection.where('id', 'in', id).get();
            data = snapshots.docs.map(item => this._defaults(item.data() as T) as T);
        } else {
            let snapshot = await this.collection.doc(id).get();
            data = this._defaults(snapshot.data() as T);
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

    public async all(
        pagination?: IPagination,
        sort?: ISort | ISort[],
        filter?: IFilter | IFilter[]): Promise<IResult<T>> {

        const snapshots = await this._query(pagination, sort, filter);

        return {
            data: snapshots.docs.map(item => this._defaults(item.data() as T)),
            pagination,
            sort: sort ? sort : ISortFactory(),
            filter,
        } as IResult<T>;
    }

    private _query(
        pagination?: IPagination,
        sort?: ISort | ISort[],
        filter?: IFilter | IFilter[],
        query?: firebase.firestore.Query): Promise<firebase.firestore.QuerySnapshot> {
        query = this._sort(sort, query);

        if (pagination) {
            query = (query || this.collection).limit(pagination.rowPerPage);
            if (pagination.page >= 1) {
                if (pagination.first) query = query.startAfter(pagination.first);
                else if (pagination.last) query = query.endBefore(pagination.last);
            }
        }
        if (filter) query = this._filter(filter, query);

        return query.get();
    }

    private _sort(
        sort?: ISort | ISort[],
        _query?: firebase.firestore.Query): firebase.firestore.Query {
        let query = _query || this.collection;
        sort = sort ? sort : ISortFactory();

        if (Array.isArray(sort))
            sort.forEach(s => query = query.orderBy(s.key, s.order));
        else if (sort)
            query = query.orderBy(sort.key, sort.order);

        return query;
    }

    private _filter(
        filter: IFilter | IFilter[],
        _query?: firebase.firestore.Query): firebase.firestore.Query {
        let query = _query || this.collection;

        if (Array.isArray(filter))
            filter.forEach(f =>
                query = query.where(f.key, f.condition, f.value));
        else if (filter)
            query = query.where(filter.key, filter.condition, filter.value);

        return query;
    }

    private _defaults(data: T | T[]): (T | T[]) {
        if (Array.isArray(data))
            data = data.map(item => this._setDefault(item));
        else data = this._setDefault(data);

        return data;
    }

    private _setDefault(_data: T) {
        const data = {..._data} as any;
        this.defaults.forEach(({key, values}) => {
            if (key === '_root' && typeof data === 'object')
                return Object.assign(data, values);
            if (typeof data[key] !== 'undefined') {
                if (Array.isArray(data[key]))
                    data[key] = data[key].map((item: any) => Object.assign(item, values));
                else Object.assign(data[key], values);
            }
        });

        return data as T;
    }
}

export default Database;
