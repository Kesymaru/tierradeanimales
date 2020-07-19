import React, {
  useState,
  useEffect,
  FunctionComponent,
  MouseEvent,
  ChangeEvent,
} from "react";
import { useTranslation } from "react-i18next";
import get from "lodash/get";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { AppFileManager } from "@core/components";
import { CaseBio as ICaseBio } from "../models";
import { INIT_CASE_BIO } from "../constants";
import { Typography } from "@material-ui/core";

export interface CaseBioProps {
  data: Array<ICaseBio>;
  disabled?: boolean;
  onChange?: (contacts: Array<ICaseBio>) => void;
}

export const CaseBio: FunctionComponent<CaseBioProps> = (props) => {
  const { t } = useTranslation();
  const [data, setData] = useState<Array<ICaseBio>>([]);

  useEffect(() => {
    setData(props.data);
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

  function handleChange(index: number, field: keyof ICaseBio) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const item = data[index] ? { ...data[index] } : null;
      if (!item) return;

      item[field] = get(event, "target.value", item[field]);
      const _data = data.map((d, i) => (i === index ? item : d));

      setData(_data);
      if (props.onChange) props.onChange(_data);
    };
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography variant="h3">{t("case.bio.title")}</Typography>
      </Grid>
      <Grid item>
        <Tooltip title={t("case.bio.add")}>
          <IconButton onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      {data.map((item: ICaseBio, index: number) => (
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
                <Grid item xs={6}>
                  <TextField
                    label={t("case.bio.name")}
                    variant="outlined"
                    fullWidth
                    multiline
                    disabled={props.disabled}
                    value={item.title}
                    onChange={handleChange(index, "title")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label={t("case.bio.date")}
                    variant="outlined"
                    fullWidth
                    multiline
                    disabled={props.disabled}
                    value={item.date}
                    onChange={handleChange(index, "date")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t("case.bio.description")}
                    variant="outlined"
                    fullWidth
                    multiline
                    disabled={props.disabled}
                    value={item.description}
                    onChange={handleChange(index, "description")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AppFileManager
                    title={"Files for " + (item.title ? item.title : "Blog")}
                    message={"Select or Drag and Drop images or PDF files"}
                    accept={["image/*", "application/pdf"]}
                    collection={"blogs_test"}
                    files={item.files}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Zoom>
      ))}
    </Grid>
  );
};

export default CaseBio;
