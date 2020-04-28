import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirebase, isLoaded } from "react-redux-firebase";
import { useTranslation } from "react-i18next";
import get from "lodash/get";

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
import Divider from "@material-ui/core/Divider";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { AppState } from "@app/core/models";
import { User, INIT_USER } from "@app/user";
import { SIGN_IN_ROUTE } from "../routes";

import { AuthProviders } from "../components";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: `${theme.spacing(1)}px auto`,
    backgroundColor: theme.palette.secondary.main,
    width: 50,
    height: 50,
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
  const { t } = useTranslation();
  const classes = useStyles();
  const firebase = useFirebase();
  const auth = useSelector<AppState, any>((state) => state.firebase.auth);

  const [user, setUser] = useState<User>(INIT_USER);
  const [password, setPassword] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);

  console.log("auth", auth);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    firebase.createUser(
      {
        email: user.email,
        password,
      },
      user
    );
  }

  function handleUserChange(key: keyof User) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [`${key}`]: get(event, "target.value", "") });
    };
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(get(event, "target.value", ""));
  }

  function handleTermsChange(event: ChangeEvent<HTMLInputElement>) {
    setTerms(get(event, "target.checked", false) as boolean);
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center">
              {t("signUp.title")}
            </Typography>
          </Grid>

          <AuthProviders with={t("signUp.with")} />

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" align="center">
              {t("signUp.with")} Email
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="firstName"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label={t("signUp.firstName")}
              autoFocus
              value={user.firstName}
              onChange={handleUserChange("firstName")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label={t("signUp.lastName")}
              name="lastName"
              autoComplete="off"
              value={user.lastName}
              onChange={handleUserChange("lastName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label={t("signUp.email")}
              name="email"
              autoComplete="email"
              value={user.email}
              onChange={handleUserChange("email")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label={t("signUp.password")}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
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
              label={t("signUp.terms")}
            />
          </Grid>
          <Grid xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("signUp.title")}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid xs={12}>
            <Link
              variant="body2"
              component={RouterLink}
              to={SIGN_IN_ROUTE.path}
            >
              {t("signUp.alreadyHaveAccount")}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;
