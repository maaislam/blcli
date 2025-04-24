/**
 * @param {Object} events Events library interface
 * @param {Object} elements
 * @param {String} cat
 * @param {String} action
 * @param {Object} opts
 */
export const trackClicks = (events, elements, cat, action, opts = {}) => {
  for(let label in elements) {
    const nodes = document.querySelectorAll(elements[label]);
    [].forEach.call(nodes, n => {
      n.addEventListener('click', e => {
        events.send(cat, action, label, opts);
      });
    });
  }
}
