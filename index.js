var fs  = require('fs');
var path = require('path');
var url = require('url');
var http = require('http');
var mime = require('mime');

var port = process.env.PORT || 8080;
var dir = path.resolve('build');

var server = http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  if (pathname === '/') pathname = '/index.html';
  var filePath = path.join(dir, pathname);
  var abs = path.resolve(filePath);

  fs.readFile(filePath, function(err, data) {
    var code = 200;
    var meta = {};

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