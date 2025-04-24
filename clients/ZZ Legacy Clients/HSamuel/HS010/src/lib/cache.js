import settings from './settings';

/**
 * Caching decorator
 * 
 * @param {Function} fn
 * @return {Function}
 */
export const cacheDecorator = (fn) => {
  let cache = null;

  return () => {
    if(cache === null) {
      cache = fn();
    }

    return cache;
  };
};
