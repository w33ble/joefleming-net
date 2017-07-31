module.exports = function limitHelper(collection, start, limit) {
  start = start || 0;
  limit = limit || 10;
  return collection.slice(start, limit);
};
