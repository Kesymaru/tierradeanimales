import React, {FunctionComponent} from 'react';

// components
import Navigation from "./components/Navigation";
import GoalsList from "./components/GoalsList";
import SignIn from "./components/SignIn";

const App: FunctionComponent<{}> = () => (
    <>
        <Navigation />
        <GoalsList />
        <SignIn />
    </>
);

export default App;
