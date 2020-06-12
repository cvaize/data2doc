module.exports = function (data) {
  for (const dataKey in data) {
    if (typeof data[dataKey] === 'string' || data[dataKey] instanceof String) {
      data[dataKey] = data[dataKey].trim();
    }
  }
  return data;
};
