import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import pick from "lodash/pick";

import Container from "@material-ui/core/Container";

import { Screen } from "@core/wrappers";
import { useData } from "@core/hooks";
import { AppTable, AppTableColumns } from "@core/components";
import { AddAlert } from "@core/actions";

import { UsersResults, User } from "../models";
import { USERS_COLUMNS } from "../constants";

export const AdminUser: FunctionComponent = () => {
  const firebase = useFirebase() as any;
  const addAdmin = firebase.functions().httpsCallable("addAdmin") as Function;
  const dispatch = useDispatch();
  const { data, isLoaded, isEmpty } = useData<UsersResults>("users", []);

  async function handleOnSelectItem(user: User, index: number) {
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
          columns={USERS_COLUMNS}
          data={data}
          onSelectItem={handleOnSelectItem}
        />
      </Container>
    </Screen>
  );
};

export default AdminUser;
