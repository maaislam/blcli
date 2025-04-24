export const qs = (selector) => document.querySelector(selector);

export const qsa = (selector) => document.querySelectorAll(selector);

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
