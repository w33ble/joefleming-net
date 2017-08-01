const markdown = require('metalsmith-markdown');

module.exports = b => b.use(markdown());
