import React, {FunctionComponent, useState} from "react";
import {useDispatch} from "react-redux";

import Container from "@material-ui/core/Container";

interface IFosterHomeProps {
}

const Homes: FunctionComponent<IFosterHomeProps> = (props) => {
    const dispatch = useDispatch();
    const [homes, setHomes] = useState([]);

    return <Container>
        Foster homes goes here;
    </Container>;
};

export default Homes;
