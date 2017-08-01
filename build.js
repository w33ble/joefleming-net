const compose = require('just-compose');
const metalsmith = require('metalsmith');

// metalsmith build process
compose(
  require('./lib/env'),
  require('./lib/server'),
  require('./lib/filter'),
  require('./lib/handlebars_helpers'),
  require('./lib/sass'),
  require('./lib/published'),
  require('./lib/collections'),
  require('./lib/metallic'),
  require('./lib/date_formatter'),
  require('./lib/markdown'),
  require('./lib/snippet'),
  require('./lib/permalinks'),
  require('./lib/layouts'),
  require('./lib/feeds'),
  require('./lib/redirects')
)(
  metalsmith(__dirname)
  .metadata(require('./metadata'))
  .source('src')
  .destination('build')
  .clean(true)
)
.build(function(err) {
  if (err) { throw err; }
  console.log('Build complete');
});
