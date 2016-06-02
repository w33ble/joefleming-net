var collections = require('metalsmith-collections');

module.exports = function () {
  return collections({
    posts: {
      pattern: 'content/posts/*',
      sortBy: 'date',
      reverse: true,
    }
  })
}