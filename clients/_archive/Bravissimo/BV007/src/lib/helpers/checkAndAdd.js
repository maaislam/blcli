import { addPoller, addEventListener, addObserver } from '../winstack';
import { events } from '../../../../../../lib/utils';

/**
 * @desc Takes in an Array of Skus (styleIds) and if they match
 * against one of the products it will add the message.
 * @param {Array} storedSkus 
 */
const checkAndAdd = (storedSkus) => {

  function getProductSkus(prod) {
    const el = prod.querySelector('small.c-product-summary__code');
    if (el) {
      return el.textContent;
    }
  };

  function addMessage(prod, size) {
    const ref = prod.querySelector('section.c-product-summary .c-product-summary__img-container');
    if (ref) {
      ref.insertAdjacentHTML('afterbegin', `
        <div class="BV007-prevMessage">
          <p><strong>Previously purchased</strong></p>
        </div>
      `);
    }
  };

  let productList;
  let productListContainer;
  addPoller([document.querySelector('#listing-container #listing-results .c-results-list')], () => {
    productListContainer = document.querySelector('#listing-container #listing-results .c-results-list');

    function loopAndAdd() {
      productList = document.querySelectorAll('#listing-container #listing-results ol.c-results-list__items li.c-results-list__item');
      Array.from(productList).map((prod) => {
        if (prod) {
          const prodSku = getProductSkus(prod);
          // Check this Sku against stored Skus
          JSON.parse(storedSkus).map((skuObj) => {
            if (skuObj.id.indexOf(prodSku) > -1) {
              // Match!
              addMessage(prod, skuObj.size);
              // Add event for this particular product
              const prodLink = prod.querySelector('a');
              prodLink.addEventListener('click', () => {
                console.log('click');
                events.send('BV007', 'BV007 Click', 'User clicked a highlighted product');
              });
            }
          });
        }
      });
    }
    loopAndAdd();
  
    // Add observer to container for pagination.
    addObserver(productListContainer, () => {
      setTimeout(() => {
        loopAndAdd();
      }, 1500);
      // addPoller([document.querySelector('#listing-container #listing-results ol.c-results-list__items li.c-results-list__item')], () => {
      // });    
    }, {
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      }
    });
    
  });

};

export default checkAndAdd;
