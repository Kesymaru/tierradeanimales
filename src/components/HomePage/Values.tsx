import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { red, blue, green } from "@material-ui/core/colors";

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
    },
    card: {
      maxWidth: 300
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
);

const Values: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const values = t("home.values", { returnObjects: true }) as any;

  return (
    <Container maxWidth={false} className={classes.container}>
      <Carousel maxWidth="md">
        {Object.keys(values)
          .filter(key => typeof values[key] === "object")
          .map(key => (
            <Card key={key} className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {values[key].avatar}
                  </Avatar>
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
