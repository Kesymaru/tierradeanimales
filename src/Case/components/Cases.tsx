import React, {
  FunctionComponent,
  useEffect,
  useState,
} from "@/case/components/node_modules/react";
import {
  connect,
  useDispatch,
} from "@/case/components/node_modules/react-redux";
import { useHistory } from "@/case/components/node_modules/react-router-dom";

import { Container } from "@/case/components/node_modules/@material-ui/core";
import Card from "@/case/components/node_modules/@material-ui/core/Card";
import CardActionArea from "@/case/components/node_modules/@material-ui/core/CardActionArea";
import CardActions from "@/case/components/node_modules/@material-ui/core/CardActions";
import CardContent from "@/case/components/node_modules/@material-ui/core/CardContent";
import CardMedia from "@/case/components/node_modules/@material-ui/core/CardMedia";
import Button from "@/case/components/node_modules/@material-ui/core/Button";
import Typography from "@/case/components/node_modules/@material-ui/core/Typography";
import Grid from "@/case/components/node_modules/@material-ui/core/Grid";
import LinearProgress from "@/case/components/node_modules/@material-ui/core/LinearProgress";

import { DOG_DETAILS_ROUTE } from "@/case/routes";

export const Cases: FunctionComponent<{}> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return <Container>Here goes the Cases component</Container>;

  /* return (
    <Container>
      <Grid container spacing={2}>
        {dogs.map((dog) => (
          <Grid item xs={6} md={4} lg={3}>
            <Card
              key={dog.id}
              onClick={() => history.push(DOG_DETAILS_ROUTE.getPath(dog))}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={dog.name}
                  height="150"
                  image={dog.avatar ? dog.avatar.src : "logo192.png"}
                  title={dog.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {dog.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {dog.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  ); */
};

export default Cases;
