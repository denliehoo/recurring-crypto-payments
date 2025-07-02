import { Step, StepLabel, Stepper } from '@mui/material';
import type { FC } from 'react';
import { useConfigurePlanContent } from './hooks';

const ConfigurePlanModalStepper: FC = () => {
  const { steps, activeStep } = useConfigurePlanContent();
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

export default ConfigurePlanModalStepper;
