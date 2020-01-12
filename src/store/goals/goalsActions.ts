import {IGoal, ADD_GOAL, DELETE_GOAL, UPDATE_GOAL, TGoalsActions, SELECT_GOAL} from "./goalsTypes";

class GoalsActions {
    public static ID: number = 1;

    public static Add(goal: IGoal): TGoalsActions {
        console.log('id', ++GoalsActions.ID);

        return {
            type: ADD_GOAL,
            payload: {
                ...goal,
                id: ++GoalsActions.ID,
            },
        };
    }

    public static Delete(goal: IGoal): TGoalsActions {
        return {
            type: DELETE_GOAL,
            payload: goal,
        };
    }

    public static Update(goal: IGoal): TGoalsActions {
        return {
            type: UPDATE_GOAL,
            payload: goal,
        }
    }

    public static Select(goal: IGoal): TGoalsActions {
        return {
            type: SELECT_GOAL,
            payload: goal
        }
    }
}

export default GoalsActions;
