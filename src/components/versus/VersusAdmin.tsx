import React, {FunctionComponent, useState} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import {IStep, IVersus} from "../../store";
import VersusConfig from "./VersusConfig";
import VersusParticipants from "./VersusParticipants";
import VersusPreview from "./VersusPreview";
import {Container} from "@material-ui/core";

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
        label: 'Rounds',
        component: VersusPreview,
        completed: false,
        optional: false,
        valid: true,
    },
];

interface VersusAdminProps {
}

const VersusAdmin: FunctionComponent<VersusAdminProps> = () => {
    const [steps, setSteps] = useState<IStep[]>([...STEPS]);
    const [activeStep, _setActiveStep] = useState<IStep>(STEPS[0]);
    const [data, setData] = useState<IVersus>({
        name: '',
        rounds: 1,
        participants: [],
        date: (new Date())
    });

    function setActiveStep(step: IStep): void {
        _setActiveStep(step);
        setSteps(steps.map(s => s.label === step.label ? step : s));
    }

    function handleNext(): void {
        if (!activeStep.valid) return;
        setActiveStep(steps[activeStep.index + 1]);
    }

    function handleBack(): void {
        console.log('handle back');
        setActiveStep(steps[activeStep.index - 1]);
    }

    function handleSkip(): void {
        console.log('handle skip')
    };

    function handleReset(): void {
        console.log('handle reset');
        setSteps([...STEPS]);
    }

    function setValid(valid: boolean): void {
        setActiveStep({...activeStep, ...{valid}})
    }

    return (<>
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
        <Container maxWidth="sm">
            {<activeStep.component
                versus={data}
                setVersus={setData}
                setValid={setValid}
            />}

            <pre>{JSON.stringify(data)}</pre>

            {activeStep.index !== 0 ?
                <Button onClick={handleBack}>
                    Back
                </Button>
                : null}

            {activeStep.optional ?
                <Button onClick={handleSkip}>Skip</Button>
                : null}

            {activeStep.index !== steps.length - 1 ?
                <Button
                    disabled={!activeStep.valid}
                    onClick={handleNext}>
                    Next
                </Button>
                : null}
        </Container>
    </>);
};

export default VersusAdmin;
