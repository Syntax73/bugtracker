const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiResponse = require('../helpers/apiResponse');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const http = new ApiResponse(res);

    try {
      const user = await User.findOne({
        where: { email },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });

      if (!user) return http.unauthorized('Usuario não encontrado');

      if (!(await user.checkPassword(password))) {
        return http.unauthorized('Senha incorreta');
      }

      const token = user.generateToken();
      user.setAttributes('password');

      return http.created({ user, token });
    } catch (err) {
      return http.serverError(res);
    }
  }

  async validateSession(req, res) {
    const sessionHeader = req.headers.authorization;
    const token = sessionHeader.split(' ')[1];
    const http = new ApiResponse(res);

    try {
      const decode = jwt.verify(token, process.env.APP_KEY);

      const user = await User.findOne({
        where: { id: decode.id },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });

      return http.ok({ user, token });
    } catch (err) {
      return http.unauthorized('Sessão invalida');
    }
  }
}

module.exports = new SessionController();
