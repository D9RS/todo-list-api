const mysql = require('mysql2');
const database = require('../config/database');
const logger = require('./logger');

const pool = mysql.createPool(database);
const promisePool = pool.promise();

promisePool
    .query('SELECT 1')
    .then(() => logger.info('Successfully connected to the database!'))
    .catch((error) => {
        logger.fatal(error);
        process.exit(1);
    });

module.exports = promisePool;
