import _ from "lodash";

const formValidation = (form = {}) => {
  const entries = Object.entries(form);
  const emptyFields = entries.filter(([, value]) => _.isEmpty(value));
  const validPassword = form.newPassword.length >= 5 && form.newPassword.length <= 20;
  const validForm = emptyFields.length === 0;
  const validConfirmPassword = form.newPassword === form.confirmpassword;
  const inValidFields = emptyFields.map(([key]) => key);
  return { validForm, inValidFields, validPassword, validConfirmPassword };
};

// eslint-disable-next-line import/prefer-default-export
export { formValidation };
