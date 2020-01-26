import {TStatus} from "../app.types";
import {IChat, IChatState, LOAD_CHAT, LOAD_CHATS, LOAD_MESSAGE, TChatActions} from "./chat.types";

const InitState: IChatState = {
    chats: {
        status: TStatus.Empty,
        data: []
    },
    chat: {
        status: TStatus.Empty,
        data: null
    }
};
function ChatReducers(
    state: IChatState = InitState,
    action: TChatActions): IChatState {

    switch (action.type) {
        case LOAD_CHATS:
            return {
                ...state,
                chats: {
                    status: TStatus.Loaded,
                    data: action.payload
                }
            };

        case LOAD_CHAT: {
            let chat = state.chats.data.find(c => c.id === action.payload.id);
            if(chat) chat = Object.assign(chat, action.payload);
            else chat = action.payload;

            return {
                ...state,
                chat: {
                    status: TStatus.Loaded,
                    data: chat||null
                }
            }
        }

        case LOAD_MESSAGE: {
            if(!state.chat.data) return {...state};
            let chat = state.chat.data;
            let messages = chat && chat.messages ? chat.messages : [];
            chat.messages = [...messages, action.payload];

            return {
                ...state,
                chat: {
                    status: TStatus.Loaded,
                    data: chat
                },
            };
        }

        default:
            return state;
    }
}

export default ChatReducers;
