import { fullStory, events } from '../../../../lib/utils';
import { products, USproducts } from './lib/HD008-products';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'HD008',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    events.useLegacyTracker();
    services.tracking();
    document.body.classList.add(settings.ID);
    components.priceBox();
    components.highStreetPrice();
    components.pricePerDay();
    components.productDetails();
    components.checkPrices();
    components.offerText();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      /* eslint-disable */
      _gaq.push(['_trackEvent', `${settings.ID}`, 'view', `${settings.ID} activated Variation ${settings.VARIATION}`, null, true]);
      /* eslint-enable */
    },
  },

  components: {
    /**
     * @desc Add the new price box
     */
    priceBox: function priceBox() {
      const priceWrapper = document.createElement('div');
      priceWrapper.classList.add('HD008-price');
      priceWrapper.innerHTML = `
      <div class="HD008-prices">
        <div class="HD008-was_price"><p>Was:</p><span></span></div>
        <div class="HD008-hd_price"><p>Hearing Direct Price:</p><span></span></div>
      </div>
      <div class="HD008-saving_price">Saving <span></span></div>`;
      const currentPriceBox = document.querySelector('.product__options:last-child');
      currentPriceBox.insertBefore(priceWrapper, currentPriceBox.firstChild);

      // add the price
      // add price
      let currentPrice;
      if (!document.querySelector('#product_addtocart_form .price-box .special-price .price')) {
        currentPrice = document.querySelector('#product_addtocart_form .price-box .regular-price .price').textContent;
      } else {
        currentPrice = document.querySelector('#product_addtocart_form .price-box .special-price .price').textContent;
      }
      document.querySelector('.HD008-hd_price span').textContent = currentPrice;

      document.querySelector('#product-options-wrapper select').addEventListener('change', () => {
        if (!document.querySelector('#product_addtocart_form .price-box .special-price .price')) {
          currentPrice = document.querySelector('#product_addtocart_form .price-box .regular-price .price').textContent;
        } else {
          currentPrice = document.querySelector('#product_addtocart_form .price-box .special-price .price').textContent;
        }
        document.querySelector('.HD008-hd_price span').textContent = currentPrice;
      });
      const wasPrice = document.querySelector('.HD008-was_price span');
      const wasProductPrice = document.querySelector('#product_addtocart_form .old-price .price');
      if (!wasProductPrice) {
        //
      } else {
        wasPrice.textContent = wasProductPrice.textContent;
      }
    },
    /**
     * @desc Work out & add savings under the button
     */
    pricePerDay: function pricePerDay() {
      const pricePerDayBox = document.createElement('div');
      pricePerDayBox.classList.add('HD008-perDayPrice');
      pricePerDayBox.innerHTML = `
      <div class="HD008-messageIcon"></div>
      <div class="HD008-perday">
        According to research*, the average hearing aid lasts 5 years. This means that this hearing aid would cost just...<a href="https://www.maaudiology.org/faqs.asp#replace">*from Maryland Academy of Audiology</a>
      </div>
      <div class="HD008-ppd">
        <span></span> per day
      </div>`;

      const isMobile = window.innerWidth < 767;
      if (isMobile) {
        document.querySelector('.hd-benefits').insertAdjacentElement('afterend', pricePerDayBox);
      } else {
        document.querySelector('.thumbnails.thumbnail-nav').insertAdjacentElement('afterend', pricePerDayBox);
      }
    },
    /**
     * @desc Add high street price
     */
    highStreetPrice: function highStreetPrice() {
      const streetPrice = document.createElement('div');
      streetPrice.classList.add('HD008-hs_price');
      const url = window.location.href;
      if (url.indexOf('/us/') > -1) {
        streetPrice.innerHTML = '<div class="HD008-hs_price"><p>The average price of a single hearing aid is $2,300.</p> <span>(According to a 2015 report from the President\'s Council of Advisors on Science and Technology.)</span></div>';
      } else {
        streetPrice.innerHTML = '<div class="HD008-hs_price"><p>Average high street hearing aid price is £1,250</p><span>(According to an independent survey carried out by <a href="https://www.which.co.uk/reviews/hearing-aid-providers/article/how-to-get-the-best-hearing-aid/hearing-aid-prices">Which)</a></span></div>';
      }
      const CTA = document.querySelector('.add-to-cart-buttons');
      CTA.insertAdjacentElement('afterend', streetPrice);
    },
    /**
     * @desc Get the product details
     */
    productDetails: function productDetails() {
      let productsObj;
      const URL = window.location.href;
      if (URL.indexOf('/us/') > -1) {
        productsObj = USproducts;
      } else {
        productsObj = products;
      }

      for (let i = 0; i < Object.keys(productsObj).length; i += 1) {
        const data = Object.entries(productsObj)[i];
        const key = data[0];
        const category = data[1];
        if (URL.indexOf(key) > -1) {
          const saving = document.querySelector('.HD008-saving_price span');
          saving.textContent = category.saving;

          const priceperDay = document.querySelector('.HD008-ppd span');
          priceperDay.textContent = category.pricePerDay;
        }
      }
    },
    /**
     * @desc Check if there is a was price or savings
     */
    checkPrices: function checkPrices() {
      const wasPrice = document.querySelector('.HD008-was_price span');
      if (wasPrice.textContent === '') {
        document.querySelector('.product__options:last-child').classList.add('HD008-no_was');
        wasPrice.parentNode.classList.add('HD008-was_hide');
      } else {
        wasPrice.parentNode.classList.remove('HD008-was_hide');
        document.querySelector('.product__options:last-child').classList.remove('HD008-no_was');
      }
      const savingPrice = document.querySelector('.HD008-saving_price span');
      if (savingPrice.textContent === '') {
        savingPrice.parentNode.classList.add('HD008-saving_hide');
      } else {
        savingPrice.parentNode.classList.remove('HD008-saving_hide');
      }
    },
    /**
    * @desc Add offer text
    */
    offerText: function offerText() {
      const { settings } = Experiment;
      const offers = document.createElement('div');
      offers.classList.add('HD008-offer_tooltip');
      offers.innerHTML = '<div class="HD008-tooltip_text">Why can we offer at such a low price?</div><div class="HD008-offer-message"><span>&times;</span>Thanks to our competitive pricing structure. We don’t face the same overheads as those on the high street. Being an online organisation, we are able to keep costs to a minimum and pass on any savings to our customers. We guarantee the lowest prices. Always. </div>';
      const cartBox = document.querySelector('#product_addtocart_form');
      cartBox.insertAdjacentElement('afterend', offers);

      const offerMessage = document.querySelector('.HD008-offer-message');
      if (window.innerWidth > 1024) {
        document.querySelector('.HD008-tooltip_text').addEventListener('mouseenter', () => {
          offerMessage.classList.add('HD008-tooltip_show');
          /* eslint-disable */
          events.send(settings.ID, 'hover', `User hovered over tooltip desktop`);
          /* eslint-enable */
        });
        document.querySelector('.HD008-tooltip_text').addEventListener('mouseleave', () => {
          offerMessage.classList.remove('HD008-tooltip_show');
        });
      } else {
        document.querySelector('.HD008-tooltip_text').addEventListener('click', () => {
          offerMessage.classList.add('HD008-tooltip_show');
          /* eslint-disable */
          events.send(settings.ID, 'click', `User opened tooltip mobile`);
          /* eslint-enable */
        });
      }
      const tooltipExit = document.querySelector('.HD008-offer-message');
      tooltipExit.addEventListener('click', () => {
        offerMessage.classList.remove('HD008-tooltip_show');
      });
    },
  },
};

export default Experiment;
