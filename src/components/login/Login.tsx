import React, {FunctionComponent, MouseEvent, useState, ChangeEvent} from "react";
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

import Copyright from "../Copyright";

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

const Login: FunctionComponent<{}> = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleSubmit = (event: MouseEvent) => {
        event.preventDefault();
        let login = {email, password, remember};
        console.log('login submit', login);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('handle email change');
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('handle password change');
        setPassword(event.target.value);
    };

    const handleRemember = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('handle remember', event.target.checked)
        setRemember(event.target.checked);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleEmailChange}
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
                        onChange={handlePasswordChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" onChange={handleRemember}/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">{"Don't have an account? Sign Up"}</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
};

export default Login;
