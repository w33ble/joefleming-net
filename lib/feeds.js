const feed = require('metalsmith-feed');

module.exports = (b) => {
  const date = new Date();

  const rssMeta = {
    language: 'en',
    copyright: date.getFullYear() + ' Joe Fleming, joefleming.net',
    pubDate: date,
    ttl: 480,
    site_url: 'http://joefleming.net',
  }

  return b.use(feed(Object.assign({
    collection: 'posts',
    limit: 20,
    destination: 'posts.xml',
    postDescription: (file) => file.snippet,
  }, rssMeta)));
};
