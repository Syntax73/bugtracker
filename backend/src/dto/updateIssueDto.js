const yup = require('yup');

module.exports = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  type: yup.object().shape({
    id: yup.number().required(),
    type: yup
      .string()
      .matches(/(bug|feature|duplicate|documentation)/)
      .default('bug'),
  }),
  priority: yup.object().shape({
    id: yup.number().required(),
    priority: yup
      .string()
      .matches(/(low|medium|high)/)
      .default('low'),
  }),
  severity: yup.object().shape({
    id: yup.number().required(),
    severity: yup
      .string()
      .matches(/(critical|major|moderate|minor|cosmect)/)
      .default('minor'),
  }),
});
