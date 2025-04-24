import { fullStory, events } from '../../../../lib/utils';
import PJ039 from './lib/PJ039';
import offers from './lib/PJ039-descriptions';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ043',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    if (window.location.href.indexOf('/offers') > -1) {
      PJ039.init();
      components.offerDescriptions();
      components.changeButtonText();
    }

    /* eslint-disable */
    components.offerLink();
    window.prm.add_pageLoaded(function (sender, error) {
        try {
          if(document.querySelector('.mainMenu .first.uppercase')){
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
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Change CTA
     */
    changeButtonText: () => {
      const buttons = document.querySelectorAll('.menuList.offerList .centerB');

      for (let index = 0; index < buttons.length; index += 1) {
        const element = buttons[index];
        if (element.textContent !== 'Collection Only') {
          element.innerHTML = 'CHOOSE THIS DEAL';
        }
      }
    },
    /**
     * @desc Change offers
     */
    offerLink: () => {
      const offerLink = document.querySelector('.mainMenu .first.uppercase');
      offerLink.setAttribute('onclick', '');
      offerLink.setAttribute('href', '/offers.aspx');
    },

    /**
     * @desc Loop through offers and change the descriptions/names
     */
    offerDescriptions: () => {
      const allOffers = document.querySelectorAll('.menuList');

      // loop through object
      for (let i = 0; i < Object.keys(offers).length; i += 1) {
        const offerItem = Object.entries(offers)[i];

        const key = offerItem[0];
        const offerDesc = offerItem[1].desc;
        const offerObjName = offerItem[1].offername;

        [].forEach.call(allOffers, (element) => {
          const offerName = element.querySelector('h3');
          const currentDesc = element.querySelector('.body');
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

export default Experiment;
