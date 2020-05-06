import React, { FunctionComponent, useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { Screen } from "@core/wrappers";
import { useData } from "@core/hooks";

import { Case, CaseResults } from "@app/case";

export const AdoptForm: FunctionComponent = () => {
  const { data, isLoaded, isEmpty } = useData<CaseResults>("case", []);

  return (
    <Screen t="adopt" isLoaded={isLoaded} isEmpty={isEmpty}>
      <Container style={{ marginTop: 100 }}>
        <Grid container spacing={2}>
          {data.map((item: Case) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    image={item.avatar?.preview}
                    title={item.name}
                    style={{ height: 150 }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name} - {item.age}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.description}
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
    </Screen>
  );
};

export default AdoptForm;
