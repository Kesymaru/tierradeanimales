import React, {ChangeEvent, FunctionComponent} from "react";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker} from '@material-ui/pickers';

import {IVersus} from "../../store";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";

interface IConfigVersusProps {
    versus: IVersus;
    setVersus: Function;
    setValid: Function;
}

const VersusConfig: FunctionComponent<IConfigVersusProps> = ({versus, setVersus, setValid}) => {
    function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {
        validateName();
        setVersus({...versus, ...{name: event.target.value}});
    };

    function validateName(): void {
        setValid(versus.name.length >= 3);
    }

    function handleDateChange(date: MaterialUiPickersDate): void {
        console.log('handleDateChange', date);
        setVersus({...versus, ...{date}});
    }

    return <form noValidate autoComplete="off">
        <Typography>Please fill the versus data</Typography>
        <Grid container spacing={2} justify="space-around">
            <Grid item>
                <TextField
                    name="name"
                    label="Session Name"
                    value={versus.name}
                    onChange={handleNameChange}
                    onBlur={validateName}
                />
            </Grid>
            <Grid item>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="Date picker inline"
                    value={versus.date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </Grid>
    </form>
};

export default VersusConfig;
