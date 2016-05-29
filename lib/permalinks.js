var permalinks = require('metalsmith-permalinks');

module.exports = function () {
  return permalinks({
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
  });
};