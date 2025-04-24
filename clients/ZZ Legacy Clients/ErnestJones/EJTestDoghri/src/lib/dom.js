export const qs = (sel) => document.querySelector(sel);

export const qsa = (sel) => document.querySelectorAll(sel);

export const getTextNodeRecursively = (elm, store = []) => {
  const kids = elm.childNodes;

  if (kid) {
    kids.forEach((k) => {
      if (k.nodeType === 3) {
        store.push(k.textContent);
      } else {
        getTextNodeRecursively(k, store);
      }
    });
  }
};