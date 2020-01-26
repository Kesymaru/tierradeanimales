import React, {FunctionComponent} from "react";
import {connect, useDispatch} from "react-redux";
import {Paper, Typography, List, ListItem, ListItemText, Divider, Container, CssBaseline} from "@material-ui/core";

import {IGoalsState, GoalsActions, IAppState} from "../store";
import GoalEdit from "./GoalEdit";

interface IGoalsProps extends IGoalsState{};

const GoalsList: FunctionComponent<IGoalsProps> = ({goals, selected}: IGoalsProps) => {
    const dispatch = useDispatch();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Paper>
                <Typography variant="h5" component="h3">
                    Goals
                </Typography>
                { goals.map(goal => (
                    <List
                        key={goal.id}
                        onClick={() => dispatch(GoalsActions.Select(goal)) }>
                        <ListItem>
                            <ListItemText
                                primary={goal.name}
                                secondary={goal.description ? goal.description : ``}>
                            </ListItemText>
                        </ListItem>
                        <Divider/>
                    </List>
                )) }
                {
                    selected ? <p>{selected.name}</p> : null
                }
                <GoalEdit goal={selected} />
            </Paper>
        </Container>
    );
};

const mapStateToProps = (state: IAppState): IGoalsProps => ({...state.goals});
export default connect(mapStateToProps)(GoalsList)
