import * as firebase from "firebase/app";
import "firebase/firestore";
import {type} from "os";

export interface IDataDefaults {
    _selected?: boolean;
}

export interface IData extends IDataDefaults {
    id: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPagination {
    page: number;
    limit: number;

    total?: number;
    orderBy?: string;
    direction?: "desc" | "asc";
    startAfter?: firebase.firestore.DocumentSnapshot;
}

class Database {
    public defaultValues: IDataDefaults = {
        _selected: false
    };

    public db: firebase.firestore.Firestore;
    public collection: firebase.firestore.CollectionReference;
    public pagination: IPagination = {
        limit: 5,
        page: 1,
        total: 0,
    };

    constructor(public readonly path: string) {
        this.db = firebase.firestore();
        this.collection = this.db.collection(this.path);
    }

    private async _add<T extends IData>(data: T): Promise<T> {
        let _data = this._sanitize(data) as T;
        _data = this._timestamp(_data, ['createdAt', 'updatedAt']);
        let ref = await this.collection.add(_data);
        let id = ref.id;
        await ref.update('id', id);
        return this._defaults(data, {id});
    }

    private async _update<T extends IData>(data: T): Promise<T> {
        let _data = this._sanitize(data);
        _data = this._timestamp(_data, ['updatedAt'], ['createdAt']);
        await this.collection.doc(_data.id).update(_data);
        return data;
    }

    private _sanitize(data: any): any {
        let _data = {...data};
        let regex: RegExp = /\_\w+/;

        Object.keys(_data).forEach(key => {
            if(regex.test(key))
                return delete _data[key];
            if(Array.isArray(_data[key]))
                return _data[key] = _data[key].map((item: any) => this._sanitize(item));
            if(typeof _data[key] === 'object')
                return _data[key] = this._sanitize(_data[key]);
        });
        return _data;
    }

    private _timestamp<T extends IData, K extends keyof T>(data: T, adds: K[], remove: K[] = []): T {
        let timestamp = firebase.firestore.FieldValue.serverTimestamp;
        let times = adds.reduce((total, key) =>
            ({...total, [`${key}`]: timestamp()}), {});

        if(remove.length)
            remove.forEach(key => delete data[key]);

        return Object.assign(data, times);
    }

    private _defaults<T extends IData>(data: T, extended: any = {}): T {
        return Object.assign(data, this.defaultValues, extended);
    }

    public async add<T extends IData>(data: T | T[]): Promise<T | T[]> {
        if (Array.isArray(data))
            return await Promise.all(data.map(async item =>
                await this._add<T>(item)));
        return await this._add(data);
    }

    public async update<T extends IData>(data: T | T): Promise<T | T[]> {
        if (Array.isArray(data))
            return await Promise.all(data.map(async item =>
                await this._update<T>(item)));
        return await this._update<T>(data);
    }


    public async get<T extends IData>(id: string | string[]): Promise<T | T[]> {
        let data: T | T[];
        if (Array.isArray(id)) {
            /*data = await Promise.all(id.map(async i => {
                let snapshot = await this.collection.doc(i).get();
                return snapshot.data() as T;
            }));*/
            let snapshots = await this.collection.where('id', 'in', id).get();
            data = snapshots.docs.map(item => this._defaults(item.data() as T));
        } else {
            let snapshot = await this.collection.doc(id).get();
            data = this._defaults(snapshot.data() as T);
        }

        return data;
    }

    public async delete<T extends IData>(data: string | T | T[]): Promise<void> {
        if(Array.isArray(data)) {
            let snapshots = await this.collection.where('id', 'in', data.map(item => item.id)).get();

            let batch = this.db.batch();
            snapshots.forEach(doc => batch.delete(doc.ref));
            return batch.commit();
        }

        let id: string;
        if(typeof data === 'string') id = data;
        else id = data.id;

        return this.collection.doc(id).delete();
    }

    public async all<T extends IData>(pagination: IPagination = this.pagination): Promise<T[]> {
        let collection = this.collection;
        let query: firebase.firestore.Query | null = null;
        let total = this.collection.doc.length;

        if (pagination.orderBy)
            query = (query || collection).orderBy(pagination.orderBy, pagination.direction || 'desc');
        else
            query = (query || collection).orderBy('createdAt', 'desc');
        if (pagination.startAfter)
            query = (query || collection).startAfter(pagination.startAfter);
        if (pagination.limit)
            query = (query || collection).limit(pagination.limit);

        let snapshots = await (query || collection).get();

        if (query) {
            this.pagination.page++;
            this.pagination.total = total;
            this.pagination.startAfter = snapshots.docs[snapshots.docs.length - 1];
        }

        return snapshots.docs.map(item => this._defaults(item.data() as T));
    }
}

export default Database;
