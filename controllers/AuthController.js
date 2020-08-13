const bcrypt = require('bcrypt');
const logger = require('../core/logger');
const UserDao = require('../dao/UserDao');
const { saltRounds } = require('../config/auth');
const { isLogin, isPassword } = require('../constants/regexps');

exports.signUp = async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ error: 'Недостаточно параметров!' });
    }

    if (!isLogin.test(login)) {
        return res.status(400).json({ error: 'Некорректный логин!' });
    }

    if (!isPassword.test(password)) {
        return res.status(400).json({ error: 'Некорректный пароль!' });
    }

    try {
        const user = await UserDao.getByLogin(login);

        if (user) {
            return res.status(400).json({ error: 'Данный логин уже занят' });
        }

        const hash = await bcrypt.hash(password.toString(), saltRounds);
        const result = await UserDao.insert(login, hash);

        if (!result.affectedRows) {
            return res.status(400).json({
                error:
                    'Ошибка регистрации, проверьте правильность введенных данных и повторите попытку!',
            });
        }

        return res.json({ success: true });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Неожиданная ошибка, попробуйте ещё раз...',
        });
    }
};

exports.signIn = async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ error: 'Недостаточно параметров!' });
    }

    try {
        const user = await UserDao.getByLogin(login);

        if (!user) {
            return res.status(400).json({ error: 'Пользователь не найден!' });
        }

        const hasCorrectPassword = await bcrypt.compare(password, user.password);

        if (!hasCorrectPassword) {
            return res.status(400).json({ error: 'Неверный пароль. Попробуйте снова!' });
        }

        req.session.userId = user.id;
        req.session.authTimeStamp = Date.now();

        return res.json({ success: true });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Неожиданная ошибка, попробуйте ещё раз...',
        });
    }
};

exports.signOut = async (req, res) => {
    try {
        req.session.destroy();
        return res.json({ success: true });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Неожиданная ошибка, попробуйте ещё раз...',
        });
    }
};
