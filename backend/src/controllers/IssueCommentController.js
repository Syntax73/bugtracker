const IssueComment = require('../models/IssueComment');
const Issue = require('../models/Issue');
const ApiResponse = require('../helpers/apiResponse');
const { paginate, buildPagination } = require('../helpers/paginate');

class IssueCommentController {
  async index(req, res) {
    const { issue_id: issueId } = req.params;
    const { page } = req.query;
    const limit = 10;

    const comments = await IssueComment.findAndCountAll({
      ...paginate(page, limit),
      where: { issue_id: issueId },
      include: { association: 'user', attributes: ['id', 'avatar', 'name'] },
    });

    if (Object.keys(comments.rows).length === 0) {
      return ApiResponse.badResquest('Comentarios não encontrados', res);
    }

    return ApiResponse.ok(buildPagination(comments, page, limit), res);
  }

  async store(req, res) {
    const { issue_id: issueId } = req.params;
    const { comment } = req.body;
    const { id } = req.userData;

    const issue = await Issue.findByPk(issueId);

    if (!issue) {
      return ApiResponse.badResquest('Issue não encontrada', res);
    }

    const issueComment = await IssueComment.create({
      issue_id: issueId,
      user_id: id,
      comment,
    });

    await issueComment.reload({
      include: [{ association: 'user', attributes: ['id', 'avatar', 'name'] }],
    });

    return ApiResponse.created(issueComment, res);
  }

  async show(req, res) {
    const { issue_id: issueId, comment_id: commentId } = req.params;

    const comment = await Issue.findByPk(issueId, {
      include: {
        association: 'comments',
        where: { id: commentId },
        include: { association: 'user', attributes: ['id', 'avatar', 'name'] },
      },
    });

    return ApiResponse.ok(comment.comments, res);
  }

  async update(req, res) {
    const { issue_id: issueId, comment_id: commentId } = req.params;
    const { comment } = req.body;
    const { id } = req.userData;

    const reqComment = await IssueComment.findByPk(commentId);

    if (!reqComment) {
      return ApiResponse.badResquest('Comentario não encontrado', res);
    }

    await reqComment.update({
      user_id: id,
      issue_id: issueId,
      comment,
    });

    return ApiResponse.ok(reqComment, res);
  }

  async destroy(req, res) {
    const { issue_id: issueId, comment_id: commentId } = req.params;

    const issue = await Issue.findByPk(issueId);
    const comment = await IssueComment.findByPk(commentId);

    if (!comment || !issue) {
      return res
        .status(404)
        .json({ message: 'issue/comentario não encontrado' });
    }

    await comment.destroy();

    return ApiResponse.noContent(res);
  }
}

module.exports = new IssueCommentController();
