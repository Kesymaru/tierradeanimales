import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import Route from "@core/models/route";
import { ACCOUNT_ROUTE } from "@app/user/routes";
import { ADMIN_CASE_ROUTE } from "@app/case/routes";
import { FOSTER_HOMES_ROUTE } from "@app/foster-home/routes";
import { UserMenu } from "@app/user/components";

const NAVBAR_ROUTES: Route[] = [
  ACCOUNT_ROUTE,
  ADMIN_CASE_ROUTE,
  FOSTER_HOMES_ROUTE,
];

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

  function goTo(route: Route) {
    history.push(route.getPath ? route.getPath() : route.path);
  }

  return (
    <div>
      <UserMenu />
      {NAVBAR_ROUTES.length && <Divider />}
      <List>
        {NAVBAR_ROUTES.map((route, index) => (
          <ListItem button key={index} onClick={() => goTo(route)}>
            <ListItemIcon>
              {route.icon ? <route.icon /> : <InboxIcon />}
            </ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
      {/*<Divider/>
        <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button sortBy={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>
            ))}
        </List>*/}
    </div>
  );
};

export default NavbarMenu;
