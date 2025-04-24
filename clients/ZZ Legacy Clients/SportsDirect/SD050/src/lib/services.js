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

  let existingStorage = sessionStorage.getItem('SD050-visited');

  existingStorage = existingStorage ? existingStorage.split(',') : [];

  existingStorage.push(colourVariantId);

  // Remove duplicates
  const uniqueArray = existingStorage.filter((item, pos) => existingStorage.indexOf(item) === pos);

  sessionStorage.setItem('SD050-visited', uniqueArray.toString());
}

function getProducts() {
  let visitedProductArr;
  const visitedProducts = sessionStorage.getItem('SD050-visited');
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
    product.classList.add('SD050-viewed');
    if (!product.querySelector('.SD050-visited')) {
      product.insertAdjacentHTML('beforeend', `
        <div class="SD050-visited">
          <p>You Viewed</p>
        </div>
      `);
    }
  }
}


export { setup, storeProduct, getProducts, addVisitedEl }; // eslint-disable-line
