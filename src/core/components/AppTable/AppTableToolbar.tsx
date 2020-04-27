import React, { FunctionComponent, ComponentType } from "react";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";

import { AppTableActions, TableActions } from "./AppTableActions";
import { TableColumns } from "./AppTableHeader";

export interface TableButton {
  title: string;
  icon?: ComponentType<any>;
  onClick?: () => void;
}

export type TableButtons = Array<TableButton>;

export interface AppTableToolbarProps {
  title?: string;
  selected: Array<string>;
  columns: TableColumns;
  actions?: TableActions;
  buttons?: TableButtons;
}

export const AppTableToolbar: FunctionComponent<AppTableToolbarProps> = (
  props
) => {
  return (
    <Slide direction="down" in={true}>
      <TableHead>
        <TableRow>
          <TableCell colSpan={props.columns.length + (props.actions ? 1 : 0)}>
            <Typography color="inherit" variant="h5" style={{ flex: 1 }}>
              {props.selected.length > 0
                ? `Selected ${props.selected.length}`
                : props.title || "Table"}
            </Typography>

            {props.buttons && (
              <Zoom in={true}>
                <ButtonGroup color="primary">
                  {props.buttons.map((button: TableButton, index: number) => (
                    <Tooltip title={button.title} key={index}>
                      <Button>{button.title}</Button>
                    </Tooltip>
                  ))}
                </ButtonGroup>
              </Zoom>
            )}

            {props.actions && (
              <Zoom in={props.selected.length > 0}>
                <AppTableActions
                  selected={props.selected}
                  actions={props.actions || []}
                />
              </Zoom>
            )}
          </TableCell>
        </TableRow>
      </TableHead>
    </Slide>
  );
};

export default AppTableToolbar;
