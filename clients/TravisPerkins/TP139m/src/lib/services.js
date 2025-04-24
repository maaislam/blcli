import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

const sameHeights = () => {

  var nodeList = document.querySelectorAll('.product_item .product_header');
  var elems = [].slice.call(nodeList);

  var tallest = Math.max.apply(Math, elems.map(function(elem, index) {
    elem.style.minHeight = ''; // clean first
    return elem.offsetHeight;
  }));

  elems.forEach(function(elem, index, arr){ 
    elem.style.minHeight = tallest + 'px';
  });
  
}


export { setup, sameHeights }; // eslint-disable-line
