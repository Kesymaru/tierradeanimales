import React, {ChangeEvent, FormEvent, FunctionComponent, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {Link as RouterLink, Redirect} from 'react-router-dom';
import {ValidationError, ValidationResult} from "@hapi/joi";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles, Theme} from '@material-ui/core/styles';

import IAppState from "../../store/app.types";
import IAuthState from "../../store/auth/auth.types";
import ISystemState from "../../store/system/system.types";
import {IUserSignIn, IUserSignInValidator} from "../../store/user/user.types";
import {SignIn as SignInAction} from "../../store/auth/auth.actions";
import {DASHBOARD_ROUTE} from "../Dashboard/Dashboard.routes";
import {FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE} from "./Login.routes";
import {GetError, HasError} from "../../constants/firebase/database";

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


interface ISignInProps extends Pick<ISystemState, 'loading'>, Pick<IAuthState, 'logged'> {
}

const SignIn: FunctionComponent<ISignInProps> = ({loading, logged}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [data, _setData] = useState<IUserSignIn>({email: '', password: '', remember: false});
    const [touched, setTouched] = useState<boolean>(false);
    const [errors, setErrors] = useState<ValidationError | null>(null);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        dispatch(SignInAction(data.email, data.password, data.remember));
    };

    function validate(value: IUserSignIn = data) {
        const results = IUserSignInValidator(value) as ValidationResult;
        setErrors(results.error || null);
    }

    function setData(value: IUserSignIn) {
        _setData(value);
        validate(value);
        setTouched(true);
    }

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
        const email = event.target.value;
        setData({...data, email});
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        const password = event.target.value;
        setData({...data, password});
    };

    function handleRememberChange(event: ChangeEvent<HTMLInputElement>) {
        const remember = event.target.checked;
        setData({...data, remember});
    }

    if (logged) return <Redirect to={DASHBOARD_ROUTE.path}/>;
    return <Container maxWidth="lg">
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('signIn.title')}
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type="email"
                        label={t('signIn.email')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={data.email}
                        error={HasError(['email'], errors)}
                        helperText={GetError(['email'], errors)}
                        onChange={handleEmailChange}
                        disabled={loading}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('signIn.password')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={data.password}
                        error={HasError(['password'], errors)}
                        helperText={GetError(['password'], errors)}
                        onChange={handlePasswordChange}
                        // onBlur={() => validate()}
                        disabled={loading}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value="remember"
                                color="primary"
                                onChange={handleRememberChange}
                                disabled={loading}
                            />
                        }
                        label={t('signIn.remember')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!touched || loading || !!errors}
                    >
                        {loading ? t('signIn.loading') : t('signIn.title')}
                    </Button>
                    {loading ? <LinearProgress color="primary"/> : null}
                    <Grid container className={classes.grid}>
                        <Grid item xs>
                            <Link
                                component={RouterLink}
                                variant="body2"
                                to={FORGOT_PASSWORD_ROUTE.path}
                            >
                                {t('signIn.forgotPassword')}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                component={RouterLink}
                                variant="body2"
                                to={SIGN_UP_ROUTE.path}
                            >
                                {t('signIn.signUp')}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    </Container>;
};

const mapStateToProps = (state: IAppState) => ({
    loading: state.system.loading,
    logged: state.auth.logged,
});
export default connect(mapStateToProps)(SignIn);
