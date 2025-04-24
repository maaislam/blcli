/**
 * SD051 - PLP Quick View
 * @author User Conversion
 */
import { setup, addQuickView, fetchProductDetails, popup, closePopup, addToBag, changeSize, changeVariation, showBag, addFunctionality } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events, pollerLite } from './../../../../../lib/utils';
import { observer } from './../../../../../lib/uc-lib';
import settings from './settings';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  console.log("SD051");

  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'Control', 'Control is active');
    return false;
  }

  if (settings.VARIATION === '3') {
    // Hide description on mobile to make image slider bigger.
    events.send(settings.ID, 'Variation 2', 'Quickview product information hidden (mobile)');
    document.body.classList.add('SD051-v3');
  }

  if (settings.VARIATION === '1') {
    // Hide description on mobile to make image slider bigger.
    events.send(settings.ID, 'Variation 1', 'V1 is active');
  }

  // Cache
  let products = document.querySelectorAll('#productlistcontainer ul.s-productscontainer2 li');
  // Add the quickview icon to each PLP product.
  addQuickView(products);

  pollerLite(['.SD051-quickview a'], () => {
    setTimeout(() => {
        // Cache all quick view links
      let quickViewLinks = document.querySelectorAll('.SD051-quickview a');
      
      addFunctionality(quickViewLinks);
    }, 1000);

    
  })


  // Observe for changes (e.g filter)
  const productContainer = document.querySelector('#productlistcontainer ul#navlist');
  observer.connect(productContainer, () => {
    if (!document.querySelector('.SD051-quickview')) {

      // Re cache
      products = document.querySelectorAll('#productlistcontainer ul.s-productscontainer2 li');
      addQuickView(products);
      // Re cache links
      const quickViewLinks = document.querySelectorAll('.SD051-quickview a');
      addFunctionality(quickViewLinks);
    }
  });
  
};

export default activate;
