import { fullStory, events } from '../../../../lib/utils';


/**
 * {{TP109}} - {{Account migration on guest checkout - Desktop (POC)}}
 */

const guestLogin = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP109',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const basketArea = bodyVar.querySelector('#content > .order_basket');

      return {
        docVar,
        bodyVar,
        basketArea,
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
      // Default running event
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
    },
    components: {
      setupElements() {
        // Render markup
        Exp.render.accountMigrationContent();
        // Add functionality to remind me button
        Exp.bindExperimentEvents.handleRemindMeButton();
      },
    },
    render: {
      accountMigrationContent() {
        Exp.cache.basketArea.insertAdjacentHTML('afterend', `
          <div class="TP109_Container TP109_Migrate_Container">
            <div class="TP109_Content_Container TP109_Account_Benefits_Container">
              <h2 class="TP109_Header">Have a Travis Perkins branch account?</h2>
              <span class="TP109_Sub_Heading">Get these benefits by registering your account to use online</span>
              <div class="TP109_List_Container TP109_Content_Wrap">
                <ol class="TP109_List">
                  <li class="TP109_List_Item"><span class="TP109_List_Text">Transfer your personal branch prices, so you <span class="TP109_Bold">pay the same online as you would in branch</span></span></li>
                  <li class="TP109_List_Item"><span class="TP109_List_Text"><span class="TP109_Bold">Easily access your order history</span>, so you can check the details of your purchase at any time</span></li>
                  <li class="TP109_List_Item"><span class="TP109_List_Text"><span class="TP109_Bold">Speed up your order</span> by using your saved addresses and payment methods</span></li>
                </ol>
              </div>
              <div class="TP109_Account_Migrate_Button_Container TP109_Content_Wrap">
                <span class="TP109_Migrate_Text">If you click the button below, we will show you how to migrate your account after this purchase</span>
                <span class="TP109_Button_Secondary TP109_Account_Migrate_Button">Remind me after I’ve checked out</span>
              </div>
            </div>
            <div class="TP109_Content_Container TP109_Migrating_Content_Container">
              <h2 class="TP109_Header TP109_Migrating_Header">Thanks!</h2>
              <span class="TP109_Migrating_Text">Feel free to carry on with your purchase, and we will show you how to migrate your offline account once you have finished!</span>
            </div>
          </div>
        `);
      },
    },
    bindExperimentEvents: {
      handleRemindMeButton() {
        const remindMeButton = Exp.cache.bodyVar.querySelector('.TP109_Account_Migrate_Button');
        remindMeButton.addEventListener('click', () => {
          // Slide up account benefit conatiner, slide down remind me container
          $('.TP109_Account_Benefits_Container').slideUp('slow', () => {
            $('.TP109_Migrating_Content_Container').slideDown();
          });
          sessionStorage.setItem('TP109', 'Migrate');
          events.send(`${Exp.settings.ID}`, 'Click', 'Remind me', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

const checkoutSuccess = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP109',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const confirmationMessage = bodyVar.querySelector('.confirmation_head');

      return {
        docVar,
        bodyVar,
        confirmationMessage,
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
      // Default running event
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
    },
    components: {
      setupElements() {
        // Render markup
        Exp.render.accountMigrationContent();
        // Handle Redirect
        Exp.bindExperimentEvents.redirectToRegister();
      },
    },
    render: {
      accountMigrationContent() {
        Exp.cache.confirmationMessage.insertAdjacentHTML('afterend', `
        <div class="TP109_Container TP109_Checkout_Success">
        <div class="TP109_Content_Container TP109_Account_Benefits_Container">
          <h2 class="TP109_Header">Have a Travis Perkins branch account?</h2>
          <span class="TP109_Sub_Heading">Get these benefits by registering your account to use online</span>
          <div class="TP109_List_Container TP109_Content_Wrap">
            <ol class="TP109_List">
              <li class="TP109_List_Item"><span class="TP109_List_Text">Transfer your personal branch prices, so you <span class="TP109_Bold">pay the same online as you would in branch</span></span></li>
              <li class="TP109_List_Item"><span class="TP109_List_Text"><span class="TP109_Bold">Easily access your order history,</span> so you can check the details of your purchase at any time</span></li>
              <li class="TP109_List_Item"><span class="TP109_List_Text"><span class="TP109_Bold">Speed up your order</span> by using your saved addresses and payment methods</span></li>
            </ol>
          </div>
          <div class="TP109_Set_Up_Online_Account_Button_Container TP109_Content_Wrap">
            <span class="TP109_Button_Primary TP109_Set_Up_Online_Account_Button">Learn how to migrate my Account</span>
          </div>
        </div>
      </div>
        `);
      },
    },
    bindExperimentEvents: {
      redirectToRegister() {
        Exp.cache.bodyVar.querySelector('.TP109_Set_Up_Online_Account_Button').addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Set up my online account', { sendOnce: true });
          window.location.href = 'https://www.travisperkins.co.uk/register';
        });
      },
    },
  };

  Exp.init();
};

export { guestLogin, checkoutSuccess };
