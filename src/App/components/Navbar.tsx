import React, { FunctionComponent } from "react";

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import NavbarMenu from "./NavbarMenu";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
  })
);

interface NavbarProps {
  open: boolean;
  setOpen: Function;
}

const Navbar: FunctionComponent<NavbarProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  // TODO
  // use real data
  const logged = false;

  if (!logged) return <div></div>;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.open}
          onClose={() => props.setOpen(!props.open)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <NavbarMenu open={props.open} setOpen={props.setOpen} />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="js">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <NavbarMenu open={props.open} setOpen={props.setOpen} />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Navbar;
