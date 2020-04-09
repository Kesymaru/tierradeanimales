import React, { FunctionComponent } from "@/case/components/node_modules/react";
import { useDispatch } from "@/case/components/node_modules/react-redux";
import { useParams } from "@/case/components/node_modules/react-router-dom";

import Zoom from "@/case/components/node_modules/@material-ui/core/Zoom";
import Fade from "@/case/components/node_modules/@material-ui/core/Fade";
import Container from "@/case/components/node_modules/@material-ui/core/Container";
import Avatar from "@/case/components/node_modules/@material-ui/core/Avatar";
import Grid from "@/case/components/node_modules/@material-ui/core/Grid";
import Typography from "@/case/components/node_modules/@material-ui/core/Typography";
import LinearProgress from "@/case/components/node_modules/@material-ui/core/LinearProgress";
import Button from "@/case/components/node_modules/@material-ui/core/Button";
import Hidden from "@/case/components/node_modules/@material-ui/core/Hidden";

import PetsIcon from "@/case/components/node_modules/@material-ui/icons/Pets";

import { Case, InitCase } from "@/case";

export const CaseDetails: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // TODO
  // use real data
  const loading = false;

  if (loading)
    return (
      <Container>
        <Typography>Loading Dog details</Typography>
        <LinearProgress color="primary" />
      </Container>
    );

  return <Container>Here goes the container details</Container>;

  /* return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Zoom in={true} style={{ transitionDelay: "250ms" }}>
            <Avatar
              alt="Dog Profile Image"
              src={case && case.avatar ? case.avatar.src : undefined}
              style={{
                height: 100,
                width: 100,
                margin: "0 auto",
              }}
            />
          </Zoom>
        </Grid>
        <Grid item xs={12}>
          <Fade in={true}>
            <Typography
              component="h1"
              variant="h5"
              style={{ textAlign: "center" }}
            >
              {case ? case.name : ""}
            </Typography>
          </Fade>
        </Grid>
        <Grid item xs={12}>
          dogs images gallery goes here
        </Grid>

        <Hidden smDown>
          <Grid item md={4} lg={3}></Grid>
        </Hidden>
        <Zoom in={!loading}>
          <Grid item xs={12} md={4} lg={3} hidden={loading}>
            <Button
              variant="contained"
              type="reset"
              color="primary"
              style={{ width: "100%" }}
              startIcon={<PetsIcon />}
            >
              Adopt
            </Button>
          </Grid>
        </Zoom>
        <Hidden smDown>
          <Grid item md={4} lg={3}></Grid>
        </Hidden>
      </Grid>
    </Container>
  ); */
};

export default CaseDetails;
