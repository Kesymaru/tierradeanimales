import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  MouseEvent,
} from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  useFirestore,
  useFirestoreConnect,
  isLoaded,
  isEmpty,
} from "react-redux-firebase";
import get from "lodash/get";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import EmailIcon from "@material-ui/icons/Email";
import SendIcon from "@material-ui/icons/Send";

import AppState from "@core/models/store";
import { Alert, AlertProps } from "@core/components/AppAlert";
import { Newsletter } from "../models";
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

export interface NewsletterProps {
  title?: string;
  subtitle?: string;
  mode: "subscribe" | "unsubscribe";
}

export const NewsletterSubscriber: FunctionComponent<NewsletterProps> = (
  props
) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const firestore = useFirestore();
  const [newsletter, setNewsletter] = useState<Newsletter>(INIT_NEWSLETTER);
  const [alert, setAlert] = useState<AlertProps>({ message: "" });
  useFirestoreConnect({
    collection: NEWSLETTER_PATH,
    where: ["email", "==", newsletter.email],
    limit: 1,
  });
  const found = useSelector<AppState, Array<Newsletter>>((state) =>
    get(state, `firestore.data.${NEWSLETTER_PATH}`, [])
  );
  const error = getError();
  const title = get(props, "title", t("newsletter.title"));
  const subtitle = get(
    props,
    "subtitle",
    t(`newsletter.${props.mode}.subtitle`)
  );
  const translations = t(`newsletter.${props.mode}`, { returnObjects: true });

  function getError(): boolean {
    if (!isLoaded(found) || newsletter.email.length < 3) return false;
    return props.mode === "subscribe" ? !isEmpty(found) : isEmpty(found);
  }

  async function handleSubscribe(event: MouseEvent<HTMLElement>) {
    try {
      await firestore.add(NEWSLETTER_PATH, newsletter);
      setAlert({ color: "success", message: t("newsletter.success") });
      setNewsletter(INIT_NEWSLETTER);
    } catch (err) {
      setAlert({ color: "error", message: t("newsletter.error") });
    }
  }

  async function handleUnsubscribe() {
    try {
      await firestore.delete({
        collection: NEWSLETTER_PATH,
        doc: Object.keys(found)[0],
      });
      setAlert({
        color: "success",
        message: t(`newsletter.${props.mode}.success`),
      });
      setNewsletter(INIT_NEWSLETTER);
    } catch (err) {
      setAlert({
        color: "error",
        message: t(`newsletter.${props.mode}.error`),
      });
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewsletter({
      ...newsletter,
      email: get(event, "target.value", ""),
    });
  }

  return (
    <>
      {title && <Typography variant="h3">{title}</Typography>}
      {subtitle && <Typography variant="body1">{subtitle}</Typography>}
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
            <InputAdornment
              position="end"
              onClick={
                props.mode === "subscribe" ? handleSubscribe : handleUnsubscribe
              }
            >
              <Tooltip title={t(`newsletter.${props.mode}.title`)}>
                <IconButton disabled={error}>
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        value={newsletter.email}
        onChange={handleChange}
        helperText={error ? t(`newsletter.${props.mode}.invalid`) : undefined}
        error={error}
      />
      <Alert {...alert} />
    </>
  );
};

export default NewsletterSubscriber;
