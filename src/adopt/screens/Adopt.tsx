import React, { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { Screen } from "@core/wrappers";

import { Adopt, AdoptResults } from "../models";
import INIT_ADOPT from "../constants";

export const AdoptForm: FunctionComponent<{}> = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [data, setData] = useState<Adopt>(INIT_ADOPT);

  const onSubmit = () => {
    console.log("on submit", data);
  };

  return (
    <Screen t="adopt" isLoaded={true} isEmpty={false}>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label={"name"}
                name="description"
                autoComplete="email"
                autoFocus
                value={data.descriptiopn}
                onChange={handleEmailChange}
                disabled={loading}
              /> */}
            </Grid>
          </Grid>
        </form>
        >
      </Container>
    </Screen>
  );
};

export default AdoptForm;
