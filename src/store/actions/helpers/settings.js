import _ from "lodash";

const formValidation = (form = {}) => {
  const entries = Object.entries(form);
  const emptyFields = entries.filter(([, value]) => _.isEmpty(value));

  const validForm = emptyFields.length === 0;
  const inValidFields = emptyFields.map(([key]) => key);
  return { validForm, inValidFields };
};

export { formValidation };
