import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  MouseEvent,
} from "@/newsletter/components/node_modules/react";
import { useTranslation } from "@/newsletter/components/node_modules/react-i18next";
import { useFirestore } from "@/newsletter/components/node_modules/react-redux-firebase";
import get from "@/newsletter/components/node_modules/lodash/get";

import TextField from "@/newsletter/components/node_modules/@material-ui/core/TextField";
import InputAdornment from "@/newsletter/components/node_modules/@material-ui/core/InputAdornment";
import Tooltip from "@/newsletter/components/node_modules/@material-ui/core/Tooltip";
import {
  createStyles,
  makeStyles,
  Theme,
} from "@/newsletter/components/node_modules/@material-ui/core/styles";

import EmailIcon from "@/newsletter/components/node_modules/@material-ui/icons/Email";
import SendIcon from "@/newsletter/components/node_modules/@material-ui/icons/Send";

import { Newsletter, INIT_NEWSLETTER, NEWSLETTER_STORE } from "@/newsletter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      backgroundColor: "rgba(255,255,255,1)",
      marginTop: 20,
      marginBottom: 20,
    },
  })
);

export const NewsletterUnsubscriber: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const firestore = useFirestore();
  const [newsletter, setNewsletter] = useState<Newsletter>({
    ...INIT_NEWSLETTER,
    subscribed: false,
  });

  function handleNewsletter(event: MouseEvent<HTMLElement>) {
    return firestore.add(NEWSLETTER_STORE, newsletter);
  }

  function handleNewsletterChange(event: ChangeEvent<HTMLInputElement>) {
    setNewsletter({
      ...newsletter,
      email: get(event, "target.value", ""),
    });
  }

  return (
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
      value={newsletter.email}
      onChange={handleNewsletterChange}
    />
  );
};

export default NewsletterUnsubscriber;
