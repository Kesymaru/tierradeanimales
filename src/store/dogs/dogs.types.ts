import {IAppStateItem, IFile, IData} from "../app.types";

export interface IDog extends IData {
    name: string;
    age: number;
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
export const REQUEST_DOG = 'REQUEST_DOG';
interface IRequestDog {
    type: typeof REQUEST_DOG;
}

export const LOAD_DOG = 'LOAD_DOG';
interface ILoadDog {
    type: typeof LOAD_DOG;
    payload: IDog;
}

// ------------------------------------
// Dogs
// ------------------------------------
export const REQUEST_DOGS = 'REQUEST_DOGS';
interface IRequestDogs {
    type: typeof REQUEST_DOGS;
}

export const LOAD_DOGS = 'LOAD_DOGS';
interface ILoadDogs {
    type: typeof LOAD_DOGS;
    payload: IDog[];
}


export type TDogsActions =
    IRequestDog |
    ILoadDog |

    IRequestDogs |
    ILoadDogs
;
