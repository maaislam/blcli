import { fullStory } from '../../../../../lib/utils';
import { events, pollerLite } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};


/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
};

/*  ----------------
  Cookie opt in check
  ------------------ */
  export const cookieOpt = () => {
    const { ID, VARIATION } = shared;
    if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
      events.send('experimentation', `${ID} V${VARIATION}`, `Test Fired`);
    }
    pollerLite([
      '.optanon-alert-box-wrapper',
      '.optanon-toggle-display.cookie-settings-button',
      '.optanon-allow-all.accept-cookies-button',
      ], () => {
        const cookieAllowAll = document.querySelector('.optanon-button-wrapper.optanon-allow-all-button');
        cookieAllowAll.addEventListener('click', () => {
            if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
              events.send('experimentation', `${ID} V${VARIATION}`, `Test Fired`);
            }
        });
      });
    
      pollerLite(['.optanon-button-wrapper.optanon-save-settings-button'], () => {
        // on click of the buttons in settings
        const cookieAllowAll = document.querySelector('.optanon-button-wrapper.optanon-allow-all-button');
        cookieAllowAll.addEventListener('click', () => {
          if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
            events.send('experimentation', `${ID} V${VARIATION}`, `Test Fired`);
          }
        });
      
        const saveSettings = document.querySelector('.optanon-button-wrapper.optanon-save-settings-button');
        saveSettings.addEventListener('click', () => {
          if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
            events.send('experimentation', `${ID} V${VARIATION}`, `Test Fired`);
          }
        });
      });
  }

  export const getPageType = () => {
    const { ID, VARIATION } = shared;
    
    let pageType = '';
    if (document.querySelector('#listPageType')) {
      if (window.location.href.indexOf('searchTerm') > -1) {
        //srp
        pageType = 'srp';
      } else {
        //plp
        pageType = 'plp';
      }
    } else if (document.querySelector('meta[content="ProductPage"]')) {
      //pdp
      pageType = 'pdp';
    }

    return pageType;
  };

  export const pdpEvents = () => {
    const { ID, VARIATION } = shared;
    pollerLite(['#productPageAdd2Cart',
    '.bv-primarySummary-rating-container',
    '#BVRRContainer'], () => {
      // --- Add to Bag CTA
      document.querySelector('#productPageAdd2Cart').addEventListener('click', (e) => {
       
        events.send('experimentation', `${ID} Variation ${VARIATION}`, `PDP - Clicked - Add to Bag`, { sendOnce: true });
      });
      // --- Click on Stars
      document.querySelector('.bv-primarySummary-rating-container').addEventListener('click', (e) => {
        
        events.send('experimentation', `${ID} Variation ${VARIATION}`, `PDP - Clicked - Product Stars`, { sendOnce: true });
      });
      // --- Reviews interaction
      document.querySelector('#BVRRContainer').addEventListener('click', (e) => {
        
        events.send('experimentation', `${ID} Variation ${VARIATION}`, `PDP - Clicked - Interacted with PDP Reviews`, { sendOnce: true });
      });
    });
   
  };

  export const plpEvents = () => {
    const { ID, VARIATION } = shared;
    pollerLite(['#estores_product_listing_widget.productListingWidget',
    '#estores_product_listing_widget.productListingWidget ul.grid_mode.grid li'], () => {
      
      const allProducts = document.querySelectorAll('#estores_product_listing_widget.productListingWidget ul.grid_mode.grid li');
      [].forEach.call(allProducts, (prod) => {
        // --- Clicked on Product Card
        prod.addEventListener('click', (e) => {
          
          events.send('experimentation', `${ID} Variation ${VARIATION}`, `PLP - Clicked - Product Card`, { sendOnce: true });
        });
        // --- Add to Bag CTA
        if (prod.querySelector('#productPageAdd2Cart')) {
          prod.querySelector('#productPageAdd2Cart').addEventListener('click', (e) => {
           
            events.send('experimentation', `${ID} Variation ${VARIATION}`, `PLP - Clicked - Add to Bag`, { sendOnce: true });
          });
        }
        

        // --- Select Colour
        if (prod.querySelector('.product_view_color')) {
          prod.querySelector('.product_view_color').addEventListener('click', (e) => {
            
            events.send('experimentation', `${ID} Variation ${VARIATION}`, `PLP - Clicked - Colour Selection`, { sendOnce: true });
          });
        }
        
        // --- Select Size
        if (prod.querySelector('.product_view_size')) {
          prod.querySelector('.product_view_size').addEventListener('click', (e) => {

            events.send('experimentation', `${ID} Variation ${VARIATION}`, `PLP - Clicked - Size Selection`, { sendOnce: true });
          });
        }
        
      });
      
    });
   
  };

  export const srpEvents = () => {
    const { ID, VARIATION } = shared;
    pollerLite(['.product_listing_container',
    '.product_listing_container ul.grid_mode.grid li'], () => {
      
      const allProducts = document.querySelectorAll('.product_listing_container ul.grid_mode.grid li');
      [].forEach.call(allProducts, (prod) => {
        // --- Clicked on Product Card
        prod.addEventListener('click', (e) => {
          
          events.send('experimentation', `${ID} Variation ${VARIATION}`, `SRP - Clicked - Product Card`, { sendOnce: true });
        });
        // --- Add to Bag CTA
        if (prod.querySelector('#productPageAdd2Cart')) {
          prod.querySelector('#productPageAdd2Cart').addEventListener('click', (e) => {
           
            events.send('experimentation', `${ID} Variation ${VARIATION}`, `SRP - Clicked - Add to Bag`, { sendOnce: true });
          });
        }
        

        // --- Select Colour
        if (prod.querySelector('.product_view_color')) {
          prod.querySelector('.product_view_color').addEventListener('click', (e) => {
            
            events.send('experimentation', `${ID} Variation ${VARIATION}`, `SRP - Clicked - Colour Selection`, { sendOnce: true });
          });
        }
        
        // --- Select Size
        if (prod.querySelector('.product_view_size')) {
          prod.querySelector('.product_view_size').addEventListener('click', (e) => {

            events.send('experimentation', `${ID} Variation ${VARIATION}`, `SRP - Clicked - Size Selection`, { sendOnce: true });
          });
        }
        
      });
      
    });
   
  };
  
  
