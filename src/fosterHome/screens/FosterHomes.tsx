import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useTranslation } from "react-i18next";
import get from "lodash/get";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";

import AppTitle from "@core/components/AppTitle";
import AppTable from "@core/components/AppTable";

import CollectionsConfig from "@core/config/firestore";
import FosterHome from "../models/fosterHome";
import { EDIT_FOSTER_HOME_ROUTE } from "../routes";
import { AppState } from "@core/models";
import { AppLoading, AppInfo } from "@core/components";

const { fosterHome: COLLECTION } = CollectionsConfig;
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
  useFirestoreConnect({
    collection: COLLECTION,
    limit: 10,
  });
  const homes = useSelector<AppState, Array<FosterHome>>((state) =>
    get(state, `firestore.ordered.${COLLECTION}`, [])
  );

  if (!isLoaded(homes)) return <AppLoading loading={true} />;
  if (isLoaded(homes) && isEmpty(homes)) {
    return (
      <AppInfo
        title={t("fosterHomes.errors.empty")}
        message={t("fosterHomes.errors.emptyMessage")}
        color="warning"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(EDIT_FOSTER_HOME_ROUTE.getPath())}
          startIcon={<AddIcon />}
        >
          {t("fosterHome.add")}
        </Button>
      </AppInfo>
    );
  }

  return (
    <Container
      style={{ overflowX: "auto", marginRight: "auto", marginLeft: "auto" }}
    >
      <AppTitle title={t("fosterHomes.title")} />
      <AppTable
        columns={columns}
        data={homes}
        title={t("fosterHomes.title")}
        onSelect={(selected: Array<string>) =>
          history.push(EDIT_FOSTER_HOME_ROUTE.getPath({ id: selected[0] }))
        }
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(EDIT_FOSTER_HOME_ROUTE.getPath())}
        >
          {t("fosterHome.add")}
        </Button>
      </AppTable>
    </Container>
  );
};

export default FosterHomes;
