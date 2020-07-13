const IssueComment = require('../models/IssueComment');
const { paginate, buildPagination } = require('../helpers/paginate');
const Issue = require('../models/Issue');

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
      return res.status(404).json({ message: 'Comentarios não encontrados' });
    }

    return res.json(buildPagination(comments, page, limit));
  }

  async store(req, res) {
    const { issue_id: issueId } = req.params;
    const { comment } = req.body;
    const { id } = req.userData;

    const issue = await Issue.findByPk(issueId);

    if (!issue) {
      return res.status(404).json({ message: 'Bug não encontrados' });
    }

    const issueComment = await IssueComment.create({
      issue_id: issueId,
      user_id: id,
      comment,
    });

    await issueComment.reload({
      include: [{ association: 'user', attributes: ['id', 'avatar', 'name'] }],
    });

    return res.status(201).json(issueComment);
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

    return res.json(comment.comments);
  }

  async update(req, res) {
    const { issue_id: issueId, comment_id: commentId } = req.params;
    const { comment } = req.body;
    const { id } = req.userData;

    const reqComment = await IssueComment.findByPk(commentId);

    if (!reqComment) {
      return res.status(404).json({ message: 'Comentario não encontrado' });
    }

    await reqComment.update({
      user_id: id,
      issue_id: issueId,
      comment,
    });

    return res.json(reqComment);
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

    return res.send();
  }
}

module.exports = new IssueCommentController();
