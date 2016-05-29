var watch = require('metalsmith-watch');
var server = require('metalsmith-express');
var loggerMiddleware = require('./logger_middleware');

var env = process.env.NODE_ENV || process.env.ENV || 'development';
var middleware = [loggerMiddleware.access, loggerMiddleware.error];

function noop(files, metalsmith, done) {
  done();
}

exports.watch = function () {
  var watchConfig = {
    paths: {
      '${source}/content/**/*': true,
      'layouts/**/*': '**/*.html',
    },
    livereload: true
  };

  if (env === 'development') {
    return watch(watchConfig);
  }

  return noop;
}

exports.serve = function () {
  if (env === 'build') {
    return noop;
  }

  var serverConfig = {
    port: process.env.PORT || 8080,
    liveReload: false,
  };

  if (env === 'development') {
    Object.assign(serverConfig, {
      liveReload: true,
      middleware: middleware,
    });
  }

  return server(serverConfig);
}