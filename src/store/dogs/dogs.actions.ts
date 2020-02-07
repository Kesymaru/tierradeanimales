import {Dispatch} from "redux";
import {push} from "connected-react-router";
import Storage, {IFile} from "../../constants/firebase/storage";

import SystemActions from "../system/system.actions";
import {
    DELETE_DOG,
    ERROR_DOG,
    ERROR_DOGS,
    FETCH_DOG,
    FETCH_DOGS,
    IDog,
    LOAD_DOG,
    LOAD_DOGS,
    TDogsActions
} from "./dogs.types";
import {DOGS_ROUTE} from "../../constants";
import Actions from "../actions";

class DogsActions extends Actions {
    protected static databaseConfig = {
        name: 'dogs',
        subCollections: [{
            key: 'images',
            defaults: Storage.defaults as any
        }, {
            key: 'avatar',
            defaults: Storage.defaults as any
        }]
    };
    protected static storageConfig = {
        name: 'dogs'
    };

    // ------------------------------------
    // Dog
    // ------------------------------------
    private static _FetchDog(): TDogsActions {
        return {type: FETCH_DOG};
    }

    private static _LoadDog(payload: IDog): TDogsActions {
        return {type: LOAD_DOG, payload};
    }

    private static _DeleteDog(payload: IDog): TDogsActions {
        return {type: DELETE_DOG, payload};
    }

    private static _ErrorDog(payload: Error): TDogsActions {
        return {type: ERROR_DOG, payload};
    }

    public static Add(dog: IDog): Function {
        return async (dispatch: Dispatch) => {
            try{
                dispatch(DogsActions._FetchDog());

                if(dog.images){
                    dog.images = dog.images.filter(img => img._new && !img._deleted);
                    dog.images = await DogsActions.storage.save(dog.images||[]) as IFile[];
                }
                dog = await DogsActions.db.add(dog) as IDog;

                dispatch(DogsActions._LoadDog(dog));
                dispatch(push(DOGS_ROUTE.getPath()));
            } catch (error) {
                dispatch(DogsActions._ErrorDog(error));
            }
        }
    }

    public static Get(id: string): Function {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(DogsActions._FetchDog());
                let dog = await this.db.get(id) as IDog;
                dispatch(DogsActions._LoadDog(dog));
            } catch (error) {
                dispatch(DogsActions._ErrorDog(error));
            }
        }
    }

    public static Update(dog: IDog): Function {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(DogsActions._FetchDogs());

                let newImgs = (dog.images||[]).filter(img => img._new);
                let deletedImgs = (dog.images||[]).filter(img => img._deleted);
                let images = (dog.images||[]).filter(img => !img._new && !img._deleted);

                if(newImgs.length)
                    newImgs = await DogsActions.storage.save(newImgs) as IFile[];
                if(deletedImgs.length)
                    await DogsActions.storage.delete(deletedImgs);

                dog.images = images.concat(newImgs);
                dog = await DogsActions.db.update(dog) as IDog;

                dispatch(DogsActions._LoadDog(dog));
                dispatch(push(DOGS_ROUTE.getPath()));
                dispatch(SystemActions.Notify(`Dog ${dog.name} updated`));
            } catch (error) {
                dispatch(DogsActions._ErrorDog(error));
            }
        }
    }

    public static Delete(dog: IDog): Function {
        return async (dispatch: Dispatch) => {
            try {
                await this.db.delete(dog);
                if(dog.images) await this.storage.delete(dog.images);

                dispatch(this._DeleteDog(dog));
                dispatch(SystemActions.Notify(`Dog ${dog.name} deleted`));
            } catch (error) {
                dispatch(DogsActions._ErrorDog(error));
            }
        }
    }

    // ------------------------------------
    // Dogs
    // ------------------------------------
    private static _FetchDogs(): TDogsActions {
        return {type: FETCH_DOGS};
    }

    private static _LoadDogs(payload: IDog[]): TDogsActions {
        return {type: LOAD_DOGS, payload};
    }

    private static _ErrorDogs(payload: Error): TDogsActions {
        return {type: ERROR_DOGS, payload};
    }

    public static All(page: number = 1, limit: number = 5): Function {
        return async (dispatch: Dispatch) => {
            try{
                dispatch(DogsActions._FetchDogs());

                let dogs = await DogsActions.db.all({page, limit}) as IDog[];

                dispatch(DogsActions._LoadDogs(dogs));
            } catch (error) {
                dispatch(DogsActions._ErrorDogs(error));
            }
        }
    }

    public static DeleteDogs(dogs: IDog[]): Function {
        return async (dispatch: Dispatch) => {
            try {
                let images = dogs.reduce((total: IFile[], dog: IDog) => {
                    if(dog.images) total.concat(dog.images);
                    return total;
                }, []);

                await this.db.delete(dogs);
                await this.storage.delete(images);
            } catch (error) {
                dispatch(DogsActions._ErrorDogs(error));
            }
        }
    }
}

export default DogsActions;
