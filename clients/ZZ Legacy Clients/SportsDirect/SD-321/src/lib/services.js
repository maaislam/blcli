import { events } from './../../../../../lib/utils';
import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

/**
 * Standard experiment setup
 */
export const setup = () => {
  // set up events
  events.setDefaultCategory('Experimentation');
  events.setDefaultAction(CLIENT + " - "+ID);

  if(LIVECODE == "true") {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  // adds document body classlist 
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label) => {

  events.sendAuto(VARIATION, label);

}

/**
 * @desc Return the top 5 brands
 * @param {ElementArray} filterList
 */
const getBrands = (filterList) => {
  const brandList = [];
  if (filterList.length) {
    const orderedFilters = Array.from(filterList).sort((a, b) => {
      return +a.getAttribute('data-productcount') - +b.getAttribute('data-productcount');
    });
    for (let i = orderedFilters.length - 1; i >= 0; i -= 1) {
      if (brandList.length < 5) {
        brandList.push(orderedFilters[i]);
      }
    }
  }
  return brandList;
};
