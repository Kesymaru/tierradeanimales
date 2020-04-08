import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import { AppState } from "@/App/models";
import { NavbarMenu } from "@/App/components";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
  })
);

export interface NavbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Navbar: FunctionComponent<NavbarProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const auth = useSelector<AppState, any>((state) => state.firebase.auth);
  const logged = isLoaded(auth) && !isEmpty(auth);

  return (
    <nav aria-label="menu navbar">
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
    </nav>
  );
};

export default Navbar;
