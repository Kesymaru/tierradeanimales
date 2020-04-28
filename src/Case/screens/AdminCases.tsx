import React, {
  FunctionComponent,
  useEffect,
  useState,
  ChangeEvent,
} from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import get from "lodash/get";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";

import { AppState } from "@core/models";
import { CollectionsConfig } from "@core/config";
import { AppTitle, AppTable, AppLoading, AppInfo } from "@core/components";

import { ADMIN_EDIT_CASE_ROUTE } from "../routes";
import Case from "../models";
import { CASE_COLUMNS } from "../constants";

const { case: COLLECTION } = CollectionsConfig;

export const AdminCases: FunctionComponent<{}> = () => {
  const history = useHistory();
  const { t } = useTranslation();
  useFirestoreConnect({
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
  }

  return (
    <Container>
      <AppTitle title={t("cases.title")} />
      <AppTable
        columns={CASE_COLUMNS}
        data={data}
        title="Data title"
        onSelect={(selected: Array<string>) =>
          history.push(ADMIN_EDIT_CASE_ROUTE.getPath({ id: selected[0] }))
        }
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(ADMIN_EDIT_CASE_ROUTE.getPath())}
          startIcon={<AddIcon />}
        >
          {t("case.add")}
        </Button>
      </AppTable>
    </Container>
  );
};

export default AdminCases;
