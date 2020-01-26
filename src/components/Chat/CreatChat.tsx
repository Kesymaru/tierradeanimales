import React, {ChangeEvent, FormEvent, FunctionComponent, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {TextField, Button, LinearProgress} from "@material-ui/core";

import {ChatActions, IChat, ISystemState, IUserState, IAppState, INewChat} from "../../store";

interface ICreatChatProps extends Pick<IUserState, 'user'>, Pick<ISystemState, 'loading'> {
}

const CreateChat: FunctionComponent<ICreatChatProps> = ({user, loading}) => {
    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');

    const dispatch = useDispatch();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if(!user || !user.uid) return;

        dispatch(ChatActions.NewChat({
            name,
            userId: user.uid,
            createdDate: (new Date())
        }));
        setName('');
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        if (name.length <= 2) setNameError('Name is required');
        else setNameError('');
    };

    return (<form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
            id="name"
            label="Name"
            value={name}
            onChange={handleNameChange}
            error={!nameError.length}
            helperText={nameError}
            disabled={loading}
        />
        <Button
            color="primary"
            disabled={name.length <= 2 || loading}
            type="submit"
        >
            Create
        </Button>
        {loading ? <LinearProgress/> : null}
    </form>)
};

const mapStateToProps = (state: IAppState) => ({
    user: state.user.user,
    loading: state.system.loading
});
export default connect(mapStateToProps)(CreateChat);
