import React, { FunctionComponent } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { default as MaterialButton } from "@material-ui/core/Button";

const COLORS = {
  WHITE: "#FFFFFF",
  BLUE: "#4267B2",
};
export const FacebookButton = withStyles({
  root: {
    textTransform: "none",
    color: COLORS.WHITE,
    backgroundColor: COLORS.BLUE,
    borderColor: COLORS.BLUE,
    "&:hover": {
      backgroundColor: COLORS.BLUE,
      boxShadow: "none",
      "& .MuiButton-endIcon": {
        display: "flex",
      },
    },
    "&:active": {
      backgroundColor: COLORS.BLUE,
      boxShadow: "none",
      "& .MuiButton-endIcon": {
        display: "flex",
      },
    },
    "& .MuiDivider-root": {
      marginRight: 16,
      backgroundColor: COLORS.WHITE,
    },
  },
  label: {
    justifyContent: "flex-start",
  },
  startIcon: {
    marginRight: 16,
  },
})(MaterialButton);

export default FacebookButton;
