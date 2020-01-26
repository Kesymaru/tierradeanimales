import * as firebase from "firebase";
import Firebase from "./firebase";

interface IDatabaseOptions {
    key?: string;
    value?: any;
    limit?: number;
    toArray?: boolean;
}

class Database extends Firebase {
    private static DefaultOptions: IDatabaseOptions = {limit: 10};

    public static Ref(name: string): firebase.database.Reference {
        return Database.database.ref(name);
    }

    public static Query(name: string, filter?: IDatabaseOptions): firebase.database.Query {
        let ref = Database.Ref(name);
        if(!filter) return ref;
        let query;

        if(filter.limit) query = ref.limitToFirst(filter.limit);
        if(filter.key && filter.value) {
            query = (query||ref).orderByChild(filter.key)
                .equalTo(filter.value);
        }
        return query || ref;
    }

    private static ToArray(snapshot: firebase.database.DataSnapshot): any[] {
        const array: any[] = [];
        snapshot.forEach(child =>{
            array.push({...child.val(), id: child.key});
        });
        return array;
    };

    public static Read(name: string, filter?: IDatabaseOptions): Promise<any|any[]> {
        return Database.Query(name, filter)
            .once('value')
            .then((snapshot) => {
                if(filter && filter.toArray) return Database.ToArray(snapshot);
                return {...snapshot.val(), id: snapshot.key};
            });
    }

    public static Write(name: string, data: any)
        : Promise<firebase.database.DataSnapshot> {
        return Database.Ref(name)
            .set(data)
    }

    public static Push(name: string, data: any): Promise<string> {
        let ref = Database.Ref(name).push();
        return ref.set(data)
            .then(() => ref.key || '');
    }

    public static Remove(name: string): Promise<firebase.database.DataSnapshot> {
        return Database.Ref(name)
            .remove();
    }

    public static Update(name: string, data: any) {
    }
}

export default Database;
