import { splitTextByCaps } from '@core/utils/text';
import { Grid, TextField } from '@mui/material';
import type { ChangeEvent, FC } from 'react';
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

interface IValidationErrors {
  [key: string]: string;
}

interface IFieldTypes {
  [key: string]: string;
}

// TODO: Fix any
interface ICustomFormFieldsProps {
  // biome-ignore lint/suspicious/noExplicitAny: <Intended any>
  detailsToSubmit: any;
  // biome-ignore lint/suspicious/noExplicitAny: <Intended any>
  setDetailsToSubmit: (details: any) => void;
  validationErrors: IValidationErrors;
  setValidationErrors: (errors: IValidationErrors) => void;
  fieldsTypes: IFieldTypes;
}

const CustomFormFields: FC<ICustomFormFieldsProps> = (props) => {
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
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  return (
    <Grid container spacing={2}>
      {Object.keys(fieldsTypes).map((fieldName) => (
        <Grid item xs={12} key={fieldName}>
          <TextField
            error={!!validationErrors[fieldName]}
            helperText={validationErrors[fieldName]}
            type={fieldsTypes[fieldName]}
            name={fieldName}
            label={splitTextByCaps(fieldName)}
            variant="outlined"
            fullWidth
            value={detailsToSubmit[fieldName] || ''}
            onChange={onFieldChangeHandler}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomFormFields;
