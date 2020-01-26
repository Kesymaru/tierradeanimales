import React, {FunctionComponent, MouseEvent} from "react";
import {LinearProgress, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/Inbox';
import {connect, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {generatePath} from "react-router";

import {ChatActions, IAppState, IChatState, IUserState, TStatus} from "../../store";
import {CHAT_ROUTE} from "../../constants";

interface IChatListProps extends Pick<IChatState, 'chats'>, Pick<IUserState, 'user'> {
}

const ChatList: FunctionComponent<IChatListProps> = ({chats, user}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (id: string) => (event: MouseEvent<HTMLDivElement>) =>
        history.push(generatePath(CHAT_ROUTE.path, {id}));

    if (chats.status === TStatus.Empty) {
        if(user) dispatch(ChatActions.RequestChats(user.uid));
        return <LinearProgress color="primary"/>;
    }
    if(chats.status === TStatus.Loaded && !chats.data.length) {
        return <div>There are no chats</div>;
    }

    return (<List component="nav" aria-label="chat list">
        {chats.data.map(chat => (
            <ListItem
                key={chat.id}
                button
                onClick={handleClick(chat.id)}
            >
                <ListItemIcon>
                    <InboxIcon/>
                </ListItemIcon>
                <ListItemText
                    primary={chat.name}/>
            </ListItem>
        ))}
    </List>);
};

const mapStateToProps = (state: IAppState): IChatListProps => ({
    chats: state.chats.chats,
    user: state.user.user,
});
export default connect(mapStateToProps)(ChatList);
