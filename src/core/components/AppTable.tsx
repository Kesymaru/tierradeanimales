import React, { FunctionComponent, useEffect, useState } from "react";
import get from "lodash/get";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import AppLoading from "./AppLoading";

export interface AppTableColumn {
  title: string;
  path: string;
  default?: string;
}

export interface AppTableProps {
  title?: string;
  columns: Array<AppTableColumn>;
  data: Array<any>;
  loading?: boolean;
  onSelectItem?: (item: any, index: number) => void;
}

export const AppTable: FunctionComponent<AppTableProps> = (props) => {
  if (props.loading) return <AppLoading loading={true} />;

  return (
    <Paper
      style={{ overflowX: "auto", marginRight: "auto", marginLeft: "auto" }}
    >
      {props.title && (
        <Toolbar>
          <Typography color="inherit" variant="h3" component="div">
            {props.title}
          </Typography>
          {props.children && props.children}
        </Toolbar>
      )}
      <Table>
        <TableHead>
          <TableRow>
            {props.columns.map((column: AppTableColumn, index: number) => (
              <TableCell key={column.path}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((item, index) => (
            <TableRow
              key={index}
              hover
              onClick={() =>
                props.onSelectItem && props.onSelectItem(item, index)
              }
            >
              {props.columns.map((column, i) => (
                <TableCell component="th" scope="row">
                  {get(item, column.path, column.default || "---")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AppTable;
