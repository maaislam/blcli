import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';
/**
 * {{IT059}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'IT059',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    let $ = null; // eslint-disable-line 
    $ = window.jQuery;
    // Setup
    const { settings, services } = Experiment;
    const url = window.location.pathname;
    // Only run on the cart / onepage
    if (!url.match(/^\/checkout\/onepage(\/index\/?)?(\?.+)?$/)) {
      return;
    }
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`IT059-V${settings.VARIATION}`);
    /*
    * Test is active event
    */
    events.send('IT059', 'Active', 'Experiment is active', { sendOnce: true });
    /*
    * Add elements to current mini bag
    */
    const amendMiniBag = () => {
      const bagItems = document.querySelectorAll('#cart-dropdown #cart-sidebar li.item');
      const bagPrice = document.querySelector('#cart-dropdown .summary p.subtotal span.price').textContent;
      let itemCount = null;
      let headerRightText = null;
      if (bagItems) {
        itemCount = bagItems.length;
        if (itemCount > 1) {
          headerRightText = `${itemCount} items - ${bagPrice}`;
        } else {
          headerRightText = `${itemCount} item - ${bagPrice}`;
        }
      }
      const bagHeader = `
        <div class="it59-bag-header clear">
          <div class="it59-bag-header--left">
            <p>Your bag</p>
          </div>
          <div class="it59-bag-header--right">
            <p>${headerRightText}</p>
          </div>
        </div>
      `;
      const minibagRef = document.querySelector('#cart-dropdown');
      minibagRef.insertAdjacentHTML('afterbegin', bagHeader);
    };
    amendMiniBag();
    /*
    * apply discounts via ajax (can not use due to ajax resetting /onepage process)
    */
    // const applyDiscount = () => {
    //   const promise = new Promise((resolve, reject) => {
    //     $.ajax({
    //       url: 'https://www.inthestyle.com/checkout/cart',
    //       method: 'GET',
    //     }).done((response) => {
    //       resolve(response);
    //     }).fail((error) => {
    //       reject(error);
    //     });
    //   });
    //   return promise;
    // };
    // const addDiscount = () => {
    //   applyDiscount().then((response) => {
    //     const tempDiv = document.createElement('div');
    //     tempDiv.innerHTML = response;
    //     const discountEl = tempDiv.querySelector('#shopping-cart-totals-table tr:nth-child(2) td.a-left');
    //     // If element
    //     if (discountEl) {
    //       const discountCheck = discountEl.textContent.match(/Discount\s\(\w+\)/);
    //       // If elements text matches 'Discount...'
    //       if (discountCheck) {
    //         const discountPrice = discountEl.nextElementSibling.textContent.trim();
    //         const discountPriceText = discountPrice.replace('-£', '');
    //         const discountPriceInt = parseFloat(discountPriceText).toFixed(2);
    //         // Query current price and deduct discount
    //         let priceRef = null;
    //         if (settings.VARIATION === '2') {
    //           priceRef = document.querySelector('.off-canvas-wrap .inner-wrap > #cart-dropdown .it59-bag-header .it59-bag-header--right p');
    //         } else {
    //           priceRef = document.querySelector('.header-secondary #cart-dropdown .it59-bag-header .it59-bag-header--right p');
    //         }
    //         // If price element exists
    //         if (priceRef) {
    //           const priceArr = priceRef.textContent.trim().split(' ');
    //           const priceString = priceArr[3].replace('£', '');
    //           const priceInt = parseFloat(priceString).toFixed(2);
    //           const itemAmt = parseFloat(priceArr[0]);
    //           let newPrice = null;
    //           if (itemAmt > 1) {
    //             newPrice = `${itemAmt} items - £${(priceInt - discountPriceInt).toFixed(2)}`;
    //             priceRef.innerHTML = newPrice;
    //           } else {
    //             newPrice = `${itemAmt} item - £${(priceInt - discountPriceInt).toFixed(2)}`;
    //             priceRef.innerHTML = newPrice;
    //           }
    //         }
    //       }
    //     }
    //   });
    // };
    // addDiscount();
    /*
    * Applying discount via dataLayer
    * as using ajax on the /onepage causes issues
    */
    const dataLayerDiscount = () => {
      // Store dataLayer discount voucher
      window.dataLayer = window.dataLayer || [];
      const data = [];
      window.dataLayer.forEach((element) => {
        if (element.event === 'checkout') {
          data.push(element);
        }
      });
      const dataDiscount = data[0].voucher_discount;
      if (dataDiscount) {
        const discountString = dataDiscount;
        const discountStripped = discountString.replace('-', '');
        const discountInt = parseFloat(discountStripped);
        const priceString = document.querySelector('.header-secondary #cart-dropdown .it59-bag-header .it59-bag-header--right p').textContent;
        const priceSplit = priceString.trim().split(' ')[3].replace('£', '');
        const itemAmt = parseFloat(priceString.trim().split(' ')[0]);
        const priceInt = parseFloat(priceSplit);
        const discountedPrice = (priceInt - discountInt).toFixed(2);
        let newPrice = null;
        if (itemAmt > 1) {
          newPrice = `${itemAmt} items - £${discountedPrice}`;
        } else {
          newPrice = `${itemAmt} item - £${discountedPrice}`;
        }
        const priceRef = document.querySelector('.header-secondary #cart-dropdown .it59-bag-header .it59-bag-header--right p');
        priceRef.innerHTML = newPrice;
      }
    };
    dataLayerDiscount();
    /*
    * Toggle bottom mini bag
    */
    const toggleBag = () => {
      const toggleBtn = document.querySelector('#cart-dropdown .it59-bag-header');
      const bagRef = document.querySelector('#cart-dropdown');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          events.send('IT059', 'Click', 'User clicked on the bag accordion', { sendOnce: true });
          bagRef.classList.toggle('it59-show-bag');
        });
      }
      const yourBagText = document.querySelector('#cart-dropdown .it59-bag-header .it59-bag-header--left p');
      if (yourBagText) {
        yourBagText.addEventListener('click', () => {
          events.send('IT059', 'Click', 'User clicked on "your bag" link', { sendOnce: true });
        });
      }
    };
    toggleBag();
    /*
    * Amend button title
    */
    const bagChange = () => {
      let btn = document.querySelector('header #cart-dropdown .block-cart > .actions button.btn-bag span span');
      if (settings.VARIATION === '2') {
        btn = document.querySelector('.off-canvas-wrap .inner-wrap #cart-dropdown .block-cart > .actions button.btn-bag span span');
      }
      if (btn) {
        btn.innerHTML = 'View Basket';
      }
    };
    bagChange();
    /*
    * Observe for changes to the bag and
    * re append any elements that get removed
    */
    const observe = () => {
      const element = document.querySelector('.header-bag');
      observer.connect(element, () => {
        const hasMiniBag = document.querySelector('.it59-bag-header');
        if (!hasMiniBag) {
          amendMiniBag();
        }
        // addDiscount();
        toggleBag();
        bagChange();
        dataLayerDiscount();
      }, {
        config: {
          attributes: false,
          childList: true,
          subTree: true,
        },
      });
    };
    observe();
    /*
    * Append delivery countdown banner
    * IT036 hides these however
    */
    const appendCta = () => {
      const cta = document.querySelector('.delivery-countdown.fixed-countdown');
      if (cta) {
        const accordionRef = document.querySelector('.header-secondary #cart-dropdown');
        accordionRef.appendChild(cta);
      }
    };
    appendCta();
    /*
    * VARIATION 2, append the entire basket to the
    * bottom of the page rather than being fixed
    */
    if (settings.VARIATION === '2') {
      const BagEl = document.querySelector('.header-secondary #cart-dropdown');
      const docRef = document.querySelector('.off-canvas-wrap .inner-wrap');
      if (BagEl) {
        const cloneBag = BagEl.cloneNode(true);
        docRef.appendChild(cloneBag);
      }
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  // components: { },
};

export default Experiment;
