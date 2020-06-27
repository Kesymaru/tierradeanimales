import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import AppTable, { TableButtons } from "@core/components/AppTable";

import CollectionsConfig from "@core/config/firestore";
import { RouteParam } from "@core/models";
import { Screen } from "@core/wrappers";
import { useData } from "@core/hooks";
import FosterHome from "../models/fosterHome";
import { EDIT_FOSTER_HOME_ROUTE } from "../routes";

const columns = [
  {
    title: "Name",
    path: "name",
  },
  {
    title: "Country",
    path: "address.country.countryName",
  },
  {
    title: "State",
    path: "address.state.name",
  },
  {
    title: "County",
    path: "address.county.name",
  },
  {
    title: "City",
    path: "address.city.name",
  },
  {
    title: "Contact",
    path: "contacts[0].name",
  },
  {
    title: "Phone",
    path: "contacts[0].phone",
  },
];

export const FosterHomes: FunctionComponent<{}> = (props) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { data, isLoaded, isEmpty } = useData(CollectionsConfig.fosterHome, []);
  const buttons: TableButtons = [
    {
      title: t("fosterHomes.add"),
      color: "primary",
      onClick: onEdit,
    },
  ];

  function onEdit(params?: RouteParam) {
    history.push(EDIT_FOSTER_HOME_ROUTE.getPath(params));
  }

  return (
    <Screen
      t="fosterHomes"
      isLoaded={isLoaded}
      isEmpty={isEmpty}
      onAdd={onEdit}
    >
      <Container>
        <AppTable
          columns={columns}
          data={data}
          title={t("fosterHomes.title")}
          buttons={buttons}
          onSelect={(selected: Array<string>) => onEdit({ id: selected[0] })}
        ></AppTable>
      </Container>
    </Screen>
  );
};

export default FosterHomes;
