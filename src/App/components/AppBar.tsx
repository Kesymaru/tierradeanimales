import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { isEmpty, isLoaded } from "react-redux-firebase";

import { default as MaterialAppBar } from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Slide from "@material-ui/core/Slide";
import Link from "@material-ui/core/Link";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import useRoutes from "@/App/hooks";
import LanguageMenu from "./LanguageMenu";
import { AppState } from "../models";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subBar: {
      marginTop: 64,
      [theme.breakpoints.down("xs")]: {
        marginTop: 56,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    breadcrumbs: {
      flexGrow: 1,
      color: "rgba(255,255,255,0.7)",
    },
  })
);
interface AppBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  anchorId: string;
}

export const AppBar: FunctionComponent<AppBarProps> = (props) => {
  const classes = useStyles();
  const routes = useRoutes();
  const auth = useSelector<AppState, any>((state) => state.firebase.auth);
  const logged = isLoaded(auth) && !isEmpty(auth);

  return (
    <>
      <MaterialAppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="start"
            onClick={() => props.setOpen(!props.open)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {process.env.REACT_APP_NAME}
          </Typography>
          <LanguageMenu />
        </Toolbar>
      </MaterialAppBar>
      <div id={props.anchorId} />
      <Slide
        direction="down"
        in={logged && 1 < routes.length}
        mountOnEnter
        unmountOnExit
      >
        <MaterialAppBar
          color="primary"
          position="static"
          className={classes.subBar}
        >
          <Toolbar variant="dense">
            <Breadcrumbs
              aria-label="breadcrumb"
              maxItems={4}
              className={classes.breadcrumbs}
            >
              {routes.map((route, index) =>
                index === routes.length - 1 ? (
                  <Typography key={index} style={{ color: "#FFF" }}>
                    {route.name}
                  </Typography>
                ) : (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={route.path}
                    className={classes.breadcrumbs}
                  >
                    {route.name}
                  </Link>
                )
              )}
            </Breadcrumbs>
          </Toolbar>
        </MaterialAppBar>
      </Slide>
    </>
  );
};

export default AppBar;
