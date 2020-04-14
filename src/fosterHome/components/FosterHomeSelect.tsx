import React, {
  FunctionComponent,
  ChangeEvent,
  useState,
  useEffect,
} from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import get from "lodash/get";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

import LinearProgress from "@material-ui/core/LinearProgress";

import HomeIcon from "@material-ui/icons/Home";

import { AppState } from "@core/models";
import { CollectionsConfig } from "@core/config";
import { FosterHome } from "../models";

export interface FosterHomeSelectProps {
  id: string;
  onChange?: (id: string) => void;
}

const { fosterHome: COLLECTION } = CollectionsConfig;

export const FosterHomeSelect: FunctionComponent<FosterHomeSelectProps> = (
  props
) => {
  const { t } = useTranslation();
  useFirestoreConnect({
    collection: COLLECTION,
    where: ["active", "==", true],
  });
  const data = useSelector<AppState, Array<FosterHome>>((state) =>
    get(state, `firestore.ordered.${COLLECTION}`)
  );
  const [selected, setSelected] = useState<FosterHome | null>(null);
  const loading = !isLoaded(data);

  useEffect(() => {
    if (isLoaded(data) && !isEmpty(data)) {
      const home = data.find((home) => home.id === props.id);
      if (home) setSelected(home);
    }
  }, [data]);

  function handleChange(event: ChangeEvent<{}>, home: FosterHome | null) {
    // const home = get(event, "target.value");
    if (props.onChange && home) props.onChange(home.id || "");
  }

  console.log("foster homes", selected, data);

  return (
    <>
      <Autocomplete
        style={{ width: "100%" }}
        value={selected}
        disabled={loading}
        onChange={handleChange}
        options={data || []}
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(option) => (
          <React.Fragment>{option.name}</React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Foster Home"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      {!isLoaded(data) && (
        <LinearProgress variant="indeterminate" color="primary" />
      )}
    </>
  );
};

export default FosterHomeSelect;
