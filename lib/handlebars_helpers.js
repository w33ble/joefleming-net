const Handlebars = require('handlebars');

module.exports = b => b.use((files, metalsmith, done) => {
  Handlebars.registerHelper('limit', (collection, start, limit) => {
    start = start || 0;
    limit = limit || 10;
    return collection.slice(start, limit);
  });

  done();
});
