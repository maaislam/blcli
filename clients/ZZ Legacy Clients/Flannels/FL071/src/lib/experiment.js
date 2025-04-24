import {
  setup,
  storeProduct,
  getProducts,
  addVisitedEl,
} from './services';
import { events } from '../../../../../lib/utils';
import settings from './settings';

events.analyticsReference = '_gaUAT';

const activate = () => {
  const { ID, VARIATION } = settings;
  setup();

  const notViewed = document.querySelectorAll(`li:not(.${ID}-viewed)`);

  if (VARIATION === '2') {
    events.send(ID, 'Control');
  //   if (notViewed.length) {
  //     Array.from(notViewed).forEach((prod) => {
  //       prod.addEventListener('click', () => {
  //         events.send(`${ID}`, 'Viewed Product');
  //       });
  //     });
  //   }
  }

  storeProduct();
  const visitedProducts = getProducts();
  if (VARIATION !== '2') {
    events.send(ID, 'Variant');
  }

  if (visitedProducts && visitedProducts.length) {
    visitedProducts.forEach((productID) => {
      const viewedProduct = document.querySelector(`#productlistcontainer ul li[li-productid="${productID}"]`);
      addVisitedEl(viewedProduct);
    });
  }

  const prevViewed = document.querySelectorAll(`li.${ID}-viewed`);
  if (prevViewed.length && VARIATION !== '2') {
    let maxHeight = 0;
    Array.from(prevViewed).forEach((prod) => {
      const prodText = prod.querySelector('.TextSizeWrap');
      if (prodText) {
        const prodTextHeight = prodText.offsetHeight;
        if (prodTextHeight > maxHeight) {
          maxHeight = prodTextHeight;
        }
      }
    });
    //console.log(maxHeight);
    Array.from(prevViewed).forEach((prod) => {
      const prodText = prod.querySelector('.TextSizeWrap');
      if (prodText) {
        prodText.setAttribute('style', `min-height: ${maxHeight}px;`);
        //console.log(prodText);
      }
    });
  }

  if (notViewed.length) {
    Array.from(notViewed).forEach((prod) => {
      prod.addEventListener('click', () => {
        if (prod.classList.contains(`${ID}-viewed`)) {
          events.send(`${ID} - Viewed Product`, 'User returns to previously viewed product');
        } else {
          // events.send(ID, 'Different PDP as previously viewed');
        }
      });
    });
  }
};

export default activate;
