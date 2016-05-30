var layouts = require('metalsmith-layouts');

module.exports = function (buildsteps) {
  return buildsteps.use(layouts({
    engine: 'handlebars',
    directory: 'layouts',
    default: 'default.html',
    partials: 'layouts/partials',
    pattern: '*.html',
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: 'layouts',
    default: 'posts.html',
    partials: 'layouts/partials',
    pattern: ['posts/**/*'],
  }));
};