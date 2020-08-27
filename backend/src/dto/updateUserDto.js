const yup = require('yup');

module.exports = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  role: yup
    .string()
    .matches(/(developer|test_lead|project_lead|admin)/)
    .default('developer'),
});
