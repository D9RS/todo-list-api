const logger = require('../../core/logger');
const db = require('../../core/database');
const TaskDao = require('../../dao/TaskDao');

const defaultTask = {
    text: 'Test task',
    isDone: 0,
};

exports.createDefaultTask = async (userId, { text, isDone } = defaultTask) => {
    try {
        const { affectedRows, insertId } = await TaskDao.insert(text, userId);

        if (!affectedRows) {
            throw new Error('Error while creating a task in the test database!');
        }

        return { text, isDone, id: insertId, user_id: userId };
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

exports.deleteDefaultTask = async (id = defaultTask.id) => {
    try {
        const [result] = await db.query('DELETE FROM `task` WHERE id = ?', [id]);

        if (!result.affectedRows) {
            throw new Error('Error while deleting a task from the database!');
        }

        return result;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};
