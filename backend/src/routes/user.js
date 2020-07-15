const routes = require('express').Router();
const multer = require('multer');
const mConfig = require('../config/multer');
const isAuth = require('../middlewares/isAuth');
const role = require('../middlewares/role');

const UserController = require('../controllers/UserController');

const validateDto = require('../middlewares/validateDto');
const { userDto } = require('../dto');

routes.get('/', isAuth, role('admin'), UserController.index);
routes.get('/:id', isAuth, role('admin'), UserController.show);
routes.post(
  '/',
  isAuth,
  role('admin'),
  multer(mConfig).single('avatar'),
  validateDto(userDto),
  UserController.store
);
routes.put('/:id', isAuth, role('admin'), UserController.update);

module.exports = routes;
