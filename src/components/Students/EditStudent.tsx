import React, {ChangeEvent, FormEvent, FunctionComponent, useState} from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface IStudent {
    name: string;
    lastName: string;
}

interface IEditStudent {
}

const EditStudent: FunctionComponent<IEditStudent> = () => {
    const [student, setStudent] = useState<IStudent>({
        name: '',
        lastName: ''
    });

    function handleSubmit(event: FormEvent) {
    }

    function handleStudentChange(key: keyof IStudent){
        return (event: ChangeEvent<HTMLInputElement>) =>
            setStudent({...student, ...{[`${key}`]: event.target.value}});
    }

    return <>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2} justify="center">
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Name"
                        value={student.name}
                        onChange={handleStudentChange('name')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Last Name"
                        value={student.lastName}
                        onChange={handleStudentChange('lastName')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    Age
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    Group
                </Grid>
                <Grid item xs={6}>
                    <Button>
                        Reset
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>

        </form>
    </>;
};

export default EditStudent;
