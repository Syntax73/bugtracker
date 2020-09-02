const ApiResponse = require('../helpers/apiResponse');

module.exports = () => {
  return (req, res, next) => {
    const { role } = req.userData;
    const http = new ApiResponse(res);

    if (role === 'test' || role === 'test_admin') {
      return http.unauthorized(
        'Conta de teste não tem permição de executar essa ação'
      );
    }
    return next();
  };
};
