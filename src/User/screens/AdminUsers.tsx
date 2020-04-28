import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import pick from "lodash/pick";

import Container from "@material-ui/core/Container";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { Screen } from "@core/wrappers";
import { useData } from "@core/hooks";
import { AppTable, TableActions, TableButtons } from "@core/components";
import { AddAlert } from "@core/actions";
import { TABLE_ACTIONS, TABLE_BUTTONS } from "@core/constants";

import { UsersResults, User } from "../models";
import { USERS_COLUMNS } from "../constants";

export const AdminUser: FunctionComponent = () => {
  const firebase = useFirebase() as any;
  const addAdmin = firebase.functions().httpsCallable("addAdmin") as Function;
  const dispatch = useDispatch();
  const { data, isLoaded, isEmpty } = useData<UsersResults>("users", []);
  const tableActions: TableActions = [
    {
      ...TABLE_ACTIONS[1],
      onClick: deleteUsers,
    },
    {
      title: "users.setAsAdmin",
      color: "secondary",
      icon: SupervisorAccountIcon,
      onClick: (selected: Array<string>) => {
        console.log("set admin", selected);
      },
    },
  ];

  function deleteUsers(selected: Array<string>) {
    console.log("delete user -> selected", selected);
  }

  async function setAsAdmin(user: User) {
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
          actions={tableActions}
          buttons={TABLE_BUTTONS}
        />
      </Container>
    </Screen>
  );
};

export default AdminUser;
