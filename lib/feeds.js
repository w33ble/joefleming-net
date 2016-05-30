var feed = require('metalsmith-feed');

module.exports = function () {
  return feed({
    collection: 'posts',
    limit: 20,
    destination: 'posts.xml',
    postDescription: (file) => file.snippet,
  });
};
