const IssueComment = require('../models/IssueComment');
const Issue = require('../models/Issue');

class IssueCommentController {
  async index(req, res) {
    const { issue_id: issueId } = req.params;

    const comments = await Issue.findByPk(issueId, {
      include: { association: 'comments' },
    });

    return res.json(comments.comments);
  }

  async store(req, res) {
    const { issue_id: issueId } = req.params;
    const { comment } = req.body;
    const { id } = req.userData;

    const issueComment = await IssueComment.create({
      user_id: id,
      issue_id: issueId,
      comment,
    });

    return res.status(201).json(issueComment);
  }

  async show(req, res) {
    const { issue_id: issueId, comment_id: commentId } = req.params;

    const comment = await Issue.findByPk(issueId, {
      include: { association: 'comments', where: { id: commentId } },
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
