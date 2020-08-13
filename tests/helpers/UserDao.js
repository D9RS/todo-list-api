const bcrypt = require('bcrypt');
const logger = require('../../core/logger');
const db = require('../../core/database');
const UserDao = require('../../dao/UserDao');
const { saltRounds } = require('../../config/auth');

const defaultUser = {
    login: 'tester',
    password: 'test',
};

exports.createDefaultUser = async ({ login, password } = defaultUser) => {
    try {
        const hash = await bcrypt.hash(password.toString(), saltRounds);
        const { affectedRows, insertId } = await UserDao.insert(login, hash);

        if (!affectedRows) {
            throw new Error('Error while creating a user in the test database!');
        }

        return { login, password, id: insertId };
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

exports.deleteDefaultUser = async (login = defaultUser.login) => {
    try {
        const [result] = await db.query('DELETE FROM `user` WHERE login = ?', [login]);

        if (!result.affectedRows) {
            throw new Error('Error while deleting user from database!');
        }

        return result;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};
