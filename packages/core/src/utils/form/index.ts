import { splitTextByCaps } from '../text';

export const validateForm = (
  // biome-ignore lint/suspicious/noExplicitAny: <TODO: Proper typing>
  detailsToSubmit: any,
  // biome-ignore lint/suspicious/noExplicitAny: <TODO: Proper typing>
  fieldsTypes: any,
  // biome-ignore lint/suspicious/noExplicitAny: <TODO: Proper typing>
  setValidationErrors: any,
) => {
  // biome-ignore lint/suspicious/noExplicitAny: <TODO: Proper typing>
  const errors: any = {};

  // biome-ignore lint/suspicious/noExplicitAny: <TODO: Proper typing>
  const textValidator = (field: any) => {
    if (!detailsToSubmit[field] || detailsToSubmit[field].trim() === '') {
      errors[field] = `${splitTextByCaps(field)} field cannot be empty`;
    }
  };

  // biome-ignore lint/suspicious/noExplicitAny: <TODO: Proper typing>
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
