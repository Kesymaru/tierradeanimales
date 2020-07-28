import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EmailIcon from "@material-ui/icons/Email";
import MessageIcon from "@material-ui/icons/Message";
import PhoneIcon from "@material-ui/icons/Phone";

import { Screen } from "@wrappers";
import { CollectionsConfig } from "@config";
import { useData } from "@hooks";

import { Contact } from "../models";
import { INIT_CONTACT } from "../constants";

export const DetailsContact: FunctionComponent<{}> = (props) => {
  const { t } = useTranslation();
  const { data, isLoaded, isEmpty } = useData<Contact>(
    CollectionsConfig.contact,
    INIT_CONTACT
  );

  return (
    <Screen t="contact" isLoaded={isLoaded} isEmpty={isEmpty}>
      <Container>
        <Paper variant="outlined">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AccountBoxIcon /> Name: {data.name}
            </Grid>
            <Grid item xs={12}>
              <EmailIcon /> Email:{" "}
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </Grid>
            <Grid item xs={12}>
              <MessageIcon /> Phone: {data.phone}
            </Grid>
            <Grid item xs={12}>
              <PhoneIcon /> Message: {data.message}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Screen>
  );
};

export default DetailsContact;
