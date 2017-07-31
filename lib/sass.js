const sass = require('metalsmith-sass');

const env = process.env.NODE_ENV || process.env.ENV || 'development';

module.exports = function () {
  const target = 'css/';

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