exports.id = (req, res, next, id) => {
    id = +id;
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Некорректный параметр id!' });
    }
    next();
};
