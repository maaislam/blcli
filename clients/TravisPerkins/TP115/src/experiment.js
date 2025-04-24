import { fullStory, events } from '../../../../lib/utils';


/**
 * {{TP115}} - {{Test Name}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP115',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const errorMessageText = bodyVar.querySelector('#password_error_message > span');
      const TP115Markup = `
      <p class="TP115-Text">
        Most of our passwords require at least one; upper case letter, lower case letter, number and symbol.<br />Try again but if you still have no luck, just click <a class="TP115-Forgot-Password-Link" href="/login/pw/request">"Forgotten your password?”</a> below and we’ll help you make a new password.
      </p>
      `;

      return {
        docVar,
        bodyVar,
        errorMessageText,
        TP115Markup,
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
      const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Change error message text
        Exp.cache.errorMessageText.textContent = 'Sorry, the email or password you entered is incorrect.';
        // Insert Markup after error message
        Exp.cache.errorMessageText.insertAdjacentHTML('afterend', Exp.cache.TP115Markup);
        // Elements ready, set up tracking
        this.setupTracking();
      },
      setupTracking() {
        // Track forgotten password link
        Exp.cache.bodyVar.querySelector('.TP115-Forgot-Password-Link').addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Forgot Password', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
