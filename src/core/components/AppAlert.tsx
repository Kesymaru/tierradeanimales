import React, {
  useState,
  useEffect,
  FunctionComponent,
  SyntheticEvent,
} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps as MuiAlertProps } from "@material-ui/lab/Alert";

export interface AppAlertProps extends MuiAlertProps {
  message: string;
}

export const AppAlert: FunctionComponent<AppAlertProps> = (props) => {
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

export default AppAlert;
