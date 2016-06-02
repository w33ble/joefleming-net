var collections = require('metalsmith-collections');

var env = process.env.NODE_ENV || process.env.ENV || 'development';

module.exports = function () {
  return function (files, metalsmith, done) {
    if (env === 'development') return done();

    for (file in files) {
      var meta = files[file];

      if (meta.title && meta.published === false) {
        console.log('remove', file)
        delete files[file];
      }
    }

    done();
  }
}