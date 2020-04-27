import React, { FunctionComponent } from "react";

import Container from "@material-ui/core/Container";

import { useData } from "@core/hooks";
import { Screen } from "@core/wrappers";
import { AppTable } from "@core/components";

import { ContactResults } from "../models";
import { CONTACT_COLUMNS } from "../contants";

export const AdminContacts: FunctionComponent = (props) => {
  const { data, isLoaded, isEmpty } = useData<ContactResults>("contacts", []);

  return (
    <Screen t={"contact"} isLoaded={isLoaded} isEmpty={isEmpty}>
      <Container>
        <AppTable title="Contacts" columns={CONTACT_COLUMNS} data={data} />
      </Container>
    </Screen>
  );
};

export default AdminContacts;
