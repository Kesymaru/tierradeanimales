import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useFirestore,
  useFirestoreConnect,
  isLoaded,
  isEmpty,
} from "react-redux-firebase";
import { useTranslation } from "react-i18next";
import get from "lodash/get";

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

import CollectionsConfig from "@core/config/firestore";
import AppState from "@core/models/store";
import useId from "@core/hooks/useId";
import FosterHome from "../models/fosterHome";
import HomeContacts from "../components/ForterHomeContacts";
import Address from "@app/user/components/Address";
import { FOSTER_HOMES_ROUTE } from "../routes";
import INIT_HOME from "../constants/fosterHome";
import { AppTitle, Alert, AlertProps } from "@core/components";

import { EDIT_FOSTER_HOME_ROUTE } from "../routes";
import AppLoading from "@core/components/AppLoading";

const { fosterHome: COLLECTION_PATH } = CollectionsConfig;

export const EditFosterHome: FunctionComponent<{}> = (props) => {
  const history = useHistory();
  const firestore = useFirestore();
  const { isNew, id } = useId();
  useFirestoreConnect({
    collection: COLLECTION_PATH,
    // limit: 1,
    doc: id,
  });
  const initHome = useSelector<AppState, FosterHome>((state) =>
    isNew
      ? INIT_HOME
      : get(state, `firestore.data.${COLLECTION_PATH}.${id}`, INIT_HOME)
  );
  const [home, setHome] = useState<FosterHome>(initHome);
  const [alert, setAlert] = useState<AlertProps>({ message: "" });
  const { t } = useTranslation();
  const loading = !isNew && !isLoaded(initHome);

  useEffect(() => {
    setHome(initHome);
  }, [initHome]);

  console.log("isNew", isNew);
  console.log("id", id);
  console.log("init", initHome);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const save = isNew ? firestore.add : firestore.update;
    try {
      await save(COLLECTION_PATH, home);
      setAlert({ color: "success", message: `Home added succesfuly` });
    } catch (err) {
      console.error("error saving/updating", home);
      setAlert({ color: "error", message: t("newsletter.success") });
    }
  }

  function handleReset(event: FormEvent) {
    setHome(initHome);
  }

  function handleChange(field: keyof FosterHome, value: any) {
    return (event: ChangeEvent<HTMLInputElement>) =>
      setHome({
        ...home,
        [`${field}`]: get(event, "target.value", value),
      });
  }

  return (
    <AppLoading loading={loading}>
      <Container>
        <AppTitle
          title={isNew ? t("fosterHome.addTitle") : t("fosterHome.editTitle")}
        />
        <Alert {...alert} />
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
                onChange={handleChange("name", "")}
              />
            </Grid>
            <Grid item xs={12}>
              <Address
                address={home.address}
                disabled={loading}
                onChange={(address) => setHome({ ...home, address })}
              />
            </Grid>

            {/* <Grid item xs={12}>
            <HomeDogs
              selected={fosterHome.dogs || []}
              disabled={loading}
              onChange={(dogs) => setHome({ ...fosterHome, dogs })}
            />
          </Grid> */}
            <Grid item xs={12}>
              {/* <HomeContacts
              contacts={fosterHome.contacts || []}
              disabled={loading}
              onChange={(contacts) => setHome({ ...fosterHome, contacts })}
            /> */}
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
                  Reset
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
    </AppLoading>
  );
};

export default EditFosterHome;
