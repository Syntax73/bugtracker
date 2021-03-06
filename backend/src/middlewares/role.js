const ApiResponse = require('../helpers/apiResponse');

module.exports = (role) => {
  return (req, res, next) => {
    const user = req.userData;
    const http = new ApiResponse(res);

    if (role.includes(user.role)) {
      return next();
    }

    return http.unauthorized('Ação não permitida');
  };
};
