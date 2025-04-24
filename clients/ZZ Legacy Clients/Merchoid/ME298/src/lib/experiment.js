/**
 * ME298 - PDP Accordions
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.merchoid.com/eu/harry-potter-spell-deck-and-interactive-book-of-magic/
 */
import { setup, fireEvent, observeWindowWidthAndReload } from './services';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  // Write experiment code here
  if (VARIATION == '1') {
    // Product Description
    // Delivery and Returns
    // FAQs
    if (window.innerWidth > 767) {
      const prodAccordionContainer = document.querySelector('#product_secondary_accordion');
      prodAccordionContainer.insertAdjacentHTML('afterbegin', `<div class="${ID}-tabs__wrapper"></div>`);

      const allTabs = prodAccordionContainer.querySelectorAll('.product-secondary-tabs__tab');
      [].forEach.call(allTabs, (tab) => {
        document.querySelector(`.${ID}-tabs__wrapper`).insertAdjacentElement('beforeend', tab);
      });
    }
    
    observeWindowWidthAndReload();
    
  } else if (VARIATION == '2') {
    // Product Description
  }
};
