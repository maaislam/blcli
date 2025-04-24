import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME134',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // Creates gift finder banner
    const giftFinderWrapper = document.createElement('div');
    giftFinderWrapper.classList.add('ME134_gift-finder__wrapper');

    /**
     * Product Page
     */
    if (document.querySelector('.product-page')) {
      const giftFinderBanner = `<div class='ME134_gift-finder__container'>
            <h2>Want to discover more of our unique licenced products? Check out our product finder!</h2>
            <div>
              <ul>
                <a href='https://www.merchoid.com/'>
                  <li class='ME134_gift-finder__item'>
                    <p id='ME134_gift-finder__treat'>Find a treat for me</p>
                  </li>
                </a>  
                <a href='https://www.merchoid.com/'>
                  <li class='ME134_gift-finder__item'>
                   <p id='ME134_gift-finder__gift'>Find a gift</p>
                  </li>
                </a>
              </ul>
            </div>
          </div>`;

      const productSecondaryTabs = document.querySelector('.merchoid-product-reasons.clearfix').parentNode;
      productSecondaryTabs.insertAdjacentElement('beforebegin', giftFinderWrapper);

      giftFinderWrapper.insertAdjacentHTML('afterbegin', giftFinderBanner);

      const findTreatButton = document.querySelector('#ME134_gift-finder__treat');
      if (findTreatButton) {
        findTreatButton.addEventListener('click', () => {
          events.send('ME134', 'clicked-treat-button', 'product-page');
        });
      }

      const findGiftButton = document.querySelector('#ME134_gift-finder__gift');
      if (findGiftButton) {
        findGiftButton.addEventListener('click', () => {
          events.send('ME134', 'clicked-gift-button', 'product-page');
        });
      }
    /**
    * Home Page
    */
    } else if (window.location.href.match(/^https:\/\/www.merchoid.com\/(\?.+)?$/)) {
      const giftFinder = document.querySelector('.ME117_cta-wrap .ME117_cta');

      if (giftFinder) {
        giftFinder.addEventListener('click', () => {
          events.send('ME134', 'clicked-search-button', 'home-page');
        });
      }
    /**
    * Category Pages
    */
    } else if ((document.querySelector('.category-page')) || (document.querySelector('.woocommerce.columns-4')) || (window.location.href.indexOf('/bestsellers/') > -1)) {
      const giftFinderBanner = `<div class='ME134_gift-finder__container'>
            <h2>Can't find what you're looking for? Use our product finder!</h2>
            <div>
              <ul>
                <a href='https://www.merchoid.com/'>
                  <li class='ME134_gift-finder__item'>
                    <p id='ME134_gift-finder__treat'>Find a treat for me</p>
                  </li>
                </a>  
                <a href='https://www.merchoid.com/'>
                  <li class='ME134_gift-finder__item'>
                   <p id='ME134_gift-finder__gift'>Find a gift</p>
                  </li>
                </a>
              </ul>
            </div>
          </div>`;

      const paginationContainer = document.querySelector('.woocommerce-pagination');
      // Checks if page contains pagination. If not selects footer.
      if (paginationContainer) {
        paginationContainer.insertAdjacentHTML('afterend', giftFinderBanner);
        document.querySelector('.ME134_gift-finder__container').style.borderBottom = 'none';
      } else {
        const footer = document.querySelector('.footer-wrapper');
        footer.insertAdjacentHTML('beforebegin', giftFinderBanner);

        const findTreatButton = document.querySelector('#ME134_gift-finder__treat');
        if (findTreatButton) {
          findTreatButton.addEventListener('click', () => {
            events.send('ME134', 'clicked-treat-button', 'category-page');
          });
        }

        const findGiftButton = document.querySelector('#ME134_gift-finder__gift');
        if (findGiftButton) {
          findGiftButton.addEventListener('click', () => {
            events.send('ME134', 'clicked-gift-button', 'category-page');
          });
        }
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

  components: {},
};

export default Experiment;
