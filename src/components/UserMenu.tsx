import React, { FunctionComponent, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useTranslation } from "react-i18next";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useAuth from "@hooks/useAuth";
import { ACCOUNT_ROUTE, SIGN_IN_ROUTE } from "@routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userMenu: {
      padding: "20px 0 0 0",
      cursor: "pointer",
    },
    avatar: {
      height: 90,
      width: 90,
      margin: "0 auto 10px auto",
    },
  })
);

export const UserMenu: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const firebase = useFirebase();
  const { t } = useTranslation();
  const history = useHistory();
  const { auth, logged } = useAuth();

  async function logout() {
    await firebase.logout();
    history.push(SIGN_IN_ROUTE.getPath());
  }

  return (
    <Box className={classes.userMenu}>
      <Avatar
        className={classes.avatar}
        onClick={() =>
          logged
            ? history.push(ACCOUNT_ROUTE.getPath())
            : history.push(SIGN_IN_ROUTE.getPath())
        }
        src={logged ? auth.photoURL : undefined}
      >
        {!logged ? <LockOutlinedIcon /> : null}
      </Avatar>
      <Box display="flex" flexDirection="column" alignItems="center">
        {logged ? (
          <Typography variant="h5" align="center">
            {auth.displayName}
          </Typography>
        ) : null}
        {logged ? (
          <Button color="primary" variant="contained" onClick={logout}>
            {t("signOut.title")}
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push(SIGN_IN_ROUTE.path)}
          >
            {t("signIn.title")}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserMenu;