const routes = require('express').Router();
const isAuth = require('../middlewares/isAuth');

const IssueAssignedController = require('../controllers/IssueAssignedController');
const validateDto = require('../middlewares/validateDto');
const { assignedDto } = require('../dto');

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

module.exports = routes;
