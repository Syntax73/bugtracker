const User = require('../models/User');
const { paginate, buildPagination } = require('../helpers/paginate');
const ApiResponse = require('../helpers/apiResponse');

class UserController {
  async index(req, res) {
    const { page } = req.query;
    const limit = 10;

    const users = await User.findAndCountAll({
      ...paginate(page, limit),
    });

    return ApiResponse.ok(buildPagination(users, page, limit), res);
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    return ApiResponse.ok(user, res);
  }

  async store(req, res) {
    const { name, email, password, role } = req.body;
    const { filename: avatar } = req.file;

    const user = await User.create({ avatar, name, email, password, role });

    return ApiResponse.created(user, res);
  }

  // TODO fazer o usuario atualizar o avatar
  async update(req, res) {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const reqUser = await User.findByPk(id);

    if (!reqUser) {
      return ApiResponse.badResquest('Usuario não encontrado', res);
    }

    const user = await reqUser.update({ name, email, password, role });

    return ApiResponse.ok(user, res);
  }
}

module.exports = new UserController();
