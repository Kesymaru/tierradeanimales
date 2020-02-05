import React, {ChangeEvent, FormEvent, FunctionComponent, MouseEvent, useEffect, useState} from "react";
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

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SendIcon from "@material-ui/icons/Send"
import SaveIcon from '@material-ui/icons/Save';
import RotateRightIcon from '@material-ui/icons/RotateRight';

import {IDog, IDogState} from "../../store/dogs/dogs.types";
import DogsActions from "../../store/dogs/dogs.actions";
import {IAppState, TStatus} from "../../store";
import DogImages from "./DogImages";

const InitDog: IDog = {
    id: null,
    name: '',
    age: 0,
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

    function handleStartDog(event: MouseEvent<HTMLButtonElement>) {
        setDog({...dog, ...{start: !dog.start}});
    }

    return <Paper>
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
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={dog.name}
                        disabled={loading}
                        onChange={handleDogChange('name')}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={12}>
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
    </Paper>;
};

const mapStateToProps = (state: IAppState): IEditDogProps => ({
    dog: state.dogs.dog
});
export default connect(mapStateToProps)(EditDog);
