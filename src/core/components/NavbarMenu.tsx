import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import Route from "@core/models/route";
import { NAVBAR_ROUTES } from "@core/routes";
import { UserMenu } from "@app/user/components";
import { AppState } from "@core/models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  })
);

export interface NavbarMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const NavbarMenu: FunctionComponent<NavbarMenuProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useSelector<AppState, any>((state) => state.firebase.auth);
  const logged = auth.isLoaded && !auth.isEmpty;

  function goTo(route: Route) {
    history.push(route.path);
  }

  return (
    <div>
      <UserMenu />
      {NAVBAR_ROUTES.length && <Divider />}
      <List>
        {NAVBAR_ROUTES.filter((route) => (route.auth ? logged : true)).map(
          (route, index) => (
            <ListItem button key={index} onClick={() => goTo(route)}>
              <ListItemIcon>
                {route.icon ? <route.icon /> : <InboxIcon />}
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          )
        )}
      </List>
      {NAVBAR_ROUTES.length && <Divider />}
    </div>
  );
};

export default NavbarMenu;
