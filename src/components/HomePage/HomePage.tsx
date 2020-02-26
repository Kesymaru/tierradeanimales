import React, {FunctionComponent} from "react";

import Vision from "./Vision";
import Mission from "./Mission";
import About from "./About";
import Donate from "./Donate";

interface IHomePageProps {
}

const HomePage: FunctionComponent<IHomePageProps> = (props) => <div style={{marginTop: 50}}>
    <Vision/>
    <Mission/>
    <Donate/>
    <About/>
</div>;

export default HomePage;
