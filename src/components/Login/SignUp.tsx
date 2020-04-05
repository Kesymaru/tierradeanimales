import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import { Link as RouterLink } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { SIGN_IN_ROUTE } from "./Login.routes";
import { IUserSignUp } from "../../store/user/user.types";
import { ValidationError } from "@hapi/joi";
import { GetError, HasError } from "../../constants/firebase/database";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const firebase = useFirebase();

  const [user, setUser] = useState<IUserSignUp>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [terms, setTerms] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationError | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    firebase.createUser({
      email: user.email,
      password: user.password,
    });
  }

  function handleUserChange(key: keyof IUserSignUp) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setUser({ ...user, [`${key}`]: value });
    };
  }

  const handleTermsChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { checked } = event.target;
    setTerms(checked);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
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
                value={user.firstName}
                error={HasError(["firstName"], errors)}
                helperText={GetError(["firstName"], errors)}
                onChange={handleUserChange("firstName")}
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
                value={user.lastName}
                error={HasError(["lastName"], errors)}
                helperText={GetError(["lastName"], errors)}
                onChange={handleUserChange("lastName")}
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
                value={user.email}
                error={HasError(["email"], errors)}
                helperText={GetError(["email"], errors)}
                onChange={handleUserChange("email")}
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
                value={user.password}
                error={HasError(["password"], errors)}
                helperText={GetError(["password"], errors)}
                onChange={handleUserChange("password")}
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
              {/*{termsError
                                ? <FormHelperText>{termsError}</FormHelperText>
                                : null}*/}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!!errors}
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
