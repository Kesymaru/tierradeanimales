import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Zoom from "@material-ui/core/Zoom";
import Fade from "@material-ui/core/Fade";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

import PetsIcon from "@material-ui/icons/Pets";

import { Case, InitCase } from "@/Case";

const DogDetails: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  // TODO
  // use real data
  const loading = false;
  const case: Case = {...InitCase};

  if (loading)
    return (
      <Container>
        <Typography>Loading Dog details</Typography>
        <LinearProgress color="primary" />
      </Container>
    );
  
  return (<Container>
    Here goes the container details
  </Container>);

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

export default DogDetails;
