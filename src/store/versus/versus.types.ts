import {ComponentClass, FunctionComponent, ReactElement} from "react";
import {IUser} from "..";

export interface IStep {
    index: number;
    label: string;
    component: FunctionComponent<any> | ComponentClass<any>;
    completed: boolean;
    optional: boolean;
    valid: boolean;
}

export interface IStudent extends IUser {
    level?: string | number;
}

export interface IVersus {
    id: string;
    name: string;
    rounds: number;
    participants: IStudent[];
    date: Date;
}

export interface INewVersus extends Omit<IVersus, 'id'> {
}

export interface IVersusState {
    versus: IVersus[];
}

// ------------------------------------
// Versus
// ------------------------------------
export const LOAD_VERSUS = 'LOAD_VERSUS';

interface ILoadVersus {
    type: typeof LOAD_VERSUS;
    payload: IVersus;
}

export type TVersusActions =
    ILoadVersus
;
