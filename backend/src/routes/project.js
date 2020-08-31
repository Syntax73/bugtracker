const routes = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const role = require('../middlewares/role');
const testAccounts = require('../middlewares/testAccounts');

const ProjectController = require('../controllers/ProjectController');

const validateDto = require('../middlewares/validateDto');
const { createProjectDto, updateProjectDto } = require('../dto');

routes.get('/my-projects', isAuth, ProjectController.myProjects);
routes.post(
  '/',
  isAuth,
  testAccounts(),
  role(['admin']),
  validateDto(createProjectDto),
  ProjectController.store
);
routes.put(
  '/:id',
  isAuth,
  testAccounts(),
  role(['admin']),
  validateDto(updateProjectDto),
  ProjectController.update
);
routes.get('/', isAuth, ProjectController.index);
routes.get('/:id', isAuth, ProjectController.show);
routes.delete(
  '/:id',
  isAuth,
  testAccounts(),
  role(['admin']),
  ProjectController.destroy
);

module.exports = routes;
