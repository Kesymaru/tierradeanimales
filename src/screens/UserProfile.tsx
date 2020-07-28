import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { AppState } from "@models";
import { Screen } from "@wrappers";
import { useAuth } from "@hooks";

export const UserProfile: FunctionComponent<{}> = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { auth } = useAuth();

  return (
    <Screen t="profile" isLoaded={true} isEmpty={false}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Typography variant="h2">{auth.displayName}}</Typography>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4">Favorite dogs:</Typography>
            </Grid>
            <Grid item xs={12}>
              Here goes the fav dogs
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Screen>
  );
};

export default UserProfile;
