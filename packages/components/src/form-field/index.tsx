import { splitTextByCaps } from "@core/utils/text";
import { Grid, TextField } from "@mui/material";
// import classes from './CustomFormFields.module.css'
// import { splitTextByCaps } from '../../utils/transformText'

import { ChangeEvent } from "react";
/* 
    required from parent component:

    const [ detailsToSubmit, setDetailsToSubmit] = useState({})
    const [validationErrors, setValidationErrors] = useState({})
    const fieldsTypes={ 
        fieldName: fieldType // e.g. itemToSell: "text", amountToBuy: 10
    }
    
    should add this in the submit form handle to ensure form is validated:
    if (!validateForm(addTaskDetails, fieldsTypes, setValidationErrors)) return


    This component only handles the form fields changes and the validation of it.
    It doesnt handle submitting the form

    <CustomFormFields
        detailsToSubmit={}
        setDetailsToSubmit={}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
        fieldsTypes={fieldsTypes}
      />

*/
interface DetailsToSubmit {
  [key: string]: any;
}

interface ValidationErrors {
  [key: string]: string;
}

interface FieldTypes {
  [key: string]: string;
}

interface CustomFormFieldsProps {
  detailsToSubmit: DetailsToSubmit;
  setDetailsToSubmit: (details: DetailsToSubmit) => void;
  validationErrors: ValidationErrors;
  setValidationErrors: (errors: ValidationErrors) => void;
  fieldsTypes: FieldTypes;
}

const CustomFormFields: React.FC<CustomFormFieldsProps> = (props) => {
  const {
    detailsToSubmit,
    setDetailsToSubmit,
    validationErrors,
    setValidationErrors,
    fieldsTypes,
  } = props;

  const onFieldChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setDetailsToSubmit({
      ...detailsToSubmit,
      [name]: value,
    });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  return (
    <Grid container spacing={2}>
      {Object.keys(fieldsTypes).map((f) => (
        <Grid item xs={12} key={f}>
          <TextField
            error={!!validationErrors[f]}
            helperText={validationErrors[f]}
            type={fieldsTypes[f]}
            name={f}
            label={splitTextByCaps(f)}
            variant="outlined"
            fullWidth
            value={detailsToSubmit[f] || ""}
            onChange={onFieldChangeHandler}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomFormFields;
