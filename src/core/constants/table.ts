import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";

import { TableActions, TableButtons } from "../components/AppTable";

export const TABLE_ACTIONS: TableActions = [
  {
    title: "app.edit",
    color: "primary",
    icon: EditIcon,
    disabled: (selected: Array<string>) => selected.length > 1,
    onClick: (selected: Array<string>) => console.log("edit action", selected),
  },
  {
    title: "app.delete",
    color: "secondary",
    icon: DeleteForeverIcon,
    onClick: (selected: Array<string>) =>
      console.log("delete action", selected),
  },
];

export const TABLE_BUTTONS: TableButtons = [
  {
    title: "app.add",
    color: "primary",
    icon: AddIcon,
    onClick: () => console.log("add"),
  },
];

export default TABLE_ACTIONS;
