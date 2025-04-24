import { fullStory, events } from '../../../../../lib/utils';
import settings from './settings';

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
  const referTo = document.querySelectorAll(`.${ID}_tab-form__headerItem`);
  const headerText = document.querySelector(`.${ID}_wizardForm__title`);
  if (lang === 'EN') {
    Array.from(referTo).forEach(referrer => referrer.addEventListener('click', () => {
      const referrerAttr = referrer.getAttribute('for');
      switch (referrerAttr) {
        case 'mail':
          headerText.innerHTML = '';
          headerText.innerHTML = 'CONTACT TECHNOGYM HQ';
          break;
        case 'quote':
          headerText.innerHTML = '';
          headerText.innerHTML = 'REQUEST A QUOTE';
          break;
        case 'call':
          headerText.innerHTML = '';
          headerText.innerHTML = 'WE\'LL CALL YOU BACK';
          break;
        default:
          break;
      }
    }));
  } else {
    Array.from(referTo).forEach(referrer => referrer.addEventListener('click', () => {
      const referrerAttr = referrer.getAttribute('for');
      switch (referrerAttr) {
        case 'mail':
          headerText.innerHTML = '';
          headerText.innerHTML = 'CONTATTA IL NOSTRO HQ';
          break;
        case 'quote':
          headerText.innerHTML = '';
          headerText.innerHTML = 'RICHIEDI UN PREVENTIVO';
          break;
        case 'call':
          headerText.innerHTML = '';
          headerText.innerHTML = 'TI CHIAMIAMO NOI';
          break;
        default:
          break;
      }
    }));
  }
}
function changeHeaderV2(lang) {
  //Change the header text
  const referTo = document.querySelectorAll(`.${ID}_wizardForm__choice`);
  const headerText = document.querySelector(`.${ID}_wizardForm__title`);
  if (lang === 'EN') {
    Array.from(referTo).forEach(referrer => referrer.addEventListener('click', () => {
      const referrerAttr = referrer.getAttribute('for');
      switch (referrerAttr) {
        case 'mail':
          headerText.innerHTML = '';
          headerText.innerHTML = 'CONTACT TECHNOGYM HQ';
          break;
        case 'quote':
          headerText.innerHTML = '';
          headerText.innerHTML = 'REQUEST A QUOTE';
          break;
        case 'call':
          headerText.innerHTML = '';
          headerText.innerHTML = 'WE\'LL CALL YOU BACK';
          break;
        default:
          break;
      }
    }));
  } else {
    Array.from(referTo).forEach(referrer => referrer.addEventListener('click', () => {
      const referrerAttr = referrer.getAttribute('for');
      switch (referrerAttr) {
        case 'mail':
          headerText.innerHTML = '';
          headerText.innerHTML = 'CONTATTA IL NOSTRO HQ';
          break;
        case 'quote':
          headerText.innerHTML = '';
          headerText.innerHTML = 'RICHIEDI UN PREVENTIVO';
          break;
        case 'call':
          headerText.innerHTML = '';
          headerText.innerHTML = 'TI CHIAMIAMO NOI';
          break;
        default:
          break;
      }
    }));
  }
}

/**
 * Build data submit string in a consistent way
 */
function buildDataSubmitString(data) {
  const formKey = document.querySelector('input[name="form_key"]').value;

  const defaults = {
    'form_key': formKey,
    'referrer_pageurl': window.location.href,
    'referrer_element': 'contactForm',
    'need-business': 'community',
    'need-freelance': 'other',
    'company': 'Auto-Filled-Field',
  };

  const segments = [
    'referrer_element',
    'form_key',

    'reason',
    'name',
    'last-name',
    'email',
    'telephone',
    'comment',
    'profile',

    'need',

    'need-business',
    'need-freelance',
    'company',
  ];

  let res = segments.map((val) => {
    return val + '=' + (
      data[val] ? encodeURIComponent(data[val]) : (
        defaults[val] ? encodeURIComponent(defaults[val]) : ''
      )
    );
  });

  return res.join('&');
}

