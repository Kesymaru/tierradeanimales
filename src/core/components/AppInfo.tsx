import React, {
  useState,
  useEffect,
  FunctionComponent,
  ReactElement,
} from "react";
import delay from "lodash/delay";

import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import Route from "../models/route";

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
  show: boolean;
  title: string;
  message: string;
  actions?: ReactElement;
}

export const AppInfo: FunctionComponent<AppInfoProps> = (props) => {
  const classes = useStyles();
  const [show, setShow] = useState<boolean>(props.show);
  useEffect(() => {
    console.log("effect", props.show);
    delay(() => setShow(props.show), 500);
  }, [props.show]);

  if (props.show)
    return (
      <Slide in={props.show} direction="down">
        <Container style={{ padding: "20px 10" }}>
          <Card variant="elevation" raised={true} className={classes.card}>
            <Box display="flex" flexDirection="column" alignSelf="center">
              <ErrorOutlineIcon style={{ height: 85, width: 85 }} />
            </Box>
            <Box display="flex" flexDirection="column" flex="1 0 auto">
              <CardContent>
                <Typography component="h5" variant="h5">
                  {props.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {props.message}
                </Typography>
              </CardContent>
              {props.children ? (
                <CardActions>{props.children}</CardActions>
              ) : null}
            </Box>
          </Card>
        </Container>
      </Slide>
    );
  return <></>;
};

export default AppInfo;
