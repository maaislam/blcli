import settings from './settings';
import pubSub from './PublishSubscribe';
import { getBasketContents } from './requests';
import { observer } from '../../../../../lib/uc-lib';

/**
 * Add body classes
 *
 * @access private
 */
const addBodyClasses = () => {
  document.body.classList.add(settings.ID);

  document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
};

/**
 * Is delivery or collection?
 *
 * @return {String}
 */
const getAcquisitionType = () => { 
  const collectionDiv = document.querySelector('#ctl00__objHeader_pnlStoreCollection span span');
  const deliveryDiv = document.querySelector('#ctl00__objHeader_pnlStoreDelivery span span');

  let type = null;
  if(collectionDiv) {
    type = 'collection';
  } else if(deliveryDiv) {
    type = 'delivery';
  }

  return type;
};

/**
 * Modify the upsell div
 */
const modifyUpsell = () => {
  const inlineProducts = document.querySelectorAll('.upsell-mobile .inlineProducts .product');
  [].forEach.call(inlineProducts, (prod) => {
    const actionButton = prod.querySelector('.actionButton');
    if(actionButton) {
      actionButton.innerText = 'Add';
    }
  });

  if(settings.VARIATION === '1') {

  } else if(settings.VARIATION === '2') {

  }
};

/**
 * Create the basket summary region
 *
 * @return {Promise}
 */
const createBasketSummary = () => {
  return new Promise((resolve, reject) => {
    getBasketContents().then((basketDiv) => {
      if(basketDiv) {
        let html = '<div class="pj29-basket-summary">';
        html += '<h2 class="pj29-heading redText">Basket Summary</h2>';
        html += '<div class="pj29-basket-summary__inner">';

        [].forEach.call(basketDiv.querySelectorAll('table tr'), (row) => {
          const pizzaName = row.querySelector('.pizzaName');
          if(pizzaName) {
            const img = row.querySelector('.pic img');
            const quantityInput = row.querySelector('.quantity .txtField');
            const priceTd = row.querySelector('td[align="right"]');

            html += '<div class="pj29-basket-summary__item">';

            if(img) {
              html += `
                <div class="pj29-basket-summary__img">
                  <img src="${img.src}" />
                </div>
              `;
            }

            if(pizzaName) {
              const qty = quantityInput ? quantityInput.value : '';

              html += `
                <div class="pj29-basket-summary__main">
                  <p class="pj29-basket-summary__title">
                    ${pizzaName.innerText}
                  </p>
                  ${qty ? '<p class="pj29-basket-summary__qty">Qty: ' + qty + '</p>' : ''}
                </div>
              `;
            }

            if(priceTd) {
              let priceBeforeDiscount = '';
              const priceBeforeDiscountElm = priceTd.querySelector('.valBeforeDiscount');
              if(priceBeforeDiscountElm) {
                priceBeforeDiscount = priceBeforeDiscountElm.innerText.trim();

                priceBeforeDiscountElm.remove();
              }

              const price = priceTd.innerText.replace(/(\n|Remove)/g, '');

              if(price) {
                html += `
                  <div class="pj29-basket-summary__price">
                    <span class="redText">${price}</span>
                    <span class="pj29-price-strike">${priceBeforeDiscount}</span>
                  </div>
                `;
              }
            }

            html += '</div>';
          }
        });

        html += '</div>';
        html += '</div>';

        // After UPSELL
        const upsellContainer = document.querySelector('#ctl00_cphBody_upUpsell');
        upsellContainer.insertAdjacentHTML('afterend', html);
        
        pubSub.publish('built-basket');
      } else {
        pubSub.publish('failed-building-basket');
      }

      resolve(); // Resolve even if we can't build basket, as it's not treated as a failure
    });
  })
};

/**
 * Modify promo code region
 */
const modifyPromoCodeBox = () => {
  const title = document.querySelector('.promocodeBasketConf h2');
  if(title) {
    title.innerHTML = title.innerText + ' <em>Enter it here</em>';
  }

  const button = document.querySelector('.promocodeBasketConf .actionButton');
  if(button) {
    button.innerText = 'Apply Code';
  }
};

/**
 * Frame the checkout buttons
 */
const frameCheckoutButtons = () => {
  const wrapper = document.querySelector('.checkoutButtonsMobile');
  if(wrapper) {
    wrapper.classList.add('pj29-checkout-buttons');

    // ----------------------------------------------------------
    // CARD LOGOS
    // ----------------------------------------------------------
    const cardsHtml = `
      <div class="pj29-cardlogos">
        <img width="36" height="22" class="pj29-cardlogos__logo pj29-cardlogos__logo--maestro" 
          src="https://dp8v87cz8a7qa.cloudfront.net/43831/5b8fd14f7bafe1536151887.png" />
        <img width="36" height="22" class="pj29-cardlogos__logo pj29-cardlogos__logo--mastercard" 
          src="https://dp8v87cz8a7qa.cloudfront.net/43831/5b8fd166255011536151910.png" />
        <img width="36" height="22" class="pj29-cardlogos__logo pj29-cardlogos__logo--visa" 
          src="https://dp8v87cz8a7qa.cloudfront.net/43831/5b8fd1d2e57501536152018.png" />
      </div>
    `;

    wrapper.insertAdjacentHTML('afterbegin', cardsHtml);
    
    // ----------------------------------------------------------
    // SUBTOTAL / COLLECTION BY
    // ----------------------------------------------------------
    const basketPriceSpan = document.querySelector('#ctl00__objHeader_lbBasketItem > .bodyText > span');
    if(basketPriceSpan) {
      let html = '<div class="pj29-summary">';

      const basketPrice = basketPriceSpan.innerText;
      html += '<span class="pj29-summary__subtotal">Sub-total: ' + basketPrice;

      const acquisitionType = getAcquisitionType();
      if(acquisitionType) {
        html += `
          <span class="pj29-summary__by">
            by ${acquisitionType}
            <a class="pj29-summary__change-store">change</a>
          </span>
        `;
      }

      html += '</div>';

      wrapper.insertAdjacentHTML('afterbegin', html);

      // On click prompt to amend store choice
      const storeChange = document.querySelector('.pj29-summary__change-store');
      const originalStore = document.querySelector('#ctl00__objHeader_lbSelectStoreMenuItem');
      if(originalStore && storeChange) {
        storeChange.addEventListener('click', () => {
          originalStore.click();
          pubSub.publish('did-click-change-link');
        });
      }
    }
    
    // ----------------------------------------------------------
    // VISA CHECKOUT DESCRIPTION
    // ----------------------------------------------------------
    const visaHtml = `
      <p class="pj29-visa-description pj29-text-center">
        A 
        <span class="pj29-visa-blue">Simple, Fast</span>
        and
        <span class="pj29-visa-blue">Secure</span>
        Way to Checkout
      </p>
    `;

    wrapper.insertAdjacentHTML('beforeend', visaHtml);
  }
};

