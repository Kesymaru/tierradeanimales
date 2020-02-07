import * as firebase from "firebase";
import Firebase from "./firebase";

import {IData, IDataDefaults} from "../../store";

interface IDatabaseOptions {
    sortBy?: string;
    value?: any;
    limit?: number;
    page?: number;
}

class RealTimeDatabase extends Firebase {
    private static DefaultOptions: IDatabaseOptions = {
        limit: 10,
        page: 1,
    };

    public static Ref(name: string): firebase.database.Reference {
        return RealTimeDatabase.database.ref(name);
    }

    public static Query(name: string, filter?: IDatabaseOptions): firebase.database.Query {
        let ref = RealTimeDatabase.Ref(name);
        if(!filter) return ref;
        let query;

        /*console.log('filter', filter);
        if(filter.startAt) query = ref.startAt(filter.startAt);
        if(filter.limit) query = ref.limitToFirst(filter.limit);
        if(filter.sortBy && filter.value) {
            query = (query||ref).orderByChild(filter.sortBy)
                .equalTo(filter.value);
        }*/
        return query || ref;
    }

    public static ReadArray<T>(name: string, filter?: IDatabaseOptions): Promise<T[]> {
        return RealTimeDatabase.Query(name, filter)
            .once('value')
            .then(snapshot => {
                let data: T[] = [];
                snapshot.forEach(child => {
                    data.push(Object.assign(child.val(), IDataDefaults));
                });
                return data;

                /*return {
                    data,
                }*/
            });
    }

    public static Read<T extends IData>(name: string, filter?: IDatabaseOptions): Promise<T> {
        return RealTimeDatabase.Query(name, filter)
            .once('value')
            .then(snapshot => Object.assign(snapshot.val(), IDataDefaults));
    }

    public static Write<T extends IData>(name: string, data: T): Promise<firebase.database.DataSnapshot> {
        Object.assign(data, {
            createdAt: (new Date()),
            updatedAt: (new Date()),
        });
        return RealTimeDatabase.Ref(name)
            .set(data)
    }

    public static Push<T>(name: string, data: T): Promise<T> {
        let ref = RealTimeDatabase.Ref(name).push();
        return ref.set(Object.assign(data, {id: ref.key}))
            .then(() => data);
    }

    /**
     * Compose a new id
     * @param data
     * @constructor
     */
    public static Id<T>(name: string, data: T): T {
        return {...data, ...{
            id: RealTimeDatabase.Ref(name).push().key
        }};
    }

    public static Remove<T extends IData>(name: string, data: T): Promise<firebase.database.DataSnapshot> {
        return RealTimeDatabase.Ref(`${name}/${data.id}`)
            .remove();
    }

    public static Update<T extends IData>(name: string, data: T): Promise<T> {
        let ref = RealTimeDatabase.Ref(`${name}/${data.id}`);
        return ref.update(data);
    }
}

export default RealTimeDatabase;
