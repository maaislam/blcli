import cache from './cache';
import settings from './settings';

/**
 * Helper get element (cached)
 */
export const getElement = (key, selector, skipCache = false) => {
  let elm = null;

  if(skipCache) {
    elm = document.querySelector(selector)
  } else {
    elm = cache.get(key);
    if(!elm) {
      elm = document.querySelector(selector);

      if(elm) {
        elm.dataset[`${settings.ID.toLowerCase()}ident`] = key;
        cache.add(key, elm);
      }
    }
  }

  return elm;
};

/**
 * Get text nodes
 */
export const getTextNodesRecursive = (elm, store = []) => {
  const kids = elm.childNodes;
  kids && kids.forEach((k) => {
    if(k.nodeType === 3) {
      store.push(k.textContent);
    } else {
      getTextNodesRecursive(k, store);
    }
  });

  return store;
};

