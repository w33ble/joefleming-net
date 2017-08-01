const permalinks = require('metalsmith-permalinks');

module.exports = b => b.use(permalinks({
  pattern: ':title',
  date: 'YYYY',
  relative: false,

  // each linkset defines a match, and any other desired option
  linksets: [{
    match: { collection: 'posts' },
    pattern: 'posts/:title',
  }]
}));
