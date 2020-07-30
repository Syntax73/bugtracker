const yup = require('yup');

module.exports = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  type: yup
    .string()
    .matches(/(bug|feature|duplicate|documentation)/)
    .required(),
  priority: yup
    .string()
    .matches(/(low|medium|high)/)
    .required(),
  severity: yup
    .string()
    .matches(/(critical|major|moderate|minor|cosmect)/)
    .required(),
});
