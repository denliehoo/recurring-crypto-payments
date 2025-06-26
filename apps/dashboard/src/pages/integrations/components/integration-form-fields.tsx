import type React from 'react';
import type { FC } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import CustomFormFields from '@components/form-field';
import type { IVendorDetails } from './edit-configurations-modal';

interface IntegrationFormFieldsProps {
  vendorDetails: IVendorDetails | undefined;
  setVendorDetails: React.Dispatch<
    React.SetStateAction<IVendorDetails | undefined>
  >;
  // biome-ignore lint/suspicious/noExplicitAny: <Intended any>
  validationErrors: any;
  // biome-ignore lint/suspicious/noExplicitAny: <Intended any>
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>;
  // biome-ignore lint/suspicious/noExplicitAny: <Intended any>
  fieldsTypes: any;
  addressError: boolean;
  setAddressError: React.Dispatch<React.SetStateAction<boolean>>;
}

const IntegrationFormFields: FC<IntegrationFormFieldsProps> = ({
  vendorDetails,
  setVendorDetails,
  validationErrors,
  setValidationErrors,
  fieldsTypes,
  addressError,
  setAddressError,
}) => {
  return (
    <>
      <FormControl fullWidth sx={{ mb: 2 }} error={addressError}>
        <InputLabel>Token Address</InputLabel>
        <Select
          value={vendorDetails?.tokenAddress || ''}
          label="Token Address"
          onChange={(e) => {
            setVendorDetails({
              ...vendorDetails,
              monthlySubscriptionPrice:
                vendorDetails?.monthlySubscriptionPrice ?? '',
              tokenAddress: e.target.value,
            });
            setAddressError(false);
          }}
        >
          <MenuItem value={'0xc9606fea595ed3a94b4c8548ca0c2252c7856e89'}>
            USDT (Sepolia)
          </MenuItem>
          {/*
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> 
          */}
        </Select>
        {addressError && (
          <FormHelperText>Token Address field cannot be empty</FormHelperText>
        )}
      </FormControl>
      {/* other fields */}
      <CustomFormFields
        detailsToSubmit={vendorDetails}
        setDetailsToSubmit={setVendorDetails}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
        fieldsTypes={fieldsTypes}
      />
    </>
  );
};

export default IntegrationFormFields;
