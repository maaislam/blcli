import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{ME145}} - {{Product Badging}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME145',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    let message;
    /*eslint-disable */
    switch (settings.VARIATION) {
      case '1':
        message = 'SALE';
        break;
      case '2':
        message = 'CLEARANCE';
        break;
    }
    /* eslint-enable */
    const badge = `<div class='ME145-badgeContainer'><div class='ME145-badge'>${message}</div></div>`;
    /**
     * @desc Clearance Page
     */
    if (window.location.href.indexOf('/clearance') > -1) {
      const allProducts = document.querySelectorAll('.products > li.product-small');

      [].forEach.call(allProducts, (product) => {
        if (product.querySelector('div.callout.style1')) {
          product.querySelector('div.callout.style1').insertAdjacentHTML('afterbegin', badge);
          product.querySelector('div.callout.style1 .inner').classList.add('hidden');
        }
      });
    /**
     * @desc Product Page
     */
    } else if (window.location.href.indexOf('/product/') > -1) {
      // Changes Image Banner text
      document.querySelector('div.callout.style1 .inner > .inner-text').innerHTML = `${message}!`;

      // Gets Prices
      poller(['p.price.large', 'p.price.large del>span.amount', 'p.price.large ins>span.amount'], () => {
        let currency;
        let oldPrice;
        let nowPrice;
        const oldPriceText = document.querySelector('p.price.large del>span.amount').textContent;
        const nowPriceText = document.querySelector('p.price.large ins>span.amount').textContent;
        if (window.merchoidDetectedCountry === 'GB') {
          currency = '£';
          oldPrice = parseFloat(oldPriceText.replace('£', ''));
          nowPrice = parseFloat(nowPriceText.replace('£', ''));
        } else if (window.merchoidDetectedCountry === 'US') {
          currency = '$';
          oldPrice = parseFloat(oldPriceText.replace('$', ''));
          nowPrice = parseFloat(nowPriceText.replace('$', ''));
        }
        // Calculates Saving Amount
        const savingAmount = (Math.round((oldPrice - nowPrice) * 100) / 100).toFixed(2);
        // Lightbox Content
        const lightbox = `<div class='ME145-lightboxContainer hidden'>
        <div class='ME145-lightboxContent'>
        <div class='ME145-lightbox'><h2>${productTitle}</h2>
        <p class='ME145-price price'>
        <del><span class='ME145-amount amount'>${oldPriceText}</span></del>
        <ins><span class='ME145-amount amount'>${nowPriceText}</span></ins>
        </p>
        <div class='ME145-savingAmount amount'>You are saving ${currency}${savingAmount}</div>
        </div>
        <div class='ME145-lightboxButtons'>${addButton}${viewSalesButton}</div>
        <span id='ME145-closeLightbox'></span>
        </div>
        </div>`;

        document.querySelector('body').insertAdjacentHTML('beforeend', lightbox);

        // Hide Lightbox
        document.querySelector('#ME145-closeLightbox').addEventListener('click', () => {
          document.querySelector('.ME145-lightboxContainer').classList.add('hidden');
        });

        // Add to Cart Button
        if (document.querySelector('#ME145-addToCart')) {
          document.querySelector('button#ME145-addToCart').addEventListener('click', () => {
            document.querySelector('.radical-variations-wrapper button.single_add_to_cart_button.button').click();
          });
        }

        // View Sale Products
        document.querySelector('button#ME145-viewSaleProducts').addEventListener('click', () => {
          window.location.href = 'https://www.merchoid.com/clearance/';
        });
      });

      // Amends product badges on 'You might also like' slider
      poller(['.related.products', '.some-top-picks', '.flickity-viewport', '.callout.style1'], () => {
        if (document.querySelectorAll('.flickity-viewport').length > 0) {
          const length = document.querySelectorAll('.flickity-viewport').length; // eslint-disable-line prefer-destructuring
          const slider = document.querySelectorAll('.flickity-viewport')[length - 1];
          const sliderProducts = slider.querySelectorAll('.product-small');
          [].forEach.call(sliderProducts, (product) => {
            if (product.querySelector('.callout.style1')) {
              product.querySelector('.callout.style1').insertAdjacentHTML('afterbegin', badge);
              product.querySelector('.ME145-badgeContainer').classList.add('sliderBadge');
              product.querySelector('div.callout.style1 .inner').classList.add('hidden');
            }
          });
        }
      });

      // Gets Product Title
      const productTitle = document.querySelector('.mobile-target-product-title').textContent;

      // If Product has Select Size option then does not attach Add to Cart button
      let addButton = '';
      if (!document.querySelector('#pa_size')) {
        addButton = `<button type='submit' class='ME145-lightbox__btn single_add_to_cart_button button secondary' id='ME145-addToCart'>Add to cart</button>`; // eslint-disable-line quotes
      }
      const viewSalesButton = `<button type='submit' class='ME145-lightbox__btn single_add_to_cart_button button secondary' id='ME145-viewSaleProducts'>View All Sale Products</button>`; // eslint-disable-line quotes
      // // Lightbox Content
      // const lightbox = `<div class='ME145-lightboxContainer hidden'>
      // <div class='ME145-lightboxContent'>
      // <div class='ME145-lightbox'><h2>${productTitle}</h2>
      // <p class='ME145-price price'>
      // <del><span class='ME145-amount amount'>${oldPriceText}</span></del>
      // <ins><span class='ME145-amount amount'>${nowPriceText}</span></ins>
      // </p>
      // <div class='ME145-savingAmount amount'>You are saving ${currency}${savingAmount}</div>
      // </div>
      // <div class='ME145-lightboxButtons'>${addButton}${viewSalesButton}</div>
      // <span id='ME145-closeLightbox'></span>
      // </div>
      // </div>`;

      // document.querySelector('body').insertAdjacentHTML('beforeend', lightbox);

      // Show Lightbox
      if (document.querySelector('.callout.large.style1')) {
        document.querySelector('.callout.large.style1').addEventListener('click', () => {
          document.querySelector('.ME145-lightboxContainer').classList.remove('hidden');
          events.send('ME145', 'Product Image banner clicked', 'MP074 More info clicked', { sendOnce: true });
        });
      }

      // // Hide Lightbox
      // document.querySelector('#ME145-closeLightbox').addEventListener('click', () => {
      //   document.querySelector('.ME145-lightboxContainer').classList.add('hidden');
      // });

      // // Add to Cart Button
      // if (document.querySelector('#ME145-addToCart')) {
      //   document.querySelector('button#ME145-addToCart').addEventListener('click', () => {
      //     document.querySelector('.radical-variations-wrapper button.single_add_to_cart_button.button').click();
      //   });
      // }

      // // View Sale Products
      // document.querySelector('button#ME145-viewSaleProducts').addEventListener('click', () => {
      //   window.location.href = 'https://www.merchoid.com/clearance/';
      // });
    }
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
  },

  components: {},
};

export default Experiment;
