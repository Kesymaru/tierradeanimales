import React, {
  FunctionComponent,
  useState,
  FormEvent,
  ChangeEvent
} from "react";
import { useTranslation } from "react-i18next";
import Joi from "@hapi/joi";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import EmailIcon from "@material-ui/icons/Email";
import SendIcon from "@material-ui/icons/Send";

import useValidation from "../../constants/validations";
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
        backgroundAttachment: "fixed"
      }
    },
    article: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    textField: {
      backgroundColor: "rgba(255,255,255,1)",
      marginTop: 20,
      marginBottom: 20
    }
  })
);

const About: FunctionComponent<{}> = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const { errors, setErrors, validate } = useValidation<string>(
    Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email")
    })
  );

  function handleSubmit(event: FormEvent) {
    event.stopPropagation();
    console.log("news letter", email);
    const valid = validate(email);
    // TODO implement the news letter
    setErrors(null);
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  return (
    <Container maxWidth={false} className={classes.container}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1">{t("home.followUs")}</Typography>
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
                  <InputAdornment position="end">
                    <Tooltip title={"Subscribe"}>
                      <SendIcon />
                    </Tooltip>
                  </InputAdornment>
                )
              }}
              value={email}
              error={!!errors?.email}
              helperText={errors?.email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3">{t("home.info")}</Typography>
            <Typography variant="body2">Direccion:</Typography>
            <Typography variant="body2">Email: </Typography>
            <Typography variant="body2">Telefono:</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3">{t('home.socialNetworks')}</Typography>
            <Social />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default About;
