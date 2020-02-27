import * as firebase from "firebase";
import "firebase/storage";

import fire from "../../fire";
import {v4 as uuid} from 'uuid';

export interface IFileDefaults {
    _file?: File | null;
    _selected?: boolean;
    _deleted?: boolean;
    _new?: boolean;
}

// ------------------------------------
// IFile
// ------------------------------------
export interface IFile extends IFileDefaults {
    id: string;
    name: string;
    src: string;
}

export function IFileFactory(value?: Partial<IFile>, _new: boolean = true): IFile {
    return {
        id: uuid(),
        name: '',
        src: '',
        _file: null,
        _selected: false,
        _deleted: false,
        _new,
        ...value,
    }
}

export interface IStorageConfig {
    path: string;
    defaults?: IFileDefaults;
}

export const FileDefaults: IFileDefaults = {
    _file: null,
    _selected: false,
    _new: false,
    _deleted: false,
};

class Storage {
    public pathName: string;
    public defaults: IFileDefaults = FileDefaults;

    public storage: firebase.storage.Storage;
    public path: firebase.storage.Reference;

    constructor(public readonly config: IStorageConfig) {
        this.pathName = this.config.path
        if (this.config.defaults) this.defaults = this.config.defaults;

        this.storage = fire.storage();
        this.path = this.storage.ref(this.pathName);
    }

    public static newFile(file: File): IFile {
        return {
            ...FileDefaults,
            id: uuid(),
            name: file.name,
            src: URL.createObjectURL(file),
            _file: file,
            _new: true,
        }
    }

    public async _softSave<T extends IFile>(file: T): Promise<T> {
        let ref = this.path.child(file.id);
        if (file._file) await ref.put(file._file);
        return Object.assign(file, {_new: false});
    }

    public async _save<T extends IFile>(file: T): Promise<T> {
        let ref = this.path.child(file.id);
        let src = file.src;
        if (file._file) {
            let snapshot = await ref.put(file._file);
            src = await snapshot.ref.getDownloadURL();
        }
        return Object.assign(file, {src, _new: false}) as T;
    }

    public async _delete<T extends IFile>(file: T): Promise<T> {
        let ref = this.path.child(file.id);
        await ref.delete();
        return Object.assign(file, {_deleted: true});
    }

    public async save<T extends IFile>(file: T | T[]): Promise<T | T[]> {
        if (Array.isArray(file))
            return await Promise.all(file.map(async (item) => await this._save(item)));
        return await this._save(file);
    }

    public async delete<T extends IFile>(file: T | T[]): Promise<T | T[]> {
        if (Array.isArray(file))
            return await Promise.all(file.map(async item => await this._delete(item)));
        return await this._delete(file);
    }
}

export default Storage;
