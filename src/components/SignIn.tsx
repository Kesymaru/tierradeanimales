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

import Copyright from "./Copyright";
import {IUser, IUserSingIn} from "../models";

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

interface ISingIn {
    email?: string;
    password?: string;
    remember?: boolean;
}

interface ISignInProps {
    onSubmit(user: IUser): void
}

const SignIn: FunctionComponent<ISignInProps> = ({onSubmit}) => {
    const classes = useStyles();
    const [signInData, setSignInData] = useState<IUserSingIn|null>(null);

    const handleSubmit = (event: MouseEvent) => {
        event.preventDefault();
        console.log('data', signInData)

        let user: IUser = {
            id: 1,
            firstName: 'User',
            lastName: 'Test',
            email: (signInData && signInData.email ? signInData.email : '') as string,
        };
        console.log('user logged', user)
        onSubmit(user);
    };

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
                        onChange={e => setSignInData({...signInData, email: e.target.value})}
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
                        onChange={e => setSignInData({...signInData, password: e.target.value})}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value="remember"
                                color="primary"
                                onChange={e => setSignInData({...signInData, remember: e.target.checked})}
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

export default SignIn;
