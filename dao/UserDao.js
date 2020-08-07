const logger = require('../core/logger');
const db = require('../core/database');

exports.getById = async (id) => {
    try {
        const [[user]] = await db.query('SELECT id, login, password FROM user WHERE id = ?', [id]);
        return user;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

exports.getByLogin = async (login) => {
    try {
        const sql = 'SELECT id, login, password FROM user WHERE login = ?';
        const [[user]] = await db.query(sql, [login]);
        return user;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

exports.insert = async (login, passwordHash) => {
    try {
        const sql = 'INSERT INTO user (login, password) values (?, ?)';
        const [result] = await db.query(sql, [login, passwordHash]);
        return result;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};
