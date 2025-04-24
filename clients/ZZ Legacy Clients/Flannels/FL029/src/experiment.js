import { fullStory, events } from '../../../../lib/utils';


/**
 * {{FL029}} - {{Checkout Address - Autofill}}
 */

const Run = () => {
  // Flannels ga configuration
  events.analyticsReference = '_gaUAT';
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL029',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const addressBox = bodyVar.querySelector('input[id*="txtAddress1"]');
      // Not polled for, may not always exist
      const addNewAddressButton = docVar.getElementById('lnkEnterDifferentAddress');

      return {
        docVar,
        bodyVar,
        addressBox,
        addNewAddressButton,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      clearPlaceholder: () => {
        // Clears placeholder value
        Exp.cache.addressBox.value = '';
      },
    },
    components: {
      setupElements() {
        Exp.services.clearPlaceholder();
        // Unbind blur event handler to prevent placeolder text appearing
        $(Exp.cache.addressBox).off('blur');
        // Bind event listener to add new addess button if it exists
        if (Exp.cache.addNewAddressButton) {
          Exp.bindExperimentEvents.newAddressClick();
        }
      },
    },
    bindExperimentEvents: {
      newAddressClick() {
        // Clear the placeholder value after 100ms
        Exp.cache.addNewAddressButton.addEventListener('click', () => {
          setTimeout(Exp.services.clearPlaceholder, 100);
        });
      },
    },
  };

  Exp.init();
};

export default Run;
