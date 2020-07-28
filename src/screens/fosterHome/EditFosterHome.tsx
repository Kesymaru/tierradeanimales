import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import Typography from "@material-ui/core/Typography";

import HomeIcon from "@material-ui/icons/Home";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SendIcon from "@material-ui/icons/Send";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";

import CollectionsConfig from "@config/firestore";
import AppState from "@models/store";
import useId from "@hooks/useId";
import FosterHome from "@models/fosterHome";
import { FOSTER_HOMES_ROUTE, EDIT_FOSTER_HOME_ROUTE } from "@routes";
import INIT_HOME from "@constants/fosterHome";
import { AppTitle, AppLoading, AppInfo } from "@components";
import Address from "@components/Address";
import HomeContacts from "@components/ForterHomeContacts";
import { AddAlert } from "@state/actions/alert";

const { fosterHome: COLLECTION } = CollectionsConfig;

export const EditFosterHome: FunctionComponent<{}> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const { isNew, id } = useId();
  useFirestoreConnect({
    collection: COLLECTION,
    doc: id,
  });
  const [home, setHome] = useState<FosterHome>(INIT_HOME);
  const initHome = useSelector<AppState, FosterHome>((state) =>
    get(state, `firestore.data.${COLLECTION}.${id}`, null)
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (!isNew && isLoaded(initHome) && !isEmpty(initHome)) setHome(initHome);
  }, [isNew, initHome]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      if (isNew) await firestore.add(COLLECTION, home);
      else await firestore.update(`${COLLECTION}/${id}`, home);

      dispatch(
        AddAlert({
          message: t(`fosterHome.success.${isNew ? "add" : "update"}`),
          color: "success",
        })
      );
      history.push(FOSTER_HOMES_ROUTE.getPath());
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

  if (!isNew && !isLoaded(initHome)) return <AppLoading loading={true} />;
  if (!isNew && isEmpty(initHome))
    return (
      <AppInfo
        title={t("fosterHome.errors.empty")}
        message={t("fosterHome.errors.emptyMessage")}
        color="error"
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push(FOSTER_HOMES_ROUTE.getPath())}
          startIcon={<ArrowBackIcon />}
        >
          {t("app.goBack")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(EDIT_FOSTER_HOME_ROUTE.getPath())}
          startIcon={<AddIcon />}
        >
          {t("fosterHome.add")}
        </Button>
      </AppInfo>
    );

  return (
    <Container>
      <AppTitle title={isNew ? t("fosterHome.add") : t("fosterHome.edit")} />
      <Typography variant="h3">
        {isNew ? t("fosterHome.add") : t("fosterHome.edit")}
      </Typography>
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
          <Grid item xs={12}>
            <HomeContacts
              contacts={home.contacts || []}
              onChange={(contacts) => setHome({ ...home, contacts })}
            />
          </Grid>

          <Grid item xs={6}>
            <Tooltip title="Cancel">
              <>
                <Button
                  type="reset"
                  variant="contained"
                  color="secondary"
                  startIcon={<RotateLeftIcon />}
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
