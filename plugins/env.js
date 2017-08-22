require('dotenv').load();

const env = require('metalsmith-env');

module.exports = b => b.use(env());