import React, { FunctionComponent } from "react";
import {
  useFirebase,
  Credentials,
  CreateUserCredentials,
} from "react-redux-firebase";

import Grid from "@material-ui/core/Grid";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Divider from "@material-ui/core/Divider";
import FacebookIcon from "@material-ui/icons/Facebook";
import AppleIcon from "@material-ui/icons/Apple";

import GoogleButton from "./GoogleButton";
import GoogleIcon from "./GoogleIcon";
import FacebookButton from "./FacebookButton";
import AppleButton from "./AppleButton";

const google: Credentials = {
  provider: "google",
  type: "popup",
};
const facebook: Credentials = {
  provider: "facebook",
  type: "popup",
};
const apple = {
  provider: "apple",
  type: "popup",
};

export interface AuthProvidersProps {
  with: string;
}

export const AuthProviders: FunctionComponent<AuthProvidersProps> = (props) => {
  const firebase = useFirebase();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  if (isMobile) {
    facebook.type = google.type = "redirect";
  } else {
    facebook.type = google.type = "popup";
  }

  function signIn(credentials: Credentials) {
    firebase.login(credentials);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <GoogleButton
          variant="outlined"
          size="large"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={() => signIn(google)}
        >
          <Divider orientation="vertical" flexItem />
          {props.with} Google
        </GoogleButton>
      </Grid>
      <Grid item xs={12}>
        <FacebookButton
          variant="outlined"
          size="large"
          fullWidth
          startIcon={<FacebookIcon />}
          onClick={() => signIn(facebook)}
        >
          <Divider orientation="vertical" flexItem />
          {props.with} Facebook
        </FacebookButton>
      </Grid>
      {/* <Grid item xs={12}>
              <AppleButton
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<AppleIcon />}
                onClick={() => signIn(facebook)}
              >
                <Divider orientation="vertical" flexItem />
                {props.with} Apple
              </AppleButton>
            </Grid> */}
    </Grid>
  );
};
