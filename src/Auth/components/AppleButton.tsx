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
    },
    "&:active": {
      backgroundColor: COLORS.BLACK,
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

export default AppleButton;
