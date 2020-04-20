import React, { FunctionComponent } from "react";

import Container from "@material-ui/core/Container";

import Screen from "@core/wrappers/Screen";
import { CollectionsConfig } from "@core/config/firestore";
import { AppTitle, AppTable, AppLoading } from "@core/components";
import useData from "@core/hooks/useData";

import { Newsletter } from "../models";

export const AdminNewsletter: FunctionComponent<{}> = (props) => {
  const { data, isLoaded, isEmpty } = useData<Array<Newsletter>>(
    CollectionsConfig.newsletter,
    []
  );

  console.log("newsletter data", data);

  return (
    <Screen title="Newsletter" isLoaded={isLoaded} isEmpty={isEmpty}>
      <Container>
        <AppTable
          title="Newsletter"
          columns={[{ title: "email", path: "email" }]}
          data={data}
        />
      </Container>
    </Screen>
  );
};

export default AdminNewsletter;
