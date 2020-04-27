import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";

import { useData } from "@core/hooks";
import { Screen } from "@core/wrappers";
import { AppTable } from "@core/components";

import { ContactResults } from "../models";
import { CONTACT_COLUMNS } from "../contants";

export const AdminContacts: FunctionComponent = (props) => {
  const { t } = useTranslation();
  const { data, isLoaded, isEmpty } = useData<ContactResults>("contacts", []);

  return (
    <Screen t={"contacts"} isLoaded={isLoaded} isEmpty={isEmpty}>
      <Container>
        <AppTable
          title={t("contacts.title")}
          columns={CONTACT_COLUMNS}
          data={data}
        />
      </Container>
    </Screen>
  );
};

export default AdminContacts;
