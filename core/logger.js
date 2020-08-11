const log4js = require('log4js');
const { resolve } = require('path');
const { env } = require('../config/app');
const { info, debug, errors, logPath } = require('../config/logger');

const defaultLevel = env === 'production' ? 'info' : 'trace';

log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        infoFile: {
            type: 'file',
            filename: resolve(process.cwd(), logPath, env, `${info.filename}.log`),
            maxLogSize: info.maxLogSize,
            numBackups: info.numBackups,
        },
        errorFile: {
            type: 'file',
            filename: resolve(process.cwd(), logPath, env, `${errors.filename}.log`),
            maxLogSize: errors.maxLogSize,
            numBackups: errors.numBackups,
        },
        debugFile: {
            type: 'file',
            filename: resolve(process.cwd(), logPath, env, `${debug.filename}.log`),
            maxLogSize: debug.maxLogSize,
            numBackups: debug.numBackups,
        },
        info: {
            type: 'logLevelFilter',
            level: 'INFO',
            maxLevel: 'WARN',
            appender: 'infoFile',
        },
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile',
        },
        debug: {
            type: 'logLevelFilter',
            level: 'TRACE',
            maxLevel: 'DEBUG',
            appender: 'debugFile',
        }
    },
    categories: {
        default: { appenders: ['out', 'info', 'errors', 'debug'], level: defaultLevel },
        production: { appenders: ['out', 'info', 'errors'], level: 'info' },
        development: { appenders: ['out', 'info', 'errors', 'debug'], level: 'trace' },
        test: { appenders: ['info', 'errors', 'debug'], level: 'trace' },
    },
});

const logger = log4js.getLogger(env);

module.exports = logger;
