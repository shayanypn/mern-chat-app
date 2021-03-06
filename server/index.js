const { PORT } = require('./app/config');
const http = require('http');
const logger = require('./utils/logger');
const app = require('./app/app');
const Socket = require('./socket');

const server = http.createServer(app);
const io = require('socket.io')(http);
const loggerDispatcher = 'Index';

io.on('connection', Socket);


process.on('unhandledRejection', (err, promise) => {
  // if (err.operational === true)
  logger.warn(err, {
    dispatcher: loggerDispatcher,
    from: 'unhandledRejection event',
    promise,
  });
});

process.on('uncaughtException', err => {
  logger.error(err, { dispatcher: loggerDispatcher, from: 'uncaughtException event' }, () => {
    process.exit(1);
  });
});

server.on('error', err => {
  if (err.syscall !== 'listen') {
    throw err;
  }

  switch (err.code) {
    case 'EACCES': {
      logger.error(`${PORT} requires elevated privileges`, { dispatcher: loggerDispatcher }, () => {
        process.exit(1);
      });
      break;
    }
    case 'EADDRINUSE': {
      logger.error(`${PORT} is already in use`, { dispatcher: loggerDispatcher }, () => {
        process.exit(1);
      });
      break;
    }
    default: {
      throw err;
    }
  }
});

server.listen(PORT , () => {
  logger.info(`Listening on port ${PORT}`, {
    dispadispatcher: loggerDispatcher,
  });
});
io.listen(server);
