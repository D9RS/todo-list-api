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
        const sql = 'INSERT INTO task (text, user_id) values (?, ?)';
        const [result] = await db.query(sql, [text, userId]);
        return result;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

exports.update = async (text, isDone, id, userId) => {
    try {
        const sql = 'UPDATE task SET text = ?, isDone = ? WHERE id = ? AND user_id = ?';
        const [result] = await db.query(sql, [text, isDone, id, userId]);
        return result;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

exports.delete = async (id, userId) => {
    try {
        const sql = 'DELETE FROM task WHERE id = ? AND user_id = ?';
        const [result] = await db.query(sql, [id, userId]);
        return result;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};
