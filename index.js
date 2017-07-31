const fs  = require('fs');
const path = require('path');
const url = require('url');
const http = require('http');
const mime = require('mime');

const port = process.env.PORT || 8080;
const dir = path.resolve('build');

const server = http.createServer(function (req, res) {
  const pathname = url.parse(req.url).pathname;
  if (pathname === '/') pathname = '/index.html';
  const filePath = path.join(dir, pathname);
  const abs = path.resolve(filePath);

  fs.readFile(filePath, function(err, data) {
    const code = 200;
    const meta = {};

    if (err) {
      meta['Content-Type'] = 'text/plain';
      code = 500;
      data = 'error';

      if (err.code === 'ENOENT') {
        code = 404;
        data = 'not found';
      }
    } else {
      meta['Content-Type'] = mime.lookup(filePath);
    }

    console.log('%s - %d - %s', new Date().toString(), code, abs);
    res.writeHead(code, meta);
    res.end(data);
  });
});

server.listen(port, function() {
  console.log('Server running with "' + dir + '" on port ' + port);
});