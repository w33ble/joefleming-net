const collections = require('metalsmith-collections');

module.exports = function mCollection() {
  return collections({
    posts: {
      pattern: 'content/posts/*',
      sortBy: 'date',
      reverse: true,
    }
  })
}
