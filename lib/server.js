const express = require('metalsmith-express');
const loggerMiddleware = require('./logger_middleware');

module.exports = (b) => {
  const isBuild = process.env.NODE_ENV === 'build';

  if (isBuild) return b.use((files, metalsmith, done) => done());

  return b.use(express({
    port: process.env.PORT || 8080,
    liveReload: false,
    middleware: [loggerMiddleware.access, loggerMiddleware.error],
  }));
};
