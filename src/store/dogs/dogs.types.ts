import {IFile} from "../../constants/firebase/storage";
import {IAppStateItem, IData} from "../app.types";

export type ISex = 'male' | 'female';

export interface IDog extends IData {
    name: string;
    age: number;
    sex: ISex;
    status: string;
    description: string;
    public: boolean;

    avatar?: IFile;
    images?: IFile[];
    start?: boolean;
}

export interface IDogState {
    dogs: IAppStateItem<IDog[]>;
    dog: IAppStateItem<IDog|null>;
}

// ------------------------------------
// Dog
// ------------------------------------
export const FETCH_DOG = 'FETCH_DOG';
interface IFetchDog {
    type: typeof FETCH_DOG;
}

export const LOAD_DOG = 'LOAD_DOG';
interface ILoadDog {
    type: typeof LOAD_DOG;
    payload: IDog;
}

export const DELETE_DOG = 'DELETE_DOG';
interface IDeleteDog {
    type: typeof DELETE_DOG;
    payload: IDog;
}

export const ERROR_DOG = 'ERROR_DOG';
interface IErrorDog {
    type: typeof ERROR_DOG;
    payload: Error;
}

// ------------------------------------
// Dogs
// ------------------------------------
export const FETCH_DOGS = 'FETCH_DOGS';
interface IFetchDogs {
    type: typeof FETCH_DOGS;
}

export const LOAD_DOGS = 'LOAD_DOGS';
interface ILoadDogs {
    type: typeof LOAD_DOGS;
    payload: IDog[];
}

export const ERROR_DOGS = 'ERROR_DOGS';
interface IErrorDogs {
    type: typeof ERROR_DOGS;
    payload: Error;
}

export type TDogsActions =
    IFetchDog |
    ILoadDog |
    IDeleteDog |
    IErrorDog |

    IFetchDogs |
    ILoadDogs |
    IErrorDogs
;
