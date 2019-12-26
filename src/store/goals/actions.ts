import {IGoal, ADD_GOAL, DELETE_GOAL, UPDATE_GOAL, TGoalsActions, SELECT_GOAL} from "./types";

let id = 1;

export function AddGoalAction(goal: IGoal): TGoalsActions {
    return {
        type: ADD_GOAL,
        payload: {
            ...goal,
            id: ++id,
        },
    };
}

export function DeleteGoalAction(goal: IGoal): TGoalsActions {
    return {
        type: DELETE_GOAL,
        payload: goal,
    };
}

export function UpdateGoalAction(goal: IGoal): TGoalsActions {
    return {
        type: UPDATE_GOAL,
        payload: goal,
    }
}

export function SelectGoalAction(goal: IGoal): TGoalsActions {
    return {
        type: SELECT_GOAL,
        payload: goal
    }
}
