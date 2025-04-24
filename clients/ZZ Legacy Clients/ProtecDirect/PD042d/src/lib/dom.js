import cache from './cache';

const qs = (selector) => {
  return document.querySelector(selector);
};

const qsa = (selector) => {
  return document.querySelectorAll(selector);
};

export const elementExists = (selector) => {
  let result = false;
  if (cache.get(selector)) {
    result = true;
  } else {
    const elm = qs(selector);
    if (elm) {
      result = true;
      cache.add(selector, elm);
    }
  }
  return result;
};

export default { qs, qsa };
