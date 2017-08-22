const { createServer } = require('http');
const { join } = require('path');

const ecstatic = require('ecstatic');

const port = process.env.PORT || 8080;
const config = {
  root: join(__dirname, 'build'),
};

createServer(ecstatic(config)).listen(port, () => {
  console.log('Server listening on port', port);
});
