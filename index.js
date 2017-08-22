const compose = require('just-compose');
const metalsmith = require('metalsmith');

// metalsmith build process
compose(
  require('./plugins/env'),
  require('./plugins/filter'),
  require('./plugins/handlebars_helpers'),
  require('./plugins/sass'),
  require('./plugins/published'),
  require('./plugins/collections'),
  require('./plugins/metallic'),
  require('./plugins/date_formatter'),
  require('./plugins/markdown'),
  require('./plugins/snippet'),
  require('./plugins/permalinks'),
  require('./plugins/layouts'),
  require('./plugins/feeds'),
  require('./plugins/redirects')
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
