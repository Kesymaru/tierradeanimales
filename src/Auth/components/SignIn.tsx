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

import { AppState } from "@core/models";
import { DASHBOARD_ROUTE } from "@app/dashboard";
import INIT_EMAIL_CREDENTIALS from "../constants";
import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from "../routes";
import { Credentials, CreateUserCredentials } from "react-redux-firebase";

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

const google: Credentials = {
  provider: "google",
  type: "popup",
};
const facebook: Credentials = {
  provider: "facebook",
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

  console.log("is mobile", isMobile);
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
          <Grid container>
            <Grid xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => signIn(google)}
              >
                Google
              </Button>
            </Grid>
            <Grid xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => signIn(facebook)}
              >
                Facebook
              </Button>
            </Grid>
          </Grid>
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
