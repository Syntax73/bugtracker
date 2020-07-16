const { setLocale } = require('yup');
const ptBr = require('../locales/pt-br');

setLocale(ptBr);

const sessionDto = require('./session');
const projectDto = require('./project');
const issueDto = require('./issue');
const commentDto = require('./comment');
const assignedDto = require('./assigned');
const userDto = require('./user');

module.exports = {
  sessionDto,
  projectDto,
  issueDto,
  commentDto,
  assignedDto,
  userDto,
};
