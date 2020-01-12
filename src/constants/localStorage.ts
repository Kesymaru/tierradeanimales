export interface ILocalStorageConfigkey {
    key: string;
    path: string;
    value?: any|null;
}

export interface ILocalStorageConfig {
    keys: ILocalStorageConfigkey[];
}

const DEFAULT_CONFIG: ILocalStorageConfig = {
    keys: [{
        key: 'jwt',
        path: 'system.jwt',
    }]
};

/**
 * Local Storage class
 */
class LocalStorage {
    private static config: ILocalStorageConfig = DEFAULT_CONFIG;

    private constructor() {}

    public static configure(config: ILocalStorageConfig): void {
        this.config = config;
    }

    public static getItem(key: string): any {
        try {
            let data = localStorage.getItem(key);
            if(!data) return null;

            data = JSON.parse(data);
            return data
        } catch (error) {
            console.error('getItem', error);
        }
    }

    public static setItem(key: string, data: any): void {
        try {
            data = JSON.stringify(data);
            localStorage.setItem(key, data);
        } catch (error) {
            console.error('setItem', error);
        }
    }

    public static remvoeItem(key: string): void {
        localStorage.removeItem(key);
    }

    /**
     * Save store into localstorage based on config keys
     * @param store
     */
    public static saveStore(store: any): void {
        LocalStorage.config.keys
            .map(k => ({
                ...k,
                value: LocalStorage.getStoreValue(store, k.path)
            }))
            .forEach(k => LocalStorage.setItem(k.key, k.value));
    }

    /**
     * Load the saved data from localstorage
     * Compose a store object based on the config
     */
    public static loadStore(): any {
        return LocalStorage.config.keys
            .map(k => ({
                ...k,
                value: LocalStorage.getItem(k.key)
            }))
            .reduce((r, k) => ({
                ...r,
                ...LocalStorage.setStoreValue(k.path, k.value)
            }), {});
    }

    private static getStoreValue(data: any, path: string) {
        let paths = path.split('.');
        console.log('paths', paths);

        return paths.reduce((result, path) =>
            result && result[path] !== undefined ? result[path] : null,
            data);
    }

    private static setStoreValue(path: string, value: any|null) {
        return path.split('.')
            .reduceRight((r, p, i, t) => {
                if (i === t.length-1) return {...r, [`${p}`]: value};
                return {[`${p}`]: r};
            }, {})
    }
}

export default LocalStorage;
