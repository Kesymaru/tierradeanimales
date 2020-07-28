import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";

import { RouteParam, ContactResults } from "@models";
import { useData } from "@hooks";
import { Screen } from "@wrappers";
import { AppTable } from "@components";
import { CONTACT_COLUMNS } from "@constants";
import { ADMIN_DETAILS_CONTACT_ROUTE } from "@routes/contactUs";

export const AdminContacts: FunctionComponent = (props) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { data, isLoaded, isEmpty } = useData<ContactResults>("contact", []);

  function onEdit(params: RouteParam) {
    history.push(ADMIN_DETAILS_CONTACT_ROUTE.getPath(params));
  }

  function onSelect(selected: Array<string>) {
    onEdit({ id: selected.pop() });
  }

  return (
    <Screen t={"contacts"} isLoaded={isLoaded} isEmpty={isEmpty}>
      <Container>
        <AppTable
          title={t("contacts.title")}
          columns={CONTACT_COLUMNS}
          data={data}
          onSelect={onSelect}
        />
      </Container>
    </Screen>
  );
};

export default AdminContacts;
