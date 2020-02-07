import Database from "../constants/firebase/database";
import Storage from "../constants/firebase/storage";

class Actions {
    public static collection: string;
    public static directory: string;
    protected static _db: Database;
    protected static _storage: Storage;

    public static get db(): Database {
        if (this._db) return this._db;
        return this._db = new Database(this.collection);
    }

    public static get storage(): Storage {
        if (this._storage) return this._storage;
        return this._storage = new Storage(this.directory);
    }
}

export default Actions;
