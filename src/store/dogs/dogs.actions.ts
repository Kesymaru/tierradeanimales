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
    IDogStats, IDogStatsFactory,
    IDogStatus,
    LOAD_DOG,
    LOAD_DOGS,
    TDogsActions
} from "./dogs.types";
import Storage, {FileDefaults, IFile} from "../../constants/firebase/storage";
import Database, {
    DataDefaults,
    IFilter,
    IPagination,
    IPaginationFactory,
    IResult
} from "../../constants/firebase/database";
import {ADMIN_DOGS_ROUTE} from "../../components/Dogs/Dogs.routes";
import IAppState from "../app.types";

// ------------------------------------
//  Dogs Actions Config
// ------------------------------------
const storage = new Storage({path: 'dogs'});
const database = new Database<IDog, IDogStats>({
    path: 'dogs',
    defaults: [
        {key: '_root', values: DataDefaults},
        {key: 'images', values: FileDefaults}
    ],
    statsFactory: IDogStatsFactory,
    countStats
});

function countStats(multiple: number, stats: IDogStats, doc: IDog): IDogStats {
    if (multiple === 0 && doc._prev && doc.status !== doc._prev.status) {
        stats = countStats(1, stats, doc);
        stats = countStats(-1, stats, doc._prev as IDog);
        return stats;
    }

    switch (doc.status) {
        case IDogStatus.Rescued:
            stats.rescued = +stats.rescued + multiple;
            break;
        case IDogStatus.Hospitalized:
            stats.hospitalized = +stats.hospitalized + multiple;
            break;
        case IDogStatus.FosterHome:
            stats.fosterHome = +stats.fosterHome + multiple;
            break;
        case IDogStatus.Adopted:
            stats.adopted = +stats.adopted + multiple;
            break;
        case IDogStatus.Deceased:
            stats.deceased = +stats.deceased + multiple;
            break;
        default:
            break;
    }
    stats.total = +stats.total + multiple;
    return stats;
}

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
            const dog = await database.get(id) as IDog;
            dispatch(LoadDog(dog));
        } catch (error) {
            dispatch(ErrorDog(error));
        }
    }
}

export function UpdateDog(dog: IDog): Function {
    return async (dispatch: Dispatch, getState: Function) => {
        try {
            const state = getState() as IAppState;
            dog._prev = state.dogs.dog.data;
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

export function GetDogsToFosterHomes(pagination?: IPagination): Function {
    const filter: IFilter = {
        name: 'status',
        key: 'status',
        condition: 'in',
        value: [IDogStatus.Rescued, IDogStatus.Hospitalized, IDogStatus.Adopted,]
    };
    pagination = pagination
        ? {...pagination, filter}
        : IPaginationFactory({filter});

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
