const yup = require('yup');

module.exports = yup.object().shape({
  name: yup.string().min(4).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senhas não combinam')
    .required(),
  role: yup
    .string()
    .matches(/(developer|test_lead|project_lead|admin|test)/)
    .default('developer'),
});
