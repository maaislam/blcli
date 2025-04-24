/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { observer, pollerLite } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  // add the quick buy buttons to the products
  const addQuickBuy = () => {
    const allProducts = document.querySelectorAll('.estore_product_container');

    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      const addButton = element.querySelector('.product_add .shopperActions');

      if(element) {
        if(addButton) {
          if(VARIATION === '1') {
            element.querySelector('.product_add').insertAdjacentHTML('afterbegin', `<div class="${ID}-quickBuy">Quick buy</div>`);
          } else if (VARIATION === '2') {
            element.querySelector('.product_add').insertAdjacentHTML('beforeend', `<div class="${ID}-quickBuy">Quick buy</div>`);
          }
        }  
      }
    }
  }

  const addQuickBuyProductPage = () => {
    const addButton = document.querySelector('#estore_productpage_template_container .shopperActions #add2CartBtn');

    // if qty is the redesigned version
    const hiddenqty = document.querySelector('.quantity_section.quantity_section_redesign');
    if(addButton) {
      if(hiddenqty) {
        addButton.classList.add(`${ID}-noQty`);
        if(VARIATION === '1') {
          addButton.insertAdjacentHTML('beforebegin', `<div class="${ID}-quickBuy">Quick buy</div>`);
        } else if (VARIATION === '2') {
          addButton.insertAdjacentHTML('afterend', `<div class="${ID}-quickBuy">Quick buy</div>`);
        }

        // move qty buttons
        const qtyButtons = document.querySelector('#in_stock_actions .quantity_section.quantity_section_redesign');
        addButton.insertAdjacentElement('afterend', qtyButtons);

      } else {
        if(VARIATION === '1') {
          document.querySelector('#in_stock_actions').insertAdjacentHTML('beforebegin', `<div class="${ID}-quickBuy">Quick buy</div>`);
        } else if (VARIATION === '2') {
          document.querySelector('#in_stock_actions').insertAdjacentHTML('beforeend', `<div class="${ID}-quickBuy">Quick buy</div>`);
        }
      }
    }  
  }

   // click event for the quick buy buttons on plp
  const addEvent = () => {
    const allQuickBuyProducts = document.querySelectorAll('.estore_product_container');
    for (let index = 0; index < allQuickBuyProducts.length; index += 1) {
      const element = allQuickBuyProducts[index];
      const addButton = element.querySelector('[id^="add2CartBtn"]');
      const quickBuy = element.querySelector(`.${ID}-quickBuy`);
      const miniCart = document.querySelector('#cartDropdown');

      if(quickBuy && addButton) {
        quickBuy.addEventListener('click', () => {
          addButton.click();

          miniCart.style.display = 'none';
          // hide qty buttons
          if(element.querySelector('.minus_quantity_redesign')) {
            element.querySelector('.plus_quantity').style.display = 'none';
            element.querySelector('.minus_quantity_redesign').style.display = 'none';
          }

          // Wait for mini basket to update
          observer.connect(document.querySelector('#widget_minishopcart'), () => {
            window.location.href = 'https://www.boots.com/CheckoutLoginView';
          }, {
            throttle: 200,
            config: {
              attributes: false,
              childList: true,
              // subtree: true,
            },
          });
        });
      }
    }
  }

  // click event for the quick buy buttons on PDP
  const addEventProduct = () => { 
    const addButton = document.querySelector('#in_stock_actions #productPageAdd2Cart');
      const quickBuy = document.querySelector(`.${ID}-quickBuy`);
      const miniCart = document.querySelector('#cartDropdown');

      if(quickBuy && addButton) {
        quickBuy.addEventListener('click', () => {
          addButton.click();

          // if colour options or button is disabled
          const colourOpt = document.querySelector('#sizeComboButton .sizeComboButton_label .tooltip span');
          if(colourOpt && colourOpt.textContent.indexOf('Choose colour first') > -1 || document.querySelector('#add2CartBtn.button.primary.disabled')) {
            return;
          }

          quickBuy.style.display = 'none';
          miniCart.style.display = 'none';

          // hide qty buttons
          if(document.querySelector('#in_stock_actions .minus_quantity_redesign')) {
            document.querySelector('#in_stock_actions .plus_quantity').style.display = 'none';
            document.querySelector('#in_stock_actions .minus_quantity_redesign').style.display = 'none';
          }

          // Wait for mini basket to update
          observer.connect(document.querySelector('#widget_minishopcart'), () => {
            window.location.href = 'https://www.boots.com/CheckoutLoginView';
          }, {
            throttle: 200,
            config: {
              attributes: false,
              childList: true,
              // subtree: true,
            },
          });
        });
      }
  }

   // Remove them for the observer change
  const removeAllButtons = () => {
    const allQuickBuyButtons = document.querySelectorAll(`.${ID}-quickBuy`);
    for (let index = 0; index < allQuickBuyButtons.length; index += 1) {
      const element = allQuickBuyButtons[index];
      if(element) {
        element.remove();
      }
    }
  }

  /**
   * PLP
   */

  if(document.querySelector('#estore_category_heading') && document.querySelector('.estore_product_container')) {
    removeAllButtons();
    addQuickBuy();
    addEvent();
  }


  if(document.querySelector('#estore_productpage_template_container') && document.querySelector('#add2CartBtn')) {
      addQuickBuyProductPage();
      addEventProduct();
  }

  
  
};
