import React, { FunctionComponent } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { default as MaterialButton } from "@material-ui/core/Button";

const COLORS = {
  WHITE: "#FFFFFF",
  BLACK: "#000000",
};
export const AppleButton = withStyles({
  root: {
    textTransform: "none",
    color: COLORS.WHITE,
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.BLACK,
    "&:hover": {
      backgroundColor: COLORS.BLACK,
      boxShadow: "none",
      "& .MuiButton-endIcon": {
        display: "flex",
      },
    },
    "&:active": {
      backgroundColor: COLORS.BLACK,
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

export default AppleButton;
