import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 40,
      paddingBottom: 40,
      background: "url(./images/dog3.jpg) no-repeat center",
      backgroundSize: "cover",
      [theme.breakpoints.up("md")]: {
        height: "calc(100vh - 42px)",
        backgroundAttachment: "fixed"
      },
      color: "white"
    }
  })
);

const Donate: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const accounts = t("donate.accounts", { returnObjects: true }) as any;

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">{t("donate.title")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">{t("donate.name")}</Typography>
          <Typography variant="h4">{t("donate.id")}</Typography>
        </Grid>
        {accounts.map((account: any, i: number) => (
          <Grid item xs={12} md={4}>
            <Typography variant="h5">{account.name}</Typography>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography variant="h6">{t("donate.colons")}</Typography>
              </Grid>
              <Grid item xs={3}>
                {t("donate.account")}
              </Grid>
              <Grid item xs={9}>
                {account.colon.account}
              </Grid>
              <Grid item xs={3}>
                Sinpe
              </Grid>
              <Grid item xs={9}>
                {account.colon.sinpe}
              </Grid>
              <Grid item xs={3}>
                IBAN
              </Grid>
              <Grid item xs={9}>
                {account.colon.iban}
              </Grid>
              {account?.dolar ? (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h6">{t("donate.dolars")}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    {t("donate.account")}
                  </Grid>
                  <Grid item xs={9}>
                    {account.dolar.account}
                  </Grid>
                  <Grid item xs={3}>
                    Sinpe
                  </Grid>
                  <Grid item xs={9}>
                    {account.dolar.sinpe}
                  </Grid>
                  <Grid item xs={3}>
                    IBAN
                  </Grid>
                  <Grid item xs={9}>
                    {account.dolar.iban}
                  </Grid>
                </>
              ) : null}
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="body1">{t("donate.body")}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Donate;
