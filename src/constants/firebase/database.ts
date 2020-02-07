import * as firebase from "firebase/app";
import "firebase/firestore";
import {keys} from "@material-ui/core/styles/createBreakpoints";
import {type} from "os";

// import {IData} from "../../store";

export interface IDataOptions {
    _selected?: boolean;
}

export interface IData extends IDataOptions {
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
    public defaultsOptions: IDataOptions = {
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
        let ref = await this.collection.add(_data);
        let id = ref.id;
        await ref.update('id', id);
        return Object.assign(_data, this.defaultsOptions, {id});
    }

    private async _update<T extends IData>(data: T): Promise<T> {
        let _data = this._sanitize(data);
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
            data = await Promise.all(id.map(async i => {
                let snapshot = await this.collection.doc(i).get();
                return snapshot.data() as T;
            }));
            // data = data.filter(d => d);
        } else {
            let snapshot = await this.collection.doc(id).get();
            data = snapshot.data() as T;
        }

        return data;
    }

    public async all<T extends IData>(pagination: IPagination = this.pagination): Promise<T[]> {
        let collection = this.collection;
        let query: firebase.firestore.Query | null = null;
        let total = this.collection.doc.length;

        if (pagination.orderBy)
            query = (query || collection).orderBy(pagination.orderBy, pagination.direction || 'desc');
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

        /*let data: T[] = [];
        snapshots.docs.forEach(item => data.push(item.data()));
        return data;*/

        return snapshots.docs.map(item => item.data() as T);
    }
}

export default Database;
