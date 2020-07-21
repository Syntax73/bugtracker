const routes = require('express').Router();
const isAuth = require('../middlewares/isAuth');

const IssueAssignedController = require('../controllers/IssueAssignedController');
const validateDto = require('../middlewares/validateDto');
const { assignedDto } = require('../dto');

routes.post(
  '/issues/:issue_id/assigned',
  isAuth,
  validateDto(assignedDto),
  IssueAssignedController.store
);
routes.delete(
  '/issues/:issue_id/assigned',
  isAuth,
  IssueAssignedController.destroy
);

module.exports = routes;
