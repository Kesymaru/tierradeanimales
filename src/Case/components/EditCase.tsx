import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useFirestore,
  useFirestoreConnect,
  isLoaded,
  isEmpty,
} from "react-redux-firebase";
import get from "lodash/get";

import Zoom from "@material-ui/core/Zoom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";

import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SendIcon from "@material-ui/icons/Send";
import SaveIcon from "@material-ui/icons/Save";
import RotateRightIcon from "@material-ui/icons/RotateRight";

import { AppState } from "@core/models";
import { CollectionsConfig } from "@core/config";
import useId from "@core/hooks/useId";
import { AddAlert } from "@core/actions/alert";

import { Case, Sex, CaseStatus } from "../models";
import INIT_CASE from "../constants";
import { ADMIN_CASES_ROUTE } from "../routes";
import FosterHomeSelect from "@app/fosterHome/components/FosterHomeSelect";
import CaseImages from "../components/CaseImages";
import AppFileManager from "@core/components/AppFileManager";

const { case: COLLECTION } = CollectionsConfig;

export const EditCase: FunctionComponent<{}> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const { isNew, id } = useId();
  const firestore = useFirestore();
  useFirestoreConnect({
    collection: COLLECTION,
    doc: id,
  });
  const loadedData = useSelector<AppState, Case>((state) =>
    get(state, `firestore.data.${COLLECTION}.${id}`, null)
  );
  const [data, setData] = useState<Case>(INIT_CASE);
  let handleSubmitFile: Function = () => {};

  console.log("loadedData", loadedData);

  useEffect(() => {
    if (!isNew && isLoaded(loadedData) && !isEmpty(loadedData))
      setData(loadedData);
  }, [isNew, loadedData]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      data.images = await handleSubmitFile();
      if (isNew) {
        await firestore.add(COLLECTION, data);
      } else {
        await firestore.update(`${COLLECTION}/${id}`, data);
      }
      dispatch(AddAlert({ message: "Success", color: "error" }));
      history.push(ADMIN_CASES_ROUTE.getPath());
    } catch (err) {
      console.error(err);
      dispatch(AddAlert({ message: "Error", color: "error" }));
    }
  }

  function handleFilesChanges(files: any) {
    console.log("files change =>", files);
  }

  function handleReset() {
    setData(loadedData ? loadedData : INIT_CASE);
  }

  function handleDataChange(key: keyof Case, type: string = "string") {
    return (event: ChangeEvent<HTMLInputElement>, checked?: boolean) => {
      let value: any = event.target.value;
      if (type === "number") value = parseInt(event.target.value);
      if (typeof checked === "boolean") value = checked;

      setData({ ...data, [`${key}`]: value });
    };
  }

  function handleSexChange(event: ChangeEvent<{ value: unknown }>) {
    setData({ ...data, sex: get(event, "target.value", data.sex) as Sex });
  }

  function handleStatusChange(event: ChangeEvent<{ value: unknown }>) {
    const status = get(event, "target.value", data.status) as CaseStatus;
    setData({ ...data, status });
  }

  function handleStartCase(event: MouseEvent<HTMLButtonElement>) {
    setData({ ...data, ...{ start: !data.start } });
  }

  function handleFosterHomeChange(id: string) {
    setData({
      ...data,
      fosterHomeId: id,
    });
  }

  console.log("loaded case", data);

  return (
    <Container>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "end",
            }}
          >
            <IconButton
              color="primary"
              size="medium"
              aria-label="Start Dog"
              onClick={handleStartCase}
            >
              {data.start ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Zoom in={true} style={{ transitionDelay: "250ms" }}>
              <Avatar
                alt="Dog Profile Image"
                src={data.avatar ? data.avatar.src : undefined}
                style={{
                  height: 100,
                  width: 100,
                  margin: "0 auto",
                }}
              />
            </Zoom>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            <FormControlLabel
              value="public"
              control={
                <Switch
                  color="primary"
                  value={data.public}
                  checked={data.public}
                  onChange={handleDataChange("public")}
                />
              }
              label="Public"
              labelPlacement="start"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={data.name}
              onChange={handleDataChange("name")}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <TextField
              label="Age"
              variant="outlined"
              type="number"
              fullWidth
              value={data.age}
              onChange={handleDataChange("age", "number")}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <FormControl variant="outlined" style={{ display: "flex" }}>
              <InputLabel id="sex">Sex</InputLabel>
              <Select
                labelId="sex"
                id="sex"
                value={data.sex}
                onChange={handleSexChange}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <FormControl variant="outlined" style={{ display: "flex" }}>
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                id="status"
                value={data.status}
                onChange={handleStatusChange}
              >
                <MenuItem value={CaseStatus.RESCUED}>Rescued</MenuItem>
                <MenuItem value={CaseStatus.HOSPITALIZED}>
                  Hospitalized
                </MenuItem>
                <MenuItem value={CaseStatus.FOSTER_HOME}>Foster Home</MenuItem>
                <MenuItem value={CaseStatus.ADOPTED}>Adopted</MenuItem>
                <MenuItem value={CaseStatus.DECEASED}>Deceased</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Zoom
            in={data.status === CaseStatus.FOSTER_HOME}
            unmountOnExit={true}
          >
            <Grid item xs={12}>
              <FosterHomeSelect
                id={data.fosterHomeId}
                onChange={handleFosterHomeChange}
              />
            </Grid>
          </Zoom>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              value={data.description}
              onChange={handleDataChange("description")}
            />
          </Grid>
          <Grid item xs={12}>
            <AppFileManager
              collection={COLLECTION}
              files={data.images}
              setSubmit={(submitFile) => (handleSubmitFile = submitFile)}
              onChange={(images) => setData({ ...data, images })}
            />
          </Grid>
          <Zoom in={true}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                type="reset"
                color="secondary"
                style={{ width: "100%" }}
                startIcon={<RotateRightIcon />}
              >
                Reset
              </Button>
            </Grid>
          </Zoom>
          <Zoom in={true}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                style={{ width: "100%" }}
                startIcon={isNew ? <SendIcon /> : <SaveIcon />}
              >
                {isNew ? "Save" : "Update"}
              </Button>
            </Grid>
          </Zoom>
        </Grid>
      </form>
    </Container>
  );
};

export default EditCase;
