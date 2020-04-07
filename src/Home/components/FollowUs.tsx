import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  MouseEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { useFirestore } from "react-redux-firebase";
import { get } from "lodash";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import EmailIcon from "@material-ui/icons/Email";
import SendIcon from "@material-ui/icons/Send";

import { Newsletter, InitNewsletter } from "@/Home";
import Social from "./Social";

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
    textField: {
      backgroundColor: "rgba(255,255,255,1)",
      marginTop: 20,
      marginBottom: 20,
    },
  })
);

export const FollowUs: FunctionComponent<{}> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const firestore = useFirestore();

  const [newsletter, setNewsletter] = useState<Newsletter>(InitNewsletter);
  const contact = t("followUs.contact", { returnObjects: true }) as any;

  function handleNewsletter(event: MouseEvent<HTMLElement>) {
    console.log("newsletter", newsletter);
    return firestore.add("newsletter", newsletter);
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setNewsletter({
      ...newsletter,
      email: get(event, "target.value", ""),
    });
  }

  return (
    <Container maxWidth={false} className={classes.container}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">{t("followUs.title")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t("home.newsletter")}
              placeholder={t("home.newsletter")}
              className={classes.textField}
              variant="filled"
              size="medium"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" onClick={handleNewsletter}>
                    <Tooltip title={"Subscribe"}>
                      <SendIcon />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              value={newsletter}
              onChange={handleEmailChange}
            />
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
    </Container>
  );
};

export default FollowUs;
