import React, {
  ChangeEvent,
  FunctionComponent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import get from "lodash/get";

import Zoom from "@material-ui/core/Zoom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import ContactMailIcon from "@material-ui/icons/ContactMail";

import { Contact } from "../models";
import { INIT_CONTACT } from "../constants";

export interface HomeContactsProps {
  contacts: Array<Contact>;
  disabled?: boolean;
  onChange?: (contacts: Array<Contact>) => void;
}

const HomeContacts: FunctionComponent<HomeContactsProps> = (props) => {
  const [contacts, setContacts] = useState<Contact[]>(props.contacts);

  function handleAdd(event: MouseEvent<HTMLButtonElement>) {
    const _contacts = [...contacts, { ...INIT_CONTACT }];
    setContacts(_contacts);
    if (props.onChange) props.onChange(_contacts);
  }

  function handleDelete(index: number) {
    return (event: MouseEvent<HTMLButtonElement>) => {
      const _contacts = contacts.filter((c, i) => i !== index);
      setContacts(_contacts);
      if (props.onChange) props.onChange(_contacts);
    };
  }

  function handleChange(index: number, field: keyof Contact) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const contact = contacts[index] || undefined;
      if (!contact) return;

      contact[field] = get(event, "target.value", contact[field]);
      const _contacts = contacts.map((c, i) => (i === index ? contact : c));

      setContacts(_contacts);
      if (props.onChange) props.onChange(_contacts);
    };
  }

  return (
    <>
      {contacts.map((contact, index) => (
        <Zoom in={true} unmountOnExit={true} key={index}>
          <Grid container spacing={2}>
            <Grid item xs={2} sm={1}>
              <Box display="flex" flexDirection="row-reverse">
                {index === 0 ? (
                  <Tooltip title="Add Contact">
                    <IconButton onClick={handleAdd}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Remove Contact">
                    <IconButton onClick={handleDelete(index)}>
                      <RemoveIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Grid>
            <Grid item xs={10} sm={11}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <TextField
                    label="Contact Name"
                    variant="outlined"
                    disabled={props.disabled}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PermContactCalendarIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={contact.name}
                    onChange={handleChange(index, "name")}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <TextField
                    label="Contact Phone"
                    variant="outlined"
                    disabled={props.disabled}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ContactPhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={contact.phone}
                    onChange={handleChange(index, "phone")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                  <TextField
                    label="Contact Email"
                    variant="outlined"
                    disabled={props.disabled}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ContactMailIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={contact.email}
                    onChange={handleChange(index, "email")}
                  />
                </Grid>
              </Grid>
            </Grid>
            {index < contacts.length - 1 ? (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            ) : null}
          </Grid>
        </Zoom>
      ))}
    </>
  );
};

export default HomeContacts;
