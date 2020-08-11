module.exports = {
    logPath: './logs',
    info: {
        filename: 'info',
        maxLogSize: 10485760,
        numBackups: 5,
    },
    errors: {
        filename: 'errors',
        maxLogSize: 10485760,
        numBackups: 3,
    },
    debug: {
        filename: 'debug',
        maxLogSize: 10485760,
        numBackups: 5,
    }
};
