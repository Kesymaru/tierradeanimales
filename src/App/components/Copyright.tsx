import React, { FunctionComponent } from "react";
import get from "lodash/get";

import { Typography, Link } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ENODEV } from "constants";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    copyRight: {
      margin: "20px 0",
      /* [theme.breakpoints.up("md")]: {
        marginLeft: drawerWidth,
      }, */
      [".white"]: {
        color: "white",
      },
    },
  })
);

export interface CopyrightProps {
  color?: "white" | "black";
}

export const Copyright: FunctionComponent<CopyrightProps> = (props) => {
  const classes = useStyles();
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      className={classes.copyRight}
    >
      {"Copyright © "}
      <Link color="inherit" href={get(process, "env.REACT_APP_DOMAIN", "")}>
        {get(process, "env.REACT_APP_NAME", "App Name")}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
