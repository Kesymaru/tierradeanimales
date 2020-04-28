import React, { FunctionComponent, ComponentType } from "react";
import { useTranslation } from "react-i18next";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";
import { PropTypes } from "@material-ui/core";

import { AppTableActions, TableActions } from "./AppTableActions";
import { TableColumns } from "./AppTableHeader";

export interface TableButton {
  title: string;
  color?: PropTypes.Color;
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
  const { t } = useTranslation();
  return (
    <Slide direction="down" in={true}>
      <TableHead>
        <TableRow>
          <TableCell colSpan={props.columns.length + (props.actions ? 1 : 0)}>
            <Box display="flex" flexDirection="row">
              <Typography
                color="inherit"
                variant="h5"
                style={{ marginRight: 16 }}
              >
                {props.selected.length > 0
                  ? `${t("app.selected")} ${props.selected.length}`
                  : props.title || t("app.table")}
              </Typography>
              {props.actions && props.selected.length > 0 && (
                <Zoom in={props.actions && props.selected.length > 0}>
                  <AppTableActions
                    selected={props.selected}
                    actions={props.actions || []}
                  />
                </Zoom>
              )}
              <Box display="flex" flexDirection="row" flex="1"></Box>
              <Box display="flex" flexDirection="row">
                {props.buttons && (
                  <Zoom in={true}>
                    <ButtonGroup
                      color="primary"
                      size="small"
                      variant="outlined"
                    >
                      {props.buttons.map(
                        (button: TableButton, index: number) => (
                          <Tooltip title={button.title} key={index}>
                            <Button
                              color={button.color ? button.color : "default"}
                              startIcon={
                                button.icon ? <button.icon /> : undefined
                              }
                            >
                              {button.title}
                            </Button>
                          </Tooltip>
                        )
                      )}
                    </ButtonGroup>
                  </Zoom>
                )}
              </Box>
            </Box>
          </TableCell>
        </TableRow>
      </TableHead>
    </Slide>
  );
};

export default AppTableToolbar;
