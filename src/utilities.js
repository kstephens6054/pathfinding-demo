export const kebabToCamelCase = (str) => {
  return str.replaceAll(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
};

export const camelToKebabCase = (str) => {
  return str.replaceAll(
    /([A-Z])/g,
    (_match, letter) => `-${letter.toLowerCase()}`,
  );
};
