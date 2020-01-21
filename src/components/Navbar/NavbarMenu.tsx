import React, {FunctionComponent} from "react";
import {
    createStyles,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme
} from "@material-ui/core";
import {useHistory} from "react-router-dom";

import {ChevronLeft, Dashboard} from "@material-ui/icons";
import {ACCOUNT_ROUTE, GOALS_ROUTE, IAppRoute} from "../../constants";
import clsx from "clsx";

const MenuItems: IAppRoute[] = [
    ACCOUNT_ROUTE,
    GOALS_ROUTE,
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 250,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        },
    }),
);

interface NavbarMenuProps {
    open: boolean;
    setOpen: Function;
}
const NavbarMenu: FunctionComponent<NavbarMenuProps> = ({open, setOpen}) => {
    const classes = useStyles();
    const history = useHistory();

    console.log('NavbarMenu', open);

    return (
        <Drawer
            variant="permanent"
            open={open}
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
        >
            <div>
                <IconButton onClick={() => setOpen(!open)}>
                    <ChevronLeft/>
                </IconButton>
            </div>
            <Divider/>
            <List>
                {MenuItems.map((item, i) => (
                    <ListItem
                        key={i}
                        button
                        onClick={() => history.push(item.path)}>
                        <ListItemIcon>
                            {item.icon ? (<item.icon/>) : <Dashboard/>}
                        </ListItemIcon>
                        <ListItemText primary={item.name}/>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default NavbarMenu;
