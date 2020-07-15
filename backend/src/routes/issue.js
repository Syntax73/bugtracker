const routes = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const IssueController = require('../controllers/IssueController');

const validateDto = require('../middlewares/validateDto');
const { issueDto } = require('../dto');

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

module.exports = routes;
