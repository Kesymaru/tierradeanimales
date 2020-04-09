import React, { FunctionComponent } from "@/core/components/node_modules/react";
import { useHistory } from "@/core/components/node_modules/react-router-dom";
import {
  createStyles,
  makeStyles,
  Theme,
} from "@/core/components/node_modules/@material-ui/core/styles";
import Divider from "@/core/components/node_modules/@material-ui/core/Divider";
import List from "@/core/components/node_modules/@material-ui/core/List";
import ListItem from "@/core/components/node_modules/@material-ui/core/ListItem";
import ListItemIcon from "@/core/components/node_modules/@material-ui/core/ListItemIcon";
import ListItemText from "@/core/components/node_modules/@material-ui/core/ListItemText";
import InboxIcon from "@/core/components/node_modules/@material-ui/icons/MoveToInbox";

import Route from "@/core/components/node_modules/@core/models/route";
import { ACCOUNT_ROUTE } from "@/user/routes";
import { ADMIN_CASE_ROUTE } from "@/case/routes";
import { FOSTER_HOMES_ROUTE } from "@/foster-home/routes";
import { UserMenu } from "@/user/components";

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
