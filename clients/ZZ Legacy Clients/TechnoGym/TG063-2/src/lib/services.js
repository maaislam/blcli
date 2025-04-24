import { fullStory } from '../../../../../lib/utils';
import settings from './settings';
import translations from '../data/translations';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function changeHeader(lang) {
  //Change the header text
  const isEN = lang === 'EN';
  const text = {
    mailHeader: isEN ? 'CONTACT TECHNOGYM HQ' : 'CONTATTA IL NOSTRO HQ',
    quoteHeader: isEN ? 'GET A QUOTE' : 'RICHIEDI UN PREVENTIVO',
    callHeader: isEN ? 'WE\'LL CALL YOU BACK' : 'TI CHIAMIAMO NOI',
  };
  let referTo;
  let headerText;
  if (VARIATION === '1') {
    referTo = document.querySelectorAll(`.${ID}_tab-form__headerItem`);
    headerText = document.querySelector(`.${ID}_headerBlock__title`);
  } else if (VARIATION === '2') {
    referTo = document.querySelectorAll(`.${ID}_wizardForm__choice`);
    headerText = document.querySelector(`.${ID}_headerBlock__title`);
  }

  Array.from(referTo).forEach(referrer => referrer.addEventListener('click', () => {
    const referrerAttr = referrer.getAttribute('for');
    switch (referrerAttr) {
      case 'mail':
        headerText.innerHTML = text.mailHeader;
        break;
      case 'quote':
        headerText.innerHTML = text.quoteHeader;
        break;
      case 'call':
        headerText.innerHTML = text.callHeader;
        break;
      default:
        break;
    }
  }));
}

