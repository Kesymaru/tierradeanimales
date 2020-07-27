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
import FaceIcon from "@material-ui/icons/Face";

import { AppState } from "@core/models";
import { CollectionsConfig } from "@core/config";
import useId from "@core/hooks/useId";
import { useData } from "@core/hooks";
import { AddAlert } from "@core/actions/alert";

import { Case, Sex, CaseStatus } from "../models";
import { INIT_CASE } from "../constants";
import { ADMIN_CASES_ROUTE } from "../routes";
import FosterHomeSelect from "@app/fosterHome/components/FosterHomeSelect";
import AppFileManager from "@core/components/AppFileManager";
import { CaseBio } from "../components";

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
  // const [data, setData] = useState<Case>(INIT_CASE);
  let handleSubmitFile: Function = () => {};

  const { data, setData, resetData, saveOrUpdate } = useData<Case>(
    COLLECTION,
    INIT_CASE
  );

  useEffect(() => {
    if (!isNew && isLoaded(loadedData) && !isEmpty(loadedData))
      setData(loadedData);
  }, [isNew, loadedData]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      // const images = await handleSubmitFile();
      // console.log("data images");
      // setData({ ...data, images });

      const result = await saveOrUpdate();
      const message = t(`case.messages.${result.isNew ? "new" : "update"}`);
      dispatch(AddAlert({ message, color: "success" }));
      history.push(ADMIN_CASES_ROUTE.getPath());
    } catch (err) {
      dispatch(AddAlert({ message: "Error", color: "error" }));
    }
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
                src={data.avatar ? data.avatar.preview : undefined}
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
              label={t("case.name")}
              variant="outlined"
              fullWidth
              value={data.name}
              onChange={handleDataChange("name")}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <TextField
              label={t("case.age")}
              variant="outlined"
              type="number"
              fullWidth
              value={data.age}
              onChange={handleDataChange("age", "number")}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <FormControl variant="outlined" style={{ display: "flex" }}>
              <InputLabel id="sex">{t("app.sex")}</InputLabel>
              <Select
                labelId="sex"
                id="sex"
                value={data.sex}
                onChange={handleSexChange}
              >
                <MenuItem value={"Male"}>{t("app.male")}</MenuItem>
                <MenuItem value={"Female"}>{t("app.female")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <FormControl variant="outlined" style={{ display: "flex" }}>
              <InputLabel id="status">{t("case.status")}</InputLabel>
              <Select
                labelId="status"
                id="status"
                value={data.status}
                onChange={handleStatusChange}
              >
                <MenuItem value={CaseStatus.RESCUED}>
                  {t("case.rescued")}
                </MenuItem>
                <MenuItem value={CaseStatus.HOSPITALIZED}>
                  {t("case.hospitalized")}
                </MenuItem>
                <MenuItem value={CaseStatus.FOSTER_HOME}>
                  {t("case.fosterHome")}
                </MenuItem>
                <MenuItem value={CaseStatus.ADOPTED}>
                  {t("case.adopted")}
                </MenuItem>
                <MenuItem value={CaseStatus.DECEASED}>
                  {t("case.deceased")}
                </MenuItem>
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
              label={t("case.description")}
              variant="outlined"
              fullWidth
              multiline
              value={data.description}
              onChange={handleDataChange("description")}
            />
          </Grid>
          <Grid item xs={12}>
            <AppFileManager
              title={t("case.dragNdrop")}
              accept={"image/*"}
              collection={COLLECTION}
              files={data.images}
              setSubmit={(submitFile) => (handleSubmitFile = submitFile)}
              onChange={(images) => setData({ ...data, images })}
              actions={[
                {
                  title: "Set Profile",
                  icon: FaceIcon,
                  onClick: (avatar) => setData({ ...data, avatar }),
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <CaseBio
              data={data.bio}
              onChange={(bio) => {
                console.log("on change for bios", bio);
                setData({ ...data, bio });
              }}
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
                {t("app.reset")}
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
                {t(isNew ? "app.save" : "app.update")}
              </Button>
            </Grid>
          </Zoom>
        </Grid>
      </form>
    </Container>
  );
};

export default EditCase;
