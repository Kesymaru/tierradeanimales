import React, {FormEvent, FunctionComponent, useState} from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import {IHome} from "../../store/homes/homes.types";

const InitHome: IHome = {
    id: '',
    name: '',
    active: true,
};

interface IEditHomeProps {
}

const EditHome: FunctionComponent<IEditHomeProps> = (props) => {
    const [home, setHome] = useState<IHome>(InitHome);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    function handleAddContact() {

    }
    return <Container>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    Name
                </Grid>
                <Grid item xs={6}>
                    State
                </Grid>
            </Grid>
        </form>
    </Container>
};

export default EditHome;