function submitForm(variation, id) {
  const formKey = document.querySelector('input[name="form_key"]').value;
  const lang = document.querySelector('body').classList.contains(`${ID}_italian`);
  const successBlock = `
    <div class="ns-box-inner">
      <span class="fa fa-check"></span>
      <p>Your enquiry was submitted and will be responded to as soon as possible. Thank you for contacting us.</p>
    </div>
    <span class="ns-close"></span>
  `;
  const errorBlock = `
    <div class="ns-box-inner">
      <span class="fa fa-times"></span>
      <p>Unable to submit your request. Please, try again later.</p>
    </div>
    <span class="ns-close"></span>
  `;
  const successBlockIT = `
    <div class="ns-box-inner">
      <span class="fa fa-check"></span>
      <p>La tua richiesta è stata inoltrata, riceverai risposta nel più breve tempo possibile. Grazie per averci contattato.</p>
    </div>
    <span class="ns-close"></span>
  `;
  const errorBlockIT = `
    <div class="ns-box-inner">
      <span class="fa fa-times"></span>
      <p>Impossibile inviare la tua richiesta. Riprova più tardi.</p>
    </div>
    <span class="ns-close"></span>
  `;
  switch (id) {
    case 'mail':
      if (variation === '1') {
        const firstname = document.querySelector(`#contactForm--${id} #name--${id}`).value || '';
        const lastname = document.querySelector(`#contactForm--${id} #surname--${id}`).value || '';
        const email = document.querySelector(`#contactForm--${id} #email--${id}`).value || '';
        const msg = document.querySelector(`#contactForm--${id} #content--${id}`).value || '';
        const use = document.querySelector(`#contactForm--${id} .use--${id}`).value || '';
        const businessName = lang ? document.querySelector('.companyName').value : '';
        const business = lang ? document.querySelector('.business').value : '';
        const freelance = lang ? document.querySelector('.freelance').value : '';
        let data = `form_key=${encodeURIComponent(formKey)}&reason=${encodeURIComponent(use)}&name=${encodeURIComponent(firstname)}&last-name=${encodeURIComponent(lastname)}&email=${encodeURIComponent(email)}&comment=${encodeURIComponent(msg)}&company=${encodeURIComponent(businessName)}&need-business=${encodeURIComponent(business)}&need-freelance=${encodeURIComponent(freelance)}`;
        data = data.replace(/%20/g, '+');
        data = data.replace(/%40/g, '@');
        const request = new XMLHttpRequest();

        request.open('POST', document.querySelector(`#contactForm--${id}`).action, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const el = document.createElement('div');
            el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-success', 'ns-show');
            el.innerHTML = lang ? successBlockIT : successBlock;
            document.querySelector('body').insertAdjacentElement('afterbegin', el);
            const closeButton = el.querySelector('.ns-close');
            closeButton.addEventListener('click', () => {
              el.remove();
            });
            const trigger = document.getElementById('triggerModal');
            trigger.click();
          } else {
            const el = document.createElement('div');
            el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
            el.innerHTML = lang ? errorBlockIT : errorBlock;
            document.querySelector('body').insertAdjacentElement('afterbegin', el);
            const closeButton = el.querySelector('.ns-close');
            closeButton.addEventListener('click', () => {
              el.remove();
            });
          }
        };
        request.onerror = () => {
          const el = document.createElement('div');
          el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
          el.innerHTML = lang ? errorBlockIT : errorBlock;
          document.querySelector('body').insertAdjacentElement('afterbegin', el);
          const closeButton = el.querySelector('.ns-close');
          closeButton.addEventListener('click', () => {
            el.remove();
          });
        };
        request.send(data);
      } else {
        const fullName = document.querySelector(`#${ID}-${id}-form #fullname--${id}`).value || '';
        const email = document.querySelector(`#${ID}-${id}-form #email--${id}`).value || '';
        const msg = document.querySelector(`#${ID}-${id}-form #message--${id}`).value || '';
        const use = document.querySelector(`#${ID}-${id}-form #enquire--${id}`).value || '';
        let data = `form_key=${encodeURIComponent(formKey)}&reason=${encodeURIComponent(use)}&name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&comment=${encodeURIComponent(msg)}`;
        data = data.replace(/%20/g, '+');
        data = data.replace(/%40/g, '@');
        const request = new XMLHttpRequest();

        request.open('POST', document.querySelector(`#${ID}-${id}-form`).action, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const el = document.createElement('div');
            el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-success', 'ns-show');
            el.innerHTML = lang ? successBlockIT : successBlock;
            document.querySelector('body').insertAdjacentElement('afterbegin', el);
            const closeButton = el.querySelector('.ns-close');
            closeButton.addEventListener('click', () => {
              el.remove();
            });
          } else {
            const el = document.createElement('div');
            el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
            el.innerHTML = lang ? errorBlockIT : errorBlock;
            document.querySelector('body').insertAdjacentElement('afterbegin', el);
            const closeButton = el.querySelector('.ns-close');
            closeButton.addEventListener('click', () => {
              el.remove();
            });
          }
        };
        request.onerror = () => {
          const el = document.createElement('div');
          el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
          el.innerHTML = lang ? errorBlockIT : errorBlock;
          document.querySelector('body').insertAdjacentElement('afterbegin', el);
          const closeButton = el.querySelector('.ns-close');
          closeButton.addEventListener('click', () => {
            el.remove();
          });
        };
        request.send(data);
      }
      break;
    case 'quote':
      if (variation === '1') {
        const firstname = document.querySelector(`#contactForm--${id} #name--${id}`).value || '';
        const lastname = document.querySelector(`#contactForm--${id} #surname--${id}`).value || '';
        const telephone = document.querySelector(`#contactForm--${id} #telephone--${id}`).value || '';
        const email = document.querySelector(`#contactForm--${id} #email--${id}`).value || '';
        const msg = document.querySelector(`#contactForm--${id} #content--${id}`).value || '';
        const use = document.querySelector(`#contactForm--${id} .use--${id}`).value || '';
        const businessName = lang ? document.querySelector('.companyName').value : '';
        const business = lang ? document.querySelector('.business').value : '';
        const freelance = lang ? document.querySelector('.freelance').value : '';
        let data = `form_key=${encodeURIComponent(formKey)}&reason=${encodeURIComponent(use)}&name=${encodeURIComponent(firstname)}&last-name=${encodeURIComponent(lastname)}&email=${encodeURIComponent(email)}&telephone=${encodeURIComponent(telephone)}&comment=${encodeURIComponent(msg)}&company=${encodeURIComponent(businessName)}&need-business=${encodeURIComponent(business)}&need-freelance=${encodeURIComponent(freelance)}`;
        data = data.replace(/%20/g, '+');
        data = data.replace(/%40/g, '@');
        const request = new XMLHttpRequest();

        request.open('POST', document.querySelector(`#contactForm--${id}`).action, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const el = document.createElement('div');
            el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-success', 'ns-show');
            el.innerHTML = lang ? successBlockIT : successBlock;
            document.querySelector('body').insertAdjacentElement('afterbegin', el);
            const closeButton = el.querySelector('.ns-close');
            closeButton.addEventListener('click', () => {
              el.remove();
            });
            const trigger = document.getElementById('triggerModal');
            trigger.click();
          } else {
            const el = document.createElement('div');
            el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
            el.innerHTML = lang ? errorBlockIT : errorBlock;
            document.querySelector('body').insertAdjacentElement('afterbegin', el);
            const closeButton = el.querySelector('.ns-close');
            closeButton.addEventListener('click', () => {
              el.remove();
            });
          }
        };
        request.onerror = () => {
          const el = document.createElement('div');
          el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
          el.innerHTML = lang ? errorBlockIT : errorBlock;
          document.querySelector('body').insertAdjacentElement('afterbegin', el);
          const closeButton = el.querySelector('.ns-close');
          closeButton.addEventListener('click', () => {
            el.remove();
          });
        };
        request.send(data);
      } else {
        const fullName = document.querySelector(`#${ID}-${id}-form #fullname--${id}`).value || '';
        const email = document.querySelector(`#${ID}-${id}-form #email--${id}`).value || '';
        const msg = document.querySelector(`#${ID}-${id}-form #message--${id}`).value || '';
        const use = document.querySelector(`#${ID}-${id}-form #enquire--${id}`).value || '';
        const telephone = document.querySelector(`#${ID}-${id}-form #phone--${id}`).value || '';
        let data = `form_key=${encodeURIComponent(formKey)}&reason=${encodeURIComponent(use)}&name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&telephone=${encodeURIComponent(telephone)}&comment=${encodeURIComponent(msg)}`;
        data = data.replace(/%20/g, '+');
        data = data.replace(/%40/g, '@');
        const request = new XMLHttpRequest();

        request.open('POST', document.querySelector(`#${ID}-${id}-form`).action, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const el = document.createElement('div');
            el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-success', 'ns-show');
            el.innerHTML = lang ? successBlockIT : successBlock;
            document.querySelector('body').insertAdjacentElement('afterbegin', el);
          } else {
            const el = document.createElement('div');
            el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
            el.innerHTML = lang ? errorBlockIT : errorBlock;
            document.querySelector('body').insertAdjacentElement('afterbegin', el);
          }
        };
        request.onerror = () => {
          const el = document.createElement('div');
          el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
          el.innerHTML = lang ? errorBlockIT : errorBlock;
          document.querySelector('body').insertAdjacentElement('afterbegin', el);
        };
        request.send(data);
      }
      break;
    case 'call':
      if (variation === '1') {
        const firstname = document.querySelector(`#contactForm--${id} #name--${id}`).value || '';
        const lastname = document.querySelector(`#contactForm--${id} #surname--${id}`).value || '';
        const telephone = document.querySelector(`#contactForm--${id} #telephone--${id}`).value || '';
        const use = document.querySelector(`#contactForm--${id} .use--${id}`).value || '';
        const businessName = lang ? document.querySelector('.companyName').value : '';
        const business = lang ? document.querySelector('.business').value : '';
        const freelance = lang ? document.querySelector('.freelance').value : '';
        let data = `form_key=${encodeURIComponent(formKey)}&reason=${encodeURIComponent(use)}&name=${encodeURIComponent(firstname)}&last-name=${encodeURIComponent(lastname)}&telephone=${encodeURIComponent(telephone)}&company=${encodeURIComponent(businessName)}&need-business=${encodeURIComponent(business)}&need-freelance=${encodeURIComponent(freelance)}`;
        data = data.replace(/%20/g, '+');
        data = data.replace(/%40/g, '@');
        const request = new XMLHttpRequest();

        request.open('POST', document.querySelector(`#contactForm--${id}`).action, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const el = document.createElement('div');
            el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-success', 'ns-show');
            el.innerHTML = lang ? successBlockIT : successBlock;
            document.querySelector('body').insertAdjacentElement('afterbegin', el);
            const closeButton = el.querySelector('.ns-close');
            closeButton.addEventListener('click', () => {
              el.remove();
            });
            const submitButton = document.querySelector(`.${ID}_tab-form__submit--hidden`);
            const trigger = document.getElementById('triggerModal');
            trigger.click();
            window.setTimeout(() => {
              submitButton.click();
            }, 1000);
          } else {
            const el = document.createElement('div');
            el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
            el.innerHTML = lang ? errorBlockIT : errorBlock;
            document.querySelector('body').insertAdjacentElement('afterbegin', el);
            const closeButton = el.querySelector('.ns-close');
            closeButton.addEventListener('click', () => {
              el.remove();
            });
          }
        };
        request.onerror = () => {
          const el = document.createElement('div');
          el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
          el.innerHTML = lang ? errorBlockIT : errorBlock;
          document.querySelector('body').insertAdjacentElement('afterbegin', el);
          const closeButton = el.querySelector('.ns-close');
          closeButton.addEventListener('click', () => {
            el.remove();
          });
        };
        request.send(data);
      } else {
        const fullName = document.querySelector(`#${ID}-${id}-form #fullname--${id}`).value || '';
        const use = document.querySelector(`#${ID}-${id}-form #enquire--${id}`).value || '';
        const telephone = document.querySelector(`#${ID}-${id}-form #phone--${id}`).value || '';
        let data = `form_key=${encodeURIComponent(formKey)}&reason=${encodeURIComponent(use)}&name=${encodeURIComponent(fullName)}&telephone=${encodeURIComponent(telephone)}`;
        data = data.replace(/%20/g, '+');
        data = data.replace(/%40/g, '@');
        const request = new XMLHttpRequest();

        request.open('POST', document.querySelector(`#${ID}-${id}-form`).action, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const el = document.createElement('div');
            el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-success', 'ns-show');
            el.innerHTML = lang ? successBlockIT : successBlock;
            document.querySelector('body').insertAdjacentElement('afterbegin', el);
          } else {
            const el = document.createElement('div');
            el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
            el.innerHTML = lang ? errorBlockIT : errorBlock;
            document.querySelector('body').insertAdjacentElement('afterbegin', el);
          }
        };
        request.onerror = () => {
          const el = document.createElement('div');
          el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
          el.innerHTML = lang ? errorBlockIT : errorBlock;
          document.querySelector('body').insertAdjacentElement('afterbegin', el);
        };
        request.send(data);
      }
      break;
    default:
      break;
  }
}

/**
 * Helper get language
 */
function getLanguage() {
  let result = window.location.pathname.substring(1).match(/^it|gb|fr|de|es/);
  if (result && result === 'gb') result = 'en';
  return result ? result[0].toUpperCase() : 'EN';
}

/**
 * Translation
 * @param {string} str String to translate
 * @param {object} templates Object to find and replace content from string
 */
function translate(str, templates) {
  let value = str;
  if (translations[str]) {
    const t = translations[str][getLanguage()];
    if (t) value = t;
  }

  // Replace templates with values
  if (templates) {
    Object.keys(templates).forEach((key) => {
      const replacement = templates[key];
      const regex = new RegExp(key, 'g');
      value = value.replace(regex, replacement);
    });
  }

  return value;
}

export { setup, changeHeader, submitForm, translate, getLanguage }; // eslint-disable-line
