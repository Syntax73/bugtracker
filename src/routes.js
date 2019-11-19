const routes = require('express').Router();
const multer = require('multer');
const mConfig = require('./config/multer');
const isAuth = require('./middlewares/isAuth');
const isAdmin = require('./middlewares/isAdmin');

const SessionController = require('./controllers/SessionController');
const FileController = require('./controllers/FileController');
const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');

routes.post('/session', SessionController.store);
routes.get('/files/:file', FileController.show);

routes.get('/users', isAuth, isAdmin, UserController.index);
routes.get('/users/:id', isAuth, isAdmin, UserController.show);
routes.post(
  '/users',
  isAuth,
  isAdmin,
  multer(mConfig).single('avatar'),
  UserController.store
);
routes.put('/users/:id', isAuth, isAdmin, UserController.update);

routes.post('/projects', isAuth, isAdmin, ProjectController.store);
routes.put('/projects/:id', isAuth, isAdmin, ProjectController.update);
routes.get('/projects', isAuth, ProjectController.index);
routes.get('/projects/:id', isAuth, ProjectController.show);
routes.delete('/projects/:id', isAuth, isAdmin, ProjectController.destroy);

module.exports = routes;
