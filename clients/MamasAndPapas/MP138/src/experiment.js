import { fullStory, events } from '../../../../lib/utils';
import categories from './categories';
import { pollerLite } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP138',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    if (window.universal_variable.page.type === 'Product') {
      components.createBackButton();
      pollerLite(['.MP138-back'], () => {
        components.getLastCategory();
      });
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

  components: {
    createBackButton: () => {
      const breadcrumbMessage = document.querySelector('.breadcrumb');
      const backButton = document.createElement('div');
      backButton.classList.add('MP138-back');
      backButton.innerHTML = '<a>Back</a>';

      breadcrumbMessage.insertAdjacentElement('afterend', backButton);
    },
    getLastCategory: () => {
      const backButton = document.querySelector('.MP138-back');
      if (document.referrer.indexOf('https://www.mamasandpapas.com/en-gb/') === -1) {
        const productCategory = window.universal_variable.product.subcategory;
        Object.keys(categories).forEach((i) => {
          const data = categories[i];
          if (productCategory === [i][0]) {
            backButton.querySelector('a').setAttribute('href', data);
          }
        });
      } else if (document.referrer.indexOf('https://www.mamasandpapas.com/en-gb/') > -1) {
        backButton.addEventListener('click', () => {
          window.history.back();
        });
      } else {
        const category = document.querySelector('.breadcrumb_item:nth-child(2) a');
        category.click();
      }
      backButton.addEventListener('click', () => {
        const { settings } = Experiment;
        events.send(settings.ID, 'Clicked', 'Back button on PDP');
      });
    },
  },
};

export default Experiment;
