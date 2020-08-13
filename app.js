require('dotenv-flow').config();

const express = require('express');
const expressSession = require('express-session');
const helmet = require('helmet');

const { env } = require('./config/app');
const session = require('./config/session');

const routes = require('./routes');
const defaultErrorHandler = require('./middlewares/defaultErrorHandler');
const notFoundMiddleware = require('./middlewares/notFound');

const { unhandledRejection, uncaughtException } = require('./core/errorHandlers');

const app = express();

app.set('env', env);

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressSession(session));

app.use('/api', routes);

app.use(notFoundMiddleware);
app.use(defaultErrorHandler);

process.on('unhandledRejection', unhandledRejection);
process.on('uncaughtException', uncaughtException);

module.exports = app;
