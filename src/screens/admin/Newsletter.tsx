import React, { FunctionComponent } from "react";

import Container from "@material-ui/core/Container";

import Screen from "@wrappers/Screen";
import { CollectionsConfig } from "@config/firestore";
import { AppTable } from "@components";
import useData from "@hooks/useData";
import { NewsletterResults } from "@models/newsletter";

export const Newsletter: FunctionComponent<{}> = (props) => {
  const { data, isLoaded, isEmpty } = useData<NewsletterResults>(
    CollectionsConfig.newsletter,
    []
  );

  return (
    <Screen t="newsletter" isLoaded={isLoaded} isEmpty={isEmpty} hideAdd={true}>
      <Container>
        <AppTable
          title="Newsletter"
          columns={[{ title: "email", path: "email" }]}
          data={data}
        />
      </Container>
    </Screen>
  );
};

export default Newsletter;
