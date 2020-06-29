import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Screen } from "@core/wrappers";

export const UserProfile: FunctionComponent<{}> = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <Screen t="profile">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Typography variant="h2">Name</Typography>
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
