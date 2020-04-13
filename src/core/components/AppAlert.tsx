import React, {
  useState,
  useEffect,
  FunctionComponent,
  SyntheticEvent,
} from "react";
import { useSelector, useDispatch } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { AppState, AlertState } from "@core/models";
import { DeleteAlert } from "@core/actions/alert";

export const AppAlert: FunctionComponent<{}> = (props) => {
  const dispatch = useDispatch();
  const alert = useSelector<AppState, AlertState>((state) => state.alert);

  function handleClose(event?: SyntheticEvent, reason?: string) {
    if (reason === "clickaway") return;
    if (alert) dispatch(DeleteAlert(alert));
  }

  return (
    <>
      {!!alert && (
        <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled">
            {alert.message}
          </MuiAlert>
        </Snackbar>
      )}
    </>
  );
};

export default AppAlert;
