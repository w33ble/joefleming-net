require('dotenv');

var metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var permalinks = require('./lib/permalinks');

metalsmith(__dirname)
.metadata({
  title: "joefleming.net",
  description: "My personal site and blog.",
  generator: "Metalsmith",
  url: "http://www.metalsmith.io/",
})
.source('src/')
.destination('build/')
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