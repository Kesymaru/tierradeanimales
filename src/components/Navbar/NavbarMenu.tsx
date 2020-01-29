import React, {FunctionComponent} from "react";
import {
    createStyles,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {ChevronLeft, Dashboard} from "@material-ui/icons";

import {ACCOUNT_ROUTE, CHAT_LIST_ROUTE, GOALS_ROUTE, IAppRoute, VERSUS_ADMIN} from "../../constants";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const ADMIN_ROUTES: IAppRoute[] = [
    ACCOUNT_ROUTE,
    GOALS_ROUTE,
    CHAT_LIST_ROUTE,
    VERSUS_ADMIN,
];

const PUBLIC_ROUTES: IAppRoute[] = [];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,
    }),
);

interface NavbarMenuProps {
    open: boolean;
    setOpen: Function;
}

const NavbarMenu: FunctionComponent<NavbarMenuProps> = ({open, setOpen}) => {
    const classes = useStyles();
    const history = useHistory();

    function goTo(route: IAppRoute) {
        history.push(route.getPath ? route.getPath() : route.path);
        if(open) setOpen(!open);
    }

    return <div>
        <div className={classes.toolbar}/>
        {ADMIN_ROUTES.length && <Divider/>}
        <List>
            {ADMIN_ROUTES.map((route, index) =>
                <ListItem button key={index} onClick={() => goTo(route)}>
                    <ListItemIcon>
                        {route.icon ? <route.icon/> : <InboxIcon/>}
                    </ListItemIcon>
                    <ListItemText primary={route.name}/>
                </ListItem>)}
        </List>
        {/*<Divider/>
        <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>
            ))}
        </List>*/}
    </div>;
};

export default NavbarMenu;
