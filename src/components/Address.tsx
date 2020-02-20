import React, {ChangeEvent, FunctionComponent, useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";

import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import FlagIcon from "@material-ui/icons/Flag";
import RoomIcon from "@material-ui/icons/Room";

import Countries, {ICountry} from "../constants/countries";
import IGeonamesState from "../store/geonames/geonames.types";
import {IAddress} from "../constants/firebase/database";
import IAppState, {TStatus} from "../store/app.types";
import {GetCities, GetCounties, GetCountry, GetStates} from "../store/geonames/geonames.actions";

interface IAddressOwnProps {
    address: IAddress;
    disabled?: boolean;
    onChange?: (address: IAddress) => void;
}

interface IAddressProps extends IAddressOwnProps, IGeonamesState {
}

const Address: FunctionComponent<IAddressProps> = (props) => {
    const dispatch = useDispatch();

    const [data, setData] = useState<IAddress>(props.address);
    const [disabled, setDisabled] = useState<boolean>(!!props.disabled);
    const [country, setCountry] = useState<ICountry | null>(getCountry());
    const [state, setState] = useState<any | null>(null);
    const [county, setCounty] = useState<any | null>(null);
    const [city, setCity] = useState<any | null>(null);

    useEffect(() => {
        setDisabled(!!props.disabled);
    }, [props]);

    init();

    function init() {
        console.log('init');

        if (props.address.country && props.country.status === TStatus.Empty) {
            const _country = getCountry();
            if (_country) dispatch(GetCountry(_country.abbr))
        }
        if (props.address.country && props.country.status === TStatus.Loaded
            && (props.country.data && props.address.country !== props.country.data.countryName)) {
            const _country = getCountry();
            if (_country) dispatch(GetCountry(_country.abbr))
        }
        if (props.country.status === TStatus.Loaded
            && (props.states.status === TStatus.Empty)) {
            dispatch(GetStates(props.country.data))
        }
    }

    function getCountry(name: string = props.address.country): ICountry | null {
        return Countries.find(c => c.name === name) || null;
    }

    function _setData(values: any) {
        const _data = {...data, ...values};
        setData(_data);
        if (props.onChange) props.onChange(_data);
    }

    function handleCountryChange(event: ChangeEvent<{}>, value: any | null) {
        console.log('select country', value);

        setCountry(value);
        if(country !== value) {
            setState(null);
            setCounty(null);
            setCity(null);
        }
        if (value) _setData({country: value.name, state: '', county: '', city: ''});
        if (value && value !== country) dispatch(GetCountry(value.abbr));
    }

    function handleStateChange(event: ChangeEvent<{}>, value: any | null) {
        setState(value);
        if(state !== value) {
            setCounty(null);
            setCity(null);
        }
        if (value) _setData({state: value.name, county: '', city: ''});
        if (value && value !== state) dispatch(GetCounties(value));
    }

    function handleCountyChange(event: ChangeEvent<{}>, value: any | null) {
        setCounty(value);
        if(county !== value) setCity(null);
        if (value) _setData({county: value.name, city: ''});
        if (value && value !== county) dispatch(GetCities(value));
    }

    function handleCityChange(event: ChangeEvent<{}>, value: any | null) {
        setCity(value);
        if (value) _setData({city: value.name});
    }

    function handleAddressChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const address = event.target.value;
        const _data = {...data, address};
        setData(_data);
        if (props.onChange) props.onChange(_data);
    }

    return <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
            <Autocomplete
                style={{width: '100%'}}
                value={country}
                disabled={disabled}
                onChange={handleCountryChange}
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
            <Autocomplete
                style={{width: '100%'}}
                value={state}
                disabled={disabled}
                onChange={handleStateChange}
                options={props.states.data}
                autoHighlight
                getOptionLabel={option => option.name}
                renderOption={option => (
                    <React.Fragment>
                        {option.name}
                    </React.Fragment>
                )}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="State"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
        </Grid>
        <Grid item xs={6} md={3}>
            <Autocomplete
                style={{width: '100%'}}
                value={county}
                disabled={disabled}
                onChange={handleCountyChange}
                options={props.counties.data}
                autoHighlight
                getOptionLabel={option => option.name}
                renderOption={option => (
                    <React.Fragment>
                        {option.name}
                    </React.Fragment>
                )}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="County"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
        </Grid>
        <Grid item xs={6} md={3}>
            <Autocomplete
                style={{width: '100%'}}
                value={city}
                disabled={disabled}
                onChange={handleCityChange}
                options={props.cities.data}
                autoHighlight
                getOptionLabel={option => option.name}
                renderOption={option => (
                    <React.Fragment>
                        {option.name}
                    </React.Fragment>
                )}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="City"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
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
                value={data.address}
                disabled={disabled}
                onChange={handleAddressChange}
            />
        </Grid>
    </Grid>;
};

const mapStateToProps = (state: IAppState, ownProps: IAddressOwnProps): IAddressProps => ({
    ...ownProps,
    ...state.geonames,
});

export default connect(mapStateToProps)(Address);
