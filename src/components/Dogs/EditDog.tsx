import React, {ChangeEvent, FormEvent, FunctionComponent, MouseEvent, useEffect, useRef, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import Zoom from "@material-ui/core/Zoom";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";

import Container from "@material-ui/core/Container";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SendIcon from "@material-ui/icons/Send"
import SaveIcon from '@material-ui/icons/Save';
import RotateRightIcon from '@material-ui/icons/RotateRight';

import {IDog, IDogState, ISex} from "../../store/dogs/dogs.types";
import DogsActions from "../../store/dogs/dogs.actions";
import {IAppState, TStatus} from "../../store";
import DogImages from "./DogImages";

const InitDog: IDog = {
    id: '',
    name: '',
    age: 0,
    sex: 'male',
    status: '',
    description: '',
    public: false,
    start: false,
};

interface IEditDogProps extends Pick<IDogState, 'dog'> {
}

const EditDog: FunctionComponent<IEditDogProps> = (props) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const isNew = id && id.toLowerCase() === 'new';
    const [dog, setDog] = useState<IDog>(InitDog);
    const [loading, setLoading] = useState<boolean>(props.dog.status === TStatus.Fetching);

    useEffect(() => {
        setLoading(props.dog.status === TStatus.Fetching);
        if(props.dog.data) setDog(props.dog.data);
    }, [props.dog]);

    if (!isNew && id
        && props.dog.status === TStatus.Empty
        || (props.dog.data && props.dog.data.id !== id)) {
        if(id) dispatch(DogsActions.GetOne(id));
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        console.log('submit', isNew);
        if (isNew) dispatch(DogsActions.Add(dog));
        else dispatch(DogsActions.Update(dog))
        setLoading(value => !value);
    }

    function handleReset() {
        setDog(isNew ? InitDog : (props.dog.data || InitDog));
    }

    function handleDogChange(key: keyof IDog, type: string = 'string') {
        return (event: ChangeEvent<HTMLInputElement>, checked?: boolean) => {
            let value: any = event.target.value;
            if (type === 'number') value = parseInt(event.target.value);
            if (typeof checked === 'boolean') value = checked;

            setDog({...dog, ...{[`${key}`]: value}});
        }
    }

    function handleSexChange(event: ChangeEvent<{value: unknown}>) {
        console.log('sex changed');
        let sex = event.target.value as ISex;
        setDog({...dog, sex});
    }

    function handleStatusChange(event: ChangeEvent<{value: unknown}>) {
        console.log('status changed');
        let status = event.target.value as string;
        setDog({...dog, status});
    }

    function handleStartDog(event: MouseEvent<HTMLButtonElement>) {
        setDog({...dog, ...{start: !dog.start}});
    }

    return <Container>
        <form noValidate autoComplete="off" onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container spacing={2}>
                <Grid item
                      xs={4}
                      style={{
                          display: 'flex',
                          flexDirection: 'column-reverse',
                          alignItems: 'end',
                      }}
                >
                    <IconButton
                        color="primary"
                        size="medium"
                        aria-label="Start Dog"
                        disabled={loading}
                        onClick={handleStartDog}
                    >
                        {dog.start ? <StarIcon/> : <StarBorderIcon/>}
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <Zoom in={true} style={{transitionDelay: '250ms'}}>
                        <Avatar
                            alt="Dog Profile Image"
                            src={dog.avatar ? dog.avatar.src : undefined}
                            style={{
                                height: 100,
                                width: 100,
                                margin: '0 auto'
                            }}
                        />
                    </Zoom>
                </Grid>
                <Grid item
                      xs={4}
                      style={{
                          display: 'flex',
                          flexDirection: 'column-reverse'
                      }}
                >
                    <FormControlLabel
                        value="public"
                        control={<Switch
                            color="primary"
                            value={dog.public}
                            checked={dog.public}
                            disabled={loading}
                            onChange={handleDogChange('public')}
                        />}
                        label="Public"
                        labelPlacement="start"
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={dog.name}
                        disabled={loading}
                        onChange={handleDogChange('name')}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <TextField
                        label="Age"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={dog.age}
                        disabled={loading}
                        onChange={handleDogChange('age', 'number')}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <FormControl variant="outlined" style={{display: 'flex'}}>
                        <InputLabel id="sex">
                            Sex
                        </InputLabel>
                        <Select
                            labelId="sex"
                            id="sex"
                            value={dog.sex}
                            onChange={handleSexChange}
                        >
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <FormControl variant="outlined" style={{display: 'flex'}}>
                        <InputLabel id="status">
                            Status
                        </InputLabel>
                        <Select
                            labelId="status"
                            id="status"
                            value={dog.status}
                            onChange={handleStatusChange}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={'tes_status'}>status 1</MenuItem>
                            <MenuItem value={'female'}>status 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        value={dog.description}
                        disabled={loading}
                        onChange={handleDogChange('description')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DogImages
                        dog={dog}
                        loading={loading}
                        onImagesChange={(images) => setDog({...dog, images})}
                        onSelectAvatar={(avatar) => setDog({...dog, avatar})}
                    />
                </Grid>

                <Zoom in={!loading}>
                    <Grid item xs={6} hidden={loading}>
                        <Button
                            variant="contained"
                            type="reset"
                            color="secondary"
                            disabled={loading}
                            style={{width: '100%'}}
                            startIcon={<RotateRightIcon/>}
                        >
                            Reset
                        </Button>
                    </Grid>
                </Zoom>
                <Grid item xs={loading ? 12 : 6}>
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={props.dog.status === TStatus.Fetching}
                        style={{width: '100%'}}
                        startIcon={isNew ? <SendIcon/> : <SaveIcon/>}
                    >
                        {loading
                            ? isNew ? 'Saving' : 'Updating'
                            : isNew ? 'Save' : 'Update'}
                    </Button>
                    <Fade in={loading} style={{
                        transitionDelay: loading ? '500ms' : '0ms',
                    }}>
                        <LinearProgress color="primary"/>
                    </Fade>
                </Grid>

            </Grid>
        </form>
    </Container>;
};

const mapStateToProps = (state: IAppState): IEditDogProps => ({
    dog: state.dogs.dog
});
export default connect(mapStateToProps)(EditDog);
