const logger = require('../core/logger');
const UserDao = require('../dao/UserDao');

module.exports = async (req, res, next) => {
    const { userId } = req.session;

    if (!userId) {
        return res.status(401).json({ error: 'Вы не авторизованы!' });
    }

    try {
        req.user = await UserDao.getById(userId);
        next();
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Неожиданная ошибка, попробуйте ещё раз...',
        });
    }
};
