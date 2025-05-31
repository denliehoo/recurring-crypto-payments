// // import classes from "./ConfigurePlanModal.module.css";

// import { Box, Button, Grid, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
// import React, { ChangeEvent, FC, useState } from 'react';
// import CustomButton from '@components/button';

// import { useCheckoutModal, useSubcriptionDetail } from '@checkout/store';
// import { useConfigurePlanContent } from './hooks';

// // status: active means user want to change payment method
// // status: cancelled means user wants to start plan again / renew plan
// // status: inactive means user wants to start plan (for the first time)
// const ConfigurePlanModal: FC = () => {
//   const setRefreshData = useSubcriptionDetail((state) => state.setRefreshData);
//   const setModal = useCheckoutModal((state) => state.setModal);

//   const {
//     handleNext,
//     address,
//     activeStep,
//     stepsText,
//     nameInput,
//     handleNameChange,
//     emailInput,
//     handleEmailChange,
//     addressInput,
//     handleAddressChange,
//     inputError,
//     buttonLoading,
//     buttonDisabled,
//     stepsButtonText,
//   } = useConfigurePlanContent();

//   const steps = [
//     'Connect Wallet',
//     'Check Balance',
//     'Check Allowance',
//     // if active, it is confirm change , if inactive/cancelled confirm subscription
//     `Confirm ${status === 'active' ? 'Change' : 'Subscription'}`,
//   ];

//   return (
//     <>
//       <Typography
//         id="modal-modal-title"
//         variant="h6"
//         component="h2"
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           '& > :first-of-type': {
//             marginRight: 'auto',
//           },
//         }}
//       >
//         <span>{status === 'active' ? 'Change Payment Method' : 'Start Plan'}</span>
//         {address && (
//           <span>{`${address.substring(0, 4)}...${address.substring(address.length - 4)}`}</span>
//         )}
//       </Typography>
//       {/* Steps for start plan */}
//       <Stepper activeStep={activeStep} sx={{ mt: 1 }}>
//         {steps.map((label, index) => {
//           const stepProps: { completed?: boolean } = {};
//           const labelProps: {
//             optional?: React.ReactNode;
//           } = {};
//           return (
//             <Step key={label} {...stepProps}>
//               <StepLabel {...labelProps}>{label}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>

//       {/* Stepper info text */}
//       {activeStep === steps.length ? (
//         <>
//           <Typography sx={{ mt: 2, mb: 1 }}>
//             {status !== 'active'
//               ? 'You have successfully subscribed!'
//               : 'You have successfully changed your payment wallet!'}
//           </Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <Box sx={{ flex: '1 1 auto' }} />
//             <Button
//               onClick={() => {
//                 setRefreshData();
//                 setModal(undefined);
//               }}
//             >
//               Close
//             </Button>
//           </Box>
//         </>
//       ) : (
//         <>
//           <Typography sx={{ mt: 2, mb: 1 }}>{stepsText[activeStep]}</Typography>
//           {activeStep === 3 && status === 'inactive' && (
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   type="text"
//                   label="Name"
//                   variant="outlined"
//                   fullWidth
//                   value={nameInput}
//                   onChange={handleNameChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   type="text"
//                   label="Email"
//                   variant="outlined"
//                   fullWidth
//                   value={emailInput}
//                   onChange={handleEmailChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   type="text"
//                   label="Address"
//                   variant="outlined"
//                   fullWidth
//                   value={addressInput}
//                   onChange={handleAddressChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 {inputError && <span>{inputError}</span>}
//               </Grid>
//             </Grid>
//           )}
//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <CustomButton
//               text={stepsButtonText[activeStep]}
//               onClick={handleNext}
//               loading={buttonLoading}
//               disabled={buttonDisabled}
//             />
//           </Box>
//         </>
//       )}
//     </>
//   );
// };

// export default ConfigurePlanModal;

// import classes from "./ConfigurePlanModal.module.css";

import { Box, Button, Grid, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';
import CustomButton from '@components/button';

import { useCheckoutModal, useSubcriptionDetail } from '@checkout/store';
import { useConfigurePlanContent } from './hooks';
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
