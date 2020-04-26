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
import get from "lodash/get";

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
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import FacebookIcon from "@material-ui/icons/Facebook";
import AppleIcon from "@material-ui/icons/Apple";

import { AppState } from "@core/models";
import { DASHBOARD_ROUTE } from "@app/dashboard";
import INIT_EMAIL_CREDENTIALS from "../constants";
import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from "../routes";
import { Credentials, CreateUserCredentials } from "react-redux-firebase";

import {
  GoogleButton,
  GoogleIcon,
  FacebookButton,
  AppleButton,
} from "../components";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
  avatar: {
    margin: `${theme.spacing(1)}px auto`,
    backgroundColor: theme.palette.secondary.main,
    width: 50,
    height: 50,
  },
}));

const google: Credentials = {
  provider: "google",
  type: "popup",
};
const facebook: Credentials = {
  provider: "facebook",
  type: "popup",
};
const apple = {
  provider: "apple",
  type: "popup",
};

const SignIn: FunctionComponent<{}> = ({}) => {
  const classes = useStyles();
  const firebase = useFirebase();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, _setData] = useState<CreateUserCredentials>(
    INIT_EMAIL_CREDENTIALS
  );
  const [touched, setTouched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const auth = useSelector<AppState, any>((state) => state.firebase.auth);
  const logged = isLoaded(auth) && !isEmpty(auth);

  if (isMobile) {
    facebook.type = google.type = "redirect";
  } else {
    facebook.type = google.type = "popup";
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    signIn(data);
  }

  function setData(value: CreateUserCredentials) {
    _setData(value);
    setTouched(true);
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setData({ ...data, email: get(event, "target.value", data.email) });
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setData({ ...data, password: get(event, "target.value", data.password) });
  }

  function signIn(credentials: Credentials) {
    firebase.login(credentials);
  }

  if (logged) return <Redirect to={DASHBOARD_ROUTE.path} />;
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Container component="main" maxWidth="xs">
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" align="center">
                {t("signIn.title")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <GoogleButton
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={() => signIn(google)}
              >
                {t("signIn.with")} Google
              </GoogleButton>
            </Grid>
            <Grid item xs={12}>
              <FacebookButton
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<FacebookIcon />}
                onClick={() => signIn(facebook)}
              >
                {t("signIn.with")} Facebook
              </FacebookButton>
            </Grid>
            <Grid item xs={12}>
              <AppleButton
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<AppleIcon />}
                onClick={() => signIn(facebook)}
              >
                {t("signIn.with")} Apple
              </AppleButton>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" align="center">
                {t("signIn.with")} Email
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!touched || loading}
              >
                {loading ? t("signIn.loading") : t("signIn.title")}
              </Button>
              {loading ? <LinearProgress color="primary" /> : null}
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Link
                  component={RouterLink}
                  variant="body1"
                  to={FORGOT_PASSWORD_ROUTE.path}
                >
                  {t("signIn.forgotPassword")}
                </Link>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ textAlign: isMobile ? "left" : "right" }}
              >
                <Link
                  component={RouterLink}
                  variant="body1"
                  to={SIGN_UP_ROUTE.path}
                >
                  {t("signIn.signUp")}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Container>
  );
};

export default SignIn;
