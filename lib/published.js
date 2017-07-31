const collections = require('metalsmith-collections');

const env = process.env.NODE_ENV || process.env.ENV || 'development';

module.exports = function () {
  return function (files, metalsmith, done) {
    if (env === 'development') return done();

    for (file in files) {
      const meta = files[file];

      if (meta.title && meta.published === false) {
        delete files[file];
      }
    }

    done();
  }
}