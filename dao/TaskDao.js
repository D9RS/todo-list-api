const logger = require('../core/logger');
const db = require('../core/database');

exports.getByUserId = async (userId) => {
    try {
        const [tasks] = await db.query('SELECT * FROM task WHERE user_id = ?', [userId]);
        return tasks;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

exports.insert = async (text, userId) => {
    try {
        const [result] = await db.query('INSERT INTO task (text, user_id) values (?, ?)', [
            text,
            userId,
        ]);
        return result;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

exports.update = async (text, isDone, id, userId) => {
    try {
        const [
            result,
        ] = await db.query('UPDATE task SET text = ?, is_done = ? WHERE id = ? AND user_id = ?', [
            text,
            isDone,
            id,
            userId,
        ]);
        return result;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

exports.delete = async (id, userId) => {
    try {
        const [result] = await db.query('DELETE FROM task WHERE id = ? AND user_id = ?', [
            id,
            userId,
        ]);
        return result;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};
