import {Dispatch} from "redux";
import {push} from "connected-react-router";
import {generatePath} from "react-router";

import {IChat, IMessage, INewChat, INewMessage, LOAD_CHAT, LOAD_CHATS, LOAD_MESSAGE, TChatActions,} from "./chat.types";
import {SystemActions} from "../index";
import {Database} from "../../constants/firebase";
import {CHAT_ROUTE} from "../../constants";

class ChatActions {
    public static NewChat(chat: INewChat): Function {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(SystemActions.Loading(true, 'chat'));
                let id = await Database.Push("chats", chat);
                dispatch(push(generatePath(CHAT_ROUTE.path, {id})));
            } catch (error) {
                dispatch(SystemActions.Error(error));
            } finally {
                dispatch(SystemActions.Loading(false));
            }
        }
    }

    public static RequestChats(userId: string): Function {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(SystemActions.Loading(true, 'chats'));
                let chats = await Database.Read(`chats`, {key: 'userId', value: userId, toArray: true});

                console.log('RequestChats', chats);

                dispatch(ChatActions.LoadChats(chats));
            } catch (error) {
                dispatch(SystemActions.Error(error));
            } finally {
                dispatch(SystemActions.Loading(false, 'chats'))
            }
        }
    }

    public static LoadChats(payload: IChat[]): TChatActions {
        return {type: LOAD_CHATS, payload}
    }

    public static NewMessage(message: INewMessage): Function {
        return async (dispatch: Dispatch) => {
            try {
                let id = await Database.Push('messages', message);
                dispatch(ChatActions.LoadMessage({...message, id}));
            } catch (error) {
                dispatch(SystemActions.Error(error));
            }
        }
    }

    public static LoadMessage(payload: IMessage): TChatActions {
        return {type: LOAD_MESSAGE, payload}
    }

    public static RequestChat(chatId: string): Function {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(SystemActions.Loading());

                let chat = await Database.Read(`chats/${chatId}`);
                chat.messages = await Database.Read('messages', {key: 'chatId', value: chatId, toArray: true});

                console.log('request chat', chat);

                dispatch(ChatActions.LoadChat(chat));
            } catch (error) {
                dispatch(SystemActions.Error(error));
            } finally {
                dispatch(SystemActions.Loading(false));
            }
        }
    }

    public static LoadChat(payload: IChat): TChatActions {
        return {type: LOAD_CHAT, payload}
    }
}

export default ChatActions;
