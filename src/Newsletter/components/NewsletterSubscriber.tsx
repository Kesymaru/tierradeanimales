import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  MouseEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { useFirestore } from "react-redux-firebase";
import get from "lodash/get";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import EmailIcon from "@material-ui/icons/Email";
import SendIcon from "@material-ui/icons/Send";

import { Newsletter } from "../models";
import { Alert, AlertProps } from "@core/components/Alert";
import { INIT_NEWSLETTER, NEWSLETTER_PATH } from "../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      backgroundColor: "white",
      marginTop: 20,
      marginBottom: 20,
    },
  })
);

export const NewsletterSubscriber: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const firestore = useFirestore();
  const [newsletter, setNewsletter] = useState<Newsletter>(INIT_NEWSLETTER);
  const [alert, setAlert] = useState<AlertProps>({
    open: false,
    message: "",
    setOpen,
  });

  function setOpen(value: boolean) {
    setAlert({ ...alert, open: value });
  }

  async function handleNewsletter(event: MouseEvent<HTMLElement>) {
    try {
      await firestore.add(NEWSLETTER_PATH, newsletter);
      setAlert({
        ...alert,
        open: true,
        message: t("newsletter.success"),
      });
      setNewsletter(INIT_NEWSLETTER);
    } catch (err) {
      setAlert({ ...alert, open: true, message: t("newsletter.error") });
    }
  }

  function handleNewsletterChange(event: ChangeEvent<HTMLInputElement>) {
    setNewsletter({
      ...newsletter,
      email: get(event, "target.value", ""),
    });
  }

  return (
    <>
      <Typography variant="h3">{t("newsletter.title")}</Typography>
      <TextField
        label={t("newsletter.email")}
        placeholder={t("newsletter.email")}
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
              <Tooltip title={t("newsletter.subscribe")}>
                <SendIcon />
              </Tooltip>
            </InputAdornment>
          ),
        }}
        value={newsletter.email}
        onChange={handleNewsletterChange}
      />
      <Alert {...alert} />
    </>
  );
};

export default NewsletterSubscriber;
