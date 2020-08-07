const express = require('express');
const TaskController = require('../controllers/TaskController');

const paramValidators = require('../core/paramValidators');

const isAuthorized = require('../middlewares/isAuthorized');
const getUser = require('../middlewares/getUser');

const router = express.Router();

router.use(isAuthorized, getUser);
router.param('id', paramValidators.id);

router.get('/', TaskController.get);
router.post('/', TaskController.create);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.remove);

module.exports = router;
