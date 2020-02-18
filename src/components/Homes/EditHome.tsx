import React, {ChangeEvent, FormEvent, FunctionComponent, useState, MouseEvent} from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import HomeIcon from '@material-ui/icons/Home';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import RoomIcon from '@material-ui/icons/Room';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from "@material-ui/icons/Send";

import {IHome, IHomeContact} from "../../store/homes/homes.types";
import HomeContacts from "./HomeContacts";

const InitHome: IHome = {
    id: '',
    name: '',
    active: true,
    country: '',
    state: '',
    county: '',
    city: '',
    address: '',
};

interface IEditHomeProps {
}

const EditHome: FunctionComponent<IEditHomeProps> = (props) => {
    const [home, setHome] = useState<IHome>(InitHome);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    function handleChange(field: keyof IHome) {
        return (event: ChangeEvent<HTMLInputElement>) => setHome({
            ...home, [`${field}`]: event.target.value
        });
    }

    function handleContactChange(field: keyof IHomeContact, index: number) {
        return (event: ChangeEvent<HTMLInputElement>) => setHome({
            ...home, contacts: (home.contacts || []).map((contact, i) => index === i
                ? ({...contact, [`${field}`]: event.target.value})
                : contact)
        });
    }

    return <Container>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                            ),
                            endAdornment: (<InputAdornment position="start">
                                <Tooltip title="Add Contact">
                                    <IconButton>
                                        <AddIcon/>
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>)
                        }}
                        value={home.name}
                        onChange={handleChange("name")}
                    />
                </Grid>

                <HomeContacts contacts={home.contacts} onChange={contacts => setHome({...home, contacts})}/>

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
                        <Select value={home.state}>
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
                        <Select value={home.city}>
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
                        onChange={handleChange("address")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<CloseIcon/>}
                        fullWidth
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SendIcon/>}
                        fullWidth
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Container>
};

export default EditHome;
