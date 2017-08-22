const collections = require('metalsmith-collections');

module.exports = b => b.use(collections({
  posts: {
    pattern: 'content/posts/*',
    sortBy: 'date',
    reverse: true,
  }
}));
