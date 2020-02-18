import React, {ChangeEvent, FunctionComponent, MouseEvent, useEffect, useState} from "react";
import {v4 as uuid} from 'uuid';

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Divider from "@material-ui/core/Divider";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from "@material-ui/icons/Remove";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import ContactMailIcon from "@material-ui/icons/ContactMail";

import {IHomeContact} from "../../store/homes/homes.types";

interface IHomeContactsProps {
    contacts: IHomeContact[];
    onChange?: (contacts: IHomeContact[]) => void;
    onAdd?: (contacts: IHomeContact[]) => void;
    onRemove?: (contacts: IHomeContact[]) => void;
}

const HomeContacts: FunctionComponent<IHomeContactsProps> = (props) => {
    const [contacts, setContacts] = useState<IHomeContact[]>(props.contacts);

    useEffect(() => setContacts(props.contacts), [props.contacts]);

    function _newContact(): IHomeContact {
        return {id: uuid(), name: '', phone: '', email: '',}
    }

    function handleAddContact(event: MouseEvent<HTMLButtonElement>) {
        setContacts([...contacts, _newContact()])
    }

    function handleRemoveContact(contact: IHomeContact) {
        return (event: MouseEvent<HTMLButtonElement>) => {
        };
    }

    function handleContactChange(contact: IHomeContact, field: keyof IHomeContact) {
        return (event: ChangeEvent) => {
            contact[field] = event.target.value;
            const _contacts = contacts.map(c => contact.id === c.id ? contact : c)
            setContacts(_contacts);
            if (props.onChange) props.onChange(_contacts);
        }
    }

    return <Grid container spacing={2}>
        {contacts.map((contact, index) => (<>
            <Grid item xs={2} md={1}>
                {index === 0
                    ? <IconButton onClick={handleAddContact(contact)}>
                        <AddIcon/>
                    </IconButton>
                    : <IconButton onClick={handleRemoveContact(contact)}>
                        <RemoveIcon/>
                    </IconButton>}
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
                            onChange={handleContactChange(contact, 'name')}
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
                            onChange={handleContactChange(contact, 'phone')}
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
                            onChange={handleContactChange(contact, 'email')}
                        />
                    </Grid>
                    {index < contacts.length
                        ? <Grid item xs={12}><Divider/></Grid>
                        : null}
                </Grid>
            </Grid>
        </>))}
    </Grid>
};

export default HomeContacts;
