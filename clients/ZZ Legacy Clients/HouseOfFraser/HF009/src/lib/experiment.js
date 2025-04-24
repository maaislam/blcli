/**
 * IDXXX - Description
 * @author User Conversion
 */
import {
  setup,
  storeProduct,
  getProducts,
  addVisitedEl,
} from './services';
import { events, pollerLite, observer } from '../../../../../lib/utils';
import settings from './settings';

events.analyticsReference = '_gaUAT';

const activate = () => {
  const { ID, VARIATION } = settings;

  setup();

  if (VARIATION == 2) {
    events.send('HF009', 'HF009 Control', 'HF009 Control is active');
    return false;
  } else {
    events.send('HF009', 'HF009 Variation 1', 'HF009 Variation is active');
  }

  // function to force safari to refresh if the back button is used
  window.onpageshow = function(event) {
    if (event.persisted) {
      displayYouViewed();
    }
  };

  
  const notViewed = document.querySelectorAll('li:not(.HF009-viewed)');

  if (VARIATION === '2') {
    events.send(ID, 'Control', 'Control is active');
    if (notViewed.length) {
      Array.from(notViewed).forEach((prod) => {
        prod.addEventListener('click', () => {
          events.send(ID, 'Click', 'Different PDP as previously viewed');
        });
      });
    }
    return false;
  }

  pollerLite([() => {
    let run = false;
    if (window.dataLayer) {
      run = true;
    }
    return run;
  }], () => {
    
      let prodTimeout = setTimeout(function() {
        if(window.dataLayer[1].pageType == "ProductDetail") {
        // this is the PDP so we store the product in session storage
        // give 500ms delay so that we let the page select the correct colour var if required
          storeProduct();
        }
      }, 500);
    
  })

  
  const displayYouViewed = () => {
    const visitedProducts = getProducts();
    events.send(ID, 'Active', 'Test is active', { sendOnce: true });
    if (visitedProducts && visitedProducts.length) {
      visitedProducts.forEach((productID) => {
        pollerLite([`#productlistcontainer ul li[li-productid="${productID}"]`, '.bv_stars_component_container'], () => {
          const viewedProduct = document.querySelector(`#productlistcontainer ul li[li-productid="${productID}"]`);
          addVisitedEl(viewedProduct);
          events.send(ID, 'Viewed', 'Product(s) highlighted', { sendOnce: true });
        });
      });
    }

    pollerLite(['.bv_stars_component_container', 'li.HF009-viewed'], () => {
      const prevViewed = document.querySelectorAll('li.HF009-viewed');
      if (prevViewed.length) {
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
        
        Array.from(prevViewed).forEach((prod) => {
          const prodText = prod.querySelector('.TextSizeWrap');
          if (prodText) {
            prodText.setAttribute('style', `min-height: ${maxHeight}px;`);
            
          }
        });
      }
    });
  }

  displayYouViewed();

  

  if (notViewed.length) {
    Array.from(notViewed).forEach((prod) => {
      prod.addEventListener('click', () => {
        if (prod.classList.contains('HF009-viewed')) {
          events.send(ID, 'Click', 'Same PDP as previously viewed');
        } else {
          events.send(ID, 'Click', 'Different PDP as previously viewed');
        }
      });
    });
  }


  pollerLite(['#ProductContainer ul#navlist'], () => {
    var wrap = document.querySelector('#ProductContainer ul#navlist');
    if(wrap) {
      observer.connect(wrap, function () {
        setTimeout(function() {
          displayYouViewed();
        },300);
        

      }, {
        config: {
          attributes: true,
          childList: true,
          subtree: false,
        }
      });
    }    
  });



};

export default activate;
