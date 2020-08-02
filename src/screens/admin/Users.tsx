import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import pick from "lodash/pick";

import Container from "@material-ui/core/Container";
import PersonIcon from "@material-ui/icons/Person";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { Screen } from "@wrappers";
import { useData } from "@hooks";
import { AppTable, TableActions, TableButtons } from "@components";
import { AddAlert } from "@state/actions";
import { TABLE_ACTIONS, USERS_COLUMNS } from "@constants";
import { UsersResults, User } from "@models";

export const Users: FunctionComponent = () => {
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
      title: "users.setAsUser",
      color: "default",
      icon: PersonIcon,
      onClick: (selected: Array<string>) => {
        console.log("set user", selected);
      },
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
        />
      </Container>
    </Screen>
  );
};

export default Users;
