const sass = require('metalsmith-sass');

module.exports = (b) => {
  const target = 'css/';
  const isDevelopment = process.env.NODE_ENV === 'development';

  const devConfig = {
    outputStyle: 'expanded',
    outputDir: target,
    sourceMapEmbed: true,
    sourceMapRoot: '..',
  };

  const prodConfig = {
    outputStyle: 'compact',
    outputDir: target,
  };

  return b.use(sass((isDevelopment) ? devConfig : prodConfig));
};
