import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';

/**
 * PJ036 - Pizza page options cta change
 */
const Run = () => {
  const Exp = {
    settings: {
      ID: 'PJ036',
      VARIATION: '{{VARIATION}}',
      OPTIONS_BTN_TEXT: 'Customise'
    },

    init: () => {
      // Setup
      const { services, settings } = Exp;

      document.body.classList.add(settings.ID);

      services.tracking();

      // -------------------------------------------------
      // Update button text, on load and when the page changes dynamically
      // -------------------------------------------------
      Exp.updateButtonText();

      observer.connect([
        document.querySelector('#ctl00_cphBody_upProductLists')
      ], () => {
        Exp.updateButtonText();
      }, {
        childList: true,
        attributes: false  
      });
    },

    /**
     * Update text on options button
     */
    updateButtonText() {
      const { settings } = Exp;

      // Modify options buttons
      const buttons = document.querySelectorAll(
        '.mainMobileInside.main .menuItems .menuListCont .splitButtons a:first-of-type'
      );
      [].forEach.call(buttons, (item) => {
        item.textContent = settings.OPTIONS_BTN_TEXT;
      });
    },

    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
    },
  };

  Exp.init();
};

export default Run;