/**
 * Reorder elements on page
 *
 * Varies by experiment variation
 */
const reorderElements = () => {
  const main = document.querySelector('.main');
  const btns = document.querySelector('#ctl00_cphBody_pnlButtonsMobile');
  const upsell = document.querySelector('#ctl00_cphBody_upUpsell');
  const summary = document.querySelector('.pj29-basket-summary');
  const missingItems = document.querySelector('.missingItemsMobileCont');

  if(settings.VARIATION == '1') {
    if(btns) {
      main.insertAdjacentElement('afterbegin', btns);
    }

    if(summary) {
      summary.insertAdjacentElement('afterend', upsell);
    }
  }

  if(missingItems) {
    main.insertAdjacentElement('afterbegin', missingItems);
  }
};

/**
 * Helper show loader
 */
const showLoaderOverlay = () => {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="pj29-loader">
      One moment...
    </div>
  `);
};

/**
 * Check existence of unused offers
 *
 * @return {Boolean}
 */
const checkUnusedOffers = () => {
  let unusedOffers = false;

  const div = document.querySelector('#ctl00_cphBody_divError');
  if(div) {
    const errorText = div.innerText.trim();
    if(errorText.match(/unused offers/i)) {
      unusedOffers = true;
    }
  }

  return unusedOffers;
};

/**
 * Entry point for running experiment
 *
 * @access public
 */
export default () => {
  // --------------------------------------------
  // Experiment is running
  // --------------------------------------------
  pubSub.publish('experiment-init');

  // --------------------------------------------
  // Add classes to body
  // --------------------------------------------
  addBodyClasses();

  // --------------------------------------------
  // Core actions
  // --------------------------------------------
  frameCheckoutButtons();
  modifyPromoCodeBox();
  modifyUpsell();
  createBasketSummary().then(() => {
    // --------------------------------------------
    // Reorder elements when we've modified 
    // individual sections
    // --------------------------------------------
    reorderElements();
  });
  
  // --------------------------------------------
  // Unused offers shown?
  // --------------------------------------------
  if(checkUnusedOffers()) {
    pubSub.publish('unused-offers-exists');
  }
    
  // --------------------------------------------
  // !!important!!
  //
  // When a user closes the lightbox, the dom is rebuilt
  // but without a page refresh, the experiment breaks
  //
  // -> workaround refresh page when such action taken
  //
  // If any of the 'add' buttons in the upsell now read 
  // 'add to basket' rather than 'add', then it's changed
  // and so long as a lightbox isn't active, refresh the page
  //
  // Tiemout necessary as lightbox takes time to be removed
  // --------------------------------------------
  const checkPageReloadNecessary = () => {
    const upsellAddBtn = document.querySelector('.upsell-mobile .m-checkout-buttons .actionButton');
    const lightbox = document.querySelector('.fancybox-overlay');

    let necessary = false;

    if(upsellAddBtn && !lightbox) {
      const text = upsellAddBtn.innerText.trim();
      if(text.toLowerCase() == 'add to basket') {
        necessary = true;
      }
    }

    if(!necessary) {
      setTimeout(checkPageReloadNecessary, 1000);
    } else {
      pubSub.publish('refreshed-page');

      showLoaderOverlay();
      window.location.reload();
    }
  };

  checkPageReloadNecessary();
  
  // --------------------------------------------
  // Additional events
  // --------------------------------------------
  const proceedCheckoutBtn = document.querySelector('.pj29-checkout-buttons .m-checkout-buttons .actionButton');
  const visaCheckoutBtn = document.querySelector('.pj29-checkout-buttons .v-checkout-wrapper > img');
  const applyCode = document.querySelector('#ctl00_cphBody_lbApplyCodeMobile');

  if(proceedCheckoutBtn) {
    proceedCheckoutBtn.addEventListener('click', () => {
      pubSub.publish('clicked-proceed-to-checkout');
    });
  }

  if(visaCheckoutBtn) {
    visaCheckoutBtn.addEventListener('click', () => {
      pubSub.publish('clicked-visa-proceed');
    });
  }

  if(applyCode) {
    applyCode.addEventListener('click', () => {
      pubSub.publish('clicked-apply-code');
    });
  }
};
