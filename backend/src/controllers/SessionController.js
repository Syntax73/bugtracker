const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiResponse = require('../helpers/apiResponse');
const RefreshToken = require('../helpers/refreshToken');

class SessionController {
  async login(req, res) {
    const { email, password } = req.body;
    const http = new ApiResponse(res);
    const rToken = new RefreshToken(res);

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
      const refreshToken = rToken.createRefreshToken(user.id);
      rToken.sendRefreshToken(refreshToken);

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

      const user = await User.findByPk(decode.id, {
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });

      return http.ok({ user, token });
    } catch (err) {
      return http.unauthorized('Sessão invalida');
    }
  }

  async refreshSession(req, res) {
    const rfToken = req.cookies.wflas;
    const http = new ApiResponse(res);
    const rToken = new RefreshToken(res);

    try {
      if (!rfToken) {
        return http.unauthorized('RefreshToken não encontrado');
      }

      const decodeToken = rToken.verifyRefreshTokne(rfToken);

      const user = await User.findByPk(decodeToken.userId, {
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });
      const token = user.generateToken();
      const refreshToken = rToken.createRefreshToken(user.id);
      rToken.sendRefreshToken(refreshToken);

      return http.ok({ user, token });
    } catch (err) {
      return http.unauthorized('Sessão invalida');
    }
  }
}

module.exports = new SessionController();
