import React, { FunctionComponent } from "react";

import Container from "@material-ui/core/Container";

import { useTranslation } from "react-i18next";

const Dashboard: FunctionComponent<{}> = () => {
  const { t } = useTranslation();

  return <Container></Container>;
};

export default Dashboard;
