import React, { FunctionComponent } from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";

import { AppTableActions, TableActions } from "./AppTableActions";

export interface AppTableToolbarProps {
  title?: string;
  selected: Array<string>;
  actions?: TableActions;
}

export const AppTableToolbar: FunctionComponent<AppTableToolbarProps> = (
  props
) => {
  return (
    <Slide direction="down" in={true}>
      <Toolbar>
        <Typography color="inherit" variant="h5" style={{ flex: 1 }}>
          {props.selected.length > 0
            ? `Selected ${props.selected.length}`
            : props.title || "Table"}
        </Typography>

        {props.actions && (
          <Zoom in={props.selected.length > 0}>
            <AppTableActions
              selected={props.selected}
              actions={props.actions || []}
            />
          </Zoom>
        )}
      </Toolbar>
    </Slide>
  );
};

export default AppTableToolbar;
