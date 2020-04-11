import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
} from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { get, isEmpty } from "lodash";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import EmailIcon from "@material-ui/icons/Email";
import SendIcon from "@material-ui/icons/Send";

import AppState from "@core/models/store";
import { Alert, AlertProps } from "@core/components/Alert";
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
  const [alert, setAlert] = useState<AlertProps>({
    open: false,
    message: "",
    setOpen,
  });
  useFirestoreConnect({
    collection: NEWSLETTER_PATH,
    where: ["email", "==", newsletter.email],
    limit: 1,
  });
  const [error, setError] = useState<boolean>(false);
  const found = useSelector<AppState, Array<Newsletter> | null>((state) =>
    get(state, `firestore.data.${NEWSLETTER_PATH}`, [])
  );
  const title = get(props, "title", t("newsletter.title"));
  const subtitle = get(
    props,
    "subtitle",
    t(`newsletter.${props.mode}.subtitle`)
  );
  const translations = t(`newsletter.${props.mode}`, { returnObjects: true });

  useEffect(() => {
    console.log("use effect", !isEmpty(found));
    setError(!isEmpty(found));
  }, [found]);

  function setOpen(value: boolean) {
    setAlert({ ...alert, open: value });
  }

  async function handleSubscribe(event: MouseEvent<HTMLElement>) {
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

  async function handleUnsubscribe() {
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

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewsletter({
      ...newsletter,
      email: get(event, "target.value", ""),
    });
  }

  console.log("found", found);

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
              <Tooltip title={t("newsletter.subscribe.title")}>
                <IconButton disabled={!isEmpty(found)}>
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        value={newsletter.email}
        onChange={handleChange}
        helperText={
          !isEmpty(found) ? t(`newsletter.${props.mode}.invalid`) : undefined
        }
        error={!isEmpty(found)}
      />
      <Alert {...alert} />
    </>
  );
};

export default NewsletterSubscriber;
