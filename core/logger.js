const log4js = require('log4js');
const { resolve } = require('path');
const { env } = require('../config/app');
const { app, errors, logPath } = require('../config/logger');

const defaultLevel = env === 'production' ? 'info' : 'debug';

log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        app: {
            type: 'file',
            filename: resolve(process.cwd(), logPath, `${app.filename}.${env}.log`),
            maxLogSize: app.maxLogSize,
            numBackups: app.numBackups,
        },
        errorFile: {
            type: 'file',
            filename: resolve(process.cwd(), logPath, `${errors.filename}.${env}.log`),
            maxLogSize: errors.maxLogSize,
            numBackups: errors.numBackups,
        },
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile',
        },
    },
    categories: {
        default: { appenders: ['out', 'app', 'errors'], level: defaultLevel },
        production: { appenders: ['out', 'app', 'errors'], level: 'info' },
        development: { appenders: ['out', 'app', 'errors'], level: 'debug' },
        test: { appenders: ['app', 'errors'], level: 'trace' },
    },
});

const logger = log4js.getLogger(env);

module.exports = logger;
