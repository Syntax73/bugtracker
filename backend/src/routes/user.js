const routes = require('express').Router();
const multer = require('multer');
const mConfig = require('../config/multer');
const isAuth = require('../middlewares/isAuth');
const role = require('../middlewares/role');
const testAccounts = require('../middlewares/testAccounts');

const UserController = require('../controllers/UserController');

const validateDto = require('../middlewares/validateDto');
const { createUserDto, updateUserDto } = require('../dto');

routes.get('/', isAuth, role(['admin']), UserController.index);
routes.get('/:id', isAuth, role(['admin']), UserController.show);
routes.post(
  '/',
  isAuth,
  testAccounts(),
  role(['admin']),
  multer(mConfig).single('avatar'),
  validateDto(createUserDto),
  UserController.store
);
routes.put(
  '/:id',
  isAuth,
  role(['admin']),
  validateDto(updateUserDto),
  UserController.update
);

module.exports = routes;
