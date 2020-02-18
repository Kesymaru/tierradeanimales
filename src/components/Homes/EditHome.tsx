import React, {ChangeEvent, FormEvent, FunctionComponent, MouseEvent, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {connect, useDispatch} from "react-redux";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import HomeIcon from '@material-ui/icons/Home';
import RoomIcon from '@material-ui/icons/Room';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from "@material-ui/icons/Send";

import IHomeState, {IHome, IHomeFactory} from "../../store/homes/homes.types";
import IAppState, {TStatus} from "../../store/app.types";
import {SaveHome} from "../../store/homes/homes.actions";
import {useIsNew} from "../../routes/routes.hooks";
import HomeContacts from "./HomeContacts";
import HomeDogs from "./HomeDogs";

interface IEditHomeProps extends Pick<IHomeState, 'home'>{
}

const EditHome: FunctionComponent<IEditHomeProps> = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const isNew = useIsNew(params);
    const [home, setHome] = useState<IHome>(IHomeFactory());
    const [loading, setLoading] = useState<boolean>(getLoading());

    init();
    function init(){
    }

    function getLoading(): boolean {
        return props.home.status === TStatus.Fetching;
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        console.log('save', home)
        dispatch(SaveHome(home));
    }

    function handleReset(event: FormEvent) {
        if(isNew) return history.goBack();
    }

    function handleChange(field: keyof IHome) {
        return (event: ChangeEvent<HTMLInputElement>) => setHome({
            ...home, [`${field}`]: event.target.value
        });
    }

    return <Container>
        <form noValidate autoComplete="off" onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>Foster Home</Typography>
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
                <Grid item xs={6} md={3}>
                    <FormControl variant="outlined">
                        <InputLabel>Country</InputLabel>
                        <Select value={home.country}>
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                    <FormControl variant="outlined">
                        <InputLabel>State</InputLabel>
                        <Select
                            value={home.state}
                            disabled={loading}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                    <FormControl variant="outlined">
                        <InputLabel>County</InputLabel>
                        <Select value={home.county}>
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                    <FormControl variant="outlined">
                        <InputLabel>City</InputLabel>
                        <Select
                            value={home.city}
                            disabled={loading}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <RoomIcon/>
                                </InputAdornment>
                            ),
                        }}
                        value={home.address}
                        disabled={loading}
                        onChange={handleChange("address")}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography>Contacts</Typography>
                    <HomeContacts
                        contacts={(home.contacts || [])}
                        disabled={loading}
                        onChange={contacts => setHome({...home, contacts})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography>Dogs</Typography>
                    <HomeDogs
                        selected={(home.dogs || [])}
                        disabled={loading}
                        onChange={dogs => setHome({...home, dogs})}
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
    </Container>
};

const mapStateToProps = (state: IAppState): IEditHomeProps => ({
    home: state.homes.home
});
export default connect(mapStateToProps)(EditHome);
