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
  
  let colourVariantId = "";

  if (document.querySelector('.variantHighlight')) {
    colourVariantId = document.querySelector('.variantHighlight').getAttribute('data-colvarid');
  } else {
    colourVariantId = window.dataLayer[1].colourVariantId;
  } 

  console.log('colour ID, ', colCode);
  let existingStorage = sessionStorage.getItem('FL040-visited');

  existingStorage = existingStorage ? existingStorage.split(',') : [];

  existingStorage.push(colCode);

  // Remove duplicates
  const uniqueArray = existingStorage.filter((item, pos) => existingStorage.indexOf(item) === pos);

  sessionStorage.setItem('FL040-visited', uniqueArray.toString());
}

function getProducts() {
  let visitedProductArr;
  const visitedProducts = sessionStorage.getItem('FL040-visited');
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
  if (visitedProductArr && visitedProductArr.length > 20) {

    var removedEls = [];

    while (visitedProductArr.length > 20) {
      let firstArr = visitedProductArr.shift();
      removedEls.push(firstArr);
    }

    visitedProductArr = visitedProductArr.filter((el) => {
      if(!removedEls.includes(el)) {
        return el;
      }
    });

    sessionStorage.setItem('SD050-visited', visitedProductArr.toString());
  }
  return visitedProductArr;
}

function addVisitedEl(product) {
  if (product) {
    product.classList.add('FL040-viewed');
    if (!product.querySelector('.FL040-visited')) {
      product.insertAdjacentHTML('beforeend', `
        <div class="FL040-visited">
          <p>You Viewed...</p>
        </div>
      `);
    }
  }
}


export { setup, storeProduct, getProducts, addVisitedEl }; // eslint-disable-line
