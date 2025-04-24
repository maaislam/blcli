export const qs = sel => document.querySelector(sel);
export const qsa = sel => document.querySelectorAll(sel);
export const getTextNodesRecursively = (elem, store = []) => {
  const kids = elem.childNodes;
  if (kids) {
    for (let i = 0, n = kids.length; i < n; i += 1) {
      const currentChild = kids[i];
      if (currentChild.nodeType === 3) {
        store.push(currentChild.textContent);
      } else {
        getTextNodesRecursively(currentChild, store);
      }
    }
  }
  return store;
};
