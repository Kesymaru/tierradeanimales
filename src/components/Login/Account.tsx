import React, {ChangeEvent, FormEvent, FunctionComponent, useEffect, useRef, useState} from "react";
import {connect, useDispatch} from "react-redux";

import Zoom from "@material-ui/core/Zoom";
import Fade from "@material-ui/core/Fade";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

import Storage, {IFile} from "../../constants/firebase/storage";
import IAppState from "../../store/app.types";
import IUserState, {IUser} from "../../store/user/user.types";
import {UpdatePassword, UpdateProfile} from "../../store/user/user.actions";


interface AccountProps extends Pick<IUserState, 'user'> {
}

const Account: FunctionComponent<AccountProps> = (props) => {
    const dispatch = useDispatch();
    const [touched, setTouched] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(props.user);
    const [password, setPassword] = useState<string>('');
    const fileInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!props.user) return;
        setUser(props.user);
    }, [props.user]);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!user || !touched) return;
        dispatch(UpdateProfile(user));
        if (password.length) dispatch(UpdatePassword(password));
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
        const avatar: IFile = Storage.newFile(event.target.files[0]);
        setUser({...user, avatar} as IUser);
        setTouched(true);
    }

    function handlerReset(event: FormEvent) {
        setUser(props.user);
        setTouched(false);
    }

    function clickFileUpload() {
        if (fileInput && fileInput.current)
            fileInput.current.click();
    }

    return <Container>
        <form noValidate onSubmit={handleSubmit} onReset={handlerReset}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <input
                        accept="image/*"
                        style={{display: 'none'}}
                        id="avatar"
                        type="file"
                        ref={fileInput}
                        onChange={handleAvatarChange}
                    />
                    <Zoom in={true} style={{transitionDelay: '250ms'}}>
                        <Avatar
                            alt={user && user.displayName ? user.displayName : 'Profile Picture'}
                            src={user && user.photoURL ? user.photoURL : undefined}
                            style={{
                                height: 100,
                                width: 100,
                                margin: '0 auto'
                            }}
                            onClick={clickFileUpload}>
                        </Avatar>
                    </Zoom>
                </Grid>
                <Grid item xs={12}>
                    <Fade in={true}>
                        <Typography component="h1" variant="h5" style={{textAlign: 'center'}}>
                            {user ? user.displayName : ''}
                        </Typography>
                    </Fade>
                </Grid>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                        variant="contained"
                        type="reset"
                        color="secondary"
                        style={{width: '100%'}}
                        startIcon={<CloseIcon/>}
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={6} container justify="flex-end">
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={!touched}
                        style={{width: '100%'}}
                        startIcon={<SaveIcon/>}
                    >
                        Update
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Container>;
};

const mapStateToProps = (state: IAppState) => ({
    user: state.user.user,
});
export default connect(mapStateToProps)(Account);


