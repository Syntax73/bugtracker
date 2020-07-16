const IssueComment = require('../models/IssueComment');
const Issue = require('../models/Issue');
const ApiResponse = require('../helpers/apiResponse');
const { paginate, buildPagination } = require('../helpers/paginate');

class IssueCommentController {
  async index(req, res) {
    const { issue_id: issueId } = req.params;
    const { page } = req.query;
    const limit = 10;
    const http = new ApiResponse(res);

    try {
      const comments = await IssueComment.findAndCountAll({
        ...paginate(page, limit),
        where: { issue_id: issueId },
        include: { association: 'user', attributes: ['id', 'avatar', 'name'] },
      });

      if (Object.keys(comments.rows).length === 0) {
        return http.badResquest('Comentarios não encontrados');
      }

      return http.ok(buildPagination(comments, page, limit));
    } catch (err) {
      return http.serverError();
    }
  }

  async store(req, res) {
    const { issue_id: issueId } = req.params;
    const { comment } = req.body;
    const { id } = req.userData;
    const http = new ApiResponse(res);

    try {
      const issue = await Issue.findByPk(issueId);

      if (!issue) {
        return http.badResquest('Issue não encontrada');
      }

      const issueComment = await IssueComment.create({
        issue_id: issueId,
        user_id: id,
        comment,
      });

      await issueComment.reload({
        include: [
          { association: 'user', attributes: ['id', 'avatar', 'name'] },
        ],
      });

      return http.created(issueComment);
    } catch (err) {
      return http.serverError();
    }
  }

  async show(req, res) {
    const { issue_id: issueId, comment_id: commentId } = req.params;
    const http = new ApiResponse(res);

    try {
      const comment = await Issue.findByPk(issueId, {
        include: {
          association: 'comments',
          where: { id: commentId },
          include: {
            association: 'user',
            attributes: ['id', 'avatar', 'name'],
          },
        },
      });

      return http.ok(comment.comments);
    } catch (err) {
      return http.serverError();
    }
  }

  async update(req, res) {
    const { issue_id: issueId, comment_id: commentId } = req.params;
    const { comment } = req.body;
    const { id } = req.userData;
    const http = new ApiResponse(res);

    try {
      const reqComment = await IssueComment.findByPk(commentId);

      if (!reqComment) {
        return http.badResquest('Comentario não encontrado');
      }

      await reqComment.update({
        user_id: id,
        issue_id: issueId,
        comment,
      });

      return http.ok(reqComment);
    } catch (err) {
      return http.serverError();
    }
  }

  async destroy(req, res) {
    const { issue_id: issueId, comment_id: commentId } = req.params;
    const http = new ApiResponse(res);

    try {
      const issue = await Issue.findByPk(issueId);
      const comment = await IssueComment.findByPk(commentId);

      if (!comment || !issue) {
        return http.badResquest('issue/comentario não encontrado');
      }

      await comment.destroy();

      return http.noContent();
    } catch (err) {
      return http.serverError();
    }
  }
}

module.exports = new IssueCommentController();
