import React, {ChangeEvent, FormEvent, FunctionComponent, MouseEvent, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {ValidationError, ValidationResult} from "@hapi/joi";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from "@material-ui/icons/Send";

import IHomeState, {IHome, IHomeFactory, IHomeValidator} from "../../store/homes/homes.types";
import IAppState, {TStatus} from "../../store/app.types";
import {SaveHome} from "../../store/homes/homes.actions";
import {useIsNew} from "../../routes/routes.hooks";
import HomeContacts from "./HomeContacts";
import HomeDogs from "./HomeDogs";
import Address from "../Address";
import {ADMIN_HOMES_ROUTE} from "./Homes.routes";

interface IEditHomeProps extends Pick<IHomeState, 'home'> {
}

const EditHome: FunctionComponent<IEditHomeProps> = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const isNew = useIsNew(params);
    const [home, setHome] = useState<IHome>(IHomeFactory());
    const [loading, setLoading] = useState<boolean>(getLoading());
    const [errors, setErrors] = useState<ValidationError|undefined>(undefined);

    function validate(value: IHome = home): boolean {
        const results = IHomeValidator(value) as ValidationResult;

        console.log('validation ->', results);
        setErrors(results.error);
        return !!results.error || false
    }

    function getLoading(): boolean {
        return props.home.status === TStatus.Fetching;
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if(!validate()) return;

        console.log('save ->', home)
        // dispatch(SaveHome(home));
    }

    function handleReset(event: FormEvent) {
        if (isNew) return history.push(ADMIN_HOMES_ROUTE.getPath());
    }

    function handleChange(field: keyof IHome) {
        return (event: ChangeEvent<HTMLInputElement>) => setHome({
            ...home, [`${field}`]: event.target.value
        });
    }

    return (<Container>
        <form noValidate autoComplete="off" onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HomeIcon/>
                                </InputAdornment>
                            )
                        }}
                        value={home.name}
                        disabled={loading}
                        onChange={handleChange("name")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Address
                        address={home.address}
                        disabled={loading}
                        onChange={address => setHome({...home, address})}
                    />
                </Grid>

                <Grid item xs={12}>
                    <HomeDogs
                        selected={(home.dogs || [])}
                        disabled={loading}
                        onChange={dogs => setHome({...home, dogs})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <HomeContacts
                        contacts={(home.contacts || [])}
                        disabled={loading}
                        onChange={contacts => setHome({...home, contacts})}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Tooltip title="Cancel">
                        <Button
                            type="reset"
                            variant="contained"
                            color="secondary"
                            startIcon={<CloseIcon/>}
                            fullWidth
                        >
                            Cancel
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={6}>
                    <Tooltip title="Submit">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SendIcon/>}
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>
        </form>
    </Container>);
};

const mapStateToProps = (state: IAppState): IEditHomeProps => ({
    home: state.homes.home
});
export default connect(mapStateToProps)(EditHome);
