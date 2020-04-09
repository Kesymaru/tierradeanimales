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

import { AppState } from "@/Core";
import { ACCOUNT_ROUTE, SIGN_IN_ROUTE } from "@/Auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userMenu: {
      padding: "20px 0 0 0",
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
  const { t, i18n } = useTranslation();
  const auth = useSelector<AppState, any>((state) => state.firebase.auth);
  const history = useHistory();
  const logged = isLoaded(auth) && !isEmpty(auth);

  async function logout() {
    await firebase.logout();
    console.log("logout", firebase);
    history.push(SIGN_IN_ROUTE.getPath());
  }

  return (
    <Box className={classes.userMenu}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
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
            onClick={() => history.push(SIGN_IN_ROUTE.getPath())}
          >
            {t("signIn.title")}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserMenu;
