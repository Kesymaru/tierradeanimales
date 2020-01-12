import {ADD_GOAL, DELETE_GOAL, IGoalsState, SELECT_GOAL, TGoalsActions, UPDATE_GOAL} from "./goalsTypes";

const InitState: IGoalsState = {
    goals: [],
    selected: null
};

function GoalsReducers (
    state: IGoalsState = InitState,
    action: TGoalsActions): IGoalsState {

    switch (action.type) {
        case ADD_GOAL:
            return {
                ...state,
                goals: [
                    ...state.goals,
                    action.payload
                ],
            };

        case DELETE_GOAL:
            return {
                ...state,
                goals: state.goals
                    .filter(goal => goal.id !== action.payload.id),
                selected: null,
            };

        case UPDATE_GOAL:
            return {
                ...state,
                goals: state.goals
                    .map(goal => goal.id === action.payload.id
                        ? {...goal, ...action.payload}
                        : goal),
            };

        case SELECT_GOAL:
            return {
                ...state,
                selected: {...action.payload}
            };

        default:
            return state;
    }
}

export default GoalsReducers;
