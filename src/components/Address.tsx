import React, {ChangeEvent, FunctionComponent, useEffect, useState} from "react";

import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FlagIcon from "@material-ui/icons/Flag";
import RoomIcon from "@material-ui/icons/Room";

import Countries, {ICountry} from "../constants/countries";
import {IAddress, IAddressFactory} from "../constants/firebase/database";

interface IAddressProps {
    address: IAddress;
    disabled?: boolean;
    onChange?: (address: IAddress) => void;
}

const Address: FunctionComponent<IAddressProps> = (props) => {
    const [data, setData] = useState<IAddress>(props.address);

    const [country, setCountry] = useState<ICountry | null>(getCountry());
    // const [state, setState] = useState<string>('');
    // const [county, setCounty] = useState<string>('');
    // const [city, setCity] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(!!props.disabled);

    useEffect(() => {
        setCountry(getCountry());
        setDisabled(!!props.disabled);
    }, [props]);

    function getCountry(): ICountry | null {
        return Countries.find(c => c.name === props.address.country) || null
    }

    function handleAutocompleChange(field: keyof IAddress, setter: Function) {
        return (event: ChangeEvent<{}>, value: any | null) => {
            console.log('change', field, value);
            setter(value);
            if (value) setData({...data, [`${field}`]: value});
            ;
        };
    }

    function handleAddressChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const value = event.target.value;
        setAddress(value);
        setData({...data, address: value});
    }

    return <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
            <Autocomplete
                style={{width: '100%'}}
                value={country}
                disabled={disabled}
                onChange={handleAutocompleChange('country', setCountry)}
                options={Countries as ICountry[]}
                autoHighlight
                getOptionLabel={option => option.name}
                renderOption={option => (
                    <React.Fragment>
                        <span>{option.icon}</span>
                        {option.name}
                    </React.Fragment>
                )}
                renderInput={params => {
                    const adornment = (<InputAdornment position="start">
                        {country ? country.icon : <FlagIcon/>}
                    </InputAdornment>);
                    const startAdornment = Array.isArray(params.InputProps.startAdornment)
                        ? [adornment, ...params.InputProps.startAdornment]
                        : adornment;

                    params = {
                        ...params, InputProps: {
                            ...params.InputProps,
                            startAdornment,
                        }
                    };
                    return (
                        <TextField
                            {...params}
                            label="Country"
                            variant="outlined"
                            fullWidth
                        />
                    )
                }}
            />
        </Grid>
        <Grid item xs={6} md={3}>
            STATE
        </Grid>
        <Grid item xs={6} md={3}>
            COUNTY
        </Grid>
        <Grid item xs={6} md={3}>
            CITY
        </Grid>
        <Grid item xs={12}>
            <TextField
                label="Address"
                placeholder="Address"
                variant="outlined"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <RoomIcon/>
                        </InputAdornment>
                    ),
                }}
                value={address}
                disabled={disabled}
                onChange={handleAddressChange}
            />
        </Grid>
    </Grid>;
};

export default Address
