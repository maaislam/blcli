import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';


const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ018c',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    // const { components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const isMobile = window.innerWidth < 797;
    const URL = window.location.href;
    events.send('PJ018c V1', 'Test Fired', 'PJ018c fired');

    const offersPage = () => {
      if (URL.indexOf('offers') > -1) {
        services.getDeals();
      }
    };
    offersPage();

    // mobile observer
    observer.connect(document.getElementById('ctl00__objHeader_upHeaderSummary'), () => {
      if (isMobile) {
        offersPage();
      }
    }, {
      config: { attributes: true, childList: true, subtree: false },
      throttle: 1000,
    });

    // desktop observer
    observer.connect(document.getElementById('ctl00__objHeader_upOmnibar'), () => {
      if (!isMobile) {
        offersPage();
      }
    }, {
      config: { attributes: true, childList: true, subtree: false },
      throttle: 1000,
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
    /**
     * @desc get deals
     */
    getDeals: function getDeals() {
      let menuItems;
      let itemsWrapper;
      let topThreeItems;
      if (window.innerWidth < 797) {
        topThreeItems = document.querySelector('.offers-m-cont');
        // eslint-disable-next-line prefer-destructuring
        itemsWrapper = document.querySelectorAll('.offers-m-cont')[1];
        menuItems = itemsWrapper.querySelectorAll('.offer-m');
      } else {
        topThreeItems = document.querySelector('.menuItems');
        menuItems = topThreeItems.querySelectorAll('.offerList');
      }
      for (let index = 0; index < menuItems.length; index += 1) {
        const element = menuItems[index];
        let menuItemTitle;
        if (window.innerWidth < 767) {
          menuItemTitle = element.querySelector('h2').textContent;
        } else {
          menuItemTitle = element.querySelector('h3').textContent;
        }
        if (menuItemTitle.indexOf('Papas Meal Deal') > -1) {
          element.style.display = 'none';
        }
      }
    },
  },

  components: {},
};

export default Experiment;
