const expressWinston = require('express-winston');
const winston = require('winston'); // for transports.Console
const pkg = require('../package');

expressWinston.requestWhitelist.push('ip');
expressWinston.requestWhitelist.push('ips');

function addServerTransport(transports) {
  const config = {
    host: process.env.WINSTOND_HOST,
    port: process.env.WINSTOND_PORT,
    ssl: !!process.env.WINSTOND_SSL,
    path: process.env.WINSTOND_PATH || '/',
  };

  // append auth if defined
  if (process.env.WINSTOND_USER && process.env.WINSTOND_PASS) {
    config.auth = {
      username: process.env.WINSTOND_USER,
      password: process.env.WINSTOND_PASS,
    };
  }

  if (config.host && config.port) {
    transports.push(new (winston.transports.Http)(config));
  }
}

exports.access = (function () {
  const transports = [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: true,
    }),
  ];

  addServerTransport(transports);

  return expressWinston.logger({
    transports: transports,
    baseMeta: {
      server: {
        name: pkg.name,
        version: pkg.version,
      }
    }
  });
})();

exports.error = (function () {
  const transports = [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: true,
    }),
  ];

  addServerTransport(transports);

  return expressWinston.errorLogger({
    transports: transports,
    baseMeta: {
      server: {
        name: pkg.name,
        version: pkg.version,
      }
    }
  });
})();
