import {ComponentClass, FunctionComponent, ReactElement} from "react";
import {IUser} from "..";

export interface IStep {
    index: number;
    label: string;
    component: FunctionComponent<any> | ComponentClass<any> ;
    completed: boolean;
    optional: boolean;
    valid: boolean;
}

export interface IStudent extends IUser{
    level?: string|number;
}

export interface IVersus {
    name: string;
    rounds: number;
    participants: IStudent[];
    date: Date;
}
