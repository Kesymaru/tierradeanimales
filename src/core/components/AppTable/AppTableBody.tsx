import React, { FunctionComponent } from "react";
import get from "lodash/get";

import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";

import { TableColumns } from "./AppTableHeader";
import { TableActions } from "./AppTableActions";

export interface AppTableBodyProps {
  data: Array<any>;
  columns: TableColumns;
  selected: Array<string>;
  actions?: TableActions;
  onSelect?: (item: any) => void;
}

export const AppTableBody: FunctionComponent<AppTableBodyProps> = (props) => {
  return (
    <TableBody>
      {props.data.map((item, index) => (
        <TableRow
          key={index}
          hover
          role="checkbox"
          selected={props.selected.includes(item.id)}
          onClick={() => props.onSelect && props.onSelect(item)}
        >
          {props.actions && (
            <TableCell padding="checkbox">
              <Checkbox checked={props.selected.includes(item.id)} />
            </TableCell>
          )}
          {props.columns.map((column, i) => (
            <TableCell scope="row" key={`${index}-${i}`}>
              {get(item, column.path, column.default || "---")}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default AppTableBody;
