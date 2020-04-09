import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useFirebase, isEmpty, isLoaded } from "react-redux-firebase";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, Redirect } from "react-router-dom";

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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { AppState } from "@core/models";
import { DASHBOARD_ROUTE } from "@app/dashboard";
import INIT_EMAIL_CREDENTIALS from "../constants";
import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from "../routes";
import { EmailCredentials } from "../models";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
  },
  grid: {
    margin: theme.spacing(3, 0, 3),
  },
}));

const SignIn: FunctionComponent<{}> = ({}) => {
  const classes = useStyles();
  const firebase = useFirebase();
  const { t } = useTranslation();
  const [data, _setData] = useState<EmailCredentials>(INIT_EMAIL_CREDENTIALS);
  const [touched, setTouched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const auth = useSelector<AppState, any>((state) => state.firebase.auth);
  const logged = isLoaded(auth) && !isEmpty(auth);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    firebase.login({
      email: data.email,
      password: data.password,
    });
  }

  function setData(value: EmailCredentials) {
    _setData(value);
    setTouched(true);
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    setData({ ...data, email });
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    setData({ ...data, password });
  }

  function handleRememberChange(event: ChangeEvent<HTMLInputElement>) {
    const remember = event.target.checked;
    setData({ ...data, remember });
  }

  if (logged) return <Redirect to={DASHBOARD_ROUTE.path} />;
  return (
    <Container maxWidth="lg">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("signIn.title")}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label={t("signIn.email")}
              name="email"
              autoComplete="email"
              autoFocus
              value={data.email}
              onChange={handleEmailChange}
              disabled={loading}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("signIn.password")}
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={handlePasswordChange}
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
              label={t("signIn.remember")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!touched || loading}
            >
              {loading ? t("signIn.loading") : t("signIn.title")}
            </Button>
            {loading ? <LinearProgress color="primary" /> : null}
            <Grid container className={classes.grid}>
              <Grid item xs>
                <Link
                  component={RouterLink}
                  variant="body2"
                  to={FORGOT_PASSWORD_ROUTE.path}
                >
                  {t("signIn.forgotPassword")}
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={RouterLink}
                  variant="body2"
                  to={SIGN_UP_ROUTE.path}
                >
                  {t("signIn.signUp")}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Container>
  );
};

export default SignIn;
