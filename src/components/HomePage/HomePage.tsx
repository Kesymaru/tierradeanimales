import React, {FunctionComponent} from "react";

import Vision from "./Vision";
import Mission from "./Mission";
import Donate from "./Donate";
import Contact from "./Contact";
import About from "./About";

const HomePage: FunctionComponent<{}> = (props) => <div style={{marginTop: 50}}>
    <Vision/>
    <Mission/>
    <Donate/>
    <Contact/>
    <About/>
</div>;

export default HomePage;
