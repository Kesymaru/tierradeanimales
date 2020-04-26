import React, { FunctionComponent } from "react";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";

import { TableActions } from "./AppTableActions";

export interface TableColumn {
  title: string;
  path: string;
  default?: string;
}
export type TableColumns = Array<TableColumn>;

export interface AppTableHeaderProps {
  selected: Array<string>;
  data: Array<any>;
  columns: TableColumns;
  actions?: TableActions;
  onSelectAll?: (all: boolean) => void;
}

export const AppTableHeader: FunctionComponent<AppTableHeaderProps> = (
  props
) => {
  const indeterminate =
    props.selected.length > 0 && props.selected.length < props.data.length;
  const checked =
    props.selected.length > 0 && props.selected.length === props.data.length;

  function renderCheckbox() {
    return (
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={indeterminate}
          checked={checked}
          onChange={() =>
            props.onSelectAll &&
            props.onSelectAll(props.data.length === props.selected.length)
          }
          inputProps={{ "aria-label": "select all" }}
        />
      </TableCell>
    );
  }

  return (
    <TableHead>
      <TableRow>
        {props.actions && renderCheckbox()}
        {props.columns.map((column: TableColumn, index: number) => (
          <TableCell key={column.path}>{column.title}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default AppTableHeader;
