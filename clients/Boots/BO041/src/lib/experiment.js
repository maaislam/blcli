/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events, pollerLite } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  const getPageType = () => {
    let pageType;

    if (document.querySelector('#estore_category_heading') && document.querySelector('.product_listing_container')) {
      pageType = 'PLP';
    }

    if (document.querySelector('#estore_productpage_template_container')) {
      pageType = 'PDP';
    }

    if (window.location.href.indexOf('/OrderItemDisplay') > -1) {
      pageType = 'basket';
    }

    if (window.location.href.indexOf('CheckoutOrderConfirmation') > -1) {
      pageType = 'checkout';
    }

    return pageType;
  }

  events.send(`experimentation`, `BO041 Variation-${VARIATION}`, `Triggered`);

  const basketEvents = () => {
    pollerLite(['.tagg-reset'], () => {
      if (document.querySelector('.tagg-reset')) {
        const basketVal = document.querySelector('#order_totals .total_font.showElement').textContent;
        events.send(`experimentation`, `BO041 Variation-${VARIATION}`, `Taggstar Shown Basket - ${basketVal}`);
      }
    });
  }

  const PLPEvents = () => {
    pollerLite(['#estore_category_heading', '.grid_mode.grid li', '.tagg-reset'], () => {
      const pagePath = window.location.pathname.split('/')[1];

      if (document.querySelector('.tagg-reset')) {
        events.send(`experimentation`, `BO041 Variation-${VARIATION}`, `Taggstar Shown PLP - ${pagePath}`);
      }

      // // loop through all the products,
      // const allProducts = document.querySelectorAll('.grid_mode.grid li');
      // for (let index = 0; index < allProducts.length; index += 1) {
      //   const element = allProducts[index];
      //   if (element.querySelector('.tagg-reset')) {
      //     element.addEventListener('click', () => {
      //       events.send(`experimentation`, `BO041 Variation-${VARIATION}`, ``)
      //       window.cmCreateManualLinkClickTag(`/BO041?cm_sp=PLPTaggstarClicked-_-${VARIATION}-_-${pagePath}`);
      //     });
      //   }
      // }
    });
  }

  const PDPEvents = () => {
    pollerLite(['#PDP_productPrice', '#add2CartBtn', '.tagg-reset'], () => {
      const category = window.location.pathname.split('/')[1];
      const productPrice = document.querySelector('#PDP_productPrice').textContent.trim();;
      const productImageTag = document.querySelector('#estore_productpage_template_container .tagg-reset');
      const addButton = document.querySelector('#add2CartBtn')
      if (productImageTag) {
        events.send(`experimentation`, `BO041 Variation-${VARIATION}`, `Taggstar Shown PDP - ${category, productPrice}`);
        addButton.addEventListener('click', () => {
          events.send(`experimentation`, `BO041 Variation-${VARIATION}`, `Taggstar Product Added To Cart PDP - ${category, productPrice}`);
        });
      }
    });
  }

  // trigger events
  if (VARIATION === 'control') {

    if (getPageType() === 'PLP') {
      document.body.setAttribute('data-tagg-experience', 'ctrl');
      PLPEvents();
    }

    if (getPageType() === 'PDP') {
      document.body.setAttribute('data-tagg-experience', 'ctrl');
      PDPEvents();
    }

    if (getPageType() === 'basket') {
      document.body.setAttribute('data-tagg-experience', 'ctrl');
      basketEvents();
    }

    if (getPageType() === 'checkout') {
      document.body.setAttribute('data-tagg-experience', 'ctrl');
    }


  }
  if (VARIATION === '1') {

    if (getPageType() === 'PLP') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v1');
      PLPEvents();
    }

    if (getPageType() === 'PDP') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v1');
      PDPEvents();
    }
    if (getPageType() === 'basket') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v1');
      basketEvents();
    }


    if (getPageType() === 'checkout') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v1');
    }


  }
  if (VARIATION === '2') {

    if (getPageType() === 'PLP') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v2');
      PLPEvents();
    }

    if (getPageType() === 'PDP') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v2');
      PDPEvents();
    }
    if (getPageType() === 'basket') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v2');
      basketEvents();
    }


    if (getPageType() === 'checkout') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v2');
    }


  }
  if (VARIATION === '3') {

    if (getPageType() === 'PLP') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v3');
      PLPEvents();
    }

    if (getPageType() === 'PDP') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v3');
      PDPEvents();
    }
    if (getPageType() === 'basket') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v3');
      basketEvents();
    }


    if (getPageType() === 'checkout') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v3');
    }


  }
  if (VARIATION === '4') {

    if (getPageType() === 'PLP') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v4');
      PLPEvents();
    }

    if (getPageType() === 'PDP') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v4');
      PDPEvents();
    }
    if (getPageType() === 'basket') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v4');
      basketEvents();
    }


    if (getPageType() === 'checkout') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v4');
    }


  }
  if (VARIATION === '5') {

    if (getPageType() === 'PLP') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v5');
      PLPEvents();
    }

    if (getPageType() === 'PDP') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v5');
      PDPEvents();
    }
    if (getPageType() === 'basket') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v5');
      basketEvents();
    }

    if (getPageType() === 'checkout') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v5');
    }


  }
  if (VARIATION === '6') {

    if (getPageType() === 'PLP') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v6');
      PLPEvents();
    }

    if (getPageType() === 'PDP') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v6');
      PDPEvents();
    }
    if (getPageType() === 'basket') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v6');
      basketEvents();
    }

    if (getPageType() === 'checkout') {
      document.body.setAttribute('data-tagg-experience', 'treatment-v6');
    }


  }

};
