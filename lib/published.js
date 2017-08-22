const collections = require('metalsmith-collections');

module.exports = b => b.use((files, metalsmith, done) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment) return done();

  // walk through each file
  for (file in files) {
    const meta = files[file];

    // if file has a title and published is false, remove it
    if (meta.title && meta.published === false) {
      delete files[file];
    }
  }

  done();
});
