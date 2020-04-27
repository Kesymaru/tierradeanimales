import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import pick from "lodash/pick";

import Container from "@material-ui/core/Container";
import EditIcon from "@material-ui/icons/Edit";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { Screen } from "@core/wrappers";
import { useData } from "@core/hooks";
import { AppTable, TableActions, TableButtons } from "@core/components";
import { AddAlert } from "@core/actions";

import { UsersResults, User } from "../models";
import { USERS_COLUMNS } from "../constants";

const TABLE_ACTIONS: TableActions = [
  /* {
    title: "Edit",
    icon: EditIcon,
    disabled: (selected: Array<string>) => selected.length > 1,
  }, */
  {
    title: "Delete",
    icon: DeleteForeverIcon,
    onClick: (users: UsersResults) => {
      console.log("delete user", users);
    },
  },
  {
    title: "Set As Admin",
    icon: SupervisorAccountIcon,
    onClick: (selected: Array<string>) => {
      console.log("set admin", selected);
    },
  },
];

const TABLE_BUTTONS: TableButtons = [
  {
    title: "Add",
    onClick: () => console.log("add"),
  },
];

export const AdminUser: FunctionComponent = () => {
  const firebase = useFirebase() as any;
  const addAdmin = firebase.functions().httpsCallable("addAdmin") as Function;
  const dispatch = useDispatch();
  const { data, isLoaded, isEmpty } = useData<UsersResults>("users", []);

  async function grandAdminRol(user: User) {
    console.log("firebase", addAdmin, firebase);
    try {
      const result = await addAdmin(pick(user, ["email"]));
      dispatch(
        AddAlert({
          title: "Successs",
          message: "User is Admin now",
          color: "error",
        })
      );
    } catch (err) {
      console.error(err);
      dispatch(
        AddAlert({
          title: "Error",
          message: `Could not set user as Admin`,
          color: "error",
        })
      );
    }
  }

  return (
    <Screen t="users" isLoaded={isLoaded} isEmpty={isEmpty}>
      <Container>
        <AppTable
          title="Users"
          columns={USERS_COLUMNS}
          data={data}
          actions={TABLE_ACTIONS}
          buttons={TABLE_BUTTONS}
        />
      </Container>
    </Screen>
  );
};

export default AdminUser;
