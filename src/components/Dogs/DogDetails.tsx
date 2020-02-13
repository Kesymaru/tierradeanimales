import React, {FunctionComponent, useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import Zoom from "@material-ui/core/Zoom";
import Fade from "@material-ui/core/Fade";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

import PetsIcon from '@material-ui/icons/Pets';

import IAppState, {TStatus} from "../../store/app.types";
import {IDog, IDogState} from "../../store/dogs/dogs.types";
import {GetDog} from "../../store/dogs/dogs.actions";

interface IDogDetailsProps extends Pick<IDogState, 'dog'> {
}

const DogDetails: FunctionComponent<IDogDetailsProps> = (props) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [dog, setDog] = useState<IDog | null>(props.dog.data);
    const [loading, setLoading] = useState<boolean>(_getLoading());

    useEffect(() => {
        setDog(props.dog.data);
        setLoading(_getLoading());
    }, [props.dog]);

    if (id && props.dog.status === TStatus.Empty)
        dispatch(GetDog(id));

    function _getLoading(): boolean {
        return props.dog.status === TStatus.Fetching;
    }

    if(loading) return <Container>
        <Typography>Loading Dog details</Typography>
        <LinearProgress color="primary"/>
    </Container>;

    return <Container>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Zoom in={true} style={{transitionDelay: '250ms'}}>
                    <Avatar
                        alt="Dog Profile Image"
                        src={dog && dog.avatar ? dog.avatar.src : undefined}
                        style={{
                            height: 100,
                            width: 100,
                            margin: '0 auto'
                        }}
                    />
                </Zoom>
            </Grid>
            <Grid item xs={12}>
                <Fade in={true}>
                    <Typography component="h1" variant="h5" style={{textAlign: 'center'}}>
                        {dog ? dog.name : ''}
                    </Typography>
                </Fade>
            </Grid>
            <Grid item xs={12}>
                dogs images gallery goes here
            </Grid>

            <Hidden smDown><Grid item md={4} lg={3}></Grid></Hidden>
            <Zoom in={!loading}>
                <Grid item xs={12} md={4} lg={3} hidden={loading}>
                    <Button
                        variant="contained"
                        type="reset"
                        color="primary"
                        style={{width: '100%'}}
                        startIcon={<PetsIcon/>}
                    >
                        Adopt
                    </Button>
                </Grid>
            </Zoom>
            <Hidden smDown><Grid item md={4} lg={3}></Grid></Hidden>
        </Grid>
    </Container>
};

const mapStateToProps = (state: IAppState): IDogDetailsProps => ({
    dog: state.dogs.dog
});
export default connect(mapStateToProps)(DogDetails);
