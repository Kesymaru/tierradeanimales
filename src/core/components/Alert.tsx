import React, { useState, FunctionComponent, SyntheticEvent } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps as MuiAlertProps } from "@material-ui/lab/Alert";

export interface AlertProps extends Pick<MuiAlertProps, "severity"> {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
}

export const Alert: FunctionComponent<AlertProps> = (props) => {
  function handleClose(event?: SyntheticEvent, reason?: string) {
    if (reason === "clickaway") return;
    props.setOpen(false);
  }

  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" severity={props.severity}>
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
