import React, { FunctionComponent } from "react";

import Container from "@material-ui/core/Container";

import { useData } from "@core/hooks";
import { CollectionsConfig } from "@core/config";
import { Screen } from "@core/wrappers";

import { INIT_ADOPT } from "../constants";

export const DetailAdopt: FunctionComponent<{}> = () => {
  const { data, isLoaded, isEmpty } = useData(
    CollectionsConfig.case,
    INIT_ADOPT
  );

  return (
    <Screen t="adopt" isLoaded={isLoaded} isEmpty={isEmpty}>
      <Container>
        Here goes the dog details page
        <pre>{JSON.stringify(data)}</pre>
      </Container>
    </Screen>
  );
};

export default DetailAdopt;
