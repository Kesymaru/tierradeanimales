import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";

import Screen from "@wrappers/Screen";
import { useData } from "@hooks";
import { RouteParam } from "@models";
import { CollectionsConfig } from "@config";
import { AppTable, TableButtons } from "@components";
import { EDIT_CASE_ROUTE } from "@routes/admin/cases";
import { CASE_COLUMNS } from "@constants";

export const Cases: FunctionComponent<{}> = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const buttons: TableButtons = [
    {
      title: t("cases.add"),
      color: "primary",
      onClick: edit,
    },
  ];
  const { data, isLoaded, isEmpty } = useData(CollectionsConfig.case, []);

  function edit(params?: RouteParam) {
    history.push(EDIT_CASE_ROUTE.getPath(params));
  }

  return (
    <Screen t="cases" isLoaded={isLoaded} isEmpty={isEmpty}>
      <Container>
        <AppTable
          columns={CASE_COLUMNS}
          data={data}
          title={t("cases.title")}
          buttons={buttons}
          onSelect={(selected: Array<string>) => edit({ id: selected[0] })}
        ></AppTable>
      </Container>
    </Screen>
  );
};

export default Cases;
