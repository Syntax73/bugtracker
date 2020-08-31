const yup = require('yup');

module.exports = yup.object().shape({
  name: yup.string().min(4),
  email: yup.string().email().required(),
  role: yup
    .string()
    .matches(/(developer|test_lead|project_lead|admin|test)/)
    .default('developer'),
});
