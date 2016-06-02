require('dotenv').load();

var metalsmith = require('metalsmith');
var env = require('metalsmith-env');
var filter = require('metalsmith-filter');
var helpers = require('metalsmith-discover-helpers');
var collections = require('./lib/collections');
var published = require('./lib/published');
var markdown = require('metalsmith-markdown');
var dateFormatter = require('metalsmith-date-formatter');
var server = require('./lib/server');
var sass = require('./lib/sass');
var metallic = require('metalsmith-metallic');
var permalinks = require('./lib/permalinks');
var layouts = require('./lib/layouts');
var snippet = require('metalsmith-snippet')
var feeds = require('./lib/feeds');
var redirects = require('./lib/redirects');

var metadata = require('./metadata');

var buildsteps = metalsmith(__dirname)
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

buildsteps = layouts(buildsteps);

buildsteps
.use(feeds())
.use(redirects())
.build(function(err) {
  if (err) { throw err; }
  console.log('Build complete');
});
