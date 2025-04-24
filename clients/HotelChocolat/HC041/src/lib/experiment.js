/**
 * HC041 - Quick View Mobile
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.hotelchocolat.com/uk/shop/collections/products/all-products/
 */
import { setup, appendAddToCartButton, makeLightboxChanges, lightboxOverlayEvents } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  if (VARIATION == '1') {
    /**
     * @desc Add 'ADD TO BASKET' CTA on each product
     */
    const allProducts = document.querySelectorAll('.search-result-content li.grid-tile');
    for (let i = 0; i < allProducts.length; i += 1) {
      const product = allProducts[i];
      // --- MOVE Quickview element at the end of the product li
      const quickView = product.querySelector('a.quickview.quickviewbutton');
      product.insertAdjacentElement('beforeend', quickView);
      appendAddToCartButton(product);
    }

    /**
     * @desc Observe changes on the QUICKVIEW LIGHTBOX
     * If user has clicked on 'ADD TO BASKET' then Quickview lightbox is triggered
     * once the Quickview Add CTA is available, then triggers a click event on that
     */
    pollerLite(['.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.quickview-dialog', '#QuickViewDialog button#add-to-cart'], () => {
      // observer.connect(document.querySelector('.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.quickview-dialog'), () => {
      // observer.connect(document.querySelector('#product-detail-wrapper'), () => {
      observer.connect(document.querySelector('#QuickViewDialog'), () => {
        // console.log('SOMETHING HAS CHANGED-------');
        // alert('SOMETHING HAS CHANGED-------');
          
        let lightboxStyle = document.querySelector('.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.quickview-dialog').getAttribute('style');
        if (lightboxStyle.indexOf('display: none;') == -1) {
          // alert('1--lightbox shown');
            let addToCartCTA = document.querySelector('#pdpMain button#add-to-cart');
            lightboxStyle = document.querySelector('.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.quickview-dialog').getAttribute('style');
            if (lightboxStyle.indexOf('display: none;') == -1 
            && !addToCartCTA.classList.contains('added')) {
                // alert('2--lightbox shown');
                addToCartCTA.click();
                addToCartCTA.classList.add('added');
            } else {
              addToCartCTA.classList.remove('added');
            }
        }

      }, {
        throttle: 200,
        config: {
          attributes: false,
          childList: true,
          subtree: true,
        },
      });
    });

  /**
   * @desc Observe for changes on results content
   * after clicking "LOAD MORE"
   * search-result-content
   */
  observer.connect(document.querySelector('.search-result-content'), () => {
    // console.log('SOMETHING HAS CHANGED-------');
    const allProducts = document.querySelectorAll('.search-result-content li.grid-tile');
    for (let i = 0; i < allProducts.length; i += 1) {
      const product = allProducts[i];
      // --- MOVE Quickview element at the end of the product li
      const quickView = product.querySelector('a.quickview.quickviewbutton');
      product.insertAdjacentElement('beforeend', quickView);
      appendAddToCartButton(product);
    }
  }, {
    throttle: 200,
    config: {
      attributes: false,
      childList: true,
      // subtree: true,
    },
  });
    
  } else if (VARIATION == '2') {
    const allProducts = document.querySelectorAll('.search-result-content li.grid-tile');
    for (let i = 0; i < allProducts.length; i += 1) {
      const product = allProducts[i];
      // --- MOVE Quickview element at the end of the product li
      const quickView = product.querySelector('a.quickview.quickviewbutton');
      product.insertAdjacentElement('beforeend', quickView);
    }
    /**
     * @desc Observe changes on the QUICKVIEW LIGHTBOX
     * Once Quickview is open, moves Full Details CTA below Add CTA
     */
    pollerLite(['.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.quickview-dialog', '#QuickViewDialog a.button.button-white.view-details'], () => {
      observer.connect(document.querySelector('#product-detail-wrapper'), () => {
          pollerLite(['a.button.button-white.view-details', 'button#add-to-cart'], () => {
            makeLightboxChanges();
          });
          
      }, {
        throttle: 200,
        config: {
          attributes: true,
          // childList: true,
          subtree: true,
        },
      });


      observer.connect(document.querySelector('.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.quickview-dialog'), () => {
          pollerLite(['a.button.button-white.view-details', 'button#add-to-cart'], () => {
            lightboxOverlayEvents();
          }); 
      }, {
        throttle: 200,
        config: {
          attributes: true,
          childList: false,
          // subtree: true,
        },
      });

    });
  }
  

  
  

  // At end of code, reset window.einstein expect type array
  window.einstein.loaded = [];
};
