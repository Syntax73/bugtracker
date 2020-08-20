const routes = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const role = require('../middlewares/role');

const IssueAssignedController = require('../controllers/IssueAssignedController');
const validateDto = require('../middlewares/validateDto');
const { assignedDto } = require('../dto');

routes.post(
  '/issues/:issue_id/assigned',
  isAuth,
  role(['project_lead', 'test_lead', 'admin']),
  validateDto(assignedDto),
  IssueAssignedController.store
);
routes.delete(
  '/issues/:issue_id/assigned/:user_id',
  isAuth,
  role(['project_lead', 'test_lead', 'admin']),
  IssueAssignedController.destroy
);

module.exports = routes;
