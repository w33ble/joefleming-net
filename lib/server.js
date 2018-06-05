require('dotenv').config();
const { join } = require('path');
const express = require('express');
const logger = require('./logger');

module.exports = function server() {
  const port = process.env.PORT || 8080;

  return new Promise(resolve => {
    const app = express();

    app.set('x-powered-by', false);

    app.use(logger.access);

    app.use(
      express.static(join(__dirname, '..', 'build'), {
        maxAge: 3600 * 1000, // one hour
      })
    );

    app.use(logger.error);

    app.listen(port, () => {
      console.log('Server listening on port', port);
      resolve();
    });
  });
};
