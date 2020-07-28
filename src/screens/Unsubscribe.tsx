import React, { FunctionComponent } from "react";

import Container from "@material-ui/core/Container";

import NewsletterSubscriber from "@components/NewsletterSubscriber";

export const Unsubscribe: FunctionComponent<{}> = () => {
  return (
    <Container style={{ marginTop: 60 }}>
      <NewsletterSubscriber mode="unsubscribe" />
    </Container>
  );
};

export default Unsubscribe;
