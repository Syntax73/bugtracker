const yup = require('yup');

module.exports = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  type: yup
    .string()
    .matches(/(bug|feature|duplicate|documentation)/)
    .default('bug')
    .required(),
  priority: yup
    .string()
    .matches(/(low|medium|high)/)
    .default('low')
    .required(),
  severity: yup
    .string()
    .matches(/(critical|major|moderate|minor|cosmect)/)
    .default('minor')
    .required(),
});
