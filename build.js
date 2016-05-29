var metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
// var sass = require('metalsmith-sass');
var permalinks = require('metalsmith-permalinks');

metalsmith(__dirname)
.metadata({
  title: "joefleming.net",
  description: "My personal site and blog.",
  generator: "Metalsmith",
  url: "http://www.metalsmith.io/",
})
.source('src/')
.destination('build/')
// .use(sass({
//   "outputStyle": "expanded"
// }))
.use(collections({
  posts: 'content/posts/*',
  news: 'content/news/*',
}))
.use(markdown())
.use(permalinks({
  pattern: ':title',
  date: 'YYYY',

  // each linkset defines a match, and any other desired option
  linksets: [{
    match: { collection: 'posts' },
    pattern: 'posts/:title',
  },{
    match: { collection: 'news' },
    pattern: 'news/:date/:title',
  }]
}))
.use(layouts({
  engine: 'handlebars',
  directory: 'layouts',
  partials: 'layouts/partials',
  default: 'default.html',
}))
.build(function(err, files) {
  if (err) { throw err; }
  console.log('Build complete');
});