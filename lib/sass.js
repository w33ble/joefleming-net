var sass = require('metalsmith-sass');

var env = process.env.NODE_ENV || process.env.ENV || 'development';

module.exports = function () {
  var target = 'css/';

  if (env === 'development') {
    return sass({
      outputStyle: 'expanded',
      outputDir: target,
      sourceMapEmbed: true,
      sourceMapRoot: '..',
    })
  }

  return sass({
    outputStyle: 'compact',
    outputDir: target,
  });
};