export const isMobile = () => /iphone|ipod|android|ie|blackberry|fennec/i.test(navigator.userAgent);

export const isString = value => typeof value === 'string';

export const anonymizeString = str => {
  if (!str) return '';

  return Array.from(new Array(str.length))
    .map(() => '*')
    .join('');
};
