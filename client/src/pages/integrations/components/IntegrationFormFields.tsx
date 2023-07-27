import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import CustomFormFields from "../../../components/UI/CustomFormFields";

interface IntegrationFormFieldsProps {
  vendorDetails: any;
  setVendorDetails: React.Dispatch<React.SetStateAction<any>>;
  validationErrors: any;
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>;
  fieldsTypes: any;
  addressError: boolean;
  setAddressError: React.Dispatch<React.SetStateAction<boolean>>;
}

const IntegrationFormFields: React.FC<IntegrationFormFieldsProps> = ({
  vendorDetails,
  setVendorDetails,
  validationErrors,
  setValidationErrors,
  fieldsTypes,
  addressError,
  setAddressError,
}) => {
  return (
    <React.Fragment>
      {/* token address field */}
      <FormControl fullWidth sx={{ mb: 2 }} error={addressError}>
        <InputLabel>Token Address</InputLabel>
        <Select
          value={vendorDetails.tokenAddress || ""}
          label="Token Address"
          onChange={(e) => {
            setVendorDetails({
              ...vendorDetails,
              tokenAddress: e.target.value,
            });
            setAddressError(false);
          }}
        >
          <MenuItem value={"0xC2CA4DFa527902c440d71F162403A3BB93045a24"}>
            USDT (Goerli)
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
    </React.Fragment>
  );
};

export default IntegrationFormFields;
