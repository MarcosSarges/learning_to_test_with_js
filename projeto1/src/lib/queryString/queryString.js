const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Fun queryString no supporting deep object');
  }
  return `${key}=${value}`;
};

const queryString = obj => Object.entries(obj).map(keyValueToString).join('&');

module.exports.queryString = queryString;

const StringToKeyValue = item => {
  let [key, value] = item.split('=');

  if (value.includes(',')) value = value.split(',');

  return [key, value];
};

const parser = string =>
  Object.fromEntries(string.split('&').map(StringToKeyValue));

module.exports.parser = parser;
