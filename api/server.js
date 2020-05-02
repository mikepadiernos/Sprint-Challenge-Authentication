const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const middle = require('../auth/auth-middleware.js');

const auth = middle.authenticator;

const server = express();

server.use(
	helmet(),
	morgan(':method :url :status :response-time ms - :res[content-length]'),
	cors(),
	express.json()
);

server.use('/api/auth', authRouter);
server.use('/auth', authRouter);
server.use('/api/jokes', auth, jokesRouter);
server.use('/jokes', auth, jokesRouter);

module.exports = server;
