import React, {
  FunctionComponent,
  ComponentType,
  useState,
  useRef,
  MouseEvent,
} from "react";
import get from "lodash/get";
import pick from "lodash/pick";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";

import { AppTableToolbar } from "./AppTableToolbar";
import { AppTableHeader, TableColumns } from "./AppTableHeader";
import { TableActions } from "./AppTableActions";
import AppTableBody from "./AppTableBody";

export interface AppTableProps {
  title?: string;
  columns: TableColumns;
  data: Array<any>;
  actions?: TableActions;
  onSelect?: (items: Array<any>) => void;
}

export const AppTable: FunctionComponent<AppTableProps> = (props) => {
  const [selected, setSelected] = useState<Array<string>>([]);

  function handleSelectAll(all: boolean) {
    console.log("handleSelectAll", all);
    if (all) setSelected([]);
    else setSelected(props.data.map((item) => item.id));
  }

  function handleSelect(item: any) {
    let _selected = [];
    if (selected.includes(item.id))
      _selected = selected.filter((id) => id !== item.id);
    else _selected = [...selected, item.id];
    setSelected(_selected);
    if (props.onSelect) props.onSelect(_selected);
  }

  return (
    <Paper
      style={{ overflowX: "auto", marginRight: "auto", marginLeft: "auto" }}
    >
      <AppTableToolbar
        title={props.title}
        selected={selected}
        actions={props.actions}
      />
      <Table>
        <AppTableHeader
          selected={selected}
          data={props.data}
          columns={props.columns}
          actions={props.actions}
          onSelectAll={handleSelectAll}
        />
        <AppTableBody
          data={props.data}
          columns={props.columns}
          selected={selected}
          actions={props.actions}
          onSelect={handleSelect}
        />
      </Table>
    </Paper>
  );
};

export * from "./AppTableHeader";
export * from "./AppTableActions";
export default AppTable;
