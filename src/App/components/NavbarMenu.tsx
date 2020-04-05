import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import { ACCOUNT_ROUTE } from "@/Auth/routes";
import { ADMIN_DOGS_ROUTE } from "@/Case/routes";
import { ADMIN_HOMES_ROUTE } from "@/FosterHome/routes";

const ADMIN_ROUTES: IAppRoute[] = [
  ACCOUNT_ROUTE,
  ADMIN_DOGS_ROUTE,
  ADMIN_HOMES_ROUTE,
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  })
);

interface NavbarMenuProps {
  open: boolean;
  setOpen: Function;
}

const NavbarMenu: FunctionComponent<NavbarMenuProps> = ({ open, setOpen }) => {
  const classes = useStyles();
  const history = useHistory();

  function goTo(route: IAppRoute) {
    history.push(route.getPath ? route.getPath() : route.path);
    if (open) setOpen(!open);
  }

  return (
    <div>
      <div className={classes.toolbar} />
      {ADMIN_ROUTES.length && <Divider />}
      <List>
        {ADMIN_ROUTES.map((route, index) => (
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
