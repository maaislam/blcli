/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import AllLastProducts from './lastViewedProducts/LastViewed';
import lastViewedProducts from './lastViewedProducts/storeLastViewedProducts';
import productSlider from './lastViewedProducts/lastViewedSlider';
import removeLastViewed from './lastViewedProducts/removeLastViewed';
import { observer, pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';

const activate = () => {
  setup();


  const URL = window.location.pathname;

  // store the products on product pages
  pollerLite(['.catalog-product-view', '.product-name h1'], () => {
    if (document.body.classList.contains('catalog-product-view')) {
      lastViewedProducts();
    }
  });


  const PLPChanges = () => {
    if (window.localStorage.TG089recommended_prods_1) {
      pollerLite(['.category-view'], () => {
        const lastViewedMarkup = new AllLastProducts();
        // put in a carousel on mobile
        if (window.innerWidth < 767) {
          productSlider();
        }
        removeLastViewed();
      });
    }
  };

  // if on any plp pages
  if (URL.indexOf('/products') > -1) {
    pollerLite(['.amshopby-overlay'], () => {
      PLPChanges();
      // if any products are filtered
      const mainProducts = document.querySelector('.amshopby-overlay');
      observer.connect([mainProducts], () => {
        // remove last viewed if it exists to avoid duplication
        if (document.querySelector(`.${settings.ID}-lastViewed_Products`)) {
          document.querySelector(`.${settings.ID}-lastViewed_Products`).remove();
        }
        PLPChanges();
      }, {
        throttle: 1000,
        config: {
          attributes: true,
          childList: false,
          subtree: true,
        },
      });
    });
  }
};

export default activate;
