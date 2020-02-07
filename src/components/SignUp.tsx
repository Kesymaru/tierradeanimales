import React, {ChangeEvent, FormEvent, FunctionComponent, useState} from "react";
import {useDispatch} from "react-redux";
import {Link as RouterLink} from 'react-router-dom';

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles, Theme} from '@material-ui/core/styles';

import {SIGN_IN_ROUTE} from "../constants/routes";
import {AuthActions} from "../store";

const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const USED_EMAILS: string[] = [];

const SignUp: FunctionComponent<{}> = () => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [terms, setTerms] = useState<boolean>(false);
    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [termsError, setTermsError] = useState<string>('');
    const dispatch = useDispatch();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        dispatch(AuthActions.SingUp(email, password));
    };

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        let {value} = event.target;
        setFirstName(value);
        validateFirstName(value);
    };

    const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        let {value} = event.target;
        setLastName(value);
        validateLastName(value);
    }

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

    const handleTermsChange = (event: ChangeEvent<HTMLInputElement>) => {
        let {checked} = event.target;
        setTerms(checked);
        setTermsError(checked ? '' : 'Terms is required');
    };

    const validateFirstName = (value: string) => {
        if(!value) return setFirstNameError('First Name required');
        if(value.length < 3) return setFirstNameError('Invalid First Name');
        setFirstNameError('')
    };

    const validateLastName = (value: string) => {
        if(!value) return setLastNameError('Last Name required');
        if(value.length < 3) return setLastNameError('Invalid Last Name');
        setLastNameError('')
    };

    const validateEmail = (value: string) => {
        if(!value) return setEmailError('Email is required');
        if(USED_EMAILS.includes(value))
            return setEmailError('Email already in registered');
        EMAIL_REGEX.test(value)
            ? setEmailError('')
            : setEmailError('Invalid Email');
    };

    const validatePassword = (value: string) => {
        if(!value) return setPasswordError('Password required');
        if(value.length < 6) return setPasswordError('Invalid Password length, min 6 characters');
        setPasswordError('');
        setTermsError(terms ? '' : 'Terms is required');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="firstName"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                error={!!firstNameError}
                                helperText={firstNameError}
                                onChange={handleFirstNameChange}
                                onBlur={() => validateFirstName(firstName)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={lastName}
                                error={!!lastNameError}
                                helperText={lastNameError}
                                onChange={handleLastNameChange}
                                onBlur={() => validateLastName(lastName)}
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
                                value={email}
                                error={!!emailError}
                                helperText={emailError}
                                onChange={handleEmailChange}
                                onBlur={() => validateEmail(email)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        required
                                        checked={terms}
                                        onChange={handleTermsChange}
                                    />
                                }
                                label="I have read the use terms"
                            />
                            {termsError
                                ? <FormHelperText>{termsError}</FormHelperText>
                                : null}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={ !!firstNameError || !!lastNameError || !!emailError || !!passwordError || !!termsError }
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link
                                variant="body2"
                                component={RouterLink}
                                to={SIGN_IN_ROUTE.path}
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default SignUp;
