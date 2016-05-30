require('dotenv').load();

var metalsmith = require('metalsmith');
var filter = require('metalsmith-filter');
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
  description: "My personal site and blog.",
  generator: "Metalsmith",
  url: "http://www.metalsmith.io/",
})
.source('src')
.destination('build')
.use(server())
.use(filter(['**', '!**/.DS_Store']))
.use(sass())
.use(collections({
  posts: 'content/posts/*',
}))
.use(markdown())
.use(snippet({
  maxLength: 300,
  stripHtml: true,
}))
.use(permalinks());

buildsteps = buildsteps.use(function (files, ms, done) {
  for (file in files) {
    if (file === 'posts/git-flow/index.html')
      console.log(file, files[file])
  }
  done();
})

buildsteps = layouts(buildsteps);

buildsteps.build(function(err, files) {
  if (err) { throw err; }
  console.log('Build complete');
});
