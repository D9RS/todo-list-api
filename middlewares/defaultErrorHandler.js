const logger = require('../core/logger');

module.exports = (error, req, res, next) => {
    logger.error(error);
    res.status(500).json({ error: 'Uncaught error, try again later...' });
};
