const filter = require('metalsmith-filter');

const excludes = [
  '**',
  '!**/.DS_Store'
];

module.exports = b => b.use(filter(excludes));