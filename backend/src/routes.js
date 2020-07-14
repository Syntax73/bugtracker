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
const IssueController = require('./controllers/IssueController');
const IssueAssignedController = require('./controllers/IssueAssignedController');
const IssueCommentController = require('./controllers/IssueCommentController');

const validateDto = require('./middlewares/validateDto');
const sessionDto = require('./dto/session');
const projectDto = require('./dto/project');
const issueDto = require('./dto/issue');
const assignedDto = require('./dto/assigned');
const commentDto = require('./dto/comment');

routes.post('/session', validateDto(sessionDto), SessionController.store);
routes.post('/validate-session', SessionController.validateSession);
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

routes.post(
  '/projects',
  isAuth,
  role('admin'),
  validateDto(projectDto),
  ProjectController.store
);
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

routes.post(
  '/projects/:project_id/issues',
  isAuth,
  validateDto(issueDto),
  IssueController.store
);
routes.put(
  '/projects/:project_id/issues/:issue_id',
  isAuth,
  IssueController.update
);
routes.get('/projects/:project_id/issues', isAuth, IssueController.index);
routes.get(
  '/projects/:project_id/issues/:issue_id',
  isAuth,
  IssueController.show
);

routes.post(
  '/projects/:project_id/issues/:issue_id/assigned',
  isAuth,
  validateDto(assignedDto),
  IssueAssignedController.store
);
routes.delete(
  '/projects/:project_id/issues/:issue_id/assigned',
  isAuth,
  IssueAssignedController.destroy
);

routes.get('/issues/:issue_id/comment', isAuth, IssueCommentController.index);
routes.get(
  '/issues/:issue_id/comment/:comment_id',
  isAuth,
  IssueCommentController.show
);
routes.post(
  '/issues/:issue_id/comment',
  isAuth,
  validateDto(commentDto),
  IssueCommentController.store
);
routes.put(
  '/issues/:issue_id/comment/:comment_id',
  isAuth,
  IssueCommentController.update
);
routes.delete(
  '/issues/:issue_id/comment/:comment_id',
  isAuth,
  IssueCommentController.destroy
);

module.exports = routes;
