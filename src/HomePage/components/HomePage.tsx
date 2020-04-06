import React, {FunctionComponent} from "react";

import About from "./About";
import Values from "./Values";
import Mission from "./Mission";
import Donate from "./Donate";
import Contact from "./Contact";
import FollowUs from "./FollowUs";

const HomePage: FunctionComponent<{}> = (props) => <div style={{marginTop: 50}}>
    <About/>
    <Values/>
    <Mission/>
    <Donate/>
    <Contact/>
    <FollowUs/>
</div>;

export default HomePage;
