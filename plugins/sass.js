const sass = require('metalsmith-sass');

module.exports = (b) => {
  const target = 'css/';
  const isDevelopment = process.env.NODE_ENV === 'development';

  const config = {
    outputStyle: 'compressed',
    outputDir: target,
    includePaths: [
      'node_modules',
    ],
  };

  const devConfig = Object.assign({}, config, {
    // sourceMapEmbed: true,
    sourceMapRoot: '..',
  });

  return b.use(sass((isDevelopment) ? devConfig : config));
};
