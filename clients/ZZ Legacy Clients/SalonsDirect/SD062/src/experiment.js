import { fullStory } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'SD062',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    components.addLoader();
    const allLinks = document.querySelectorAll('a');
    for (let i = 0; i < allLinks.length; i += 1) {
      const element = allLinks[i];
      element.addEventListener('click', () => {
        if (element.getAttribute('href') === 'javascript:void(0);' || element.getAttribute('href').indexOf('?mode=list') > -1 || element.getAttribute('href').indexOf('?mode=grid') > -1 || element.getAttribute('href') === 'https://www.salonsdirect.com/checkout/cart/') { // eslint-disable-line no-script-url
        } else {
          components.showLoader();
        }
      });
    }

    const $ajaxPopup = document.querySelector('#ajax_content');
    const $continueShoppingBtn = document.querySelector('#continued-shopping-btn');
    observer.connect($ajaxPopup, () => {
      if ($continueShoppingBtn.style.display !== 'none') {
        for (let i = 0; i < allLinks.length; i += 1) {
          const element = allLinks[i];
          element.addEventListener('click', () => {
            if (element.getAttribute('href') === 'javascript:void(0);' || element.getAttribute('href').indexOf('?mode=list') > -1 || element.getAttribute('href').indexOf('?mode=grid') > -1 || element.getAttribute('href') === 'https://www.salonsdirect.com/checkout/cart/') { // eslint-disable-line no-script-url
            } else {
              components.showLoader();
            }
          });
        }
      }
    });
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

  components: {
    /**
     *  @desc add the loader
     */
    addLoader: function addLoader() {
      const newLoader = document.createElement('div');
      newLoader.classList.add('SD062-loader');
      document.body.appendChild(newLoader);
      newLoader.innerHTML = '<div class="SD062-rotate"><div class="SD062-loader_circle"></div><p>LOADING</p></div>';
    },
    /**
     *  @desc show the loader function
     */
    showLoader: function showLoader() {
      const loader = document.querySelector('.SD062-loader');
      setTimeout(() => {
        loader.classList.add('SD062-loader_active');
      }, 2000);
    },
  },
};

export default Experiment;
