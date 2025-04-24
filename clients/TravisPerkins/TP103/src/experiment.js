import { fullStory, events } from '../../../../lib/utils';
import { poller, pollerLite } from '../../../../lib/uc-lib';
import newUserHomepage from './markup/newUser';
import modalMarkup from './markup/accountModal';

/**
 * {{TP103}} - {{Homepage Migration Desktop}}
 */
const Run = () => {
  let slideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP103',
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
    validation: {
      checkPostcode: (str) => {
        // eslint-disable-next-line
        const re = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;
        return re.test(str);
      },
    },
    components: {
      contentBuilder: () => {
        Exp.cache.contentWrap.insertAdjacentHTML('beforebegin', newUserHomepage);
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
        const modal = $('.TP103_pop-up_modal');
        const modalBG = modal.find('.TP103_body_click');
        const regBtn = Exp.cache.bodyVar.querySelector('.TP103_acc-num');
        const regPostcodeInput = Exp.cache.bodyVar.querySelector('.TP103_postcode-enter');
        const proceedToRegister = Exp.cache.bodyVar.querySelector('.TP103_modal-btn.TP103_register');
        const errorMsg = Exp.cache.bodyVar.querySelector('.TP103_error-msg');

        modal.find('.TP103_reveal-btn').on('click', () => {
          if (slideQ === false) {
            slideQ = true;
            modal.find('.TP103_reveal-btn').toggleClass('TP103_active');
            modal.find('.TP103_find-number img').slideToggle(() => {
              slideQ = false;
            });
          }
        });

        $('.TP103_no-num').on('click', () => {
          const regPostcode = regPostcodeInput.value;
          if (regPostcode) {
            $('.TP103_register').attr('href', `https://www.travisperkins.co.uk/login#register?postCode=${regPostcode}`);
          }
          events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'I Dont Know My Account Number Click', 'User clicked on the button called "I Dont Know My Account Number', { sendOnce: true });
        });

        $('.TP103_no-num,.TP103_pop-up_modal .TP103_close_btn, .TP103_pop-up_modal .TP103_close-modal').on('click', (e) => {
          if (slideQ === false) {
            if ($(this).hasClass('TP103_no-num')) {
              events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'I Dont Know My Account Number Click', 'User clicked on the button called "I Dont Know My Account Number', { sendOnce: true });
            }
            slideQ = true;
            e.preventDefault();

            if (modal.hasClass('TP103_active')) {
              modal.fadeOut('slow', () => {
                modal.removeClass('TP103_active');
                slideQ = false;
              });
            } else {
              modal.fadeIn('slow', () => {
                modal.addClass('TP103_active');
                slideQ = false;
              });
            }
          }
        });

        modalBG.on('click', () => {
          if (modal.hasClass('TP103_active')) {
            modal.fadeOut('slow', () => {
              modal.removeClass('TP103_active');
              slideQ = false;
            });
          }
        });

        regBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const regPostcode = regPostcodeInput.value;
          console.log('reg postcode, ', regPostcode);
          if (regPostcode && Exp.validation.checkPostcode(regPostcode) === true) {
            events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'I know my account number Click', 'User clicked on the button called "I Know My Account Number', { sendOnce: true });
            window.location = `https://www.travisperkins.co.uk/login#register?postCode=${regPostcode}`;
          } else if (regPostcode && Exp.validation.checkPostcode(regPostcode) === false) {
            regPostcodeInput.classList.add('TP103_error');
            errorMsg.innerText = 'Your postcode doesn\'t match a UK postcode. Please try again.';
            errorMsg.classList.add('TP103_error');
          } else {
            regPostcodeInput.classList.add('TP103_error');
            errorMsg.innerText = 'Please enter a postcode.';
            errorMsg.classList.add('TP103_error');
          }
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
      ID: 'TP103',
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
        // let $ = null;
        Exp.cache.postCode.value = decodeURIComponent(window.location.hash.replace('#register?postCode=', ''));
        Exp.services.hideFlicker();
        document.querySelector('#loginSection .collapsibleElement .collapsibleLink').click();
        // poller([
        //   () => {
        //     let trigger = false;
        //     if (window.jQuery) {
        //       $ = window.jQuery;
        //       trigger = true;
        //     }
        //     return trigger;
        //   },
        // ], () => {
        //   $('html, body').animate({
        //     scrollTop: $('#registerSection').offset().top,
        //   }, 800);
        // });
      },
    },
  };

  Exp.init();
};

export { Run, signUp };
