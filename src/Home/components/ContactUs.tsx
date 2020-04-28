import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";

import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SendIcon from "@material-ui/icons/Send";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import MessageIcon from "@material-ui/icons/Message";

import { AddAlert } from "@core/actions/alert";
import Contact from "../models";

export const ContactUs: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const { t } = useTranslation();
  const { register, handleSubmit, errors, reset } = useForm<Contact>();

  async function onSubmit(data: Contact) {
    try {
      await firestore.add("contact", data);
      dispatch(
        AddAlert({
          color: "success",
          message: t("contact.success.add.message"),
        })
      );
    } catch (err) {
      dispatch(
        AddAlert({
          color: "error",
          message: t("contact.errors.add.message"),
        })
      );
    }
  }

  return (
    <Container maxWidth="md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()}
        style={{ margin: "40px 0" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">{t("contact.title")}</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              label={t("contact.name")}
              type="text"
              name="name"
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
              inputRef={register({
                required: true,
              })}
              error={!!errors.name}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              label={t("contact.phone")}
              type="phone"
              name="phone"
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
              inputRef={register({
                required: true,
              })}
              error={!!errors.phone}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <TextField
              label={t("contact.email")}
              type="email"
              name="email"
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
              inputRef={register({
                required: true,
              })}
              error={!!errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t("contact.message")}
              type="text"
              name="message"
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
              inputRef={register({
                required: true,
                minLength: 3,
              })}
              error={!!errors.message}
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
    </Container>
  );
};

export default ContactUs;
