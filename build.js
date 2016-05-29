require('dotenv').load();

var metalsmith = require('metalsmith');
var filter = require('metalsmith-filter');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var server = require('./lib/server');
var sass = require('./lib/sass');
var permalinks = require('./lib/permalinks');

metalsmith(__dirname)
.metadata({
  title: "joefleming.net",
  description: "My personal site and blog.",
  generator: "Metalsmith",
  url: "http://www.metalsmith.io/",
})
.source('src')
.destination('build')
.use(server.serve())
.use(server.watch())
.use(filter(['**', '!**/.DS_Store']))
.use(sass())
.use(collections({
  posts: 'content/posts/*',
  news: 'content/news/*',
}))
.use(markdown())
.use(permalinks())
.use(layouts({
  engine: 'handlebars',
  directory: 'layouts',
  default: 'default.html',
  partials: 'layouts/partials',
  pattern: ['**/*.md', '**/*.html'],
}))
.build(function(err, files) {
  if (err) { throw err; }
  console.log('Build complete');
});
