const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Fun queryString no supporting deep object');
  }
  return `${key}=${value}`;
};

const StringToKeyValue = item => {
  let [key, value] = item.split('=');
  if (value.includes(',')) value = value.split(',');
  return [key, value];
};

export const parser = string =>
  Object.fromEntries(string.split('&').map(StringToKeyValue));

export const queryString = obj =>
  Object.entries(obj).map(keyValueToString).join('&');
