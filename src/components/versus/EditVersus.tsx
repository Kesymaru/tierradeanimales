import React, {FunctionComponent, useState} from 'react';
import {useParams} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

import {IAppState, IStep, IUserState, IVersus, IVersusState, TStatus} from "../../store";
import VersusConfig from "./VersusConfig";
import VersusParticipants from "./VersusParticipants";
import VersusPreview from "./VersusPreview";
import VersusActions from "../../store/versus/versus.actions";
import Breadcrumbs from "../Navbar/Breadcrumbs";

const STEPS: IStep[] = [
    {
        index: 0,
        label: 'Config',
        component: VersusConfig,
        completed: false,
        optional: false,
        valid: false,
    },
    {
        index: 1,
        label: 'Participants',
        component: VersusParticipants,
        completed: false,
        optional: false,
        valid: false,
    },
    {
        index: 2,
        label: 'Preview',
        component: VersusPreview,
        completed: false,
        optional: false,
        valid: true,
    },
];

interface IEditVersusProps extends Pick<IVersusState, 'versus'>,
    Pick<IUserState, 'user'> {
}

const EditVersus: FunctionComponent<IEditVersusProps> = ({user, versus}) => {
    const [steps, setSteps] = useState<IStep[]>([...STEPS]);
    const [activeStep, _setActiveStep] = useState<IStep>(STEPS[0]);
    const [data, setData] = useState<IVersus>({
        id: '',
        userId: '',
        name: '',
        rounds: 1,
        participants: [],
        date: (new Date())
    });
    const dispatch = useDispatch();
    const {id} = useParams();
    let isNew = id && id.toLowerCase() === 'new';

    if (!user || versus.status === TStatus.Fetching) return <LinearProgress color="primary"/>;

    function setActiveStep(step: IStep): void {
        _setActiveStep(step);
        setSteps(steps.map(s => s.label === step.label ? step : s));
    }

    function handleNext(): void {
        if (!activeStep.valid) return;
        setActiveStep(steps[activeStep.index + 1]);
    }

    function handleBack(): void {
        setActiveStep(steps[activeStep.index - 1]);
    }

    function handleSkip(): void {
        console.log('handle skip')
    };

    function handleReset(): void {
        setSteps([...STEPS]);
    }

    function setValid(valid: boolean): void {
        setActiveStep({...activeStep, ...{valid}})
    }

    function handleSubmit(): void {
        if (!activeStep.valid || !user) return;
        if (isNew) dispatch(VersusActions.Add({...data, ...{userId: user.uid}}));
        else dispatch(VersusActions.Update(data));
    }

    return <>
        <Stepper
            activeStep={activeStep.index}
            alternativeLabel
            orientation="horizontal"
        >
            {steps.map((step, index) =>
                <Step key={step.label} completed={step.completed}>
                    <StepLabel optional={step.optional}>
                        {step.label}
                    </StepLabel>
                </Step>
            )}
        </Stepper>
        <Container>
            <activeStep.component
                versus={data}
                setVersus={setData}
                setValid={setValid}
            />

            {activeStep.index !== 0 &&
            <Button onClick={handleBack}>
                Back
            </Button>}

            {activeStep.optional &&
            <Button onClick={handleSkip}>Skip</Button>}

            {activeStep.index <= steps.length - 2 &&
            <Button
                disabled={!activeStep.valid}
                onClick={handleNext}>
                Next
            </Button>}

            {activeStep.index === steps.length - 1 &&
            <Button
                color="primary"
                disabled={!activeStep.valid}
                onClick={handleSubmit}>
                {isNew ? 'Save' : 'Update'}
            </Button>}
        </Container>
    </>;
};

const mapStateToProps = (state: IAppState): IEditVersusProps => ({
    user: state.user.user,
    versus: state.versus.versus,
});
export default connect(mapStateToProps)(EditVersus);
