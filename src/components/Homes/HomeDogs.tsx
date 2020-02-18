import React, {ChangeEvent, FunctionComponent, useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";

import Grid from "@material-ui/core/Grid";
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';

import IDogState, {IDog, IDogStatus} from "../../store/dogs/dogs.types";
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
    const [dogs, setDogs] = useState<IDog[]>([]);
    const [disabled, setDisabled] = useState<boolean>(!!props.disabled);

    useEffect(() => {
        setDisabled(!!props.disabled);
    }, [props.dogs]);

    init();
    function init() {
        if (props.dogs.status === TStatus.Empty)
            dispatch(GetDogsToFosterHomes());
    }

    function handleChange(event: ChangeEvent<{ value: unknown }>) {
    }

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            {/*<FormControl variant="outlined">
                <InputLabel>City</InputLabel>
                <Select
                    value={selected}
                    onChange={handleChange}
                >
                    {dogs.map(dog => (
                        <MenuItem value={dog.id}>
                            {dog.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>*/}

            <FormControl>
                <InputLabel>Dogs to home</InputLabel>
                <Select
                    multiple
                    value={selected}
                    disabled={disabled}
                    onChange={handleChange}
                    input={<Input/>}
                    renderValue={items => (
                        <div>
                            {(items as IDog[]).map(dog => (
                                <Chip key={dog.id} label={dog.name}/>
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {selected.map(dog => (
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
