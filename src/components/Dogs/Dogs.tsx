import React, {FunctionComponent, useState} from "react";

import {Container} from "@material-ui/core";

import {IDog} from "../../store/dogs/dogs.types";

interface IDogsProps {
}

const Dogs: FunctionComponent<IDogsProps> = (props) => {

    const [dogs, setDogs] = useState<IDog[]>([]);

    return <Container>
        Here goes the public dogs
        <pre>
            {JSON.stringify(dogs)}
        </pre>
    </Container>
};

export default Dogs;
