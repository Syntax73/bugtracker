const routes = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const IssueController = require('../controllers/IssueController');

const validateDto = require('../middlewares/validateDto');
const { updateIssueDto, createIssueDto } = require('../dto');

routes.get('/issues', isAuth, IssueController.listMyIssues);

routes.post(
  '/projects/:project_id/issues',
  isAuth,
  validateDto(createIssueDto),
  IssueController.store
);
routes.put(
  '/projects/:project_id/issues/:issue_id',
  isAuth,
  validateDto(updateIssueDto),
  IssueController.update
);
routes.get('/projects/:project_id/issues', isAuth, IssueController.index);
routes.get(
  '/projects/:project_id/issues/:issue_id',
  isAuth,
  IssueController.show
);

module.exports = routes;
