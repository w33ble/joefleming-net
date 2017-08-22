const build = require('./lib/build');
const server = require('./lib/server');

build().then(() => server());
