import { fullStory, events, getCookie, setCookie } from '../../../../lib/utils';
import loginHTML from './lib/loginMarkup';

/**
 * {{PD026}} - {{Test Description}}
 */
export const Run = () => {
  const $ = window.jQuery;
  const doc = document;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'PD026',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const returningCustEmailInput = doc.getElementById('j_username');
      const returningCustPasswordInput = doc.getElementById('j_password');
      const newCustEmailInput = doc.getElementById('register.email');
      const URL = window.location.pathname;

      /* eslint-disable */
      let formWrap;
			let	loginWrap;
			let	emailWrap;
			let	registerWrap;
			let emailError;
			let	submitError;
      /* eslint-enable */

      return {
        bodyVar,
        returningCustEmailInput,
        returningCustPasswordInput,
        newCustEmailInput,
        URL,
        formWrap,
        loginWrap,
        emailWrap,
        registerWrap,
        emailError,
        submitError,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID, 'PD009');
      services.tracking();

      components.hideOriginalElements();
      components.reOrder();

      components.login.contentBuilder();
      components.login.emailBlur();
      components.login.passwordBlur();

      components.form.toggleBinding();
      components.form.rememberMe();
      components.form.submitClick();
      components.form.pageCheck();
      components.form.enterSubmit();
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
      formValidation: {
        checkEmail: (str) => {
          /* eslint-disable */
          const re = /((([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|("(([\x01-\x08\x0B\x0C\x0E-\x1F\x7F]|[\x21\x23-\x5B\x5D-\x7E])|(\\[\x01-\x09\x0B\x0C\x0E-\x7F]))*"))@(([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(\[(([\x01-\x08\x0B\x0C\x0E-\x1F\x7F]|[\x21-\x5A\x5E-\x7E])|(\\[\x01-\x09\x0B\x0C\x0E-\x7F]))*\])))/;
          /* eslint-enable */
          return re.test(str);
        },
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      hideOriginalElements: () => {
        const nav = doc.getElementById('nav_secondary');
        const clearanceBanner = doc.getElementsByClassName('pd5-clearancewrapper');
        const breadcrumb = doc.getElementById('breadcrumb');
        const pdpContact = doc.querySelectorAll('.pd5-uspwrapper .pd5-usp:nth-child(3n)');
        const industInput = doc.querySelector('#registerForm .row1.column1 dd:last-child');

        industInput.previousElementSibling.style.display = 'none';
        industInput.style.display = 'none';

        // Check if the clearance banner exists, remove if so
        if (clearanceBanner.length > 0) {
          clearanceBanner[0].parentNode.removeChild(clearanceBanner[0]);
        }

        // Check for contact PDP
        if (pdpContact.length > 0) {
          pdpContact[0].parentNode.removeChild(pdpContact[0]);
        }

        // Remove cached elements
        nav.parentNode.removeChild(nav);
        breadcrumb.parentNode.removeChild(breadcrumb);

        // Hide weird '______' below footer and broken image
        const bodyErr = $('body > img:last');
        if (bodyErr[0].nextSibling.textContent.match(/_{5,}/)) {
          bodyErr[0].nextSibling.remove();
          bodyErr.remove();
        }
      },
      reOrder: () => {
        const pdpOrder = doc.querySelectorAll('.pd5-uspwrapper .pd5-usp:first-child')[0];
        const pdpDelivery = doc.querySelectorAll('.pd5-uspwrapper .pd5-usp:first-child + .pd5-usp')[0];
        const pdpCountdown = pdpOrder.querySelector('#pd5-countdown');

        pdpCountdown.firstChild.nodeValue = 'Order in the next ';
        pdpCountdown.insertAdjacentHTML('afterend', '<span> for next day delivery</span>');

        pdpDelivery.querySelector('.pd5-usptext p').textContent = 'FREE Next day delivery over £25';
      },
      login: {
        contentBuilder: () => {
          doc.getElementById('content').insertAdjacentHTML('afterend', loginHTML);
          Exp.cache.formWrap = doc.querySelector('.PD009_login-wrap');

          Exp.cache.formWrap.querySelector('.PD009_register').appendChild(doc.getElementById('registerForm'));
          Exp.cache.formWrap.querySelector('.PD009_register').insertAdjacentHTML('beforeend', '<a class="PD026_submit">Continue</a>');

          const chkLength = doc.querySelectorAll('#registerForm .protec_checkbox dd');

          [].forEach.call(chkLength, (item) => {
            item.nextElementSibling.appendChild(item);
          });

          Exp.cache.loginWrap = $('.PD009_log-in');
          Exp.cache.emailWrap = $('.PD009_login-input');
          Exp.cache.registerWrap = $('.PD009_register');
          Exp.cache.emailError = $('.PD009_signin-error');
          Exp.cache.submitError = $('.PD009_submit-error');

          const cookieCheck = getCookie('EmailAutocomplete');

          if (cookieCheck !== undefined) {
            Exp.cache.returningCustEmailInput.value = cookieCheck;
            Exp.cache.newCustEmailInput.value = cookieCheck;
            doc.querySelector('.PD009_login-input input').value = cookieCheck;
          }

          // Change header text based on page type
          if (window.location.search.indexOf('error=true') > -1) {
            doc.querySelector('.PD026_title').innerText = 'In order to checkout, please Login or register';
          } else if (Exp.cache.URL.indexOf('/login/checkout') > -1) {
            doc.querySelector('.PD026_title').innerText = 'Before you checkout, please Login or register';
            doc.querySelector('.PD026_login').innerText = 'Login and Checkout';
            doc.querySelector('.PD026_register').innerText = 'Register and Checkout';
          } else {
            doc.querySelector('.PD026_title').innerText = 'Login or Register';
          }

          // If user recovered password show message
          const recoverMsg = doc.querySelector('.information_message.positive p');

          if (recoverMsg && recoverMsg.innerText.indexOf('link to change your password') > -1) {
            Exp.cache.bodyVar.classList.add('PD026_password-recover');
          }
        },
        emailBlur: () => {
          const loginInput = doc.querySelector('.PD009_login-input input');

          loginInput.addEventListener('blur', () => {
            const thisVal = loginInput.value;
            // Take the value of this input and change the 2 on the page to match

            Exp.cache.returningCustEmailInput.value = thisVal;
            Exp.cache.newCustEmailInput.value = thisVal;

            setCookie('EmailAutocomplete', thisVal, 200000000);

            if (Exp.services.formValidation.checkEmail(thisVal) === false) {
              Exp.cache.emailWrap.addClass('PD009-error');
              Exp.cache.emailError.html('Your email is incorrect,<br/> please try again').slideDown();
            } else {
              Exp.cache.emailWrap.removeClass('PD009-error');
              Exp.cache.emailError.slideUp();
            }

            Exp.cache.bodyVar.classList.remove('PD009_login-error');
          });
        },
        passwordBlur: () => {
          const passwordInput = doc.querySelector('.PD009_log-in input');

          passwordInput.addEventListener('blur', () => {
            const thisVal = passwordInput.value;

            // Take the value of this input and change the password field for the login
            Exp.cache.returningCustPasswordInput.value = thisVal;

            if (thisVal.length > 5) {
              Exp.cache.loginWrap.removeClass('PD009-error');
              Exp.cache.emailError.slideUp();
            } else {
              Exp.cache.loginWrap.addClass('PD009-error');
              Exp.cache.emailError.html('Please enter a password with<br /> 6 or more characters').slideDown();
            }
            Exp.cache.bodyVar.classList.remove('PD009_login-error');
          });
        },
      },
      form: {
        toggleBinding: () => {
          const registerBtn = doc.querySelector('.PD026_register');

          registerBtn.addEventListener('click', () => {
            events.send(`${Exp.settings.ID}`, 'Clicked', 'Register button clicked', { sendOnce: true });
            if (Exp.cache.registerWrap.is(':visible')) {
              Exp.cache.registerWrap.slideUp(() => {
                Exp.cache.registerWrap.addClass('PD_active');
              });
            } else {
              Exp.cache.registerWrap.slideDown(() => {
                Exp.cache.registerWrap.addClass('PD_active');
              });
            }

            Exp.cache.submitError.slideUp();
            if (Exp.cache.emailError.is(':visible')) {
              Exp.cache.emailError.slideUp();
            }
          });
        },
        submitClick: () => {
          const loginSubmit = doc.querySelector('.PD026_login');
          const registerSubmit = doc.querySelector('.PD026_submit');

          registerSubmit.addEventListener('click', () => {
            events.send(`${Exp.settings.ID}`, 'Click', 'Register Continue button clicked', { sendOnce: true });
            $('#registerBtn').click();
          });

          loginSubmit.addEventListener('click', () => {
            events.send(`${Exp.settings.ID}`, 'Clicked', 'Login button clicked', { sendOnce: true });
            if ((!$('.PD009_log-in').hasClass('PD009-error') || !$('.PD009_login-input').hasClass('PD009-error')) &&
              ($('.PD009_log-in input').val() && $('.PD009_login-input input').val())) {
              $('#loginForm button').click();
            }
            if (!$('.PD009_login-input input').val() && !$('.PD009_log-in input').val()) {
              $('.PD009_log-in').addClass('PD009-error');
              $('.PD009_login-input').addClass('PD009-error');
              Exp.cache.emailError.html('Please enter a password and<br /> email address').slideDown();
            } else if (!$('.PD009_log-in input').val()) {
              $('.PD009_log-in').addClass('PD009-error');
              Exp.cache.emailError.html('Please enter a password with<br /> 6 or more characters').slideDown();
            } else if (!$('.PD009_login-input input').val()) {
              $('.PD009_login-input').addClass('PD009-error');
              Exp.cache.emailError.html('Please enter a <br /> email address').slideDown();
            }
          });

          $('.PD026_forgot-password').on('click', () => {
            events.send(`${Exp.settings.ID}`, 'Clicked', 'Forgotten password button clicked', { sendOnce: true });
          });
        },
        pageCheck: () => {
          if (Exp.cache.URL.indexOf('/register') > -1) {
            Exp.cache.registerWrap.css('display', 'block');
            Exp.cache.registerWrap.addClass('PD_active');
            $('html, body').animate({
              scrollTop: $('.PD026_tagline').offset().top,
            }, 600);
          } else if (window.location.search.indexOf('error=true') > -1) {
            Exp.cache.loginWrap.addClass('PD009-error');
            Exp.cache.emailWrap.addClass('PD009-error');
            Exp.cache.bodyVar.classList.add('PD009_login-error');
          }

          if (doc.querySelector('#registerForm .form_field_error')) {
            Exp.cache.registerWrap.css('display', 'block');
            Exp.cache.registerWrap.addClass('PD_active');
            $('html, body').animate({
              scrollTop: $('.PD026_tagline').offset().top,
            }, 600);
          }

          if (doc.getElementById('register.wantToBeContacted')) {
            doc.getElementById('register.wantToBeContacted').checked = false;
          }
        },
        rememberMe: () => {
          const rememberMe = doc.querySelector('.PD026_remember');
          rememberMe.addEventListener('click', () => {
            rememberMe.classList.toggle('PD026_active');
            $('label.remember-me').click();
          });
        },
        enterSubmit: () => {
          Exp.cache.loginWrap.on('keydown', (e) => {
            if (e.keyCode === 13) {
              Exp.cache.returningCustPasswordInput.value = Exp.cache.loginWrap.find('input').val();

              if ($('.PD009_login-input').hasClass('PD009-error') || $('.PD009_log-in').hasClass('PD009-error')) {
                Exp.cache.emailError.slideDown();
              } else if (Exp.cache.returningCustPasswordInput.value) {
                if (Exp.cache.returningCustPasswordInput.value.length > 5) {
                  Exp.cache.loginWrap.addClass('PD009-error');
                  Exp.cache.emailError.html('Please enter a password with<br /> 6 or more characters').slideDown();
                } else {
                  $('#loginForm button').click();
                }
              } else {
                Exp.cache.loginWrap.addClass('PD009-error');
                Exp.cache.emailError.html('Please enter a password with<br /> 6 or more characters').slideDown();
              }
            }
          });
        },
      },
    },
  };

  Exp.init();
};

export const AutoFill = () => {
  const loginEmail = getCookie('EmailAutocomplete');

  if (loginEmail) {
    document.querySelector('#forgottenPwdForm input').value = loginEmail;
  }
};
