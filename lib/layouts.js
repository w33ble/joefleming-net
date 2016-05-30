var layouts = require('metalsmith-layouts');
var inplace = require('metalsmith-in-place');

module.exports = function (buildsteps) {
  return buildsteps
  .use(inplace({
    engine: 'handlebars',
    directory: 'layouts',
    partials: 'layouts/partials',
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: 'layouts',
    default: 'default.html',
    partials: 'layouts/partials',
    pattern: [
      'index.html',
      'all-posts/*.html'
    ],
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: 'layouts',
    default: 'posts.html',
    partials: 'layouts/partials',
    pattern: ['posts/**/*'],
  }));
};