import * as firebase from "firebase";

import {IFile} from "../../constants/firebase/storage";
import {IData} from "../../constants/firebase/database";
import {IAppStateItem, IAppStateItems} from "../app.types";
import {IResult, IStats} from "../../constants/firebase/database";

export type ISex = 'male' | 'female';

export interface IDogDefaults {
    _selected?: boolean;
    _default?: boolean;
}

export enum IDogStatus {
    Rescued = 'Rescued',
    Hospitalized = 'Hospitalized',
    FosterHome = 'Foster Home',
    Adopted = 'Adopted',
    Deceased = 'Deceased',
}

export interface IDog extends IData, IDogDefaults {
    name: string;
    age: number;
    sex: ISex;
    status: IDogStatus;
    description: string;
    public: boolean;

    avatar?: IFile;
    images?: IFile[];
    start?: boolean;
}

export interface IDogStats extends IStats{
    rescued: number | firebase.firestore.FieldValue;
    hospitalized: number | firebase.firestore.FieldValue;
    fosterHome: number | firebase.firestore.FieldValue;
    adopted: number | firebase.firestore.FieldValue;
    deceased: number | firebase.firestore.FieldValue;
}

export interface IDogState {
    dogs: IAppStateItems<IDog>;
    dog: IAppStateItem<IDog>;
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
    payload: IResult<IDog>;
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
