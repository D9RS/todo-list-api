module.exports = {
    logPath: './logs',
    app: {
        filename: 'app',
        maxLogSize: 10485760,
        numBackups: 5,
    },
    errors: {
        filename: 'errors',
        maxLogSize: 10485760,
        numBackups: 3,
    },
};
