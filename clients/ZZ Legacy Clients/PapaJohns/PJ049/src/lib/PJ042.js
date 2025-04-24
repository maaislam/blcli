import { fullStory, events } from '../../../../../lib/utils';
import PJ038 from './lib/PJ038';
import offers from './lib/PJ038-descriptions';

/**
 * {{ID}} - {{PJ042 Title}}
 */
const PJ042 = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ042',
    VARIATION: '1',
  },

  init() {
    // Setup
    const { settings, services, components } = PJ042;
    services.tracking();
    document.body.classList.add(settings.ID);

    if (window.location.href.indexOf('/offers') > -1) {
      PJ038.init();
      components.offerDescriptions();
      components.changeButtonText();
    }

    /* eslint-disable */
    components.offerLink();
    window.prm.add_pageLoaded(function (sender, error) {
        try {
          if(document.querySelector('.mainMenu.mobile .first.uppercase')){
            components.offerLink();
          }
        } catch (e) {}
        
    });
    /* eslint-enable */
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = PJ042;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Change CTA
     */
    changeButtonText: () => {
      const buttons = document.querySelectorAll('.offer-m .actionButton');

      for (let index = 0; index < buttons.length; index += 1) {
        const element = buttons[index];
        if (element.textContent !== 'Collection Only') {
          element.innerHTML = 'ADD';
        }
      }
    },

    /**
     * @desc Change offers
     */
    offerLink: () => {
      const offerLink = document.querySelector('.mainMenu.mobile .first.uppercase');
      offerLink.setAttribute('onclick', '');
      offerLink.setAttribute('href', '/offers.aspx');
    },

    /**
     * @desc Loop through offers and change the descriptions/names
     */
    offerDescriptions: () => {
      const allOffers = document.querySelectorAll('.offer-m');

      // loop through object
      for (let i = 0; i < Object.keys(offers).length; i += 1) {
        const offerItem = Object.entries(offers)[i];

        const key = offerItem[0];
        const offerDesc = offerItem[1].desc;
        const offerObjName = offerItem[1].offername;

        [].forEach.call(allOffers, (element) => {
          const offerName = element.querySelector('.redText');
          const currentDesc = element.querySelector('.offer-desc p');
          if (key === offerName.textContent.trim()) {
            if (offerDesc) {
              currentDesc.textContent = offerDesc;
            }
            if (offerObjName) {
              offerName.textContent = offerObjName;
            }
          }
        });
      }
    },

  },
};

export default PJ042;
