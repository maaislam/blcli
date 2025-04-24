import { fullStory, events } from '../../../../lib/utils';


/**
 * {{TP111}} - {{Register page improvements}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP111',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const registerFormParent = bodyVar.querySelector('#registerExistingAccountForm');
      const TP111Markup = `
      <div class="TP111_Wrap">
        <div class="TP111_Header_Container">
          <h3 class="TP111_Header">How to find your account number</h3>
        </div>
        <div class="TP111_Section1_Container">
          <p class="TP111_Section1_Header">1. Find your account number on any Travis Perkins receipt or invoice</p>
          <img class="TP111_Receipt_Invoice_Image" src="//sb.monetate.net/img/1/581/1524856.jpg" alt="Invoice Receipt">
        </div>
        <span class="TP111_Or">or</span>
        <div class="TP111_Section2_Container">
          <span class="TP111_Section2_Header">2. Call our customer services team, or your local branch</span>
          <span class="TP111_Contact TP111_Phone_Number">0330 123 3846</span>
          <span class="TP111_Contact TP111_Opening_Hours">Open 8am - 5pm<br />Monday to Friday</span>
          <a class="TP111_Find_Local_Branch_Link" href="/branch-locator">Find your local Branch</a>
        </div>
      </div>
      `;
      const submitButton = bodyVar.querySelector('#submit');

      return {
        bodyVar,
        registerFormParent,
        TP111Markup,
        submitButton,
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
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        Exp.cache.registerFormParent.insertAdjacentHTML('beforeend', Exp.cache.TP111Markup);
        this.setupTracking();
      },
      setupTracking() {
        // Event tracking - Add event to find local branch
        Exp.cache.bodyVar.querySelector('.TP111_Find_Local_Branch_Link').addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Find your local branch', { sendOnce: true });
        });
        // Track continue to create account
        Exp.cache.submitButton.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Continue to create account', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
