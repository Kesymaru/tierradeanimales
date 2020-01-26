import React, {ChangeEvent, FormEvent, FunctionComponent, useState} from "react";
import {Redirect, useParams} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {Grid, IconButton, LinearProgress, Paper, TextField, Typography} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

import {ChatActions, IAppState, IChatState, ISystemState, IUserState, TStatus} from "../../store";
import {CHAT_LIST_ROUTE} from "../../constants";

interface IChatProps extends Pick<IChatState, 'chat'>,
    Pick<IUserState, 'user'>,
    Pick<ISystemState, 'loading'> {
}

const Chat: FunctionComponent<IChatProps> = ({chat, user, loading}) => {
    const [message, setMessage] = useState<string>('');
    const {id} = useParams();
    const dispatch = useDispatch();

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => setMessage(event.target.value);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!id || !user || !user.uid) return;

        dispatch(ChatActions.NewMessage({
            message,
            chatId: id,
            userId: user.uid,
            createdDate: (new Date())
        }));
        setMessage('');
    };

    if (!id) return <Redirect to={CHAT_LIST_ROUTE.path}/>;
    else if (chat.status === TStatus.Empty
        || (chat.status === TStatus.Loaded && chat.data && id !== chat.data.id))
        dispatch(ChatActions.RequestChat(id));

    if (chat.status === TStatus.Fetching)
        return <LinearProgress color="primary"/>;

    console.log('chat data', chat);

    return (<Paper>
        <Typography variant="h3" component="h1">
            {chat.data ? chat.data.name : ''}
        </Typography>
        <Grid container>
            {chat.data && chat.data.messages
                ? chat.data.messages.map(item => (<>
                    <Grid item xs={12}>
                        <Paper>{item.message}</Paper>
                    </Grid>
                </>))
                : null}
        </Grid>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                id="message"
                label="Message"
                multiline
                rowsMax="4"
                value={message}
                disabled={loading}
                onChange={handleMessageChange}
            />
            <IconButton
                aria-label="send"
                type="submit"
                disabled={loading || !message.length}
            >
                <SendIcon/>
            </IconButton>
        </form>
    </Paper>);
};

const mapStateToProps = (state: IAppState): IChatProps => ({
    chat: state.chats.chat,
    user: state.user.user,
    loading: state.system.loading,
});
export default connect(mapStateToProps)(Chat);
