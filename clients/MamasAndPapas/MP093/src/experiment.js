import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{MP093}} - {{Mobile - 1 product per row}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP093',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, bindExperimentEvents } = Experiment;
    services.tracking();

    document.body.classList.add(settings.ID);

    const toggleBtnContainer = `<div class='MP093-toggleView__wrapper'>
      <div class='MP093-toggleView__container'>
        <span class='text'>View</span>
        <span class='icon icon_onePerRow'><div id='icon_onePerRow'></div></span>
        <span class='icon icon_twoPerRow'><div id='icon_twoPerRow'></div></span>
      </div>
    </div>`;

    pollerLite(['.plp-title'], () => {
      const plpTitle = document.querySelector('.plp-title');
      if (plpTitle) {
        plpTitle.insertAdjacentHTML('afterbegin', toggleBtnContainer);
      }
    });

    pollerLite(['.MP093-toggleView__wrapper'], () => {
      if (settings.VARIATION === '1') {
        // Default Selection
        document.querySelector('.icon_onePerRow').classList.add('active');
        document.querySelector('#icon_onePerRow').classList.add('active');
  
        services.showOneProductPerRow();
        
        bindExperimentEvents.toggleProductsPerRow();
      } else if (settings.VARIATION === '2') {
        // Default Selection
        document.querySelector('.icon_twoPerRow').classList.add('active');
        document.querySelector('#icon_twoPerRow').classList.add('active');
  
        bindExperimentEvents.toggleProductsPerRow();
      }
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      // events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Show One Product Per Row
     */
    showOneProductPerRow() {
      const allProducts = document.querySelectorAll('.productLister > .col-xs-6');
      [].forEach.call(allProducts, (product) => {
        product.classList.add('col-xs-12');
        product.classList.remove('col-xs-6');
      });
    },
    /**
     * @desc Show Two Product Per Row
     */
    showTwoProductsPerRow() {
      const allProducts = document.querySelectorAll('.productLister > .col-xs-12');
      [].forEach.call(allProducts, (product) => {
        product.classList.add('col-xs-6');
        product.classList.remove('col-xs-12');
      });
    },
  },

  components: {},

  bindExperimentEvents: {
    /**
     * @desc Toggle between one and two products per row
     */
    toggleProductsPerRow() {
      const { services } = Experiment;
      const toggleIcons = document.querySelectorAll('.MP093-toggleView__container .icon');
      [].forEach.call(toggleIcons, (icon) => {
        icon.addEventListener('click', (e) => {
          const iconClicked = e.currentTarget;
          if (!iconClicked.classList.contains('active')) {
            // Remove active class
            document.querySelector('.icon.active').classList.remove('active');
            document.querySelector('.icon  > div.active').classList.remove('active');
            // Add Remove class to clicked button
            iconClicked.classList.add('active');
            iconClicked.querySelector('div').classList.add('active');

            if (iconClicked.classList.contains('icon_onePerRow')) {
              services.showOneProductPerRow();
            } else if (iconClicked.classList.contains('icon_twoPerRow')) {
              services.showTwoProductsPerRow();
            }
          }
        });
      });
    }
  },
};

export default Experiment;
