const { sign, verify } = require('jsonwebtoken');

class RefreshToken {
  constructor(response) {
    this.response = response;
  }

  createRefreshToken(id) {
    return sign({ userId: id }, process.env.RT_KEY, {
      expiresIn: '7d',
    });
  }

  sendRefreshToken(token) {
    this.response.cookie('wflas', token, {
      httpOnly: true,
      path: '/refresh-token',
    });
  }

  verifyRefreshTokne(token) {
    return verify(token, process.env.RT_KEY);
  }

  removeRefreshToken() {
    this.response.cookie('wflas', '', {
      httpOnly: true,
      path: '/refresh-token',
    });
  }
}

module.exports = RefreshToken;
