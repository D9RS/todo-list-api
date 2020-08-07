module.exports = (req, res, next) => {
    if (req.session.userId !== undefined) {
        return res.status(403).json({ error: 'Вы уже авторизованы!' });
    }
    next();
};
