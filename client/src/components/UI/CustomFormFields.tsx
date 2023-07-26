import { Grid, TextField } from "@mui/material";
// import classes from './CustomFormFields.module.css'
// import { splitTextByCaps } from '../../utils/transformText'
import { splitTextByCaps } from "../../utils/transformText";
/* 
    required from parent component:
    const [ detailsToSubmit, setDetailsToSubmit] = useState({})
    const [validationErrors, setValidationErrors] = useState({})
    const fieldsTypes={ 
        fieldName: fieldType // e.g. itemToSell: "text", amountToBuy: 10
    }

    This component only handles the form fields changes and the validation of it.
    It doesnt handle submitting the form

    Refer to AddTaskModal for details

    <CustomFormFields
        detailsToSubmit={}
        setDetailsToSubmit={}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
        fieldsTypes={fieldsTypes}
      />

*/
const CustomFormFields = (props: any) => {
  const {
    detailsToSubmit,
    setDetailsToSubmit,
    validationErrors,
    setValidationErrors,
    fieldsTypes,
  } = props;

  const onFieldChangeHandler = (event: any) => {
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
        <Grid item xs={12}>
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
