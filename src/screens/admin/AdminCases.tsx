import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";

import { Screen } from "@wrappers";
import { useData } from "@hooks";
import { RouteParam } from "@models";
import { CollectionsConfig } from "@config";
import { AppTable, TableButtons } from "@components";
import { ADMIN_EDIT_CASE_ROUTE } from "@routes/case";
import { CASE_COLUMNS } from "@constants";

export const AdminCases: FunctionComponent<{}> = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const buttons: TableButtons = [
    {
      title: t("cases.add"),
      color: "primary",
      onClick: edit,
    },
  ];

  /* useFirestoreConnect({
    collection: COLLECTION,
  });
  const data = useSelector<AppState, Array<Case>>((state) =>
    get(state, `firestore.ordered.${COLLECTION}`)
  );

  if (!isLoaded(data)) return <AppLoading loading={true} />;
  if (isLoaded(data) && isEmpty(data)) {
    return (
      <AppInfo
        title={t("cases.errors.empty")}
        message={t("cases.errors.emptyMessage")}
        color="warning"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(ADMIN_EDIT_CASE_ROUTE.getPath())}
          startIcon={<AddIcon />}
        >
          {t("case.add")}
        </Button>
      </AppInfo>
    );
  } */

  const { data, isLoaded, isEmpty } = useData(CollectionsConfig.case, []);

  function edit(params?: RouteParam) {
    history.push(ADMIN_EDIT_CASE_ROUTE.getPath(params));
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

export default AdminCases;
