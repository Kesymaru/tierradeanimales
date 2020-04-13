import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import FlagIcon from "@material-ui/icons/Flag";
import RoomIcon from "@material-ui/icons/Room";
import LinearProgress from "@material-ui/core/LinearProgress";

import {
  AppState,
  GeonamesCountry,
  GeonamesChildren,
  GeonamesCountriesState,
  GeonamesStatesState,
  GeonamesCountiesState,
  GeonamesCitiesState,
} from "@core/models";
import {
  GetCities,
  GetCounties,
  GetCountries,
  GetStates,
} from "@core/actions/geonames";
import { Address } from "@app/user/models";

interface AddressProps {
  address: Address;
  disabled?: boolean;
  onChange?: (address: Address) => void;
}

const UserAddress: FunctionComponent<AddressProps> = (props) => {
  const dispatch = useDispatch();
  const countries = useSelector<AppState, GeonamesCountriesState>(
    (state) => state.geonames.countries
  );
  const states = useSelector<AppState, GeonamesStatesState>(
    (state) => state.geonames.states
  );
  const counties = useSelector<AppState, GeonamesCountiesState>(
    (state) => state.geonames.counties
  );
  const cities = useSelector<AppState, GeonamesCitiesState>(
    (state) => state.geonames.cities
  );

  useEffect(() => {
    if (!countries.loading && !countries.loaded) {
      dispatch(GetCountries());
    }
    if (
      !states.loading &&
      !states.loaded &&
      props.address.country &&
      props.address.state
    )
      dispatch(GetStates(props.address.country));
    if (
      !counties.loading &&
      !counties.loaded &&
      props.address.state &&
      props.address.county
    )
      dispatch(GetCounties(props.address.state));
    if (
      !cities.loading &&
      !cities.loaded &&
      props.address.county &&
      props.address.city
    )
      dispatch(GetCities(props.address.county));
  }, [props.address, counties, states, counties, cities]);

  function getLoading(): boolean {
    return (
      countries.loaded || states.loaded || counties.loaded || cities.loaded
    );
  }

  function setData(values: any) {
    const _data = { ...props.address, ...values };
    // _setData(_data);
    if (props.onChange) props.onChange(_data);
  }

  function handleCountryChange(
    event: ChangeEvent<{}>,
    country: GeonamesCountry | null
  ) {
    setData({ country, state: null, county: null, city: null });
    if (country && country !== props.address.country)
      dispatch(GetStates(country));
  }

  function handleStateChange(
    event: ChangeEvent<{}>,
    state: GeonamesChildren | null
  ) {
    setData({ state, county: null, city: null });
    if (state && state !== props.address.state) dispatch(GetCounties(state));
  }

  function handleCountyChange(
    event: ChangeEvent<{}>,
    county: GeonamesChildren | null
  ) {
    setData({ county, city: null });
    if (county && county !== props.address.county) dispatch(GetCities(county));
  }

  function handleCityChange(event: ChangeEvent<{}>, city: any | null) {
    setData({ city });
  }

  function handleAddressChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setData({ address: get(event, "target.value", props.address.address) });
  }

  if (!counties.loading && counties.loaded && isEmpty(counties.data))
    return <>Error: loading countries</>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={3}>
        <Autocomplete
          style={{ width: "100%" }}
          value={props.address.country}
          disabled={props.disabled || counties.loading}
          onChange={handleCountryChange}
          options={countries.data || []}
          autoHighlight
          getOptionLabel={(option) => option.countryName}
          renderOption={(option) => (
            <React.Fragment>
              {option.icon ? <span>{option.icon}</span> : null}
              {option.countryName}
            </React.Fragment>
          )}
          renderInput={(params) => {
            const adornment = (
              <InputAdornment position="start">
                {props.address.country ? (
                  props.address.country.icon
                ) : (
                  <FlagIcon />
                )}
              </InputAdornment>
            );
            const startAdornment = Array.isArray(
              params.InputProps.startAdornment
            )
              ? [adornment, ...params.InputProps.startAdornment]
              : adornment;

            params = {
              ...params,
              InputProps: {
                ...params.InputProps,
                startAdornment,
              },
            };
            return (
              <TextField
                {...params}
                label="Country"
                variant="outlined"
                fullWidth
              />
            );
          }}
        />
        {countries.loading && (
          <LinearProgress variant="indeterminate" color="secondary" />
        )}
      </Grid>
      <Grid item xs={6} md={3}>
        <Autocomplete
          style={{ width: "100%" }}
          value={props.address.state}
          disabled={props.disabled || states.loading || !props.address.country}
          onChange={handleStateChange}
          options={states.data || []}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(option) => (
            <React.Fragment>{option.name}</React.Fragment>
          )}
          renderInput={(params) => (
            <TextField {...params} label="State" variant="outlined" fullWidth />
          )}
        />
        {states.loading && (
          <LinearProgress variant="indeterminate" color="secondary" />
        )}
      </Grid>
      <Grid item xs={6} md={3}>
        <Autocomplete
          style={{ width: "100%" }}
          value={props.address.county}
          disabled={props.disabled || counties.loading || !props.address.state}
          onChange={handleCountyChange}
          options={counties.data || []}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(option) => (
            <React.Fragment>{option.name}</React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="County"
              variant="outlined"
              fullWidth
            />
          )}
        />
        {counties.loading && (
          <LinearProgress variant="indeterminate" color="secondary" />
        )}
      </Grid>
      <Grid item xs={6} md={3}>
        <Autocomplete
          style={{ width: "100%" }}
          value={props.address.city}
          disabled={props.disabled || cities.loading || !props.address.county}
          onChange={handleCityChange}
          options={cities.data || []}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(option) => (
            <React.Fragment>{option.name}</React.Fragment>
          )}
          renderInput={(params) => (
            <TextField {...params} label="City" variant="outlined" fullWidth />
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
                <RoomIcon />
              </InputAdornment>
            ),
          }}
          value={props.address.address}
          disabled={props.disabled || cities.loading}
          onChange={handleAddressChange}
        />
        {cities.loading && (
          <LinearProgress variant="indeterminate" color="secondary" />
        )}
      </Grid>
    </Grid>
  );
};

export default UserAddress;
