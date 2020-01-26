import {TStatus} from "../app.types";

export interface IMessage {
    id: string;
    chatId: string;
    userId: string;
    message: string;
    createdDate: Date;
}

export interface INewMessage extends Omit<IMessage, 'id'>{}

export interface IChat {
    id: string;
    name: string;
    userId: string;
    createdDate: Date;
    messages?: IMessage[];
}

export interface INewChat extends Omit<IChat, 'id'>{}

export interface IChatState {
    chats: {
        status: TStatus;
        data: IChat[];
        error?: Error|string;
    };
    chat: {
        status: TStatus;
        data: IChat|null;
        error?: Error|string;
    };
}

// ------------------------------------
// Chat
// ------------------------------------
export const LOAD_CHAT = 'LOAD_CHAT';

interface ILoadChat {
    type: typeof LOAD_CHAT;
    payload: IChat;
}

// ------------------------------------
// Chats
// ------------------------------------
export const LOAD_CHATS = 'LOAD_CHATS';

interface ILoadChats {
    type: typeof LOAD_CHATS;
    payload: IChat[];
}

// ------------------------------------
// Messages
// ------------------------------------
export const LOAD_MESSAGE = 'LOAD_MESSAGE';

interface ILoadMessage {
    type: typeof LOAD_MESSAGE;
    payload: IMessage;
}

export type TChatActions  =
    ILoadChat |

    ILoadChats |

    ILoadMessage
    ;
