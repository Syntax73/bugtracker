const yup = require('yup');

module.exports = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required(),
  role: yup
    .string()
    .matches(/(developer|test_lead|project_lead|admin)/)
    .default('developer'),
});
