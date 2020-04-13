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
import delay from "lodash/delay";

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
  const [home, setHome] = useState<FosterHome>(INIT_HOME);
  const initHome = useSelector<AppState, FosterHome>((state) =>
    get(state, `firestore.data.${COLLECTION_PATH}.${id}`, null)
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (!isNew && isLoaded(initHome) && !isEmpty(initHome)) setHome(initHome);
  }, [isNew, initHome]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      if (isNew) await firestore.add(COLLECTION_PATH, home);
      else await firestore.update(`${COLLECTION_PATH}/${id}`, home);
    } catch (err) {
      console.error(err);
    }
  }

  function handleReset(event: FormEvent) {
    setHome(initHome ? initHome : INIT_HOME);
  }

  function handleChange(field: keyof FosterHome, value: any) {
    return (event: ChangeEvent<HTMLInputElement>) =>
      setHome({
        ...home,
        [`${field}`]: get(event, "target.value", value),
      });
  }

  if (!isNew && (!isLoaded(initHome) || isEmpty(initHome)))
    return <AppLoading loading={true} />;
  if (!isNew && isEmpty(initHome))
    return (
      <AppInfo title={t("fosterHome.errors.loading")} message={"Test message"}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(FOSTER_HOMES_ROUTE.getPath())}
        >
          Ir Atras
        </Button>
      </AppInfo>
    );

  return (
    <Container>
      <AppTitle
        title={isNew ? t("fosterHome.addTitle") : t("fosterHome.editTitle")}
      />
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
              onChange={handleChange("name", "")}
            />
          </Grid>
          <Grid item xs={12}>
            <Address
              address={home.address}
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
                  startIcon={<SendIcon />}
                  fullWidth
                >
                  {isNew ? "Submit" : "Update"}
                </Button>
              </>
            </Tooltip>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditFosterHome;
