/* eslint-disable no-prototype-builtins */
// get percentage discount
export const getPercentageDiscount = (str) => {
  let regex = /\((.*)\)/;
  let match = str.match(regex);
  if (!match) return;
  let bracketString = match[1];
  return bracketString;
};
export const isPdp = () => window.location.href.includes('/p/');

export const isPlp = () => window.location.href.includes('/c/');

export const findObject = (obj, key, value) => {
  if (!obj) return undefined;

  if (obj[key] === value) return obj;

  for (const k in obj) {
    if (obj.hasOwnProperty(k) && typeof obj[k] === 'object') {
      const found = findObject(obj[k], key, value);
      if (found) return found;
    }
  }

  return undefined;
};
export const formatPrice = (amount, code = 'en-GB', currency = 'GBP') => {
  return new Intl.NumberFormat(code, {
    style: 'currency',
    currency,
  }).format(amount);
};
