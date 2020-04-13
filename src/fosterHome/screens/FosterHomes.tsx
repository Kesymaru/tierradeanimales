import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useTranslation } from "react-i18next";
import get from "lodash/get";

import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import AppTitle from "@core/components/AppTitle";

import CollectionsConfig from "@core/config/firestore";
import FosterHome from "../models/fosterHome";
import { EDIT_FOSTER_HOME_ROUTE } from "../routes";
import { AppState } from "@core/models";
import { AppLoading, AppInfo } from "@core/components";

const { fosterHome: COLLECTION } = CollectionsConfig;

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
  if (isLoaded(homes) && isEmpty(homes))
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

  return (
    <Container>
      <Paper
        style={{ overflowX: "auto", marginRight: "auto", marginLeft: "auto" }}
      >
        <AppTitle title="Test" />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Test</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {homes.map((home) => (
              <TableRow key={home.id}>
                <TableCell component="th" scope="row">
                  {home.name}
                </TableCell>
                <TableCell>10</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default FosterHomes;
