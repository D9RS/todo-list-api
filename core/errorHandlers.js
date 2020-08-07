const logger = require('../core/logger');

exports.unhandledRejection = (reason, p) => {
    logger.error(reason, 'Unhandled Rejection at Promise', p);
};

exports.uncaughtException = (error) => {
    logger.fatal(error, 'Uncaught Exception thrown');
    process.exit(1);
};
