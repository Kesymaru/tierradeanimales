import React, { FunctionComponent } from "react";

import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import {
  About,
  Values,
  Mission,
  Donate,
  ContactUs,
  FollowUs,
} from "@/Home/components";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: 50,
      /* [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      }, */
    },
  })
);

const HomePage: FunctionComponent<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <About />
      <Values />
      <Mission />
      <Donate />
      <ContactUs />
      <FollowUs />
    </div>
  );
};

export default HomePage;
