require('dotenv').load();

var metalsmith = require('metalsmith');
var filter = require('metalsmith-filter');
var helpers = require('metalsmith-discover-helpers');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var dateFormatter = require('metalsmith-date-formatter');
var server = require('./lib/server');
var sass = require('./lib/sass');
var metallic = require('metalsmith-metallic');
var permalinks = require('./lib/permalinks');
var layouts = require('./lib/layouts');
var snippet = require('metalsmith-snippet')
var feeds = require('./lib/feeds');
var redirect = require('metalsmith-redirect');

var metadata = require('./metadata');

var buildsteps = metalsmith(__dirname)
.metadata(metadata)
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
.use(redirect({
  '/posts': '/all-posts',
  '/posts/a-history-of-coding-and-computers': '/posts/my-history-of-coding-and-computers',
  '/posts/configure-apache-for-multiple-wordpress-sites': '/posts/configuring-apache-and-fcgi-for-multiple-wordpress-sites',
  '/posts/drupals-on-hold': '/posts/drupal-s-on-hold',
  '/posts/evernotes-clearly': '/posts/evernote-s-clearly',
  '/posts/grunt-painless-build-process': '/posts/grunt-for-a-painless-build-process',
  '/posts/how-i-use-backbone-router': '/posts/how-i-use-backbone-s-router',
  '/posts/ill-have-one-of-your-finest-arduinos-please': '/posts/i-ll-have-one-of-your-finest-arduinos-please',
  '/posts/inaugural-openhack-postmortem': '/posts/inaugural-openhackphx-a-postmortem',
  '/posts/openhack-002-portmortem': '/posts/openhackphx-002-a-postmortem',
  '/posts/remote-backups-with-amazons-s3': '/posts/remote-backups-with-amazon-s-s3',
  '/posts/skirting-isp-torrent-fitlering': '/posts/skirting-isp-torrent-filtering-reset-requests',
  '/posts/slim-jade': '/posts/slim-jade-a-light-weight-php-framework-using-jade-templates',
  '/posts/static-sites-rock': '/posts/static-websites-rock',
  '/posts/wordpress-out-docpad-in': '/posts/wordpress-is-out-docpad-is-in',
}))
.build(function(err, files) {
  if (err) { throw err; }
  console.log('Build complete');
});
