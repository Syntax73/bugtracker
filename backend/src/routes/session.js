const routes = require('express').Router();
const SessionController = require('../controllers/SessionController');
const validateDto = require('../middlewares/validateDto');

const { sessionDto } = require('../dto');

routes.post('/session', validateDto(sessionDto), SessionController.login);
routes.post('/validate-session', SessionController.validateSession);
routes.post('/refresh-token', SessionController.refreshSession);
routes.post('/remove-token', SessionController.removeSession);

module.exports = routes;
