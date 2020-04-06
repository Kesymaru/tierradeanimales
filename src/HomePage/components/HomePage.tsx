import React, { FunctionComponent } from "react";

import {
  About,
  Values,
  Mission,
  Donate,
  ContactUs,
  FollowUs,
} from "@/HomePage/components";

const HomePage: FunctionComponent<{}> = (props) => (
  <div style={{ marginTop: 50 }}>
    <About />
    <Values />
    <Mission />
    <Donate />
    <ContactUs />
    <FollowUs />
  </div>
);

export default HomePage;
