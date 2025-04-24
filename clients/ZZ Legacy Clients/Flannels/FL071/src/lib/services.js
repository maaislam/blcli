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

function storeProduct() {
  const { colourVariantId } = window.dataLayer[1];
  let existingStorage = sessionStorage.getItem(`${ID}-visited`);
  existingStorage = existingStorage ? existingStorage.split(',') : [];
  existingStorage.push(colourVariantId);
  // Remove duplicates
  const uniqueArray = existingStorage.filter((item, pos) => existingStorage.indexOf(item) === pos);
  
  sessionStorage.setItem(`${ID}-visited`, uniqueArray.toString());
}

function getProducts() {
  let visitedProductArr;
  const visitedProducts = sessionStorage.getItem(`${ID}-visited`);
  if (visitedProducts) {
    visitedProductArr = visitedProducts.split(/,,|,/);
  }
  // Remove any commas or empty array items.
  if (visitedProductArr && visitedProductArr.length) {
    visitedProductArr = visitedProductArr.filter((el) => {
      if (el !== '' || el.match(/,/gm)) {
        return el;
      }
    });
  }
  // Keep list lower than 20, remove the first product ID if is higher.
  if (visitedProductArr && visitedProductArr.length > 10) {
    while (visitedProductArr.length > 10) {
      visitedProductArr.shift();
    }
  }
  return visitedProductArr;
}

function addVisitedEl(product) {
  if (product) {
    product.classList.add(`${ID}-viewed`);
    if (!product.querySelector(`.${ID}-visited`)) {
      product.querySelector('.productimage').insertAdjacentHTML('beforeend', `
        <div class="${ID}-visited">
          <p>You've looked at</p>
        </div>
      `);
    }
  }
}


export { setup, storeProduct, getProducts, addVisitedEl }; // eslint-disable-line
