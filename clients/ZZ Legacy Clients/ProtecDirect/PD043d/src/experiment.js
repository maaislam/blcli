import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import recentProducts from '../../PD043/lib/recent-products';
import moreItems from '../../PD043/lib/more-items';

/**
 * {{PD043d}} - {{Desktop AOV Basket}}
 */
let $ = null;
$ = window.jQuery;

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PD043d',
    VARIATION: '{{VARIATION}}',
  },

  cache: (() => {
    const cart = document.querySelector('.item_container_holder');
    const siteSearchForm = document.querySelector('.manage_users.search > form');
    const banner = document.querySelector('.basket .cms_banner_slot');
    const basketTotalElement = document.querySelector('.item_container_holder dd.subtotal');
    const recentRef = document.querySelector('.span-11.last.right');
    const badgeBanner = document.querySelector('.basket .PD022-Wrapper.PD022-Basket');

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
      recentRef,
      promoElement,
      promoElementRef,
      badgeBanner,
    };
  })(),

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    document.body.classList.add(settings.ID);
    /**
     * Cart page changes
     */
    pollerLite([
      '.item_container_holder', '.manage_users.search > form',
    ], () => {
      services.tracking();
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
          const basketTotal = Experiment.cache.basketTotalElement.textContent.match(/\d+.\d+/);
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
        productQtyRef = productRow.querySelector('td.quantity');
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
      moreItems(Experiment.cache.siteSearchForm, Experiment.cache.cart);
      /**
       * Move Banner
       */
      services.moveBanner(Experiment.cache.banner, Experiment.cache.cart);
      /**
       * Move Promo element
       */
      services.movePromo(Experiment.cache.promoElement, Experiment.cache.promoElementRef);
      /**
       * Move badge banner
       */
      services.moveBadgeBanner(Experiment.cache.badgeBanner, Experiment.cache.recentRef);
      /**
       * Build recently viewed carousel
       */
      if ($.fn.slick) {
        components.recentlyViewed(Experiment.cache.recentRef);
      } else {
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
          components.recentlyViewed(Experiment.cache.recentRef);
        });
      }
      /**
       * Click Tracking on the above elements
       */
      const addedTracking = () => {
        const addItemsCTA = document.querySelector('.button.positive.PD043d-atc');
        const prevOrder = document.querySelector('.PD043d .PD043d-more-items .PD043d-items > a');
        const searchForm = document.querySelector('.PD043d-more-items .PD043d-items form input.text');
        const recentViewed = document.querySelectorAll('.PD043d-recently-viewed .PD043d-recent-product a');

        if (addItemsCTA) {
          services.clickTracking(addItemsCTA, 'Add another item');
        }
        if (prevOrder) {
          services.clickTracking(prevOrder, 'Add items from a previous order');
        }
        if (searchForm) {
          services.clickTracking(searchForm, 'Search (in basket)');
        }
        if (recentViewed) {
          for (let i = 0; recentViewed.length > i; i += 1) {
            services.clickTracking(recentViewed[i], 'Recently Viewed');
          }
        }
      };

      pollerLite([
        '.PD043d .PD043d-recently-viewed .PD043d-recent-product a',
      ], addedTracking);
    });

    /**
     * Recently viewed products
     */
    pollerLite([ // Store product information when on product page
      '.prod.buynow > h3 > a', '.prod_image_main > a > img', '#variant-price-header', '.big-price .price_details',
    ], () => {
      recentProducts();
    });
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
      const productPrices = Experiment.cache.cart.querySelectorAll('#your_cart tr td.itemPrice:not(.discount)');
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
      }
      const lowest = Math.min(...prices);
      return lowest;
    },
    /**
     * @desc Returns the product row with the cheapest product.
     * @param {Number} price
     */
    getCheapestProductRow(price) {
      const productPrices = Experiment.cache.cart.querySelectorAll('#your_cart tr td.itemPrice');
      let productRow = null;
      if (productPrices.length > 0) {
        for (let i = 0; productPrices.length > i; i += 1) {
          if (productPrices[i].textContent.match(price)) {
            productRow = productPrices[i].parentElement;
          }
        }
      }
      return productRow;
    },
    /**
     * Adds the button controls for the module.
     */
    addItemControls() {
      const addedModule = document.querySelector('.PD043d-under-threshold');
      if (addedModule) {
        const button = addedModule.querySelector('button.PD043d-atc');
        const input = addedModule.parentElement.querySelector('input.qty');
        const update = addedModule.parentElement.querySelector('form > a');
        button.addEventListener('click', () => {
          const numberToAdd = button.dataset.amt;
          const currentValue = input.value;
          input.value = parseFloat(numberToAdd) + parseFloat(currentValue);
          update.click();
        });
      }
    },
    /**
     * @desc Moves the 'Before you go' banner below the table.
     * @param {Element} banner
     * @param {Element} ref
     */
    moveBanner(banner, ref) {
      if (banner && ref) {
        ref.insertAdjacentElement('afterend', banner);
      }
    },
    movePromo(el, ref) {
      if (el && ref) {
        ref.insertAdjacentElement('beforebegin', el);
      }
    },
    moveBadgeBanner(el, ref) {
      if (el && ref) {
        ref.insertAdjacentElement('beforeend', el);
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
     * @desc Appends this module below the product
     * @param {Element} productRef
     */
    underThreshold(productRef, productAmt) {
      if (productRef && productAmt > 0) {
        const html = `
          <div class="PD043d-under-threshold">
            <h3>Stock up for free delivery!</h3>
            <p>Add another <strong>${productAmt}</strong> of this product to reach your delivery threshold</p>
            <button class="button positive PD043d-atc" data-amt="${productAmt}">${productAmt == 1 ? 'Add another item' : 'Add items'}</button>
          </div>
        `;
        productRef.insertAdjacentHTML('beforeend', html);
      }
    },
    /**
     * @desc pulls product data into and out of local storage
     * which is then used on the cart page as a carousel.
     * @param {Element} ref
     */
    recentlyViewed(ref) {
      const productObjects = window.localStorage.getItem('Recently-viewed-products');
      if (productObjects && ref) {
        const products = Object.values(JSON.parse(productObjects));
        const productsToAdd = products.map((i) => {
          return `
            <div class="PD043d-recent-product">
              <a href="${i.href}" class="PD043d-link"></a>
              <img src="${i.img}" alt="${i.title}"/>
              <h3>${i.title}</h3>
              <p class="PD043d-priceExVat">${i.ExVATPrice}</p>
            </div>
          `;
        });
        const html = `
          <div class="PD043d-recently-viewed">
            <h3>Recently Viewed:</h3>

            <div class="PD043d-items slick-slider">
              ${productsToAdd}
            </div>
          </div>
        `;
        ref.insertAdjacentHTML('beforebegin', html);
        const addedSlider = window.jQuery('.PD043d-recently-viewed .PD043d-items');
        addedSlider.slick({
          dots: false,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 3500,
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        });
      }
    },
  },
};

export default Experiment;
