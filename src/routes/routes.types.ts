import {ComponentClass, ComponentType, FunctionComponent} from "react";

export interface IParam {
    [paramName: string]: string | number | boolean | undefined;
}

export default interface IAppRoute {
    name: string;
    path: string;
    getPath: Function;
    exact: boolean;
    auth: boolean;
    component: FunctionComponent<any> | ComponentClass<any>;

    icon?: ComponentType<any>;
    parent?: IAppRoute;
    defaultParams?: IParam;
}

export interface IAppRouteFactoryParams extends Omit<IAppRoute, 'getPath' | 'exact' | 'auth'> {
    exact?: boolean;
    auth?: boolean;
}

export interface IAppRouteDefaults extends Pick<IAppRoute, 'exact' | 'auth'> {
}
