const logger = require('../core/logger');
const TaskDao = require('../dao/TaskDao');

exports.get = async (req, res) => {
    try {
        const tasks = await TaskDao.getByUserId(req.session.userId);
        res.json(tasks);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Неожиданная ошибка, попробуйте ещё раз...',
        });
    }
};

exports.create = async (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ error: 'Недостаточно параметров!' });
    }

    try {
        const { affectedRows, insertId } = await TaskDao.insert(req.body.text, req.session.userId);
        if (!affectedRows) {
            return res.status(400).json({
                error: 'Не удалось создать задачу, обновите страницу и попробуйте ещё раз!',
            });
        }
        res.json({ success: true, id: insertId });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Неожиданная ошибка, попробуйте ещё раз...',
        });
    }
};

exports.update = async (req, res) => {
    const {
        body: { text, isDone },
        params: { id },
        user,
    } = req;

    if (!text || isDone === undefined || !id) {
        return res.status(400).json({ error: 'Недостаточно параметров!' });
    }

    const isDoneNumber = +isDone;

    if (!Number.isInteger(isDoneNumber) || isDoneNumber < 0 || isDoneNumber > 1) {
        return res.status(400).json({
            error: 'Параметр `isDone` может принимать значения 0 или 1!',
        });
    }

    try {
        const result = await TaskDao.update(text, isDoneNumber, id, user.id);
        if (!result.affectedRows) {
            return res.status(400).json({
                error: 'Не удалось изменить задачу, обновите страницу и попробуйте ещё раз!',
            });
        }
        res.json({ success: true });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Неожиданная ошибка, попробуйте ещё раз...',
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await TaskDao.delete(req.params.id, req.session.userId);
        if (!result.affectedRows) {
            return res.status(400).json({ error: 'Задача не найдена!' });
        }
        res.json({ success: true });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Неожиданная ошибка, попробуйте ещё раз...',
        });
    }
};
