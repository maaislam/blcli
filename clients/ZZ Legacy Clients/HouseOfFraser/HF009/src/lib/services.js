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
  
  // for this client, we need to take the colour variant id of the highlighted colour on the PDP
  let colourVariantId = "";

  if (document.querySelector('.variantHighlight')) {
    colourVariantId = document.querySelector('.variantHighlight').getAttribute('data-colvarid');
  } else {
    colourVariantId = window.dataLayer[1].colourVariantId;
  } 

  // this relied on datalayer which only had the last colour variant which meant the wrong products were selected.
  //const { colourVariantId } = window.dataLayer[1];

  let existingStorage = sessionStorage.getItem('HF009-visited');

  existingStorage = existingStorage ? existingStorage.split(',') : [];

  existingStorage.push(colourVariantId);

  // Remove duplicates
  const uniqueArray = existingStorage.filter((item, pos) => existingStorage.indexOf(item) === pos);

  sessionStorage.setItem('HF009-visited', uniqueArray.toString());
}

function getProducts() {
  let visitedProductArr;
  const visitedProducts = sessionStorage.getItem('HF009-visited');
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
    product.classList.add('HF009-viewed');
    if (!product.querySelector('.HF009-visited')) {
      product.insertAdjacentHTML('beforeend', `
        <div class="HF009-visited">
          <p>You Viewed...</p>
        </div>
      `);
    }
  }
}


export { setup, storeProduct, getProducts, addVisitedEl }; // eslint-disable-line
