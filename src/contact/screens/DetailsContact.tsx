import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { Screen } from "@core/wrappers";
import { CollectionsConfig } from "@core/config";
import { useData } from "@core/hooks";

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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Name: {data.name}
          </Grid>
          <Grid item xs={12}>
            Email: {data.email}
          </Grid>
          <Grid item xs={12}>
            Phone: {data.phone}
          </Grid>
          <Grid item xs={12}>
            Message: {data.message}
          </Grid>
        </Grid>
      </Container>
    </Screen>
  );
};

export default DetailsContact;
