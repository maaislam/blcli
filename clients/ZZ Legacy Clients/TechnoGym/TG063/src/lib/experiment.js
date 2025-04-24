/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup, changeHeader, changeHeaderV2 } from './services';
import settings from './settings';
import HeaderBlock from '../components/header-block/header-block';
import JumpTo from '../components/jump-to/jump-to';
import WizardForm from '../components/wizard-form/wizard-form';
import Contacts from '../components/contacts/contacts';
import TabForm from '../components/tab-form/tab-form';
import NewsLetter from '../components/newsletter/newsletter';
import Modal from '../components/modal/modal';

const { VARIATION, ID } = settings;

const activate = () => {
  setup();
  document.querySelector('body').classList.add(`${ID}_contact-page`);
  if (window.location.pathname === '/gb/contacts/') {
    switch (VARIATION) {
      case '1':
        document.querySelector('body').classList.add(`${ID}_version-1`);
        new HeaderBlock({ lang: 'EN' });
        new JumpTo({ lang: 'EN' });
        new TabForm({ lang: 'EN' });
        new NewsLetter({ lang: 'EN' });
        //new Modal({ lang: 'EN' });
        //Remove the footer subscription to avoid ID duplicates
        if(document.querySelector('.block-subscribe')){
          document.querySelector('.block-subscribe').remove();
        }
        changeHeader('EN');

        const forSuppliers = document.querySelector('#for-suppliers');
        const wrapper = document.querySelector('.wrapper');
        if(forSuppliers && wrapper) {
          wrapper.insertAdjacentElement('beforeend', forSuppliers);
        }


        break;
      case '2':
        new HeaderBlock({ lang: 'EN' });
        new JumpTo({ lang: 'EN' });
        new WizardForm({ lang: 'EN' });
        // Append v1-esque contact info after form
        const wizardWrap = document.querySelector(`.${settings.ID}_wizardFormWrap`);
        if(wizardWrap) {
          wizardWrap.insertAdjacentHTML('afterend', `
          <div class="${ID}_contact-blockWrap" id="phone-numbers">
            <div class="${ID}_contact-block">
              <strong>or</strong>
              <h3 class="${ID}_contact-block__title">Call us on<span class="iconic icon-Callus"></span> 0800 316 2496</h3>
              <span class="${ID}_contact-block__text">For spare parts and service contracts: <strong>01344 300236</strong></span>
              <span class="${ID}_contact-block__text">For technical assistance: <strong>01344 823700</strong></span>
            </div>
          </div>
          `);
        }

        changeHeaderV2('EN');
        break;
      default:
        break;
    }
  } else if (window.location.pathname === '/it/contacts/') {
    switch (VARIATION) {
      case '1':
        document.querySelector('body').classList.add(`${ID}_version-1`, `${ID}_italian`);
        new HeaderBlock({ lang: 'IT' });
        new JumpTo({ lang: 'IT' });
        new TabForm({ lang: 'IT' });
        new NewsLetter({ lang: 'IT' });
        //new Modal({ lang: 'IT' });
        //Remove the footer subscription to avoid ID duplicates
        if(document.querySelector('.block-subscribe')){
          document.querySelector('.block-subscribe').remove();
        }
        //activate the right dropdown needed in the IT CF for Business or Freelance option
        const sel = document.querySelectorAll(`.${ID}_tab-form__inputSelect`);
        Array.from(sel).forEach((select) => {
          select.addEventListener('change', () => {
            select.parentNode.classList.remove('need-business', 'need-freelance');
            switch (select.value) {
              case 'business':
                select.parentNode.classList.add('need-business');
                break;
              case 'freelance_professional':
                select.parentElement.classList.add('need-freelance');
                break;
              default:
                break;
            }
          });
        });
        changeHeader('IT');

        const forSuppliers = document.querySelector('#for-suppliers');
        const wrapper = document.querySelector('.wrapper');
        if(forSuppliers && wrapper) {
          wrapper.insertAdjacentElement('beforeend', forSuppliers);
        }

        break;
      case '2':
        new HeaderBlock({ lang: 'IT' });
        new JumpTo({ lang: 'IT' });
        new WizardForm({ lang: 'IT' });
        const wizardWrap = document.querySelector(`.${settings.ID}_wizardFormWrap`);
        if(wizardWrap) {
          wizardWrap.insertAdjacentHTML('afterend', `
            <div class="${ID}_contact-blockWrap" id="phone-numbers">
              <div class="${ID}_contact-block">
                <span>oppure</span>
                <h3 class="${ID}_contact-block__title">Chiama un nostro consulente al<span class="iconic icon-Callus"></span> 800 70 70 70 </h3>
              </div>
            </div>
          `);
        }
        const stores = document.querySelectorAll('.store-to-show');
        Array.from(stores).forEach((store) => {
          if (store.innerHTML.indexOf('Durini') !== -1) {
            const targetEl = store.querySelector('.filoblu-grid-address');
            targetEl.innerHTML = '';
            targetEl.innerHTML = 'via Durini 1 - Milano';
          }
        });
        changeHeaderV2('IT');
        break;
      default:
        break;
    }
  }
const scrollToTop = document.createElement('div');
scrollToTop.classList.add(`${ID}_scrollToTop`);
if (window.location.pathname === '/gb/contacts/') {
  scrollToTop.textContent = 'Back to Top';
} else {
  scrollToTop.textContent = 'Torna su';
}

document.body.insertAdjacentElement('beforeend', scrollToTop);

// When the user clicks on the button, scroll to the top of the document
document.querySelector(`.${ID}_scrollToTop`).addEventListener('click', function(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.querySelector(`.${ID}_scrollToTop`).style.display = "block";
  } else {
    document.querySelector(`.${ID}_scrollToTop`).removeAttribute('style');
  }
}

// When the user scrolls down 200px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};
};
export default activate;
