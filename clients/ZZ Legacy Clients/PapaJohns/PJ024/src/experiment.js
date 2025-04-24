import { fullStory, events } from '../../../../lib/utils';

/**
 * PJ024 - Password Validation
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ024',
    VARIATION: '1',
  },

  init(exports) {
    // Setup
    const { settings, services } = Experiment;
    const {
      prm,
      isOnGuestFormPage,
      isDesktopCheckout,
      isMobileCheckout,
    } = exports;
    services.tracking();
    document.body.classList.add(settings.ID);

    /**
     * Run main experiment logic
     */
    const run = () => {
      events.send('PJ024', 'Test Fired', `V${settings.VARIATION}`, { sendOnce: true });
      const passwordInputContainer = document.querySelector('.checkoutRegItem');
      const passwordRequirements = `<div class='PJ024-pwdContainer'>
      <div class='PJ024-pwdRequirements'><strong>Minimum password requirements</strong>
      <ul class='PJ024-pwdList'>
      <div class='PJ024-requirement'>
        <li class='PJ024-pwd__item invalid' id='pwd-characters'>min. 8 characters</li>
        <ul id='character-validation'>
        <li class='block block-1'></li>
        <li class='block block-2'></li>
        <li class='block block-3'></li>
        <li class='block block-4'></li>
        <li class='block block-5'></li>
        <li class='block block-6'></li>
        <li class='block block-7'></li>
        <li class='block block-8'></li></ul>
      </div>
      <div class='PJ024-requirement'>
        <li class='PJ024-pwd__item invalid' id='pwd-uppercase'>min. 1 x Uppercase</li>
        <span class='validation' id='uppercase-validation'></span>
      </div>
      <div class='PJ024-requirement'>
        <li class='PJ024-pwd__item invalid' id='pwd-number'>min. 1 x Number</li>
        <span class='validation' id='number-validation'></span>
      </div>
      </ul>
      </div>
      </div>
      <span class='clearFix'></span>`;

      passwordInputContainer.insertAdjacentHTML('afterend', passwordRequirements);

      /**
       * @desc Adds Eye icon to Reveal Password
       */
      const passwordInputContainers = document.querySelectorAll('p.checkoutRegItem');
      const eyeIcon = `<span class='PJ024-showPwd'></span>`; // eslint-disable-line quotes
      [].forEach.call(passwordInputContainers, (inputContainer) => {
        inputContainer.querySelector('input').insertAdjacentHTML('beforebegin', eyeIcon);
        inputContainer.querySelector('span.PJ024-showPwd').addEventListener('click', () => {
          services.showPassword(inputContainer);
        });
      });

      /**
       * @desc Input Validation
       */
      const input = passwordInputContainer.querySelector('input');
      const uppercase = document.querySelector('#pwd-uppercase');
      const number = document.querySelector('#pwd-number');
      const length = document.querySelector('#pwd-characters');
      let max = -1;
      const validate = () => {
        // UPPERCASE Validation
        const upperCaseLetters = /[A-Z]/g;
        if (input.value.match(upperCaseLetters)) {
          uppercase.classList.remove('invalid');
          uppercase.classList.add('success');
          document.querySelector('#uppercase-validation').classList.add('ticked');
        } else {
          uppercase.classList.remove('success');
          uppercase.classList.add('invalid');
          document.querySelector('#uppercase-validation').classList.remove('ticked');
        }

        // NUMBER Validation
        const numbers = /[0-9]/g;
        if (input.value.match(numbers)) {
          number.classList.remove('invalid');
          number.classList.add('success');
          document.querySelector('#number-validation').classList.add('ticked');
        } else {
          number.classList.remove('success');
          number.classList.add('invalid');
          document.querySelector('#number-validation').classList.remove('ticked');
        }

        // LENGTH Validation
        if (input.value.length >= 1 && input.value.length < 8) {
          length.classList.remove('invalid');
          length.classList.remove('success');
          document.querySelector('#character-validation > .block-8').classList.remove('check');
          length.classList.add('check');
          if (input.value.length > max) {
            max = input.value.length;
            const blockSelectorEl = document.querySelector(`#character-validation > .block-${input.value.length}`);
            blockSelectorEl.classList.add('check');
            // Loop back and makes sure check class is applied to all previous siblings
            let prev = blockSelectorEl.previousElementSibling;
            while (prev) {
              if (prev.classList && !prev.classList.contains('check')) {
                prev.classList.add('check');
              }
              prev = prev.previousElementSibling;
            }
          } else if (input.value.length < max) {
            max = input.value.length;
            const blockSelectorEl = document.querySelector(`#character-validation > .block-${input.value.length + 1}`);
            blockSelectorEl.classList.remove('check');
          }
        } else if (input.value.length >= 8) {
          length.classList.remove('check');
          length.classList.add('success');
          document.querySelector('#character-validation > .block-8').classList.add('check');
          // Loop through all block and make sure they have the check class
          const blocks = document.querySelectorAll('#character-validation > .block');
          Array.from(blocks).forEach((node) => {
            if (node.classList && !node.classList.contains('check')) {
              node.classList.add('check');
            }
          });
        } else if (input.value.length === 0) {
          length.classList.remove('check');
          length.classList.remove('success');
          const blocksUncheck = document.querySelectorAll('#character-validation > .block');
          [].forEach.call(blocksUncheck, (el) => {
            el.classList.remove('check');
          });
          length.classList.add('invalid');
          max = -1;
        }
      };
      input.addEventListener('input', validate);
      validate();

      // Hides Password Requirements when Register Checkbox is not checked
      const checkVisibility = () => {
        if (!document.querySelector('.registerCheckout input').checked) {
          document.querySelector('.PJ024-pwdContainer').classList.add('hidden');
        } else {
          document.querySelector('.PJ024-pwdContainer').classList.remove('hidden');
        }
        if (!window.IsMobile()) window.rwdChanges();
      };
      document.querySelector('.registerCheckout input').addEventListener('change', checkVisibility);

      // Use PJ global functions to resize desktop containers to correct heights
      if (!window.IsMobile()) {
        window.rwdChanges();
      }
    };

    run();

    /*
     * Form rebuilds on submit so add a .NET pageLoaded event to perform input validation
     * when it rebuilds. The type of validation depends on the event.
     */
    prm.add_pageLoaded(() => {
      try {
        if ((isDesktopCheckout || (isMobileCheckout && isOnGuestFormPage())) && !document.querySelector('.PJ024-pwdContainer')) {
          run(); // Re-run experiment
        }
      } catch (e) {
        console.log(`UC PJ024 Error: ${e}`);
      }
    });
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
     * @desc Shows/Hides Password
     */
    showPassword: function showPassword(inputContainer) {
      if (inputContainer.querySelector('input').type === 'password') {
        inputContainer.querySelector('input').type = 'text'; // eslint-disable-line no-param-reassign
        inputContainer.querySelector('span.PJ024-showPwd').classList.add('clicked');
      } else {
        inputContainer.querySelector('input').type = 'password'; // eslint-disable-line no-param-reassign
        inputContainer.querySelector('span.PJ024-showPwd').classList.remove('clicked');
      }
    },
  },

  components: {},
};

export default Experiment;
