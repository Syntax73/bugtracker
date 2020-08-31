const ApiResponse = require('../helpers/apiResponse');

module.exports = () => {
  return (req, res, next) => {
    const user = req.userData;
    const http = new ApiResponse(res);

    if (user.role === 'test') {
      return http.unauthorized(
        'Conta de teste não tem permição de executar essa ação'
      );
    }
    return next();
  };
};
