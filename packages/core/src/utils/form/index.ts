import { splitTextByCaps } from '../text';

const validateForm = (
  detailsToSubmit: any,
  fieldsTypes: any,
  setValidationErrors: any,
) => {
  const errors: any = {};

  const textValidator = (field: any) => {
    if (!detailsToSubmit[field] || detailsToSubmit[field].trim() === '') {
      errors[field] = `${splitTextByCaps(field)} field cannot be empty`;
    }
  };

  const numberValidator = (field: any) => {
    if (!detailsToSubmit[field] || Number.isNaN(detailsToSubmit[field])) {
      errors[field] = `${splitTextByCaps(
        field,
      )} field cannot be empty and must be a number`;
    }
  };

  for (const [field, type] of Object.entries(fieldsTypes)) {
    if (type === 'text') {
      textValidator(field);
    } else if (type === 'number') {
      numberValidator(field);
    }
  }
  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};

export { validateForm };
