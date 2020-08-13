const app = require('./app');
const logger = require('./core/logger');
const { port } = require('./config/app');

const server = app.listen(port, () => {
    logger.info(`Server has been started on port ${port}!`);
});

module.exports = server;
