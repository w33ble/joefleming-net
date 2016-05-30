require('dotenv').load();

var metalsmith = require('metalsmith');
var filter = require('metalsmith-filter');
var helpers = require('metalsmith-discover-helpers');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var server = require('./lib/server');
var sass = require('./lib/sass');
var permalinks = require('./lib/permalinks');
var layouts = require('./lib/layouts');
var snippet = require('metalsmith-snippet')

var buildsteps = metalsmith(__dirname)
.metadata({
  title: "joefleming.net",
  generator: "Metalsmith",
  url: "http://www.metalsmith.io/",
  site: {
    title: 'joefleming.net',
    url: 'http://joefleming.net',
    author: 'Joe Fleming',
  },
})
.source('src')
.destination('build')
.use(server())
.use(filter(['**', '!**/.DS_Store']))
.use(helpers({
  directory: 'lib/helpers'
}))
.use(sass())
.use(collections({
  posts: {
    pattern: 'content/posts/*',
    sortBy: 'date',
    reverse: true,
  }
}))
.use(markdown())
.use(snippet({
  maxLength: 300,
  stripHtml: true,
}))
.use(permalinks());

buildsteps = layouts(buildsteps);

buildsteps
.build(function(err, files) {
  if (err) { throw err; }
  console.log('Build complete');
});
