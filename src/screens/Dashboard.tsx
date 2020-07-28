import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";

import { ADMIN_DASHBOARD_ROUTE } from "@routes";

const Dashboard: FunctionComponent<{}> = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Container style={{ marginTop: 100 }}>
      <div>Dashboard</div>
      <a onClick={() => history.push(ADMIN_DASHBOARD_ROUTE.getPath())}>Admin</a>
    </Container>
  );
};

export default Dashboard;
