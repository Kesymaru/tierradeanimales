import React, {FunctionComponent} from "react";
import {Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {useHistory} from "react-router-dom";

import {ChevronLeft, Dashboard} from "@material-ui/icons";
import {ACCOUNT_ROUTE, GOALS_ROUTE, IAppRoute} from "../../constants";

const MenuItems: IAppRoute[] = [
    ACCOUNT_ROUTE,
    GOALS_ROUTE,
];

interface NavbarMenuProps {
    open: boolean;
    setOpen: Function;
}

const NavbarMenu: FunctionComponent<NavbarMenuProps> = ({open, setOpen}) => {
    const history = useHistory();

    return (
        <Drawer
            variant="permanent"
            open={open}
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
                        button
                        key={i}
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
