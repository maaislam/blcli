/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import PageMarkup from './components/pageMarkup';
import translations from './translations';

export default () => {
  setup(); 
  const { ID } = shared;

  const postContent = document.querySelector('.post-content .forms');
  const requestForm = document.getElementById('contactForm');

  const getLanguage = () => {
        return window.location.pathname.substring(1).match(/^it|gb|fr|de|es/) + '';
    };

  function _t(str) {
      if(translations[str]) {
          var t = translations[str][getLanguage()]
          if(t) {
              return t;
          }
      }

      return str;
  }

  // Run Tg028


  while (postContent.firstChild) postContent.removeChild(postContent.firstChild);



	const pageMarkup = new PageMarkup();

  // Add form to form holder 

  const formselector = '.' + ID + '-form-holder';

  const formHolder = document.querySelector(formselector);

  formHolder.appendChild(requestForm);

  const inputRowProfile = document.querySelector('.select-profile.tg28-input-row--profile');
  if(inputRowProfile) {
    document.querySelector(`${formselector} .form-list p.required`).insertAdjacentElement('afterend', inputRowProfile);
  }

  document.getElementById('private').nextElementSibling.innerHTML = "<div class='option-label-holder'><img src='//cdn.optimizely.com/img/8355110909/2542049ceaac4dae895eec302d986a36.png' alt='gym image' class='option-div-image' /><span class='text-descriptor'>"+_t('for-home')+"</span></div>";
  document.getElementById('private').nextElementSibling.setAttribute('for', 'private');
  document.getElementById('private').nextElementSibling.setAttribute('class', 'privateLabel');
  document.querySelector('.privateLabel').insertBefore(document.getElementById('private'), document.querySelector('.privateLabel').firstChild);

  document.getElementById('private').checked = true;

  document.getElementById('business').nextElementSibling.innerHTML = "<div class='option-label-holder'><img src='//cdn.optimizely.com/img/8355110909/f1941b274be74669a349d2edcc2cd7a4.png' alt='treadmill image' class='option-div-image' /><span class='text-descriptor'>"+_t('for-business')+"</span></div>";
  document.getElementById('business').nextElementSibling.setAttribute('for', 'business');
  document.getElementById('business').nextElementSibling.setAttribute('class', 'businessLabel');
  document.querySelector('.businessLabel').insertBefore(document.getElementById('business'), document.querySelector('.businessLabel').firstChild);

  document.getElementById('freelance').parentNode.remove();

  document.getElementById('email').classList.add('required-entry');
  document.getElementById('comment').classList.add('required-entry');


  if(document.querySelector('.tg28-input-row--profile > label')) {
    document.querySelector('.tg28-input-row--profile > label').innerHTML = _t('quote-looking');
  }

  document.querySelector('.tg28-toggle-message').classList.add('tg28-toggle-message--hide');
  document.querySelector('.input-box.tg28-input-row--comment-hidden').classList.remove('tg28-input-row--comment-hidden');
  document.querySelector('.tg28-input-row--comment .tg28-input-row--comment-hidden').classList.remove('tg28-input-row--comment-hidden');

  document.querySelector('.tg28-form-submit-wrap .button').innerHTML = _t('request-quote');

  document.querySelector('.request-form-col > .form-holder-inner > p').innerHTML = _t('request-answered');

  document.querySelector('.tg28-input-row--comment > label').innerHTML = _t('message-label');
  
  document.querySelector('.tg28-input-row--comment .input-box textarea').setAttribute('placeholder', _t('requirements'));

  document.querySelector('.telephone > label').innerHTML = _t('phone-text');

  const reason = document.querySelector('#reason');
  if(reason) {
    reason.value = 'quote';
  }
};
