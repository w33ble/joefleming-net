var feed = require('metalsmith-feed');

module.exports = function () {
  var date = new Date();

  var rssMeta = {
    language: 'en',
    copyright: date.getFullYear() + ' Joe Fleming, joefleming.net',
    pubDate: date,
    ttl: 480,
    site_url: 'http://joefleming.net',
  }

  return feed(Object.assign({
    collection: 'posts',
    limit: 20,
    destination: 'posts.xml',
    postDescription: (file) => file.snippet,
  }, rssMeta));
};
