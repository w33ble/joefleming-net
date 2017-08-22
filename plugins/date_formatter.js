const dateFormatter = require('metalsmith-date-formatter');

module.exports = b => b.use(dateFormatter({
  dates: [{
    date: 'MMM Do, YYYY'
  }]
}));
