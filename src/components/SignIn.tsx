import React, {FunctionComponent, useState, ChangeEvent, FormEvent} from "react";
import {connect, useDispatch} from "react-redux";
import {Container, CssBaseline, Avatar, Button, Typography, TextField, FormControlLabel, Grid, Link, Box, Checkbox, LinearProgress} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles, Theme} from '@material-ui/core/styles';

import {AuthActions, TAppState} from "../store";
import ROUTES from "../constants/routes";

import Copyright from "./Copyright";
import {EMAIL_REGEX} from "../constants";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 0),
    },
    grid: {
        margin: theme.spacing(3, 0, 3),
    },
}));

interface ISignInProps {
    loading: boolean;
}

const SignIn: FunctionComponent<ISignInProps> = ({loading}) => {
    const classes = useStyles();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const dispatch = useDispatch();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        dispatch(AuthActions.SignIn(email, password, remember));
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        let {value} = event.target;
        setEmail(value);
        validateEmail(value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        let {value} = event.target;
        setPassword(value);
        validatePassword(value);
    };

    const validateEmail = (value: string) => {
        if(!value) return setEmailError('Email is required');
        EMAIL_REGEX.test(value)
            ? setEmailError('')
            : setEmailError('Invalid Email');
    };

    const validatePassword = (value: string) => {
        if(!value.length) return setPasswordError('Password is required');
        if(value.length < 6) return setPasswordError('Invalid Password');
        setPasswordError('');
    };

    return (
        <Container maxWidth="lg">
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            type="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            error={!!emailError}
                            helperText={emailError}
                            onChange={handleEmailChange}
                            onBlur={() => validateEmail(email)}
                            disabled={loading}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            error={!!passwordError}
                            helperText={passwordError}
                            onChange={handlePasswordChange}
                            onBlur={() => validatePassword(password)}
                            disabled={loading}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                    onChange={e => setRemember(e.target.checked)}
                                    disabled={loading}
                                />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={ loading || !!emailError || !!passwordError }
                        >
                            { loading ? 'Loading' : 'Sign In' }
                        </Button>
                        { loading ? <LinearProgress color="primary" /> : null}
                        <Grid container className={classes.grid}>
                            <Grid item xs>
                                <Link href={ROUTES.forgotPassword.path} variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={ROUTES.signUp.path} variant="body2">
                                    {"Don't have an ACCOUNT_ROUTE? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        </Container>
    );
};

const mapStateToProps = (state: TAppState) => ({loading: state.system.loading});
export default connect(mapStateToProps)(SignIn);
