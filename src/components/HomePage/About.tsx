import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 40,
      paddingBottom: 40,
      background: "url(./images/dog1.jpg) no-repeat center",
      backgroundSize: "cover",
      [theme.breakpoints.up("md")]: {
        height: "calc(100vh - 42px)",
        backgroundAttachment: "fixed"
      }
    },
    containerText: {
        marginLeft: 0,
    },
    text: {
        color: 'white'
    }
  })
);

const About: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Container maxWidth={false} className={classes.container}>
      <Container maxWidth="md" className={classes.containerText}>
        <Typography variant="h2" className={classes.text}>
          {t("home.about.title")}
        </Typography>
        <Typography variant="h5" paragraph={true} className={classes.text}>
          {t("home.about.body1")}
        </Typography>
        <Typography variant="h4" component="q" paragraph={true} className={classes.text}>
          {t("home.about.body2")}
        </Typography>
      </Container>
    </Container>
  );
};

export default About;
