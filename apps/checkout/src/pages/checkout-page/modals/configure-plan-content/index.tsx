
import type { FC, } from 'react';
import ConfigurePlanModalHeader from './header';
import ConfigurePlanModalStepper from './stepper';
import ConfigurePlanModalContent from './content';

// status: active means user want to change payment method
// status: cancelled means user wants to start plan again / renew plan
// status: inactive means user wants to start plan (for the first time)
const ConfigurePlanModal: FC = () => {
  return (
    <>
      <ConfigurePlanModalHeader />

      <ConfigurePlanModalStepper />

      <ConfigurePlanModalContent />
    </>
  );
};

export default ConfigurePlanModal;
