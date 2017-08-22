const { join } = require('path');
const compose = require('just-compose');
const metalsmith = require('metalsmith');

module.exports = function build() {
  console.log('Build started');

  return new Promise((resolve, reject) => {
    // metalsmith build process
    compose(
      require('../plugins/env'),
      require('../plugins/filter'),
      require('../plugins/handlebars_helpers'),
      require('../plugins/sass'),
      require('../plugins/published'),
      require('../plugins/collections'),
      require('../plugins/metallic'),
      require('../plugins/date_formatter'),
      require('../plugins/markdown'),
      require('../plugins/snippet'),
      require('../plugins/permalinks'),
      require('../plugins/layouts'),
      require('../plugins/feeds'),
      require('../plugins/redirects')
    )(
      metalsmith(join(__dirname, '..'))
      .metadata(require('../metadata'))
      .source('src')
      .destination('build')
      .clean(true)
    )
    .build(function(err) {
      if (err) {
        reject(err);
      } else {
        console.log('Build Complete')
        resolve();
      }
    });
  })
};
