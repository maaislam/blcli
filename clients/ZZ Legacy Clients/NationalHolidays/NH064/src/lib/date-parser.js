/**
 * Strategy: Split date and price for value 'some date, £xx.xx'
 *
 * @param {String} value
 */
export const splitDateAndPrice = (value) => {
  return value.split(',').map((x) => x.trim());
};

/**
 * Strategy: Get clean string trimmed
 *
 * @param {String} value
 */
export const cleanString = (value) => {
  return value.trim();
};

/**
 * @param {Function} strategy
 */
export const parseDatesFromSelect = (strategy) => {
  /**
   * @param {HTMLSelectElement} select
   */
  return (select) => {
    if(!select || select.nodeName.toLowerCase() !== 'select') {
      throw "parseDatesFromSelect expects HTMLSelectelement";
    }

    const options = select.options;
    const results = [];

    if(options.length) {
      [].forEach.call(options, (opt, idx) => {
        const value = opt.innerText.trim();

        if(value) {
          let ident = opt.dataset.ident;

          if(!ident) {
            ident = Math.ceil(Math.random() * (+new Date));
            opt.dataset.ident = ident;
          }

          const result = strategy(value);

          let selected = false;
          if(idx == select.selectedIndex) {
            selected = true;
          }

          results.push({
            optionElement: opt,
            rawValue: value,
            selected: selected,
            ident: ident,
            value: result
          });
        }
      });
    }

    return results;
  }
};
