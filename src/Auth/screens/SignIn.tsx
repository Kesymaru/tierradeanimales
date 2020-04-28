import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import {
  useFirebase,
  isEmpty,
  isLoaded,
  CreateUserCredentials,
} from "react-redux-firebase";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Link as RouterLink, Redirect } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles, Theme } from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Divider from "@material-ui/core/Divider";

import { AppState } from "@core/models";
import { DASHBOARD_ROUTE } from "@app/dashboard";

import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from "../routes";
import { AuthProviders } from "../components";

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

const SignIn: FunctionComponent = () => {
  const classes = useStyles();
  const firebase = useFirebase();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { register, handleSubmit, errors } = useForm<CreateUserCredentials>();
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useSelector<AppState, any>((state) => state.firebase.auth);
  const logged = isLoaded(auth) && !isEmpty(auth);

  async function onSubmit(data: CreateUserCredentials) {
    setLoading(true);
    try {
      await firebase.login(data);
    } catch (err) {
      console.error("error", err);
      setLoading(false);
    }
  }

  if (logged) return <Redirect to={DASHBOARD_ROUTE.path} />;
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Container component="main" maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" align="center">
                {t("signIn.title")}
              </Typography>
            </Grid>

            <AuthProviders with={t("signIn.with")} />

            <Grid item xs={12}>
              <Divider />
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
                disabled={loading}
                inputRef={register({
                  required: true,
                })}
                error={!!errors.email}
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
                disabled={loading}
                inputRef={register({
                  required: true,
                })}
                error={!!errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!errors || loading}
              >
                {loading ? t("signIn.loading") : t("signIn.title")}
              </Button>
              {loading ? <LinearProgress color="primary" /> : null}
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Divider />
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
