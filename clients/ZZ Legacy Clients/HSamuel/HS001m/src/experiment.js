import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'HS001m',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    if (settings.VARIATION === '1' || settings.VARIATION === '2') {
      services.moveEmail();
      services.clickEmail();
      document.querySelector('#accountPassword').parentNode.style.display = 'none';
      document.querySelector('.HS001m-email_box').style.display = 'block';
      services.moveEmailOnClick();
    }
    if (settings.VARIATION === '2') {
      const CTAButton = document.getElementById('placeOrder');
      const basketTable = document.querySelector('.thirdWidth.js-basketSummary fieldset');
      CTAButton.insertAdjacentElement('afterend', basketTable);
      document.querySelector('#accountPassword').parentNode.style.display = 'none';
      document.querySelector('.HS001m-email_box').style.display = 'block';
      services.moveEmailOnClick();
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
    /**
    * @desc Move email address
    */
    moveEmail: function moveEmail() {
      const signInForm = document.querySelector('[data-formname="signInForm"]');
      const emailBox = signInForm.querySelector('.sneakyDiv .paddingWrap');
      emailBox.classList.add('HS001m-email_box');
      signInForm.appendChild(emailBox);
    },
    clickEmail: function clickEmail() {
      document.querySelector('#continueRadio').click();
    },

    /**
    * @desc Move email address on click of other optons
    */
    moveEmailOnClick: function moveEmailOnClick() {
      const email = document.querySelector('.HS001m-email_box');
      const createAccountRadio = document.querySelector('#create-an-account').parentNode;
      const createAccountClick = document.querySelector('.paddingWrap .infoPanel');
      // const createAccount = document.querySelector('#loginRadio').parentNode;

      // click create an account
      createAccountRadio.addEventListener('click', () => {
        document.querySelector('.HS001m-email_box').style.display = 'block';
        createAccountClick.insertAdjacentElement('afterend', email);
      });

      // have an account click
      const accountLabel = document.querySelector('.paddingWrap .blockLabel');
      document.querySelector('#loginRadio').parentNode.addEventListener('click', () => {
        accountLabel.insertAdjacentElement('beforebegin', email);
        document.querySelector('.HS001m-email_box').style.display = 'block';
      });

      // continue as guest click
      const signInForm = document.querySelector('#continueRadio').parentNode;
      signInForm.addEventListener('click', () => {
        signInForm.insertAdjacentElement('afterend', email);
        document.querySelector('.HS001m-email_box').style.display = 'block';
      });
    },
  },

  components: {},
};

export default Experiment;
