const { setLocale } = require('yup');
const ptBr = require('../locales/pt-br');

setLocale(ptBr);

const sessionDto = require('./sessionDto');
const createProjectDto = require('./createProjectDto');
const createIssueDto = require('./createIssueDto');
const createCommentDto = require('./createCommentDto');
const createAssignedDto = require('./createAssignedDto');
const createUserDto = require('./createUserDto');

const updateProjectDto = require('./updateProjectDto');
const updateIssueDto = require('./updateIssueDto');
const updateCommentDto = require('./updateCommentDto');
const updateAssignedDto = require('./updateAssignedDto');
const updateUserDto = require('./updateUserDto');

module.exports = {
  sessionDto,
  createProjectDto,
  createIssueDto,
  createCommentDto,
  createAssignedDto,
  createUserDto,
  updateProjectDto,
  updateIssueDto,
  updateCommentDto,
  updateAssignedDto,
  updateUserDto,
};
