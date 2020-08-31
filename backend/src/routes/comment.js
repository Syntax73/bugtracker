const routes = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const testAccounts = require('../middlewares/testAccounts');
const IssueCommentController = require('../controllers/IssueCommentController');

const validateDto = require('../middlewares/validateDto');
const { createCommentDto, updateCommentDto } = require('../dto');

routes.get('/issues/:issue_id/comment', isAuth, IssueCommentController.index);
routes.get(
  '/issues/:issue_id/comment/:comment_id',
  isAuth,
  IssueCommentController.show
);
routes.post(
  '/issues/:issue_id/comment',
  isAuth,
  testAccounts(),
  validateDto(createCommentDto),
  IssueCommentController.store
);
routes.put(
  '/issues/:issue_id/comment/:comment_id',
  isAuth,
  testAccounts(),
  validateDto(updateCommentDto),
  IssueCommentController.update
);
routes.delete(
  '/issues/:issue_id/comment/:comment_id',
  isAuth,
  testAccounts(),
  IssueCommentController.destroy
);

module.exports = routes;
