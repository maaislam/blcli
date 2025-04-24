import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{PD043m}} - {{Mobile AOV Basket}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PD043m',
    VARIATION: '{{VARIATION}}',
  },

  cache: (() => {
    const cart = document.querySelector('.basket-content.basket');
    const siteSearchForm = document.querySelector('#header_container form');
    const banner = document.querySelector('.basket .cms_banner_slot');
    const basketTotalElement = document.querySelector('.total .txt-align-right');
    const basketSubtotalElement = document.querySelector('.order_totals .sub-total > .ui-grid-a > .ui-block-b.txt-align-right');
    const recentRef = document.querySelector('.span-11.last.right');
    const badgeBanner = document.querySelector('.basket .PD022-Wrapper.PD022-Basket');
    let secondDivider = document.querySelectorAll('.basket-content.basket > .divider');
    secondDivider = secondDivider[secondDivider.length - 1];

    if (!secondDivider) {
      secondDivider = document.querySelector('.common-cart-item');
      if (secondDivider) {
        secondDivider = secondDivider.parentElement;
      }
    }

    let promoElement = document.querySelector('.voucher');
    if (promoElement) {
      promoElement = promoElement.parentElement.parentElement.parentElement;
    }
    const promoElementRef = document.querySelector('.basket .span-20.bottomLine.last');

    return {
      cart,
      siteSearchForm,
      banner,
      basketTotalElement,
      basketSubtotalElement,
      recentRef,
      promoElement,
      promoElementRef,
      badgeBanner,
      secondDivider,
    };
  })(),

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /**
     * Cart page changes
     */
    pollerLite([
      '.basket-content.basket', '#header_container form[name="search_form"]', '.common-cart-item .item .label-value.price .value', '.total .txt-align-right', '.basket-content.basket > .divider',
    ], () => {
      /**
       * Delivery threshold banner
       */
      components.addDeliveryBanner();
      /**
       * Free Delivery Threshold
       */
      let amountNeeded = services.qualifyForDeliveryValue(); // Amount needed to reach delivery threshold.
      if (amountNeeded === null) {
        amountNeeded = 25; // Set to 25 if discount banner is not available.
      }
      const lowestPrice = services.getCheapestProductPrice(); // Lowest product price in the cart.
      const productRow = services.getCheapestProductRow(lowestPrice); // Returns the product row which contains the lowest price.
      /**
       * Work out how many of the cheapest products are needed to reach 'Amount Needed'
       */
      let numberOfProductsNeeded = 0;
      if (amountNeeded && lowestPrice) {
        let exactNumber;
        if (amountNeeded === 25) {
          // Must minus the current basket total
          const basketTotal = Experiment.cache.basketSubtotalElement.textContent.match(/\d+.\d+/);
          const total = parseFloat(basketTotal);
          // Calculations
          exactNumber = (amountNeeded - total) / lowestPrice;
        } else {
          exactNumber = amountNeeded / lowestPrice;
        }
        if (exactNumber) {
          numberOfProductsNeeded = Math.ceil(exactNumber);
        }
      }
      /**
       * Get the 'Quantity' cell of the cheapest product row.
       */
      let productQtyRef = null;
      if (productRow) {
        productQtyRef = productRow.querySelector('.update_delete_basket.item.updateQuantity');
      }

      /**
       * Append HTML to the 'Quantity' cell
       */
      components.underThreshold(productQtyRef, numberOfProductsNeeded);

      /**
       * Add controls to the newly added button
       */
      services.addItemControls();
      /**
       * Add more items module
       */
      if (Experiment.cache.siteSearchForm && Experiment.cache.secondDivider) {
        components.moreItems(Experiment.cache.siteSearchForm, Experiment.cache.secondDivider);
      }
    });
    /**
     * Click Tracking on the above elements
     */
    const addedTracking = () => {
      const addItemsCTA = document.querySelector('.button.positive.PD043m-atc');
      const prevOrder = document.querySelector('.PD043m .PD043m-more-items .PD043m-items > a');
      const searchForm = document.querySelector('.PD043m-more-items .PD043m-items form input#search');
      // const recentViewed = document.querySelectorAll('.PD043m-recently-viewed .PD043m-recent-product a');
      if (addItemsCTA) {
        services.clickTracking(addItemsCTA, 'Add another item');
      }
      if (prevOrder) {
        services.clickTracking(prevOrder, 'Add items from a previous order');
      }
      if (searchForm) {
        services.clickTracking(searchForm, 'Search (in basket)');
      }
    };

    pollerLite([
      '.PD043m .PD043m-more-items .PD043m-items form input#search',
    ], addedTracking);
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Returns the value needed to reach the free delivery threshold
     * to be re run on qty change.
     */
    qualifyForDeliveryValue() {
      const amountElement = document.querySelector('span.freeDelivery');
      let value = null;
      if (amountElement) {
        const matchedValue = amountElement.textContent.match(/(\d+.\d+)/g);
        if (matchedValue !== null) {
          value = parseFloat(matchedValue[0]);
        }
      }
      return value;
    },
    /**
     * @desc returns the lowest price from the products
     */
    getCheapestProductPrice() {
      const productPrices = Experiment.cache.cart.querySelectorAll('.common-cart-item .item .label-value.webPrice .value');
      const prices = [];
      if (productPrices.length > 0) {
        for (let i = 0; productPrices.length > i; i += 1) {
          const priceText = productPrices[i].textContent.trim().replace(/\D/, '');
          if (priceText) {
            const price = parseFloat(priceText);
            // Set lowest price
            prices.push(price);
          }
        }
      } else {
        const otherProductPrices = Experiment.cache.cart.querySelectorAll('div.label-value div.value');
        for (let i = 0; otherProductPrices.length > i; i += 1) {
          const priceText = otherProductPrices[i].textContent.trim().replace(/\D/, '');
          if (priceText) {
            const price = parseFloat(priceText);
            // Set lowest price
            prices.push(price);
          }
        }
      }
      const lowest = Math.min(...prices);
      return lowest;
    },
    /**
     * @desc Returns the product row with the cheapest product.
     * @param {Number} price
     */
    getCheapestProductRow(price) {
      const product = Experiment.cache.cart.querySelectorAll('.common-cart-item:not(.basket)');
      let productRow = null;
      if (product.length > 0) {
        for (let i = 0; product.length > i; i += 1) {
          const productPrices = product[i].querySelector('.item .label-value.webPrice .value');
          if (productPrices) {
            if (productPrices.textContent.match(price)) {
              productRow = product[i];
            }
          } else {
            const otherProductPrices = product[i].querySelector('.item .label-value.price .value');
            if (otherProductPrices) {
              if (otherProductPrices.textContent.match(price)) {
                productRow = product[i];
              }
            }
          }
        }
      }
      return productRow;
    },
    /**
     * Adds the button controls for the module.
     */
    addItemControls() {
      const addedModule = document.querySelector('.PD043m-under-threshold');
      if (addedModule) {
        const button = addedModule.querySelector('button.PD043m-atc');
        const input = addedModule.parentElement.querySelector('input.qty');
        const update = addedModule.parentElement.querySelector('.update_delete button.update-item-qnt');
        if (button && input && update) {
          button.addEventListener('click', () => {
            const numberToAdd = button.dataset.amt;
            const currentValue = input.value;
            input.value = parseFloat(numberToAdd) + parseFloat(currentValue);
            update.click();
          });
        }
      }
    },
    /**
     * @desc adds an event to the element
     * @param {Element} el
     * @param {String} event
     * @param {String} label
     */
    clickTracking(el, label) {
      if (el && label) {
        el.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Clicked', label);
        });
      }
    },
  },

  components: {
    /**
     * Adds the delivery threshold banner
     */
    addDeliveryBanner() {
      const totalForDelivery = 25;
      const total = Experiment.cache.basketSubtotalElement;
      let totalAmt;
      if (total) {
        totalAmt = total.textContent.trim().replace(/^\D/, '');
        totalAmt = parseFloat(totalAmt);
      }
      const amountLeft = totalForDelivery - totalAmt;
      if (amountLeft && amountLeft > 0) {
        const html = `
          <span class="PD043m-delivery">
            Spend another <strong>£${amountLeft.toFixed(2)}</strong> to receive free delivery!
          </span> 
        `;
        Experiment.cache.cart.insertAdjacentHTML('beforebegin', html);
      }
    },
    /**
     * @desc Appends this module below the product
     * @param {Element} productRef
     */
    underThreshold(productRef, productAmt) {
      if (productRef && productAmt > 0) {
        const html = `
          <div class="PD043m-under-threshold">
            <h3>Stock up for free delivery!</h3>
            <p>Add another <strong>${productAmt}</strong> of this product to reach your delivery threshold</p>
            <button class="button positive PD043m-atc" data-amt="${productAmt}">${productAmt === 1 ? 'Add another item' : 'Add items'}</button>
          </div>
        `;
        productRef.insertAdjacentHTML('afterend', html);
      }
    },
    /**
     * @desc Add the more items module below the cart table
     * @param {Element} siteSearch
     * @param {Element} reference
     */
    moreItems(siteSearch, reference) {
      const submit = siteSearch.querySelector('input.button');
      if (submit) {
        submit.setAttribute('src', 'https://www.sitegainer.com/fu/up/x0i4dhcnbheljdy.png');
      }

      if (siteSearch) {
        const html = `
          <div class="PD043m-more-items">
            <div class="PD043m-items-wrap">
              <h3>Add more items to your basket:</h3>
  
              <div class="PD043m-items">
                <a href="https://www.protecdirect.co.uk/my-account/orders" class="button positive">Add items from a previous order</a>
                <p>or</p>
                ${siteSearch.outerHTML}
              </div>
            </div>
          </div>
        `;
        if (reference) {
          reference.insertAdjacentHTML('afterend', html);
        }
      }
    },
  },
};

export default Experiment;
