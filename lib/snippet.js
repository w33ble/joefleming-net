const snippet = require('metalsmith-snippet');

module.exports = b => b.use(snippet({
  maxLength: 300,
  stripHtml: true,
}));
