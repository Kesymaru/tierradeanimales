import React, {
  useState,
  useEffect,
  FunctionComponent,
  MouseEvent,
  ChangeEvent,
} from "react";
import { useTranslation } from "react-i18next";
import get from "lodash/get";
import { Moment } from "moment";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

import { AppFileManager } from "@core/components";
import { CaseBio as ICaseBio } from "../models";
import { INIT_CASE_BIO } from "../constants";
import { Typography } from "@material-ui/core";

export interface CaseBioProps {
  data: Array<ICaseBio> | undefined;
  disabled?: boolean;
  onChange?: (contacts: Array<ICaseBio>) => void;
}

export const CaseBio: FunctionComponent<CaseBioProps> = (props) => {
  const { t } = useTranslation();
  const [data, setData] = useState<Array<ICaseBio>>([]);

  useEffect(() => {
    setData(props.data || []);
  }, [props]);

  function handleAdd(event: MouseEvent<HTMLButtonElement>) {
    const _data = [...data, INIT_CASE_BIO];
    setData(_data);
    if (props.onChange) props.onChange(_data);
  }

  function handleDelete(index: number) {
    return (event: MouseEvent<HTMLButtonElement>) => {
      const _data = data.filter((b, i) => i !== index);
      setData(_data);
      if (props.onChange) props.onChange(_data);
    };
  }

  function _updateItem(index: number, field: keyof ICaseBio, value: any) {
    if (!value) return;

    const item = data[index] ? { ...data[index] } : null;
    if (!item) return;

    item[field] = value;
    const _data = data.map((d, i) => (i === index ? item : d));

    setData(_data);
    if (props.onChange) props.onChange(_data);
  }

  function handleChange(
    index: number,
    field: keyof ICaseBio
  ): (event: ChangeEvent<HTMLInputElement>) => void {
    return (event: ChangeEvent<HTMLInputElement>) =>
      _updateItem(index, field, get(event, "target.value", null));
  }

  function handleDateChange(index: number) {
    return (date: Moment | null) => _updateItem(index, "date", date?.toDate());
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography variant="h4">{t("case.bio.title")}</Typography>
      </Grid>
      <Grid item>
        <Tooltip title={t("case.bio.add")}>
          <IconButton onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={12}>
        {data.map((bio: ICaseBio, index: number) => (
          <Zoom in={true} unmountOnExit={true} key={index}>
            <Grid container spacing={2}>
              <Grid item xs={2} sm={1}>
                <Box
                  display="flex"
                  flexDirection="reverse-row"
                  alignContent="flex-end"
                >
                  <Tooltip title={t("case.bio.delete")}>
                    <IconButton onClick={handleDelete(index)}>
                      <RemoveIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item xs={10} sm={11}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t("case.bio.name")}
                      variant="outlined"
                      fullWidth
                      multiline
                      disabled={props.disabled}
                      value={bio.title}
                      onChange={handleChange(index, "title")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <KeyboardDatePicker
                      label={t("case.bio.date")}
                      id="date-picker-inline"
                      disableToolbar
                      variant="inline"
                      inputVariant="outlined"
                      format={t("app.dateFormat")}
                      margin="normal"
                      value={bio.date}
                      onChange={handleDateChange(index)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={t("case.bio.description")}
                      variant="outlined"
                      fullWidth
                      multiline
                      disabled={props.disabled}
                      value={bio.description}
                      onChange={handleChange(index, "description")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AppFileManager
                      title={t("case.bio.upload.title")}
                      message={t("case.bio.upload.message")}
                      accept={["image/*", "application/pdf"]}
                      collection={"blogs_test"}
                      files={bio.files}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </Zoom>
        ))}
      </Grid>
    </Grid>
  );
};

export default CaseBio;
