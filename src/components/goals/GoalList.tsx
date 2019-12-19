import React, {FunctionComponent} from "react";

import Goal from "./Goal.model";

const GoalList: FunctionComponent<Goal> = ({id, name}) => {
    return <div>
        <div><span>Name:</span> {name}</div>
        <div><span>ID:</span> {id}</div>
    </div>
};

export default GoalList
