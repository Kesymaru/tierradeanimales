import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import NewsletterSubscriber from "@/Newsletter";
import Social from "./Social";
import { Copyright } from "@/App/components";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 40,
      paddingBottom: 40,
      background: "url(./images/dog4.jpg) no-repeat center",
      backgroundSize: "cover",
      [theme.breakpoints.up("md")]: {
        backgroundAttachment: "fixed",
      },
    },
    article: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  })
);

export const FollowUs: FunctionComponent<{}> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const contact = t("followUs.contact", { returnObjects: true }) as any;

  return (
    <Container maxWidth={false} className={classes.container}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">{t("followUs.title")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <NewsletterSubscriber />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3">{t("followUs.info")}</Typography>
            <Typography variant="body2">{t("followUs.name")}</Typography>
            <Typography variant="body2">{t("followUs.id")}</Typography>
            <Grid container spacing={0}>
              {contact.map((info: any, i: number) => (
                <>
                  <Grid item xs={12} sm={3}>
                    {info.title}
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    {info.data}
                  </Grid>
                </>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3">{t("followUs.socialNetworks")}</Typography>
            <Social />
          </Grid>
        </Grid>
      </Container>
      <Copyright />
    </Container>
  );
};

export default FollowUs;
