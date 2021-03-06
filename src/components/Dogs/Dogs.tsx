import React, {FunctionComponent, useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import {Container} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

import IAppState, {TStatus} from "../../store/app.types";
import IDogState, {IDog} from "../../store/dogs/dogs.types";
import {IPagination} from "../../constants/firebase/database";
import {GetDogs} from "../../store/dogs/dogs.actions";
import {DOG_DETAILS_ROUTE} from "./Dogs.routes";

interface IDogsProps extends Pick<IDogState, 'dogs'> {
}

const Dogs: FunctionComponent<IDogsProps> = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [dogs, setDogs] = useState<IDog[]>(props.dogs.data);
    const [pagination, setPagination] = useState<IPagination>({page: 0, rowPerPage: 100, count: 0});

    useEffect(() => {
        console.log('use effect dogs');
        setDogs(props.dogs.data);
    }, [props.dogs]);

    if (props.dogs.status === TStatus.Empty)
        dispatch(GetDogs(pagination));

    console.log('dogs', dogs);

    return <Container>
        <Grid container spacing={2}>
            {dogs.map(dog => (
                <Grid item xs={6} md={4} lg={3}>
                    <Card
                        key={dog.id}
                        onClick={() => history.push(DOG_DETAILS_ROUTE.getPath(dog))}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt={dog.name}
                                height="150"
                                image={dog.avatar ? dog.avatar.src : 'logo192.png'}
                                title={dog.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {dog.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {dog.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Container>
};

const mapStateToProps = (state: IAppState): IDogsProps => ({
    dogs: state.dogs.dogs
});
export default connect(mapStateToProps)(Dogs);
