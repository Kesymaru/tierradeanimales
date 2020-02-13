import {Dispatch} from "redux";
import * as firebase from "firebase";
import {push} from "connected-react-router";

import SystemActions from "../system/system.actions";
import {
    DELETE_DOG,
    ERROR_DOG,
    ERROR_DOGS,
    FETCH_DOG,
    FETCH_DOGS,
    IDog,
    IDogStats,
    IDogStatus,
    LOAD_DOG,
    LOAD_DOGS,
    TDogsActions
} from "./dogs.types";
import {ADMIN_DOGS_ROUTE} from "../../constants";
import Storage, {IFile} from "../../constants/firebase/storage";
import Database, {IPagination, IResult} from "../../constants/firebase/database";

// ------------------------------------
//  Dogs Actions
// ------------------------------------
const database = new Database<IDog, IDogStats>({path: 'dogs', onStats});

function onStats(action: string, docs: IDog | IDog[], batch: firebase.firestore.WriteBatch): void {
    console.log('custom stats', action, docs);
    const multiple = action === 'add' ? 1 : -1;
    const stats: IDogStats = {
        total: Array.isArray(docs) ? docs.length : 1,
        rescued: 0,
        hospitalized: 0,
        fosterHome: 0,
        adopted: 0,
        deceased: 0,
    };

    if (Array.isArray(docs))
        docs.forEach(doc => countStats(stats, doc));
    else countStats(stats, docs);

    (Object.keys(stats) as Array<keyof IDogStats>).forEach(key => {
        let value: number = +stats[key] * multiple;
        stats[key] = firebase.firestore.FieldValue.increment(value);
    });
    console.log('stats increments/decrements', stats);

    batch.set(database.stats, stats, {merge: true});
}

function countStats(stats: IDogStats, doc: IDog) {

    switch (doc.status) {
        case IDogStatus.Rescued:
            stats.rescued = +stats.rescued + 1;
            break;

        case IDogStatus.Hospitalized:
            stats.hospitalized = +stats.hospitalized + 1;
            break;

        case IDogStatus.FosterHome:
            stats.fosterHome = +stats.fosterHome + 1;
            break;

        case IDogStatus.Adopted:
            stats.adopted = +stats.adopted + 1;
            break;

        case IDogStatus.Deceased:
            stats.deceased = +stats.deceased + 1;
            break;

        default:
            break;
    }
}

const storage = new Storage({path: 'dogs'});

// ------------------------------------
// Dog
// ------------------------------------
function FetchDog(): TDogsActions {
    return {type: FETCH_DOG};
}

function LoadDog(payload: IDog): TDogsActions {
    return {type: LOAD_DOG, payload};
}

function _DeleteDog(payload: IDog): TDogsActions {
    return {type: DELETE_DOG, payload};
}

function ErrorDog(payload: Error): TDogsActions {
    return {type: ERROR_DOG, payload};
}

export function AddDog(dog: IDog): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchDog());

            if (dog.images) {
                dog.images = dog.images.filter(img => img._new && !img._deleted);
                dog.images = await storage.save(dog.images || []) as IFile[];
            }
            dog = await database.add(dog) as IDog;

            dispatch(LoadDog(dog));
            dispatch(push(ADMIN_DOGS_ROUTE.getPath()));
        } catch (error) {
            dispatch(ErrorDog(error));
        }
    }
}

export function GetDog(id: string): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchDog());
            let dog = await database.get(id) as IDog;
            dispatch(LoadDog(dog));
        } catch (error) {
            dispatch(ErrorDog(error));
        }
    }
}

export function UpdateDog(dog: IDog): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(_FetchDogs());

            let newImgs = (dog.images || []).filter(img => img._new);
            let deletedImgs = (dog.images || []).filter(img => img._deleted);
            let images = (dog.images || []).filter(img => !img._new && !img._deleted);

            if (newImgs.length)
                newImgs = await storage.save(newImgs) as IFile[];
            if (deletedImgs.length)
                await storage.delete(deletedImgs);

            dog.images = images.concat(newImgs);
            dog = await database.update(dog) as IDog;

            dispatch(LoadDog(dog));
            dispatch(push(ADMIN_DOGS_ROUTE.getPath()));
            dispatch(SystemActions.Notify(`Dog ${dog.name} updated`));
        } catch (error) {
            dispatch(ErrorDog(error));
        }
    }
}

export function DeleteDog(dog: IDog): Function {
    return async (dispatch: Dispatch) => {
        try {
            await database.delete(dog);
            if (dog.images) await storage.delete(dog.images);

            dispatch(_DeleteDog(dog));
            dispatch(SystemActions.Notify(`Dog ${dog.name} deleted`));
        } catch (error) {
            dispatch(ErrorDog(error));
        }
    }
}

// ------------------------------------
// Dogs
// ------------------------------------
function _FetchDogs(): TDogsActions {
    return {type: FETCH_DOGS};
}

function _LoadDogs(payload: IResult<IDog>): TDogsActions {
    return {type: LOAD_DOGS, payload};
}

function _ErrorDogs(payload: Error): TDogsActions {
    return {type: ERROR_DOGS, payload};
}

export function GetDogs(pagination?: IPagination): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(_FetchDogs());
            const results = await database.all(pagination);
            dispatch(_LoadDogs(results));
        } catch (error) {
            console.error(error);
            dispatch(_ErrorDogs(error));
        }
    }
}

function DeleteDogs(dogs: IDog[]): Function {
    return async (dispatch: Dispatch) => {
        try {
            let images = dogs.reduce((total: IFile[], dog: IDog) => {
                if (dog.images) total.concat(dog.images);
                return total;
            }, []);

            await database.delete(dogs);
            await storage.delete(images);
        } catch (error) {
            dispatch(_ErrorDogs(error));
        }
    }
}
