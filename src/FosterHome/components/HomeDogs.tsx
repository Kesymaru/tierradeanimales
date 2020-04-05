// import React, {ChangeEvent, FunctionComponent, useEffect, useState} from "react";
// import {connect, useDispatch} from "react-redux";

// import Grid from "@material-ui/core/Grid";
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import Checkbox from '@material-ui/core/Checkbox';
// import InputAdornment from "@material-ui/core/InputAdornment";
// import PetsIcon from '@material-ui/icons/Pets';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';

// import IDogState, {IDog} from "../../store/dogs/dogs.types";
// import IAppState, {TStatus} from "../../store/app.types";
// import {GetDogsToFosterHomes} from "../../store/dogs/dogs.actions";

// const checkBoxIcon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
// const checkedIcon = <CheckBoxIcon fontSize="small"/>;
// const adornment = (<InputAdornment position="start"><PetsIcon/></InputAdornment>);

// interface IHomeDogsProps extends Pick<IDogState, 'dogs'> {
//     selected: IDog[];
//     disabled?: boolean;
//     onChange?: (dogs: IDog[]) => void;
// }

// const HomeDogs: FunctionComponent<IHomeDogsProps> = (props) => {
//     const dispatch = useDispatch();
//     const [selected, setSelected] = useState<IDog[]>(props.selected);
//     const [dogs, setDogs] = useState<IDog[]>(props.dogs.data);
//     const [disabled, setDisabled] = useState<boolean>(!!props.disabled);

//     useEffect(() => {
//         setSelected(props.selected);
//         setDogs(props.dogs.data);
//         setDisabled(!!props.disabled);
//     }, [props.selected, props.disabled, props.dogs]);

//     init();

//     function init() {
//         if (props.dogs.status === TStatus.Empty)
//             dispatch(GetDogsToFosterHomes());
//     }

//     function handleChange(event: ChangeEvent<{}>, value: any | null) {
//         console.log('change', value);
//         setSelected(value);
//         if(props.onChange) props.onChange(value);
//     }

//     return <Grid container spacing={2}>
//         <Grid item xs={12}>
//             <Autocomplete
//                 multiple
//                 options={dogs}
//                 value={selected}
//                 disabled={disabled}
//                 disableCloseOnSelect
//                 getOptionLabel={option => option.name}
//                 renderOption={(option, {selected}) => (
//                     <React.Fragment>
//                         <Checkbox
//                             icon={checkBoxIcon}
//                             checkedIcon={checkedIcon}
//                             style={{marginRight: 8}}
//                             checked={selected}
//                         />
//                         {option.name}
//                     </React.Fragment>
//                 )}
//                 style={{width: '100%'}}
//                 renderInput={params => {
//                     const startAdornment = Array.isArray(params.InputProps.startAdornment)
//                         ? [adornment, ...params.InputProps.startAdornment]
//                         : adornment;
//                     params = {
//                         ...params, InputProps: {
//                             ...params.InputProps, startAdornment,
//                         }
//                     };
//                     return <TextField
//                         {...params}
//                         variant="outlined"
//                         label="HomePage Dogs"
//                         placeholder="Select Dogs"
//                         fullWidth
//                     />
//                 }}
//                 onChange={handleChange}
//             />
//         </Grid>
//     </Grid>
// };

// interface IHomeDogsOwnProps extends Omit<IHomeDogsProps, 'dogs'> {
// }

// const mapStateToProps = (state: IAppState, ownProps: IHomeDogsOwnProps): IHomeDogsProps => ({
//     ...ownProps,
//     dogs: state.dogs.dogs,
// });
// export default connect(mapStateToProps)(HomeDogs);
