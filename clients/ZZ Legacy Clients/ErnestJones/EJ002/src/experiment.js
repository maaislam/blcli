import { fullStory, events } from '../../../../lib/utils';

const Experiment = {
  /**
  * @desc Variation settings. Useful for when multiple variations are developed
  * in a single project so you can just toggle the variation number in production
  */
  settings: {
    ID: 'EJ002',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    /**
    * @desc checkout as guest by default
    */
    if (settings.VARIATION === '3') {
      const guestCheckout = document.querySelector('.thirdWidth .radioButton:last-child');
      const haveAccountbutton = document.querySelector('.sneakyDiv .paddingWrap');
      haveAccountbutton.insertAdjacentElement('afterend', guestCheckout);
      guestCheckout.querySelector('#continueRadio').click();
    }
    /**
    * @desc Move the basket underneath the CTA
    */
    if (settings.VARIATION === '2') {
      const basket = document.querySelector('#paymentSummaryTable');
      const checkoutButton = document.querySelector('#placeOrder');
      checkoutButton.insertAdjacentElement('afterend', basket);
    }
  },

  services: {
    /**
    * @desc Inits all page level tracking
    */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
