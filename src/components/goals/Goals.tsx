import React, {FunctionComponent, useState} from "react";

import GoalList from "./GoalList";
import Goal from "./Goal.model";

interface GoalsProps {
    goals: Goal[];
};

const Goals:FunctionComponent<GoalsProps> = ({goals:initGoals = []}) => {
    const [goals, setGoals] = useState(initGoals);

    return <section>
        <article>
            Goals
            {goals.map(goal => <GoalList {...goal} key={goal.id} />)}
        </article>
    </section>
};

export default Goals
