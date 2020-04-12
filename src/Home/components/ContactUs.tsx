import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import { useFirestore } from "react-redux-firebase";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SendIcon from "@material-ui/icons/Send";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import MessageIcon from "@material-ui/icons/Message";

import { AppAlert, AppAlertProps } from "@core/components/AppAlert";
import Contact from "../models";
import INIT_CONTACT from "../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      margin: "40px 0",
    },
  })
);

export const ContactUs: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const firestore = useFirestore();
  const { t } = useTranslation();
  const [contact, setContact] = useState<Contact>(INIT_CONTACT);
  const [alert, setAlert] = useState<AppAlertProps>({ message: "" });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await firestore.add("contact", contact);
      setAlert({
        color: "success",
        message: t("contact.success"),
      });
    } catch (err) {
      setAlert({
        color: "error",
        message: t("contact.error"),
      });
    }
  }

  function handleReset() {
    setContact(INIT_CONTACT);
  }

  function handleChange(field: keyof Contact) {
    return (event: ChangeEvent<HTMLInputElement>) =>
      setContact({ ...contact, [`${field}`]: event.target.value });
  }

  return (
    <Container maxWidth="md">
      <form
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">{t("contact.title")}</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              label={t("contact.name")}
              placeholder={t("contact.name")}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              value={contact.name}
              onChange={handleChange("name")}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              label={t("contact.phone")}
              placeholder={t("contact.phone")}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
              value={contact.phone}
              onChange={handleChange("phone")}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <TextField
              label={t("contact.email")}
              placeholder={t("contact.email")}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              value={contact.email}
              onChange={handleChange("email")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t("contact.message")}
              placeholder={t("contact.message")}
              variant="outlined"
              fullWidth
              multiline
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MessageIcon />
                  </InputAdornment>
                ),
              }}
              value={contact.message}
              onChange={handleChange("message")}
            />
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={6}>
              <Tooltip title={t("app.reset")}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="reset"
                  fullWidth
                  startIcon={<RotateLeftIcon />}
                >
                  {t("app.reset")}
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Tooltip title={t("app.submit")}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  startIcon={<SendIcon />}
                >
                  {t("app.submit")}
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <AppAlert {...alert} />
    </Container>
  );
};

export default ContactUs;
