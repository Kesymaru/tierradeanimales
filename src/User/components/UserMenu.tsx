import React, { FunctionComponent, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { AppState } from "@/App";
import { ACCOUNT_ROUTE, SIGN_IN_ROUTE } from "@/Auth";

export const UserMenu: FunctionComponent<{}> = () => {
  const firebase = useFirebase();
  const auth = useSelector<AppState, any>((state) => state.firebase.auth);
  const location = useLocation();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const logged = isLoaded(auth) && !isEmpty(auth);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item: string | null) => (event: MouseEvent) => {
    setAnchorEl(null);
    switch (item) {
      case "Profile":
        return history.push(ACCOUNT_ROUTE.path);

      case "SignOut":
        return firebase.logout();

      default:
        break;
    }
  };

  if (logged) {
    return (
      <div>
        {/* <Avatar
          style={{
            height: "40px",
            width: "40px",
            margin: "0 auto",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          {{user && user.photoURL ? (
            <img
              alt={user.displayName || "avatar"}
              style={{ height: "100%" }}
              src={user.photoURL}
            />
          ) : (
            <LockOutlinedIcon />
          )}}
        </Avatar> */}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose(null)}
        >
          <MenuItem onClick={handleClose("Profile")}>Profile</MenuItem>
          <MenuItem onClick={handleClose("SignOut")}>SignOut</MenuItem>
        </Menu>
      </div>
    );
  } else if (location.pathname === SIGN_IN_ROUTE.path) return null;

  return (
    <Button color="inherit" onClick={() => history.push(SIGN_IN_ROUTE.path)}>
      SignIn
    </Button>
  );
};

export default UserMenu;
