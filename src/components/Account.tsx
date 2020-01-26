import React, {ChangeEvent, FormEvent, FunctionComponent, useEffect, useRef, useState} from "react";
import {Avatar, Button, Container, CssBaseline, Grid, TextField, Typography} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import {IUser, IUserState, IAppState, UserActions} from "../store";
import {connect, useDispatch} from "react-redux";

interface AccountProps extends Pick<IUserState, 'user'>{}
const Account: FunctionComponent<AccountProps> = ({user}) => {
    const [touched, setTouched] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUser | null>(user);
    const [password, setPassword] = useState<string>('');
    const fileInput = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) return;
        setUserData(user);
    }, [user]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!userData || !touched) return;

        dispatch(UserActions.UpdateProfile(userData));
        if (password.length) dispatch(UserActions.UpdatePassword(password));
    };

    const handleDisplayNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserData(Object.assign({}, userData, {
            displayName: event.target.value,
        }));
        setTouched(true);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserData(Object.assign({}, userData, {
            email: event.target.value
        }));
        setTouched(true);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setTouched(true);
    };

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event || !event.target || !event.target.files || !event.target.files[0]) return;

        let file = event.target.files[0];
        let img = URL.createObjectURL(file);

        setUserData(Object.assign({}, userData, {
            avatar: {img, file}
        }));
        setTouched(true);
    };

    const handlerReset = (event: FormEvent) => {
        setUserData(user);
        setTouched(false);
    };

    const clickFileUpload = () => {
        if(fileInput && fileInput.current)
            fileInput.current.click();
    };

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: '70px'}}>
            <CssBaseline/>
            <div>
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
                    onClick={clickFileUpload}>
                    {
                        userData && (userData.photoURL || userData.avatar)
                            ? <img
                                alt={userData.displayName || 'avatar'}
                                style={{height: '100%'}}
                                src={userData?.avatar ? userData.avatar.img : userData?.photoURL}/>
                            : <LockOutlinedIcon/>
                    }
                </Avatar>
                <Typography component="h1" variant="h5">
                    {userData ? userData.displayName : ''}
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
                                value={userData ? userData.displayName : ''}
                                onChange={handleDisplayNameChange}
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
                                value={userData ? userData.email : ''}
                                onChange={handleEmailChange}
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
            </div>
        </Container>
    );
};

const mapStateToProps = (state: IAppState) => ({
    user: state.user.user,
});
export default connect(mapStateToProps)(Account);


