export interface IGoal {
    id?: number | string;
    name: string;
    description?: string;
    createdDate: Date;
    updatedDate: Date;
}

export interface IGoalsState {
    goals: IGoal[]
    selected: IGoal|null
}

// Describing the different ACTION NAMES available
export const ADD_GOAL = "ADD_GOAL";
export const DELETE_GOAL = "DELETE_GOAL";
export const UPDATE_GOAL = "UPDATE_GOAL";
export const SELECT_GOAL = "SELECT_GOAL";

interface IAddGoalAction {
    type: typeof ADD_GOAL;
    payload: IGoal;
}

interface IDeleteGoalAction {
    type: typeof DELETE_GOAL;
    payload: IGoal;
}

interface IUpdateGoalAction {
    type: typeof UPDATE_GOAL;
    payload: IGoal;
}

interface ISelectGoalAction {
    type: typeof SELECT_GOAL;
    payload: IGoal;
}

export type TGoalsActions = IAddGoalAction | IDeleteGoalAction | IUpdateGoalAction | ISelectGoalAction;
