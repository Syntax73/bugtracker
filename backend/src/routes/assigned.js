const routes = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const role = require('../middlewares/role');
const testAccounts = require('../middlewares/testAccounts');

const IssueAssignedController = require('../controllers/IssueAssignedController');
const validateDto = require('../middlewares/validateDto');
const { createAssignedDto } = require('../dto');

routes.post(
  '/issues/:issue_id/assigned',
  isAuth,
  testAccounts(),
  role(['project_lead', 'test_lead', 'admin']),
  validateDto(createAssignedDto),
  IssueAssignedController.store
);
routes.delete(
  '/issues/:issue_id/assigned/:user_id',
  isAuth,
  testAccounts(),
  role(['project_lead', 'test_lead', 'admin']),
  IssueAssignedController.destroy
);

module.exports = routes;
