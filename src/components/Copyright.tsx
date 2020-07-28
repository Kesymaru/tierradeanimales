import React, { FunctionComponent } from "react";
import get from "lodash/get";

import { Typography, Link } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Route from "@models/route";
import ROUTES from "@routes";
import useRoute from "@hooks/useRoute";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    copyRight: {
      margin: "20px 0",
    },
  })
);

export interface CopyrightProps {
  hideRoutes?: Array<Route>;
}

export const Copyright: FunctionComponent<CopyrightProps> = (props) => {
  const classes = useStyles();
  const route = useRoute(ROUTES);

  if (Array.isArray(props.hideRoutes)) {
    const found = props.hideRoutes.find((r) => r === route);
    if (found) return <></>;
  }
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
