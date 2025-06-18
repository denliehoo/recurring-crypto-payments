import { Stepper, Step, StepLabel } from '@mui/material';
import type { FC } from 'react';

interface IRequestPayoutModalStepper {
  activeStep: number;
  steps: string[];
}

const RequestPayoutModalStepper: FC<IRequestPayoutModalStepper> = ({
  activeStep,
  steps,
}) => {
  return (
    <Stepper activeStep={activeStep} sx={{ mt: 1 }}>
      {steps.map((label, _index) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: {
          optional?: React.ReactNode;
        } = {};
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default RequestPayoutModalStepper;
