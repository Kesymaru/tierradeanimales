import React, { useState, useEffect, FunctionComponent } from "react";

import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

import InfoIcon from "@material-ui/icons/Info";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    margin: "30px 0",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  content: {
    flex: "1 0 auto",
  },
}));

export interface AppInfoProps {
  title: string;
  message?: string;
  color?: "success" | "info" | "warning" | "error";
}

export const AppInfo: FunctionComponent<AppInfoProps> = (props) => {
  const classes = useStyles();
  const color = props.color || "info";
  const iconStyle = { height: 75, width: 75 };
  let icon = <InfoIcon color="inherit" style={iconStyle} />;
  if (color === "success")
    icon = <CheckCircleIcon color="secondary" style={iconStyle} />;
  if (color === "warning")
    icon = <WarningIcon color="secondary" style={iconStyle} />;
  if (color === "error") icon = <ErrorIcon color="action" style={iconStyle} />;

  return (
    <Slide in={true} direction="down">
      <Container style={{ padding: "20px 10" }}>
        <Card variant="elevation" raised={true} className={classes.card}>
          <Box
            display="flex"
            flexDirection="column"
            alignSelf="center"
            style={{ padding: "16px" }}
          >
            {icon}
          </Box>
          <Box display="flex" flexDirection="column" flex="1 0 auto">
            <CardContent>
              <Typography component="h5" variant="h5">
                {props.title}
              </Typography>
              {props.message && (
                <Typography variant="subtitle1" color="textSecondary">
                  {props.message}
                </Typography>
              )}
              {props.children && (
                <CardActions style={{ paddingLeft: 0 }}>
                  {props.children}
                </CardActions>
              )}
            </CardContent>
          </Box>
        </Card>
      </Container>
    </Slide>
  );
};

export default AppInfo;
