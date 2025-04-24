import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{IT068}} - {{Promote Promotions on PDP/PLP}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'IT068',
    VARIATION: '{{VARIATION}}',
    /**
     * @desc config will be declared globally in the platform
     * this will allow extra categories and discount codes to be
     * added easily. Below is for development purposes.
     */
    config: {
      // Based on URL
      plp: {
        '/dresses': 'Get 50% off',
        '/tops': 'Get 44% off',
      },
      // Based on product name
      pdp: {
        'dress': 'Get 50% off <br />Use Code XXXX at Checkout',
        'top': 'Get 40% off <br />Use Code XXXX at Checkout',
        'shirt': 'Get 40% off <br />Use Code XXXX at Checkout',
      },
    },
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const cat = services.whatCategory();
    /**
     * If Window object (itConfig) exists, overide settings.config
     */
    if (window.it068Config) {
      Experiment.settings.config = window.it068Config;
    }
    /**
     * Loop over config object and match pathname with PLP key.
     * Add relative discount based on the url from the config.
     */
    const plpDiscount = () => {
      events.send('IT068', 'Active', 'Experiment is active on the PLP page', { sendOnce: true });
      Object.keys(Experiment.settings.config.plp).forEach((key) => {
        if (key === cat) {
          const discountToAdd = Experiment.settings.config.plp[key];
          const html = `
            <div class="it68-plp-discount">
              <p>${discountToAdd}</p>
            </div>
          `;
          // console.log(Experiment.settings.config.plp[key]);
          const products = document.querySelectorAll('.products-set > ul.product-listing.products-grid li.products-grid__item');
          for (let i = 0; products.length > i; i += 1) {
            products[i].classList.add('it68-show-discount');
            const productImage = products[i].querySelector('.item > a.product-image');
            if (productImage) {
              productImage.insertAdjacentHTML('afterend', html);
            }
          }
        }
      });
    };
    poller([
      '.products-set > ul.product-listing.products-grid li.products-grid__item',
    ], plpDiscount);
    /**
     * On PDP pages, loop over config object and match key
     * against product titles to determine what discount to
     * present.
     */
    const pdpDiscount = () => {
      events.send('IT068', 'Active', 'Experiment is active on the PDP page', { sendOnce: true });
      const productTitle = document.querySelector('.product-view .product-essential .product-shop .product-name > h1');
      if (productTitle) {
        const string = productTitle.textContent;
        const lcString = string.toLowerCase();
        Object.keys(Experiment.settings.config.pdp).forEach((key) => {
          if (lcString.match(key)) {
            const value = Experiment.settings.config.pdp[key];
            const html = `
              <div class="it68-pdp-discount">
                <p>${value}</p>
              </div>
            `;
            productTitle.insertAdjacentHTML('afterend', html);
          }
        });
      }
    };
    poller([
      '.product-view .product-essential .product-shop .product-name > h1',
    ], pdpDiscount);
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
     * @desc pulls the category from the URL
     */
    whatCategory() {
      const url = window.location.pathname;
      return url;
    },
  },

  components: {},
};

export default Experiment;
