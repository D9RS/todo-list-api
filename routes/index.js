const express = require('express');

const taskRouter = require('./task');
const authRouter = require('./auth');

const router = express.Router();

router.use('/', authRouter);
router.use('/tasks', taskRouter);

module.exports = router;
