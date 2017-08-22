const { createServer } = require('http');
const { join } = require('path');
const ecstatic = require('ecstatic');
const build = require('./build');

module.exports = function server() {
  const port = process.env.PORT || 8080;
  const config = {
    root: join(__dirname, '..', 'build'),
  };

  return new Promise((resolve) => {
    createServer(ecstatic(config)).listen(port, () => {
      console.log('Server listening on port', port);
      resolve();
    });
  });
};
