import { fullStory, events } from '../../../../lib/utils';
import { categories } from './categories';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP124',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.navClick();
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
    navClick: () => {
      const { settings } = Experiment;
      const productCategory = window.universal_variable.product.subcategory;
      const navigation = document.querySelector('#nav');

      for (let i = 0; i < Object.keys(categories).length; i += 1) {
        const data = Object.entries(categories)[i];
        const breadCrumb = window.universal_variable.page.breadcrumb[2];

        if (data[0] === breadCrumb) {
          if (data[1]) {
            navigation.querySelector(`li[data-goto-category="${data[1]}"]`).click();
          }
          break;
        } else if (data[0] === productCategory) {
          if (data[1]) {
            navigation.querySelector(`li[data-goto-category="${data[1]}"]`).click();
          }

          // events
          document.querySelector('.js-slidePanel').addEventListener('click', () => {
            events.send(settings.ID, 'Clicked', `${settings.ID} The navigation from a product page  - Variation ${settings.VARIATION}`);
          });

          // loop through nav link
          const newNavLinks = document.querySelectorAll('.nav_groupLink');
          for (let index = 0; index < newNavLinks.length; index += 1) {
            const element = newNavLinks[index];
            element.addEventListener('click', () => {
              events.send(settings.ID, 'Clicked', `${settings.ID} One of the navigation items on the list they are shown  - Variation ${settings.VARIATION}`);
            });
          }
          document.querySelector('.nav_backArrow').addEventListener('click', () => {
            events.send(settings.ID, 'Clicked', `${settings.ID} Back arrow to see more navigation items (the ones they weren't shown)  - Variation ${settings.VARIATION}`);
          });
        }
      }
    },
  },
};

export default Experiment;
