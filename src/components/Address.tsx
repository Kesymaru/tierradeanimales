import React, {ChangeEvent, FunctionComponent, useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";

import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import FlagIcon from "@material-ui/icons/Flag";
import RoomIcon from "@material-ui/icons/Room";

import IGeonamesState, {IGeonamesChildren, IGeonamesCountry} from "../store/geonames/geonames.types";
import {GetError, HasError, IAddress, IAddressValidator} from "../constants/firebase/database";
import IAppState, {TStatus} from "../store/app.types";
import {GetCities, GetCounties, GetCountries, GetStates} from "../store/geonames/geonames.actions";
import {ValidationError, ValidationResult} from "@hapi/joi";

interface IAddressOwnProps {
    address: IAddress;
    disabled?: boolean;
    errors?: ValidationError | null;
    onChange?: (address: IAddress) => void;
}

interface IAddressProps extends IAddressOwnProps, IGeonamesState {
}

const Address: FunctionComponent<IAddressProps> = (props) => {
    const dispatch = useDispatch();

    const [data, setData] = useState<IAddress>(props.address);
    const [country, setCountry] = useState<IGeonamesCountry | null>(getCountry());
    const [state, setState] = useState<IGeonamesChildren | null>(getState());
    const [county, setCounty] = useState<IGeonamesChildren | null>(getCounty());
    const [city, setCity] = useState<IGeonamesChildren | null>(getCity());
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrrors] = useState<ValidationError | null>(null);

    useEffect(() => {
        setData(props.address);
        setCountry(getCountry());
        setState(getState());
        setCounty(getCounty());
        setCity(getCity());

        const _loading = getLoading();
        setLoading(_loading);
        if (props.errors && !_loading) validate(props.address);
        else setErrrors(null);
    }, [props]);

    init();

    function init() {
        // load countries
        if (props.address.country && props.countries.status === TStatus.Empty) {
            dispatch(GetCountries());
        }
        // load states
        if (props.address.country && props.states.status === TStatus.Empty) {
            const _country = getCountry();
            if (_country) dispatch(GetStates(_country));
        }
        // load counties
        if (props.address.state && props.counties.status === TStatus.Empty) {
            const _state = getState();
            if (_state) dispatch(GetCounties(_state));
        }
        // load cities
        if (props.address.county && props.cities.status === TStatus.Empty) {
            const _county = getCounty();
            if (_county) dispatch(GetCities(_county));
        }
    }

    function getCountry(name: string = props.address.country): IGeonamesCountry | null {
        return props.countries.data.find(country => country.countryName === name) || null;
    }

    function getState(): IGeonamesChildren | null {
        return props.states.data.find(s => s.name === props.address.state) || null;
    }

    function getCounty(): IGeonamesChildren | null {
        return props.counties.data.find(c => c.name === props.address.county) || null;
    }

    function getCity(): IGeonamesChildren | null {
        return props.cities.data.find(c => c.name === props.address.city) || null;
    }

    function getLoading(): boolean {
        return props.countries.status === TStatus.Fetching
            || props.states.status === TStatus.Fetching
            || props.counties.status === TStatus.Fetching
            || props.cities.status === TStatus.Fetching;
    }

    function validate(value: IAddress): boolean {
        const results = IAddressValidator(value) as ValidationResult;
        setErrrors(results.error || null);
        return !results.error;
    }

    function _setData(values: any) {
        const _data = {...data, ...values};
        setData(_data);
        validate(_data);
        if (props.onChange) props.onChange(_data);
    }

    function handleCountryChange(event: ChangeEvent<{}>, value: any | null) {
        setCountry(value);
        if (country !== value) {
            setState(null);
            setCounty(null);
            setCity(null);
        }
        if (value) _setData({country: value.countryName, state: '', county: '', city: ''});
        if (value && value !== country) dispatch(GetStates(value));
    }

    function handleStateChange(event: ChangeEvent<{}>, value: any | null) {
        setState(value);
        if (state !== value) {
            setCounty(null);
            setCity(null);
        }
        if (value) _setData({state: value.name, county: '', city: ''});
        if (value && value !== state) dispatch(GetCounties(value));
    }

    function handleCountyChange(event: ChangeEvent<{}>, value: any | null) {
        setCounty(value);
        if (county !== value) setCity(null);
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
                disabled={props.disabled || loading}
                onChange={handleCountryChange}
                options={props.countries.data}
                autoHighlight
                getOptionLabel={option => option.countryName}
                renderOption={option => (
                    <React.Fragment>
                        {option.icon
                            ? <span>{option.icon}</span>
                            : null}
                        {option.countryName}
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
                            error={HasError(['country'], errors)}
                            helperText={GetError(['country'], errors)}
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
                disabled={props.disabled || loading}
                onChange={handleStateChange}
                options={props.states.data}
                autoHighlight
                getOptionLabel={option => option.name}
                renderOption={option => (<React.Fragment>
                    {option.name}
                </React.Fragment>)}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="State"
                        variant="outlined"
                        error={HasError(['state'], errors)}
                        helperText={GetError(['state'], errors)}
                        fullWidth
                    />)}
            />
        </Grid>
        <Grid item xs={6} md={3}>
            <Autocomplete
                style={{width: '100%'}}
                value={county}
                disabled={props.disabled || loading}
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
                        error={HasError(['county'], errors)}
                        helperText={GetError(['county'], errors)}
                        fullWidth
                    />
                )}
            />
        </Grid>
        <Grid item xs={6} md={3}>
            <Autocomplete
                style={{width: '100%'}}
                value={city}
                disabled={props.disabled || loading}
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
                        error={HasError(['city'], errors)}
                        helperText={GetError(['city'], errors)}
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
                error={HasError(['address'], errors)}
                helperText={GetError(['address'], errors)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <RoomIcon/>
                        </InputAdornment>
                    ),
                }}
                value={data.address}
                disabled={props.disabled || loading}
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
