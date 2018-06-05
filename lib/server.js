const { createServer } = require('http');
const { join } = require('path');
const ecstatic = require('ecstatic');

module.exports = function server() {
  const port = process.env.PORT || 8080;
  const config = {
    root: join(__dirname, '..', 'build'),
    serverHeader: false,
  };

  return new Promise(resolve => {
    const mw = ecstatic(config);

    createServer((req, res) => {
      mw(req, res);
    }).listen(port, () => {
      console.log('Server listening on port', port);
      resolve();
    });
  });
};
