import React, {ChangeEvent, FunctionComponent, SyntheticEvent, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Button, TextField} from "@material-ui/core";

import {
    IGoal,
    UpdateGoalAction,
    AddGoalAction,
    DeleteGoalAction
} from "../store";

interface IEditGoalProps {
    goal: IGoal | null;
};

const GoalEdit: FunctionComponent<IEditGoalProps> = ({goal}: IEditGoalProps) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {
        if(goal) {
            setName(goal.name);
            setDescription(goal.description || '')
        }
    }, [goal]);

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        setName('');
        setDescription('');
        setNameError('');
        setDescription('');

        let newGoal: IGoal = {
            name,
            description,
            createdDate: (new Date()),
            updatedDate: (new Date()),
        };

        // update existing goal
        if (goal && goal.id) {
            newGoal.id = goal.id;
            return dispatch(UpdateGoalAction(newGoal))
        }
        return dispatch(AddGoalAction(newGoal));
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        let {value} = event.target;
        setName(value);
        validateName(value);
    };

    const validateName = (value: string) => {
        setNameError(value.length ? '' : `Name is required`);
    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                id="name"
                label="Name"
                variant="outlined"
                required
                value={name}
                error={!!nameError}
                helperText={nameError}
                onChange={handleNameChange}
                onBlur={() => validateName(name)}
            />
            <TextField
                id="description"
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button
                type="submit"
                color="primary"
                disabled={!!nameError}
            >
                {goal ? 'Update' : 'Submit'}
            </Button>
            <Button type="reset" color="secondary">
                Reset
            </Button>
            {
                goal && goal.id
                    ? (<Button
                            color="secondary"
                            onClick={() => dispatch(DeleteGoalAction(goal))}
                        >
                            Delete
                    </Button>)
                    : null
            }
        </form>
    )
};

export default GoalEdit;
