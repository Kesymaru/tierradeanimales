import {Dispatch} from "redux";
import {push} from "connected-react-router";

import Database from "../../constants/firebase/database";
import Storage from "../../constants/firebase/storage";
import SystemActions from "../system/system.actions";
import {IDog, LOAD_DOG, LOAD_DOGS, REQUEST_DOG, REQUEST_DOGS, TDogsActions} from "./dogs.types";
import {DOGS_ROUTE} from "../../constants";
import {IFile} from "../app.types";

class DogsActions {

    public static Add(dog: IDog): Function {
        return async (dispatch: Dispatch) => {
            try{
                dispatch(DogsActions.RequestDogs());

                dog = Database.Id('dogs', dog);
                if(dog.images) {
                    dog.images = await Storage.SaveFiles(`dogs/${dog.id}`, dog.images);
                    dog.images.forEach(img => img.avatar ? dog.avatar = img : null);
                }
                await Database.Update('dogs', dog);

                dispatch(DogsActions.LoadDog(dog));
                dispatch(push(DOGS_ROUTE.getPath()));
            } catch (error) {
                console.error(error)
            } finally {
                dispatch(SystemActions.Loading(false, 'dogs'));
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
                let dog = await Database.Read<IDog>(`dogs/${id}`);
                dispatch(DogsActions.LoadDog(dog));
            } catch (error) {

            } finally {

            }
        }
    }

    public static GetAll(): Function {
        return async (dispatch: Dispatch) => {
            try{
                dispatch(DogsActions.RequestDogs());
                let dogs = await Database.ReadArray<IDog>('dogs');
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
        console.log('LoadDogs', payload);
        return {type: LOAD_DOGS, payload};
    }

    public static Update(dog: IDog): Function {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(DogsActions.RequestDogs());

                let newImgs = (dog.images||[]).filter(img => img.new);
                let deleteImgs = (dog.images||[]).filter(img => img.deleted);

                if(newImgs) newImgs = await Storage.SaveFiles(`dogs/${dog.id}`, newImgs);
                if(deleteImgs) deleteImgs = await Storage.DeleteFiles(`dogs/${dog.id}`, deleteImgs);
                // dog.images = (dog.images||[]).map(img => );

                await Database.Update('dogs', dog);

                dispatch(DogsActions.LoadDog(dog));
                dispatch(push(DOGS_ROUTE.getPath()));

            } catch (error) {

            } finally {

            }
        }
    }
}

export default DogsActions;
