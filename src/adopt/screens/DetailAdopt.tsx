import React, { FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import PetsIcon from "@material-ui/icons/Pets";
import Zoom from "@material-ui/core/Zoom";
import Slide from "@material-ui/core/Slide";

import { useData } from "@core/hooks";
import { CollectionsConfig } from "@core/config";
import { Screen } from "@core/wrappers";

import { Case, INIT_CASE } from "@app/case";

export const DetailAdopt: FunctionComponent<{}> = () => {
  const history = useHistory();
  const [adopt, setAdopt] = useState<boolean>(false);
  const { data, isLoaded, isEmpty } = useData<Case>(
    CollectionsConfig.case,
    INIT_CASE
  );

  console.log("data", data);

  return (
    <Screen t="adopt" isLoaded={isLoaded} isEmpty={isEmpty}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Zoom in={isLoaded} style={{ transitionDelay: "250ms" }}>
              <Avatar
                alt="Dog Profile Image"
                src={data.avatar ? data.avatar.preview : undefined}
                style={{
                  height: 100,
                  width: 100,
                  margin: "0 auto",
                }}
              />
            </Zoom>
            <Zoom in={isLoaded}>
              <Typography variant="h2" align="center">
                {data.name}
              </Typography>
            </Zoom>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{data.description}</Typography>
          </Grid>

          <Grid container>
            <Slide in={adopt} direction="down">
              <Grid item xs={12}>
                Adopt form goes here
              </Grid>
            </Slide>
          </Grid>

          <Grid container xs={12}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Tooltip title="Adopt">
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<PetsIcon />}
                  onClick={() => setAdopt(!adopt)}
                >
                  Adopt
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={4}>
              <Tooltip title="Share">
                <Button color="default" variant="contained">
                  Share
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Screen>
  );
};

export default DetailAdopt;
