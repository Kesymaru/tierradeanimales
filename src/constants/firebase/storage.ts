import Firebase from "./firebase";
import * as firebase from "firebase";
import {v4 as uuid} from 'uuid';

export interface IFileOptions {
    _file?: File|null;
    _selected?: boolean;
    _new?: boolean;
    _deleted?: boolean;
    _avatar?: boolean;
}

export interface IFile extends IFileOptions {
    id: string;
    name: string;
    src: string;
}

class Storage {
    public static fileDefaults: IFileOptions = {
        _file: null,
        _selected: false,
        _new: false,
        _deleted: false,
    };

    public storage: firebase.storage.Reference;

    constructor(public readonly path: string) {
        this.storage = Firebase.storage.ref(this.path);
    }

    public static newFile(file: File, defaults: IFileOptions = Storage.fileDefaults): IFile {
        return {
            ...defaults,
            id: uuid(),
            name: file.name,
            src: URL.createObjectURL(file),
            _file: file,
            _new: true,
        }
    }

    public async _softSave<T extends IFile>(file: T): Promise<T> {
        let ref = this.storage.child(file.id);
        if (file._file) await ref.put(file._file);
        return Object.assign(file, {_new: false});
    }

    public async _save<T extends IFile>(file: T): Promise<T> {
        let ref = this.storage.child(file.id);
        let src = file.src;
        if (file._file) {
            let snapshot = await ref.put(file._file);
            src = await snapshot.ref.getDownloadURL();
        }
        return Object.assign(file, {src, _new: false}) as T;
    }

    public async _delete<T extends IFile>(file: T): Promise<T> {
        let ref = this.storage.child(file.id);
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
