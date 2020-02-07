import Database, {IDatabaseConfig} from "../constants/firebase/database";
import Storage, {IStorageConfig} from "../constants/firebase/storage";

class Actions {
    protected static databaseConfig: IDatabaseConfig;
    protected static storageConfig: IStorageConfig;

    protected static _db: Database;
    protected static _storage: Storage;

    public static get db(): Database {
        if (this._db) return this._db;
        return this._db = new Database(this.databaseConfig);
    }

    public static get storage(): Storage {
        if (this._storage) return this._storage;
        return this._storage = new Storage(this.storageConfig);
    }
}

export default Actions;
