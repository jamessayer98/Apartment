export const camelToSnake = (input) => {
  return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export const snakeToCamel = (input) => {
  return input.replace(/_([a-z])/g, function (g) {
      return g[1].toUpperCase();
  });
}

export const convertToSnake = (obj) => {
  if (typeof obj !== 'object') return obj;

  Object.keys(obj).forEach((key) => {
    obj[camelToSnake(key)] = convertToSnake(obj[key]);
    if (/([a-z])([A-Z])/.test(key)) delete obj[key];
  });
  return obj;
}

export const convertToCamel = (obj) => {
  if (typeof obj !== 'object') return obj;

  Object.keys(obj).forEach((key) => {
    obj[snakeToCamel(key)] = convertToCamel(obj[key]);
    if (/_([a-z])/.test(key)) delete obj[key];
  });
  return obj;
}

export const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
}
