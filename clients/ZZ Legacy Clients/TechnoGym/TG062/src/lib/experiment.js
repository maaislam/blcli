import { getUrlParameter, pollerLite, events } from '../../../../../lib/utils';
import { messageFieldMarkup, contactUsMarkup } from './markup';
import { translate } from './services';

/**
 * {{TG062}} - {{Test Description}}
 */
const Run = (cache) => {
  const doc = document;
  const bodyVar = doc.body;
  const queryStr = window.location.search;
  let slideQ = false;
  let $ = null;

  const firstName = doc.getElementById('name');
  const lastName = doc.getElementById('last-name');
  const email = doc.getElementById('email');
  const phone = doc.getElementById('telephone');
  const msg = doc.getElementById('comment');
  const check = bodyVar.querySelector('.input-box.terms-privacy input');

  let sentContact = false;

  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TG062',
      VARIATION: '1',
    },
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      bodyVar.classList.add(settings.ID);

      if (queryStr.indexOf('reason=quote') > -1) {
        bodyVar.classList.add('TG062_quote');
        document.querySelector('.post-title h1').textContent = translate('Request A Quote');
      }
      if (queryStr.indexOf('reason=catalogue') > -1) {
        bodyVar.classList.add('TG062_catalogue');
        document.querySelector('.post-title h1').textContent = translate('Request A Technogym Catalogue');
      }
      if (queryStr.indexOf('reason=call') > -1) {
        bodyVar.classList.add('TG062_call');
        document.querySelector('.post-title h1').textContent = translate('Request A Call');
      }

      components.render();
      components.dropdownBinding();

      pollerLite([() => !!window.jQuery], () => {
        $ = window.jQuery;
        components.submitBind();
        components.inputBlur();
        // components.modalBind();
        components.submitEmail();
      });

      services.tracking();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      checkEmail(str) {
        var re = /((([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|("(([\x01-\x08\x0B\x0C\x0E-\x1F\x7F]|[\x21\x23-\x5B\x5D-\x7E])|(\\[\x01-\x09\x0B\x0C\x0E-\x7F]))*"))@(([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(\[(([\x01-\x08\x0B\x0C\x0E-\x1F\x7F]|[\x21-\x5A\x5E-\x7E])|(\\[\x01-\x09\x0B\x0C\x0E-\x7F]))*\])))/;
        return re.test(str);
      },
      checkNumber(str) {
        var re = /^(\D)*(\d)(\D)*(\d)(\D)*(\d)(\D)*(\d)(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*$/;
        return re.test(str);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      render() {
        const number = cache.get('callUs').querySelector('.contact-details .call-us .phone').textContent;
        const policyLink = bodyVar.querySelector('.input-box.terms-privacy a:first-child').href;
        const termsLink = bodyVar.querySelector('.input-box.terms-privacy a + a').href;
        const termsEl = bodyVar.querySelector('.input-box.terms-privacy > div p + p');

        termsEl.childNodes[1].textContent = '';
        termsEl.insertAdjacentHTML('beforeend', `
        <span>
          ${translate('Having read and understood the <a href="{{POLICY LINK}}">Privacy Policy</a> and having accepted the <a href="{{TERMS LINK}}">Technogym Terms and Conditions</a>', {
            '{{POLICY LINK}}': policyLink,
            '{{TERMS LINK}}': termsLink,
          })}
        </span>
        <span class="TG072-consent">${translate('I consent to the use of personal data for marketing and publicity purposes.')}</span>
        `);

        cache.get('messageField').insertAdjacentHTML('afterend', messageFieldMarkup);
        cache.get('formContainer').insertAdjacentHTML('afterend', contactUsMarkup(number));
        cache.get('submitBtn').insertAdjacentHTML('beforebegin', `<a id="TG062_submit">${translate('Submit')}</a>`);

        doc.getElementById('name').insertAdjacentHTML('afterend', `<span class="TG062_error-msg">${translate('Error: A {{FORM FIELD}} Must Be Entered', { '{{FORM FIELD}}': translate('First Name') })}</span>`);
        doc.getElementById('last-name').insertAdjacentHTML('afterend', `<span class="TG062_error-msg">${translate('Error: A {{FORM FIELD}} Must Be Entered', { '{{FORM FIELD}}': translate('Last Name') })}</span>`);
        doc.getElementById('email').insertAdjacentHTML('afterend', `<span class="TG062_error-msg">${translate('Error: A {{FORM FIELD}} Must Be Entered', { '{{FORM FIELD}}': translate('Email') })}</span>`);
        doc.getElementById('telephone').insertAdjacentHTML('afterend', `<span class="TG062_error-msg">${translate('Error: A {{FORM FIELD}} Must Be Entered', { '{{FORM FIELD}}': translate('Phone Number') })}</span>`);
        doc.getElementById('comment').insertAdjacentHTML('afterend', `<span class="TG062_error-msg">${translate('Error: A {{FORM FIELD}} Must Be Entered', { '{{FORM FIELD}}': translate('Message') })}</span>`);
        bodyVar.querySelector('.input-box.terms-privacy .TG072-consent').insertAdjacentHTML('afterend', `<span class="TG062_error-msg">${translate('To continue please accept the terms and conditions')}</span>`);

        bodyVar.querySelector('#contactForm').insertAdjacentHTML('beforebegin', `<span class="TG062_require">${translate('* Required Field')}</span>`);

        bodyVar.querySelector('.input-box.terms-privacy .TG072-consent').insertAdjacentElement('beforebegin', document.querySelector('.input-box.terms-privacy input'));
        // Change required fields
        pollerLite([
          '.field.telephone > label',
          '.wide.comment > label',
          '.field.email > label',
        ], (els) => {
          const telephoneLabel = document.querySelector('.field.telephone > label');
          telephoneLabel.classList.add('required');
          telephoneLabel.insertAdjacentHTML('beforeend', '<em>*</em>');

          // Sometimes the fields will refresh after page load which resets the
          // required status. Watch for if the required field is removed then re-add it
          pollerLite([() => !telephoneLabel.classList.contains('required')], () => {
            telephoneLabel.classList.add('required');
            telephoneLabel.insertAdjacentHTML('beforeend', '<em>*</em>');
          }, { timeout: 20000 });

          const msgLabel = document.querySelector('.wide.comment > label');
          msgLabel.classList.add('required');
          msgLabel.insertAdjacentHTML('beforeend', '<em>*</em>');

          pollerLite([() => !msgLabel.classList.contains('required')], () => {
            msgLabel.classList.add('required');
            msgLabel.insertAdjacentHTML('beforeend', '<em>*</em>');
          }, { timeout: 20000 });

          if (!bodyVar.classList.contains('TG062_quote')) {
            const emailLabel = document.querySelector('.field.email > label');
            emailLabel.classList.add('required');
            emailLabel.insertAdjacentHTML('beforeend', '<em>*</em>');

            pollerLite([() => !emailLabel.classList.contains('required')], () => {
              emailLabel.classList.add('required');
              emailLabel.insertAdjacentHTML('beforeend', '<em>*</em>');
            }, { timeout: 20000 });
          }
        });

        // Don't miss out section
        bodyVar.querySelector('.wrapper').insertAdjacentHTML('beforeend', `
          <div class="TG062_form-section">
            <div class="TG062_form-inner">
              <h2>${translate('Don\'t Miss Out')}</h3>
              <p>${translate('Join our newsletter for Innovative training programmes, news about products, exclusive<br /> special offers and top tips on developing a wellness lifestyle.')}</p>
              <div class="TG062_email-reg clearfix">
                <input placeholder="${translate('Email Address')}" type="text" />
                <a class="TG062_submit-email btn btn-default">${translate('Submit')}</a>
                <p class="TG062_email-error">${translate('Please enter a valid email address')}</p>
              </div>
            </div>
          </div>
        `);
      },
      dropdownBinding() {
        const selectBoxes = document.querySelectorAll('.TG062_select');

        for (let i = 0; i < selectBoxes.length; i += 1) {
          const current = selectBoxes[i];
          const span = current.querySelector('span');
          const select = current.querySelector('select');
          span.innerText = select.options[select.selectedIndex].text;

          select.addEventListener('change', () => {
            span.innerText = select.options[select.selectedIndex].text;
          });
        }
      },
      submitBind() {
        doc.getElementById('TG062_submit').addEventListener('click', () => {
          Exp.components.validation(false);
        });
      },
      inputBlur() {
        // const profile = doc.getElementById('TG062_user');

        firstName.addEventListener('blur', () => {
          const firstNameVal = firstName.value.trim();

          if (!firstNameVal || firstNameVal === '') {
            firstName.classList.add('TG062_error');
          } else {
            firstName.classList.remove('TG062_error');
          }
        });

        lastName.addEventListener('blur', () => {
          const lastNameVal = lastName.value.trim();

          if (!lastNameVal || lastNameVal === '') {
            lastName.classList.add('TG062_error');
          } else {
            lastName.classList.remove('TG062_error');
          }
        });

        if (queryStr.indexOf('reason=catalogue') > -1) {
          email.addEventListener('blur', () => {
            const emailVal = email.value.trim();

            if (!emailVal || emailVal === '' || Exp.services.checkEmail(emailVal) === false) {
              email.classList.add('TG062_error');
            } else {
              email.classList.remove('TG062_error');
            }
          });
        }

        if (queryStr.indexOf('reason=quote') > -1 || queryStr.indexOf('reason=call') > -1) {
          phone.addEventListener('blur', () => {
            const phoneVal = phone.value.trim();

            if (!phoneVal || phoneVal === '' || Exp.services.checkNumber(phoneVal) === false) {
              phone.classList.add('TG062_error');
            } else {
              phone.classList.remove('TG062_error');
            }
          });
        }

        if (queryStr.indexOf('reason=quote') > -1) {
          msg.addEventListener('blur', () => {
            const msgVal = msg.value.trim();

            if (!msgVal || msgVal === '') {
              msg.classList.add('TG062_error');
            } else {
              msg.classList.remove('TG062_error');
            }
          });

          email.addEventListener('blur', () => {
            const emailVal = email.value.trim();

            if (emailVal && Exp.services.checkEmail(emailVal) === false) {
              email.classList.add('TG062_error');
            } else {
              email.classList.remove('TG062_error');
            }
          });
        }

        /*check.addEventListener('blur', () => {
          const checkVal = check.checked;

          if (checkVal === false) {
            check.classList.add('TG062_error');
          } else {
            check.classList.remove('TG062_error');
          }
        });*/
      },
      validation(blur) {
        // First Name Field
        const firstNameVal = firstName.value.trim();

        // Last Name Field
        const lastNameVal = lastName.value.trim();

        // Email Field
        let emailVal = '';
        if (email) {
          emailVal = email.value.trim();
        }

        // Phone Field
        let phoneVal = '';
        if (phone) {
          phoneVal = phone.value.trim();
        }

        // Message Field
        let msgVal = '';
        if (msg) {
          msgVal = msg.value.trim();
        }

        // Profile Field
        // const profile = doc.getElementById('TG062_user');
        const profileVal = doc.getElementById('TG062_user').value;

        // Privacy Checkbox
        const checkVal = check.checked;

        let passed = true;

        if (!firstNameVal || firstNameVal === '') {
          firstName.classList.add('TG062_error');
          passed = false;
        } else {
          firstName.classList.remove('TG062_error');
        }

        if (!lastNameVal || lastNameVal === '') {
          lastName.classList.add('TG062_error');
          passed = false;
        } else {
          lastName.classList.remove('TG062_error');
        }

        if (queryStr.indexOf('reason=catalogue') > -1) {
          if (!emailVal || emailVal === '' || Exp.services.checkEmail(emailVal) === false) {
            email.classList.add('TG062_error');
            passed = false;
          } else {
            email.classList.remove('TG062_error');
          }
        }

        if (queryStr.indexOf('reason=quote') > -1 || queryStr.indexOf('reason=call') > -1) {
          if (!phoneVal || phoneVal === '' || Exp.services.checkNumber(phoneVal) === false) {
            phone.classList.add('TG062_error');
            passed = false;
          } else {
            phone.classList.remove('TG062_error');
          }
        }

        if (queryStr.indexOf('reason=quote') > -1) {
          if (!msgVal || msgVal === '') {
            msg.classList.add('TG062_error');
            passed = false;
          } else {
            msg.classList.remove('TG062_error');
          }

          if (emailVal && Exp.services.checkEmail(emailVal) === false) {
            email.classList.add('TG062_error');
            passed = false;
          } else {
            email.classList.remove('TG062_error');
          }
        }

        /*if (checkVal === false) {
          passed = false;
          check.classList.add('TG062_error');
        } else {
          check.classList.remove('TG062_error');
        }*/

        if (blur === false && passed === true) {
          Exp.components.submitForm(firstNameVal, lastNameVal, emailVal, phoneVal, msgVal, profileVal);
        }
      },
      submitForm(firstNameVal, lastNameVal, emailVal, phoneVal, msgVal, profileVal) {
        // Form post data
        const formKey = bodyVar.querySelector('#contactForm > input').value || '';
        // Quote for test purposes
        const reason = getUrlParameter('reason') || 'quote';
        const product = doc.getElementById('product').value || '';
        const productName = doc.getElementById('product-name').value || '';
        const firstname = firstNameVal || '';
        const lastname = lastNameVal || '';
        const email = emailVal || '';
        const telephone = phoneVal || '';
        const msg = msgVal || '';
        const profile = profileVal || '';
        const catURL = document.querySelector('input[name="catalog-url"]').value || '';

        // let usertype = '';

        // if (window.TG.readCookie('userType')) {
        //   usertype = window.TG.readCookie('userType');
        // }

        let data = `form_key=${encodeURIComponent(formKey)}&reason=${encodeURIComponent(reason)}&product-name=${encodeURIComponent(productName)}&product=${encodeURIComponent(product)}&name=${encodeURIComponent(firstname)}&last-name=${encodeURIComponent(lastname)}&email=${encodeURIComponent(email)}&telephone=${encodeURIComponent(telephone)}&comment=${encodeURIComponent(msg)}&userType=${encodeURIComponent(profile)}&need-business=&need-freelance=&company=&secure_field_check=&catalog-url=${encodeURIComponent(catURL)}&campaign=1&need=&hideit=`;
        data = data.replace(/%20/g, '+');

        const submitBtn = document.querySelector('#TG062_submit');

        /**
         * Shows message for form submission
         * @param {string} type Type of message (success or error)
         * @param {string} message Content of the message
         */
        const showSubmissionMessage = (type, message) => {
          // Remove any existing message
          const remove = () => {
            const submitMsg = document.querySelector(`.${Exp.settings.ID}_submit-msg`);
            if (submitMsg) submitMsg.parentElement.removeChild(submitMsg);
          };
          remove();

          // Create new message
          const temp = document.createElement('div');
          temp.innerHTML = `
            <div class="${Exp.settings.ID}_submit-msg ns-box ns-bar ns-effect-slidetop ns-type-${type} ns-show">
              <div class="ns-box-inner">
                <span class="icon icon-success"></span>
                <p>${message}</p>
              </div>
              <span class="ns-close"></span>
            </div>
          `;

          temp.querySelector('.ns-close').addEventListener('click', remove);
          document.body.insertAdjacentElement('afterbegin', temp.children[0]);
        };

        const messages = {
          success: () => showSubmissionMessage('success', translate('Your enquiry was submitted and will be responded to as soon as possible. Thank you for contacting us.')),
          error: () => showSubmissionMessage('error', translate('Unable to submit your request. Please, try again later.')),
        };

        const submit = {
          enable: () => {
            submitBtn.classList.remove('TG062_disable');
          },
          disable: () => {
            submitBtn.classList.add('TG062_disable');
          },
        };

        if (sentContact === false) {
          const request = new XMLHttpRequest();
          const jModal = cache.get('jmodal');
          const modal = cache.get('modal');

          request.open('POST', doc.getElementById('contactForm').action, true);
          request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
          request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
              messages.success();
            } else {
              messages.error();
            }
            submit.enable();
          };
          request.onerror = () => {
            messages.error();
            submit.enable();
          };
          submit.disable();
          request.send(data);
          sentContact = true;

          if (emailVal !== '') {
            bodyVar.querySelector('.TG062_email-reg input').value = emailVal;
          }

          // jModal.fadeIn('slow', () => {
          //   modal.classList.add('active');
          //   slideQ = false;
          // });
        }
      },
      modalBind() {
        const modal = bodyVar.querySelector('.TG062_pop-up_modal');
        const openBtn = bodyVar.querySelector('.TG062_open_modal');
        const modalBG = modal.querySelector('.TG062_body_click');
        const $modal = $(modal);

        cache.set('modal', modal);
        cache.set('jmodal', $modal);

        modal.addEventListener('click', (e) => {
          if (slideQ === false && (e.target.classList.contains('TG062_close_btn') || e.target.classList.contains('TG062_body_click'))) {
            slideQ = true;

            $modal.fadeOut('slow', () => {
              modal.classList.remove('active');
              slideQ = false;
            });
          }
        });
      },
      submitEmail() {
        const emailBlock = bodyVar.querySelector('.TG062_email-reg');
        const emailBtn = emailBlock.querySelector('.TG062_submit-email');
        const emailInput = emailBlock.querySelector('.TG062_email-reg input');
        const webEmail = doc.getElementById('newsletter-email');
        const webFirst = doc.getElementById('firstname');
        const webLast = doc.getElementById('lastname');
        const webSubmit = bodyVar.querySelector('#newsletter-validate-detail');

        emailBtn.addEventListener('click', () => {
          const emailVal = emailInput.value;

          if (!emailVal || Exp.services.checkEmail(emailVal) === false) {
            emailInput.classList.add('TG062_error');
          } else {
            emailInput.classList.remove('TG062_error');
            webEmail.value = emailVal;
            webFirst.value = firstName.value;
            webLast.value = lastName.value;

            bodyVar.classList.add('TG062_loading-anim');
            webSubmit.submit();
          }
        });

        emailInput.addEventListener('blur', () => {
          const emailVal = emailInput.value;

          if (!emailVal || Exp.services.checkEmail(emailVal) === false) {
            emailBlock.classList.add('TG062_error');
          } else {
            emailBlock.classList.remove('TG062_error');
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
