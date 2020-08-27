const User = require('../models/User');
const { paginate, buildPagination } = require('../helpers/paginate');
const ApiResponse = require('../helpers/apiResponse');

class UserController {
  async index(req, res) {
    const { page } = req.query;
    const limit = 10;
    const http = new ApiResponse(res);

    try {
      const users = await User.findAndCountAll({
        ...paginate(page, limit),
      });

      return http.ok(buildPagination(users, page, limit));
    } catch (err) {
      return http.serverError();
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const http = new ApiResponse(res);

    try {
      const user = await User.findByPk(id);

      return http.ok(user);
    } catch (err) {
      return http.serverError();
    }
  }

  async store(req, res) {
    const { name, email, password, role } = req.body;
    const { filename: avatar } = req.file;
    const http = new ApiResponse(res);

    try {
      const user = await User.create({ avatar, name, email, password, role });

      return http.created(user);
    } catch (err) {
      return http.serverError();
    }
  }

  // TODO fazer o usuario atualizar o avatar
  async update(req, res) {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const http = new ApiResponse(res);

    try {
      const reqUser = await User.findByPk(id);

      if (!reqUser) {
        return http.badResquest('Usuario não encontrado');
      }

      const user = await reqUser.update({ name, email, role });

      return http.ok(user);
    } catch (err) {
      return http.serverError();
    }
  }
}

module.exports = new UserController();
