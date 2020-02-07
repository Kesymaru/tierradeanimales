import {Dispatch} from "redux";
import {push} from "connected-react-router";

import {IFile} from "../../constants/firebase/storage";
import SystemActions from "../system/system.actions";
import {IDog, LOAD_DOG, LOAD_DOGS, REQUEST_DOG, REQUEST_DOGS, TDogsActions} from "./dogs.types";
import {DOGS_ROUTE} from "../../constants";
import Actions from "../actions";

class DogsActions extends Actions {
    public static collection: string = 'dogs';
    public static directory: string = 'dogs';

    public static Add(dog: IDog): Function {
        return async (dispatch: Dispatch) => {
            try{
                dispatch(DogsActions.RequestDogs());

                if(dog.images)
                    dog.images = await DogsActions.storage.save(dog.images||[]) as IFile[];
                dog = await DogsActions.db.add(dog) as IDog;

                dispatch(DogsActions.LoadDog(dog));
                dispatch(push(DOGS_ROUTE.getPath()));
            } catch (error) {
                console.error(error)
            }
        }
    }

    public static RequestDog(): TDogsActions {
        return {type: REQUEST_DOG};
    }

    public static LoadDog(payload: IDog): TDogsActions {
        return {type: LOAD_DOG, payload};
    }

    public static GetOne(id: string): Function {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(DogsActions.RequestDog());
                let dog = await DogsActions.db.get(id) as IDog;
                dispatch(DogsActions.LoadDog(dog));
            } catch (error) {

            } finally {

            }
        }
    }

    public static GetAll(page: number = 1, limit: number = 5): Function {
        return async (dispatch: Dispatch) => {
            try{
                dispatch(DogsActions.RequestDogs());
                let dogs = await DogsActions.db.all({page, limit}) as IDog[];
                dispatch(DogsActions.LoadDogs(dogs));
            } catch (error) {
                console.error(error)
            } finally {
                dispatch(SystemActions.Loading(false, 'dogs'));
            }
        }
    }

    public static RequestDogs(): TDogsActions {
        return {type: REQUEST_DOGS};
    }

    public static LoadDogs(payload: IDog[]): TDogsActions {
        return {type: LOAD_DOGS, payload};
    }

    public static Update(dog: IDog): Function {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(DogsActions.RequestDogs());

                debugger;

                let newImgs = (dog.images||[]).filter(img => img._new);
                let deletedImgs = (dog.images||[]).filter(img => img._deleted);
                dog.images = (dog.images||[]).filter(img => !img._deleted || img._new);

                if(newImgs.length)
                    newImgs = await DogsActions.storage.save(newImgs) as IFile[];
                if(deletedImgs.length)
                    await DogsActions.storage.delete(deletedImgs);

                dog.images = dog.images.concat(newImgs);

                console.log('updated dogs ->', dog);
                dog = await DogsActions.db.update(dog) as IDog;

                dispatch(DogsActions.LoadDog(dog));
                dispatch(push(DOGS_ROUTE.getPath()));
                dispatch(SystemActions.Notify(`Dog ${dog.name} updated`));
            } catch (error) {

            } finally {

            }
        }
    }
}

// const DogsActions = new Dogs('dogs', 'dogs');
export default DogsActions;
