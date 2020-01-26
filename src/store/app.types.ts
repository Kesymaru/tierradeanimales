import {RouterState} from "connected-react-router";

import {ISystemState} from "./system/system.types";
import {IAuthState} from "./auth/auth.types";
import {IUserState} from "./user/user.types";
import {IGoalsState} from "./goals/goalsTypes";
import {IChatState} from "./chat/chat.types";

export interface IAppState {
    system: ISystemState;
    auth: IAuthState;
    user: IUserState;
    goals: IGoalsState;
    chats: IChatState;
    router: RouterState;
}

export enum TStatus {
    Empty,
    Loaded,
    Fetching,
    Error
}
