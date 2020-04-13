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
import { AppTitle, AppAlert, AppAlertProps } from "@core/components";

import { EDIT_FOSTER_HOME_ROUTE } from "../routes";
import AppLoading from "@core/components/AppLoading";
import AppInfo from "@core/components/AppInfo";

const { fosterHome: COLLECTION_PATH } = CollectionsConfig;

export const EditFosterHome: FunctionComponent<{}> = (props) => {
  const history = useHistory();
  const firestore = useFirestore();
  const { isNew, id } = useId();
  useFirestoreConnect({
    collection: COLLECTION_PATH,
    doc: id,
  });
  const initHome = useSelector<AppState, FosterHome>((state) =>
    get(state, `firestore.data.${COLLECTION_PATH}.${id}`, null)
  );
  const loading = !isNew && !isLoaded(initHome);
  const empty = !loading && isEmpty(initHome);
  const [home, setHome] = useState<FosterHome>(!empty ? initHome : INIT_HOME);
  const { t } = useTranslation();

  console.log("----------------");
  console.log("isNew", isNew);
  console.log("id", id);
  console.log("init", initHome);
  console.log("home", home);
  console.log("loading", loading);
  console.log("is empty", isEmpty(initHome));

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const save = isNew ? firestore.add : firestore.update;
    try {
      await save(COLLECTION_PATH, home);
      // setAlert({ color: "success", message: `Home added succesfuly` });
    } catch (err) {
      // setAlert({ color: "error", message: t("newsletter.success") });
    }
  }

  function handleReset(event: FormEvent) {
    // setHome(initHome);
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
      <AppTitle
        title={isNew ? t("fosterHome.addTitle") : t("fosterHome.editTitle")}
      />
      {/* <AppInfo
        show={!loading && empty}
        title={t("fosterHome.errors.loading")}
        message={"Test \ntEST"}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(FOSTER_HOMES_ROUTE.getPath())}
        >
          Ir Atras
        </Button>
      </AppInfo> */}
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
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  ),
                }}
                value={home.name}
                disabled={loading || empty}
                onChange={handleChange("name", "")}
              />
            </Grid>
            <Grid item xs={12}>
              <Address
                address={home.address}
                disabled={loading || empty}
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
                <>
                  <Button
                    type="reset"
                    variant="contained"
                    color="secondary"
                    disabled={loading || empty}
                    startIcon={<CloseIcon />}
                    fullWidth
                  >
                    Reset
                  </Button>
                </>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Tooltip title="Submit">
                <>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading || empty}
                    startIcon={<SendIcon />}
                    fullWidth
                  >
                    {loading ? "Loading" : isNew ? "Submit" : "Update"}
                  </Button>
                </>
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
