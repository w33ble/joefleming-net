require('dotenv').load();

const metalsmith = require('metalsmith');
const env = require('metalsmith-env');
const filter = require('metalsmith-filter');
const helpers = require('metalsmith-discover-helpers');
const markdown = require('metalsmith-markdown');
const dateFormatter = require('metalsmith-date-formatter');
const snippet = require('metalsmith-snippet')
const metallic = require('metalsmith-metallic');
const server = require('./lib/server');
const sass = require('./lib/sass');
const collections = require('./lib/collections');
const published = require('./lib/published');
const permalinks = require('./lib/permalinks');
const layouts = require('./lib/layouts');
const feeds = require('./lib/feeds');
const redirects = require('./lib/redirects');
const metadata = require('./metadata');

// metalsmith build process
const buildsteps = metalsmith(__dirname)
.metadata(metadata)
.source('src')
.destination('build')
.use(env())
.use(server())
.use(filter(['**', '!**/.DS_Store']))
.use(helpers({
  directory: 'lib/helpers'
}))
.use(sass())
.use(published())
.use(collections())
.use(metallic())
.use(dateFormatter({
  dates: [{
    date: 'MMM Do, YYYY'
  }]
}))
.use(markdown())
.use(snippet({
  maxLength: 300,
  stripHtml: true,
}))
.use(permalinks());

// wrap the output in layouts
layouts(buildsteps)
.use(feeds())
.use(redirects())
.build(function(err) {
  if (err) { throw err; }
  console.log('Build complete');
});
