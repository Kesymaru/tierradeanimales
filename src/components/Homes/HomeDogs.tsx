import React, {ChangeEvent, FunctionComponent, useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";

import Grid from "@material-ui/core/Grid";
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';

import IDogState, {IDog} from "../../store/dogs/dogs.types";
import IAppState, {TStatus} from "../../store/app.types";
import {GetDogsToFosterHomes} from "../../store/dogs/dogs.actions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface IHomeDogsProps extends Pick<IDogState, 'dogs'> {
    selected: IDog[];
    disabled?: boolean;
    onChange?: (dogs: IDog[]) => void;
}

const HomeDogs: FunctionComponent<IHomeDogsProps> = (props) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<IDog[]>(props.selected);
    const [selectedIds, setSelectedIds] = useState<string[]>(props.selected.map(dog => dog.id));
    const [dogs, setDogs] = useState<IDog[]>(props.dogs.data);
    const [disabled, setDisabled] = useState<boolean>(!!props.disabled);

    useEffect(() => {
        setSelected(props.selected);
        setSelectedIds(props.selected.map(dog => dog.id))
        setDogs(props.dogs.data);
        setDisabled(!!props.disabled);
    }, [props.selected, props.disabled, props.dogs]);

    init();

    function init() {
        if (props.dogs.status === TStatus.Empty)
            dispatch(GetDogsToFosterHomes());
    }

    function handleChange(event: ChangeEvent<{ value: unknown }>) {
        const ids = event.target.value as string[];
        setSelectedIds(ids);

        const _selected = ids.map(id => dogs.find(dog => dog.id === id)) as IDog[];
        setSelected(_selected);
        if (props.onChange) props.onChange(_selected);
    }

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <FormControl variant="outlined">
                <Select
                    multiple
                    value={selectedIds}
                    disabled={disabled}
                    onChange={handleChange}
                    input={<Input/>}
                    renderValue={() => (
                        <div>
                            {selected.map(dog => (
                                <Chip key={dog.id} label={dog.name}/>
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {dogs.map(dog => (
                        <MenuItem key={dog.id} value={dog.id}>
                            {dog.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    </Grid>
};

interface IHomeDogsOwnProps extends Omit<IHomeDogsProps, 'dogs'> {
}

const mapStateToProps = (state: IAppState, ownProps: IHomeDogsOwnProps): IHomeDogsProps => ({
    ...ownProps,
    dogs: state.dogs.dogs,
});
export default connect(mapStateToProps)(HomeDogs);
