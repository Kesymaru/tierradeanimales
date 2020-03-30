import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState
} from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SendIcon from "@material-ui/icons/Send";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import MessageIcon from "@material-ui/icons/Message";

import useValidation from "../../constants/validations";
import {
  IContact,
  IContactFactory,
  IContactSchema
} from "../../store/emails/emails.types";
import { SendContactEmail } from "../../store/emails/emails.actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      margin: "40px 0"
    }
  })
);

const Contact: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const distpatch = useDispatch();
  const { t } = useTranslation();
  const [data, setData] = useState<IContact>(IContactFactory());
  const { errors, setErrors, validate } = useValidation<IContact>(
    IContactSchema({
      name: t("contact.name"),
      email: t("contact.email"),
      phone: t("contact.phone"),
      message: t("contact.message")
    }),
    { abortEarly: true }
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const valid = validate(data);
    if (valid) {
      console.log("send contact email");
      distpatch(SendContactEmail(data));
    }
  }

  function handleReset() {
    setData(IContactFactory());
    setErrors(null);
  }

  function handleChange(field: keyof IContact) {
    return (event: ChangeEvent<HTMLInputElement>) =>
      setData({ ...data, [`${field}`]: event.target.value });
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
                )
              }}
              value={data.name}
              error={!!errors?.name}
              helperText={errors?.name}
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
                )
              }}
              value={data.phone}
              error={!!errors?.phone}
              helperText={errors?.phone}
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
                )
              }}
              value={data.email}
              error={!!errors?.email}
              helperText={errors?.email}
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
                )
              }}
              value={data.message}
              error={!!errors?.message}
              helperText={errors?.message}
              onChange={handleChange("message")}
            />
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                type="reset"
                fullWidth
                startIcon={<RotateLeftIcon />}
              >
                {t("app.reset")}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                startIcon={<SendIcon />}
              >
                {t("app.submit")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Contact;
