import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 40,
      paddingBottom: 40
    }
  })
);

const Values: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Container maxWidth={false}>
      <Typography variant="h2">{t("home.values.title")}</Typography>
      <article>
        <Typography variant="h3">
          {t("home.values.responsability.title")}
        </Typography>
        <Typography variant="h6">
          {t("home.values.responsability.body")}
        </Typography>
      </article>
      <article>
        <Typography variant="h3">
          {t("home.values.compromise.title")}
        </Typography>
        <Typography variant="h6">{t("home.values.compromise.body")}</Typography>
      </article>
      <article>
        <Typography variant="h3">{t("home.values.respect.title")}</Typography>
        <Typography variant="h6">{t("home.values.respect.body")}</Typography>
      </article>
    </Container>
  );
};

export default Values;
