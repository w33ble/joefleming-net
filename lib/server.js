const server = require('metalsmith-express');
const loggerMiddleware = require('./logger_middleware');

const env = process.env.NODE_ENV || process.env.ENV || 'development';
const middleware = [loggerMiddleware.access, loggerMiddleware.error];

function noop(files, metalsmith, done) {
  done();
}

module.exports = function () {
  if (env === 'build') {
    return noop;
  }

  const serverConfig = {
    port: process.env.PORT || 8080,
    liveReload: false,
    middleware: middleware,
  };

  return server(serverConfig);
}