function showLoader() {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="${ID}-sub-loader"></div>
  `);
}

function hideLoader() {
  const l = document.querySelector(`.${ID}-sub-loader`);
  if(l) {
    l.parentNode.removeChild(l);
  }
}

function submitForm(variation, id) {
  const formKey = document.querySelector('input[name="form_key"]').value;
  const lang = document.querySelector('body').classList.contains(`${ID}_italian`) || document.body.className.match(/lang--it/g) || document.body.className.match('store-it_it');
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

        let data = buildDataSubmitString({
          reason: id,
          name: firstname,
          'last-name': lastname,
          telephone: '',
          profile: use,
          'email': email,
          comment: msg,
          company: businessName,
          'need-business': business,
          'need-freelance': freelance
        });

        data = data.replace(/%20/g, '+');
        data = data.replace(/%40/g, '@');
        const request = new XMLHttpRequest();

        request.open('POST', document.querySelector(`#contactForm--${id}`).action, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = () => {
          hideLoader();
          if (request.status >= 200 && request.status < 400) {
            console.log('success ' + id)
            events.send('Contact Form', 'TG063', id);
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
          hideLoader();
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
        showLoader();
      } else {
        const firstname = document.querySelector(`#${ID}-${id}-form #name--${id}`).value || '';
        const lastname = (document.querySelector(`#${ID}-${id}-form #surname--${id}`) || {}).value || '';
        const email = (document.querySelector(`#${ID}-${id}-form #email--${id}`) || {}).value || '';
        const msg = (document.querySelector(`#${ID}-${id}-form #message--${id}`) || {}).value || '';
        const use = (document.querySelector(`#${ID}-${id}-form #enquire--${id}`) || {}).value || '';

        let data = buildDataSubmitString({
          reason: id,
          name: firstname,
          'last-name': lastname,
          'email': email,
          comment: msg,
          profile: use,
        });

        data = data.replace(/%20/g, '+');
        data = data.replace(/%40/g, '@');
        const request = new XMLHttpRequest();

        request.open('POST', document.querySelector(`#${ID}-${id}-form`).action, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = () => {
          hideLoader();
          if (request.status >= 200 && request.status < 400) {
            console.log('success ' + id)
            events.send('Contact Form', 'TG063', id);
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
          hideLoader();
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
        showLoader();
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

        let data = buildDataSubmitString({
          reason: id,
          name: firstname,
          'last-name': lastname,
          'email': email,
          comment: msg,
          company: businessName,
          profile: use,
          'need-business': business,
          'need-freelance': freelance
        });

        data = data.replace(/%20/g, '+');
        data = data.replace(/%40/g, '@');
        const request = new XMLHttpRequest();

        request.open('POST', document.querySelector(`#contactForm--${id}`).action, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = () => {
          hideLoader();
          if (request.status >= 200 && request.status < 400) {
            console.log('success ' + id)
            events.send('Contact Form', 'TG063', id);
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
          hideLoader();
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
        showLoader();
      } else {
        const firstName = document.querySelector(`#${ID}-${id}-form #name--${id}`).value || '';
        const lastName = document.querySelector(`#${ID}-${id}-form #surname--${id}`).value || '';
        const email = document.querySelector(`#${ID}-${id}-form #email--${id}`).value || '';
        const msg = document.querySelector(`#${ID}-${id}-form #message--${id}`).value || '';
        const use = document.querySelector(`#${ID}-${id}-form #enquire--${id}`).value || '';
        const telephone = document.querySelector(`#${ID}-${id}-form #phone--${id}`).value || '';

        let data = buildDataSubmitString({
          reason: id,
          name: firstName,
          'last-name': lastName,
          'email': email,
          comment: msg,
          profile: use,
          telephone: telephone
        });

        data = data.replace(/%20/g, '+');
        data = data.replace(/%40/g, '@');
        const request = new XMLHttpRequest();

        request.open('POST', document.querySelector(`#${ID}-${id}-form`).action, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = () => {
          hideLoader();
          if (request.status >= 200 && request.status < 400) {
            events.send('Contact Form', 'TG063', id);
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
          hideLoader();
          const el = document.createElement('div');
          el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
          el.innerHTML = lang ? errorBlockIT : errorBlock;
          document.querySelector('body').insertAdjacentElement('afterbegin', el);
        };
        request.send(data);
        showLoader();
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

        let data = buildDataSubmitString({
          reason: id,
          name: firstname,
          telephone: telephone,
          'last-name': lastname,
          company: businessName,
          profile: use,
          'need-business': business,
          'need-freelance': freelance
        });

        data = data.replace(/%20/g, '+');
        data = data.replace(/%40/g, '@');
        const request = new XMLHttpRequest();

        request.open('POST', document.querySelector(`#contactForm--${id}`).action, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = () => {
          hideLoader();
          if (request.status >= 200 && request.status < 400) {
            events.send('Contact Form', 'TG063', id);
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
          hideLoader();
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
        showLoader();
      } else {
        const firstName = document.querySelector(`#${ID}-${id}-form #name--${id}`).value || '';
        const lastName = document.querySelector(`#${ID}-${id}-form #surname--${id}`).value || '';
        const use = document.querySelector(`#${ID}-${id}-form #enquire--${id}`).value || '';
        const telephone = document.querySelector(`#${ID}-${id}-form #phone--${id}`).value || '';

        let data = buildDataSubmitString({
          reason: id,
          name: firstname,
          telephone: telephone,
          'last-name': lastname,
          'email': email,
          profile: use,
        });

        data = data.replace(/%20/g, '+');
        data = data.replace(/%40/g, '@');
        const request = new XMLHttpRequest();

        request.open('POST', document.querySelector(`#${ID}-${id}-form`).action, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = () => {
          hideLoader();
          if (request.status >= 200 && request.status < 400) {
            events.send('Contact Form', 'TG063', id);
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
          hideLoader();
          const el = document.createElement('div');
          el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
          el.innerHTML = lang ? errorBlockIT : errorBlock;
          document.querySelector('body').insertAdjacentElement('afterbegin', el);
        };
        request.send(data);
        showLoader();
      }
      break;
    default:
      break;
  }
}

export { setup, changeHeader, changeHeaderV2, submitForm }; // eslint-disable-line
