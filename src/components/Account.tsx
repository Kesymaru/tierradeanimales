import React, {ChangeEvent, FormEvent, FunctionComponent, useEffect, useRef, useState} from "react";
import {connect, useDispatch} from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import {IUser, IUserState, IAppState, UserActions, IFileFactory, IFile} from "../store";

interface AccountProps extends Pick<IUserState, 'user'> {
}

const Account: FunctionComponent<AccountProps> = (props) => {
    const [touched, setTouched] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(props.user);
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch();
    const fileInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!props.user) return;
        setUser(props.user);
    }, [props.user]);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!user || !touched) return;

        dispatch(UserActions.UpdateProfile(user));
        if (password.length) dispatch(UserActions.UpdatePassword(password));
    };

    function handleUserChange(key: keyof IUser) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            setUser({...user, [`${key}`]: event.target.value} as IUser);
            setTouched(true);
        }
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
        setTouched(true);
    }

    function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
        if (!event || !event.target || !event.target.files || !event.target.files[0]) return;

        let avatar: IFile = IFileFactory({id: 0, file: event.target.files[0]});
        setUser({...user, avatar} as IUser);
        setTouched(true);
    }

    function handlerReset(event: FormEvent) {
        setUser(props.user);
        setTouched(false);
    }

    const clickFileUpload = () => {
        if (fileInput && fileInput.current)
            fileInput.current.click();
    };

    return <>
        <input
            accept="image/*"
            style={{display: 'none'}}
            id="avatar"
            type="file"
            ref={fileInput}
            onChange={handleAvatarChange}
        />
        <Avatar
            style={{height: '150px', width: '150px', margin: '0 auto', cursor: 'pointer'}}
            src={user && user.avatar ? user.avatar.src : undefined}
            onClick={clickFileUpload}>
        </Avatar>
        <Typography component="h1" variant="h5">
            {user ? user.displayName : ''}
        </Typography>
        <form noValidate onSubmit={handleSubmit} onReset={handlerReset}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="Name"
                        name="Name"
                        variant="outlined"
                        required
                        fullWidth
                        id="Name"
                        label="Name"
                        autoFocus
                        value={user ? user.displayName : ''}
                        onChange={handleUserChange('displayName')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={user ? user.email : ''}
                        onChange={handleUserChange('email')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="password"
                        label="Change Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button
                        type="reset"
                        color="secondary"
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={6} container justify="flex-end">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!touched}
                    >
                        Update
                    </Button>
                </Grid>
            </Grid>
        </form>
    </>;
};

const mapStateToProps = (state: IAppState) => ({
    user: state.user.user,
});
export default connect(mapStateToProps)(Account);


