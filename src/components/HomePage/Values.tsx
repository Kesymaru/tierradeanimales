import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { red, blue, green } from "@material-ui/core/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";

import Carousel from "../Carousel/Carousel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 40,
      paddingBottom: 40,
      backgroundColor: "#FF6F6F"
      // backgroundColor: "#EDC45B",
      // backgroundColor: "rgba(237, 196, 91, 0.5)",
    },
    card: {
      width: "100%"
      // backgroundColor: blue[500]
    },
    avatar: {
      // backgroundColor: red[500]
    },
    text: {
      color: "#ffffff",
      [theme.breakpoints.up("md")]: {
        marginLeft: 88
      }
    }
  })
);

const Values: FunctionComponent<{}> = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const values = t("home.values", { returnObjects: true }) as any;

  return (
    <Container maxWidth={false} className={classes.container}>
      <Carousel
        maxWidth={"lg"}
        title={
          <Typography variant="h2" className={classes.text}>
            {t("home.values.title")}
          </Typography>
        }
      >
        {Object.keys(values)
          .filter(key => typeof values[key] === "object")
          .map(key => (
            <Card key={key} className={classes.card}>
              <CardHeader
                avatar={
                  isMobile ? null : (
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {values[key].avatar}
                    </Avatar>
                  )
                }
                title={
                  <Typography variant="h4">{values[key].title}</Typography>
                }
              />
              <CardContent>
                <Typography variant="h6">{values[key].body}</Typography>
              </CardContent>
            </Card>
          ))}
      </Carousel>
    </Container>
  );
};

export default Values;
