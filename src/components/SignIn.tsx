import React, {FunctionComponent, useState, ChangeEvent, FormEvent} from "react";
import {
    Container,
    CssBaseline,
    Avatar,
    Button,
    Typography,
    TextField,
    FormControlLabel,
    Grid,
    Link,
    Box,
    Checkbox
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles, Theme} from '@material-ui/core/styles';

import Copyright from "./Copyright";
import {IUser} from "../models";
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
        margin: theme.spacing(3, 0, 2),
    },
}));

interface ISignInProps {
    onSubmit(user: IUser): void
};

const SignIn: FunctionComponent<ISignInProps> = ({onSubmit}) => {
    const classes = useStyles();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log('data', email, password, remember);
        onSubmit({
            id: 1,
            firstName: 'User',
            lastName: 'Test',
            email,
        });
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
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                    onChange={e => setRemember(e.target.checked)}
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
                            disabled={ !!emailError || !!passwordError }
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
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

export default SignIn;
