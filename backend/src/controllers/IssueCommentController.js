const IssueComment = require('../models/IssueComment');
const { buildPagination } = require('../helpers/paginate');
const Issue = require('../models/Issue');
const sequelize = require('../database');

class IssueCommentController {
  async index(req, res) {
    const { issue_id: issueId } = req.params;
    const { page } = req.query;
    const limit = 10;
    const offset = page * limit - limit;

    const comments = await sequelize.query(
      `
      SELECT COUNT(*) AS count FROM issue_comments WHERE issue_id = :issueId; 

      SELECT I.id, U.avatar, U.name, I.comment, I.updated_at AS updatedAt, I.created_at AS createdAt FROM issue_comments AS I 
      LEFT JOIN users AS U ON U.id = I.user_id 
      WHERE issue_id = :issueId OFFSET :offset FETCH FIRST :limit ROW ONLY; 
      `,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { issueId, limit, offset },
        raw: true,
      }
    );

    const rows = comments.slice(1);
    const count = comments[0];

    if (Object.keys(rows).length === 0) {
      return res.status(404).json({ message: 'Comentarios não encontrados' });
    }

    return res.json(buildPagination({ rows, ...count }, page, limit));
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
