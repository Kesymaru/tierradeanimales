import React, {
  useState,
  useEffect,
  FunctionComponent,
  SyntheticEvent,
} from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps as MuiAlertProps } from "@material-ui/lab/Alert";

export interface AlertProps extends MuiAlertProps {
  message: string;
}

export const Alert: FunctionComponent<AlertProps> = (props) => {
  const { message, ...muiAlert } = props;
  const [open, setOpen] = useState<boolean>(!!props.message.length);
  useEffect(() => {
    setOpen(!!props.message.length);
  }, [props]);

  function handleClose(event?: SyntheticEvent, reason?: string) {
    if (reason === "clickaway") return;
    setOpen(false);
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" {...muiAlert}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
