const queryString = obj =>
  Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

module.exports.queryString = queryString;
