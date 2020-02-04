import {RouterState} from "connected-react-router";

import {ISystemState} from "./system/system.types";
import {IAuthState} from "./auth/auth.types";
import {IUserState} from "./user/user.types";
import {IDogState} from "./dogs/dogs.types";
import {type} from "os";

export interface IAppState {
    system: ISystemState;
    auth: IAuthState;
    user: IUserState;
    dogs: IDogState;
    router: RouterState;
}

export interface IAppStateItem<T> {
    status: TStatus;
    data: T;
    error?: string | Error;
}

export enum TStatus {
    Empty,
    Loaded,
    Fetching,
    Error
}

export interface IData {
    id: string | null;

    createdAt?: Date;
    updatedAt?: Date;
}

interface IFileOptions {
    file?: File;
    selected?: boolean;
    new?: boolean;
    deleted?: boolean;
    avatar?: boolean;
}

export interface IFile extends IFileOptions {
    id: string | number;
    name: string;
    path: string;
    src: string;
}

interface IFileParams extends Omit<IFile, 'name' | 'path' | 'src' | 'file'> {
    file: File;
    name?: string;
    path?: string;
    src?: string;
}

export const IFileDefaults: IFileOptions = {
    selected: false,
    new: true,
    deleted: false,
    avatar: false,
};

export function IFileFactory(
    params: IFileParams,
    defaults: IFileOptions = IFileDefaults): IFile {
    params.src = URL.createObjectURL(params.file);

    params.name = params.name || params.file.name;
    params.path = !!params.path ? params.path : `/${params.id}_${params.name}`;

    return {...defaults, ...params} as IFile;
}
