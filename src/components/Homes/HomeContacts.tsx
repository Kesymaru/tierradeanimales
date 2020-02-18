import React, {ChangeEvent, FunctionComponent, MouseEvent, useEffect, useState} from "react";
import {v4 as uuid} from 'uuid';

import Zoom from "@material-ui/core/Zoom";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from "@material-ui/icons/Remove";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import ContactMailIcon from "@material-ui/icons/ContactMail";

import {IHomeContact, IHomeContactFactory} from "../../store/homes/homes.types";

interface IHomeContactsProps {
    contacts: IHomeContact[];
    onChange?: (contacts: IHomeContact[]) => void;
    onAdd?: (contacts: IHomeContact[]) => void;
    onRemove?: (contacts: IHomeContact[]) => void;
}

const HomeContacts: FunctionComponent<IHomeContactsProps> = (props) => {
    const [contacts, setContacts] = useState<IHomeContact[]>(props.contacts);

    useEffect(() => setContacts(props.contacts), [props.contacts]);

    function handleAdd(event: MouseEvent<HTMLButtonElement>) {
        const _contacts = [...contacts, IHomeContactFactory()];
        setContacts(_contacts);
        if (props.onChange) props.onChange(_contacts);
    }

    function handleDelete(contact: IHomeContact) {
        return (event: MouseEvent<HTMLButtonElement>) => {
            const _contacts = contacts.map(c => contact.id === c.id
                ? {...contact, _deleted: true}
                : c);
            setContacts(_contacts);
            if (props.onChange) props.onChange(_contacts);
        };
    }

    function handleChange(contact: IHomeContact, field: keyof IHomeContact) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            contact[field] = event.target.value;
            const _contacts = contacts.map(c => contact.id === c.id ? contact : c)
            setContacts(_contacts);
            if (props.onChange) props.onChange(_contacts);
        }
    }

    return <>
        {contacts.map((contact, index) => (
            <Zoom in={!contact._deleted} unmountOnExit={true} key={contact.id}>
                <Grid container spacing={2}>
                    <Grid item xs={2} md={1}>
                        {index === 0
                            ? <Tooltip title="Add Contact">
                                <IconButton onClick={handleAdd}>
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                            : <Tooltip title="Remove Contact">
                                <IconButton onClick={handleDelete(contact)}>
                                    <RemoveIcon/>
                                </IconButton>
                            </Tooltip>}
                    </Grid>
                    <Grid item xs={10} md={11}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6} lg={4}>
                                <TextField
                                    label="Contact Name"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PermContactCalendarIcon/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={contact.name}
                                    onChange={handleChange(contact, 'name')}
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={4}>
                                <TextField
                                    label="Contact Phone"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ContactPhoneIcon/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={contact.phone}
                                    onChange={handleChange(contact, 'phone')}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={4}>
                                <TextField
                                    label="Contact Email"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ContactMailIcon/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={contact.email}
                                    onChange={handleChange(contact, 'email')}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Zoom>))}
    </>;
};

export default HomeContacts;
