import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
import newUserHomepage from './markup/newUser';
import modalMarkup from './markup/accountModal';

/**
 * {{TP102}} - {{Homepage Migration Desktop}}
 */
const Run = () => {
  let slideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP102',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const contentWrap = bodyVar.querySelector('#content');

      return {
        bodyVar,
        contentWrap,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      hideFlicker: () => {
        const hide = document.getElementById('GDXXX_flickerPrevention');
        hide.parentElement.removeChild(hide);
      },
      /*
        events.send(`${Exp.settings.ID} -
        ${Exp.settings.VARIATION}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder: () => {
        Exp.cache.contentWrap.insertAdjacentHTML('afterbegin', newUserHomepage);
        Exp.cache.bodyVar.insertAdjacentHTML('beforeend', modalMarkup);
        Exp.services.hideFlicker();
        Exp.clickBindings.poll();
      },
    },
    clickBindings: {
      poll: () => {
        poller([
          () => {
            let trigger = false;
            if (window.jQuery) {
              trigger = true;
            }
            return trigger;
          },
        ], Exp.clickBindings.bind);
      },
      bind: () => {
        const modal = $('.TP102_pop-up_modal');
        const modalBG = modal.find('.TP102_body_click');
        const regBtn = Exp.cache.bodyVar.querySelector('.TP102_acc-num');
        const regPostcodeInput = Exp.cache.bodyVar.querySelector('.TP102_postcode-enter');
        const proceedToRegister = Exp.cache.bodyVar.querySelector('.TP102_modal-btn.TP102_register');

        $('.TP102_no-num').on('click', () => {
          const regPostcode = regPostcodeInput.value;
          if (regPostcode) {
            $('.TP102_register').attr('href', `https://www.travisperkins.co.uk/register?postCode=${regPostcode}`);
          }
          events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'I Dont Know My Account Number Click', 'User clicked on the button called "I Dont Know My Account Number', { sendOnce: true });
        });

        $('.TP102_no-num,.TP102_pop-up_modal .TP102_close_btn, .TP102_pop-up_modal .TP102_close-modal').on('click', (e) => {
          if (slideQ === false) {
            slideQ = true;
            e.preventDefault();

            if (modal.hasClass('TP102_active')) {
              modal.fadeOut('slow', () => {
                modal.removeClass('TP102_active');
                slideQ = false;
              });
            } else {
              modal.fadeIn('slow', () => {
                modal.addClass('TP102_active');
                slideQ = false;
              });
            }
          }
        });

        modalBG.on('click', () => {
          if (modal.hasClass('TP102_active')) {
            modal.fadeOut('slow', () => {
              modal.removeClass('TP102_active');
              slideQ = false;
            });
          }
        });

        

        regBtn.addEventListener('click', (e) => {
          e.preventDefault();
          events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'I know my account number Click', 'User clicked on the button called "I Know My Account Number', { sendOnce: true });
          const regPostcode = regPostcodeInput.value;
          window.location = `https://www.travisperkins.co.uk/register?postCode=${regPostcode}`;
        });

        regPostcodeInput.addEventListener('focus', () => {
          events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'Postcode Input', 'User focused on the postcode input', { sendOnce: true });
        });

        proceedToRegister.addEventListener('click', () => {
          events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'Proceed to Registration', 'User clicked on the button call "Proceed to Registration"', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

const signUp = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP102',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const postCode = bodyVar.querySelector('#postCode');

      return {
        bodyVar,
        postCode,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION} Sign Up`);
      },
      hideFlicker: () => {
        const hide = document.getElementById('GDXXX_flickerPrevention');
        hide.parentElement.removeChild(hide);
      },
      /*
        events.send(`${Exp.settings.ID} -
        ${Exp.settings.VARIATION}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder: () => {
        Exp.cache.postCode.value = decodeURIComponent(window.location.search.replace('?postCode=', ''));
        Exp.services.hideFlicker();
      },
    },
  };

  Exp.init();
};

export { Run, signUp };
