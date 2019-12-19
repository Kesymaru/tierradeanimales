import React, {FunctionComponent, useState} from 'react';
import Button from "@material-ui/core/Button";

// import Goals from "./components/goals/Goals";
import Goal from "./components/goals/Goal.model";
// import Copyright from "./components/Copyright";
import Login from "./components/login/Login";

const TestGoals: Goal[] = [
    {id: 1, name: 'test'},
    {id: 2, name: 'test 1'},
    {id: 3, name: 'test 2'},
];

const App: FunctionComponent<{}> = () => {
    const [goals, setGoals] = useState(TestGoals);

    /*return (
        <>
            <header className="App-header">Header</header>
            <Goals goals={goals}/>
            <Button variant="contained" color="primary">
                Test Button
            </Button>
            <Copyright/>
        </>
    );*/

    return (
        <>
            <Login/>
        </>
    )
};

export default App;
