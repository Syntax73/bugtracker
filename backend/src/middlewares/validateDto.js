const ApiResponse = require('../helpers/apiResponse');

module.exports = function validateDto(schema) {
  return async (req, res, next) => {
    const http = new ApiResponse(res);
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      return next();
    } catch (err) {
      return http.badResquest(err.message, res);
    }
  };
};
