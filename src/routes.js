const routes = require('express').Router();
const multer = require('multer');
const mConfig = require('./config/multer');
const isAuth = require('./middlewares/isAuth');
const role = require('./middlewares/role');

const SessionController = require('./controllers/SessionController');
const FileController = require('./controllers/FileController');
const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');
const TeamController = require('./controllers/TeamController');
const BugController = require('./controllers/BugController');
const BugAssignedController = require('./controllers/BugAssignedController');

routes.post('/session', SessionController.store);
routes.get('/files/:file', FileController.show);

routes.get('/users', isAuth, role('admin'), UserController.index);
routes.get('/users/:id', isAuth, role('admin'), UserController.show);
routes.post(
  '/users',
  isAuth,
  role('admin'),
  multer(mConfig).single('avatar'),
  UserController.store
);
routes.put('/users/:id', isAuth, role('admin'), UserController.update);

routes.post('/projects', isAuth, role('admin'), ProjectController.store);
routes.put('/projects/:id', isAuth, role('admin'), ProjectController.update);
routes.get('/projects', isAuth, ProjectController.index);
routes.get('/projects/:id', isAuth, ProjectController.show);
routes.delete(
  '/projects/:id',
  isAuth,
  role('admin'),
  ProjectController.destroy
);

routes.get('/projects/:project_id/team', isAuth, TeamController.index);

routes.post('/projects/:project_id/bugs', isAuth, BugController.store);
routes.put('/projects/:project_id/bugs/:bug_id', isAuth, BugController.update);
routes.get('/projects/:project_id/bugs', isAuth, BugController.index);
routes.get('/projects/:project_id/bugs/:bug_id', isAuth, BugController.show);

routes.post(
  '/projects/:project_id/bugs/:bug_id/assigned',
  isAuth,
  BugAssignedController.store
);
routes.delete(
  '/projects/:project_id/bugs/:bug_id/assigned',
  isAuth,
  BugAssignedController.destroy
);

module.exports = routes;
