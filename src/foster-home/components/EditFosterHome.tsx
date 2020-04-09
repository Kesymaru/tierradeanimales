import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { ValidationError, ValidationResult } from "@hapi/joi";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import LinearProgress from "@material-ui/core/LinearProgress";

import HomeIcon from "@material-ui/icons/Home";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";

import { Status } from "@core/models";
import { useId } from "@core/hooks/route";

import HomeContacts from "./ForterHomeContacts";
// import HomeDogs from "./HomeDogs";
import Address from "../../user/components/Address";
import { FOSTER_HOMES_ROUTE } from "../routes";

export const EditFosterHome: FunctionComponent<{}> = (props) => {
  return <Container>here goes the edit forster home</Container>;

  /* const dispatch = useDispatch();
  const history = useHistory();
  const { isNew, id } = useId();
  const [home, _setHome] = useState<IHome>(getHome());
  const [loading, setLoading] = useState<boolean>(getLoading());
  const [errors, setErrors] = useState<ValidationError | null>(null);

  useEffect(() => {
    setHome(getHome());
    setLoading(getLoading());
  }, [props.home]);

  init();

  function init() {
    if (
      !isNew &&
      id &&
      (props.home.status === Status.Empty ||
        (props.home.status === Status.Loaded && props.home.id !== id))
    )
      dispatch(GetHome(id));
  }

  function getHome(): IHome {
    return isNew
      ? IHomeFactory()
      : props.home.data
      ? props.home.data
      : IHomeFactory();
  }

  function getLoading(): boolean {
    return props.home.status === Status.Fetching;
  }

  function setHome(value: IHome) {
    _setHome(value);
    validate(value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    console.log("save ->", home);
    if (isNew) return dispatch(SaveHome(home));
    dispatch(UpdateHome(home));
  }

  function handleReset(event: FormEvent) {
    if (isNew) return history.push(FOSTER_HOMES_ROUTE.getPath());
  }

  function handleChange(field: keyof IHome) {
    return (event: ChangeEvent<HTMLInputElement>) =>
      setHome({
        ...home,
        [`${field}`]: event.target.value,
      });
  }

  return (
    <Container>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              error={HasError(["name"], errors)}
              helperText={GetError(["name"], errors)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                ),
              }}
              value={home.name}
              disabled={loading}
              onChange={handleChange("name")}
            />
          </Grid>
          <Grid item xs={12}>
            <Address
              address={home.address}
              disabled={loading}
              errors={errors}
              onChange={(address) => setHome({ ...home, address })}
            />
          </Grid>

          <Grid item xs={12}>
            <HomeDogs
              selected={home.dogs || []}
              disabled={loading}
              onChange={(dogs) => setHome({ ...home, dogs })}
            />
          </Grid>
          <Grid item xs={12}>
            <HomeContacts
              contacts={home.contacts || []}
              disabled={loading}
              errors={errors}
              onChange={(contacts) => setHome({ ...home, contacts })}
            />
          </Grid>

          <Grid item xs={6}>
            <Tooltip title="Cancel">
              <Button
                type="reset"
                variant="contained"
                color="secondary"
                startIcon={<CloseIcon />}
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
                disabled={loading}
                startIcon={<SendIcon />}
                fullWidth
              >
                {loading ? "Loading" : isNew ? "Submit" : "Update"}
              </Button>
            </Tooltip>
            {loading ? <LinearProgress color="primary" /> : null}
          </Grid>
        </Grid>
      </form>
    </Container>
  ); */
};

export default EditFosterHome;
