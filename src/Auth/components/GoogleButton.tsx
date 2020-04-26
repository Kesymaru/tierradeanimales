import React, { FunctionComponent } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { default as MaterialButton } from "@material-ui/core/Button";

const COLORS = {
  WHITE: "#FFFFFF",
  BLUE: "#4285F4",
};
export const GoogleButton = withStyles({
  root: {
    textTransform: "none",
    color: COLORS.WHITE,
    backgroundColor: COLORS.BLUE,
    borderColor: COLORS.BLUE,
    "&:hover": {
      backgroundColor: COLORS.BLUE,
      boxShadow: "none",
    },
    "&:active": {
      backgroundColor: COLORS.BLUE,
      boxShadow: "none",
    },
  },
  label: {
    justifyContent: "flex-start",
  },
  startIcon: {
    marginRight: 35,
  },
})(MaterialButton);

export default GoogleButton;
