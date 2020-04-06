import React, { FunctionComponent } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

interface SocialProps {
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export const Social: FunctionComponent<SocialProps> = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Button variant="contained" size="medium" startIcon={<FacebookIcon />}>
          Facebook
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button variant="contained" size="medium" startIcon={<TwitterIcon />}>
          Twitter
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button variant="contained" size="medium" startIcon={<InstagramIcon />}>
          Instagram
        </Button>
      </Grid>
    </Grid>
  );
};

export default Social;
