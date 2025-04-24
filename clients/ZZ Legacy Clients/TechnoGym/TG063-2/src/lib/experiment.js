/**
 * TG063 - Contact Form (Contact Page) Improvements
 * @author User Conversion
 */
import { setup, changeHeader } from './services';
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
        new TabForm({ lang: 'EN' });
        new NewsLetter({ lang: 'EN' });
        new Modal({ lang: 'EN' });
        //Remove the footer subscription to avoid ID duplicates
        const footerSubscr = document.querySelector('.block-subscribe');
        footerSubscr.remove();
        changeHeader('EN');
        break;
      case '2':
        new HeaderBlock({ lang: 'EN' });
        new JumpTo({ lang: 'EN' });
        new WizardForm({ lang: 'EN' });
        new Contacts({ lang: 'EN' });
        changeHeader('EN');
        break;
      default:
        break;
    }
  } else if (window.location.pathname === '/it/contacts/') {
    switch (VARIATION) {
      case '1':
        document.querySelector('body').classList.add(`${ID}_version-1`, `${ID}_italian`);
        new HeaderBlock({ lang: 'IT' });
        new TabForm({ lang: 'IT' });
        new NewsLetter({ lang: 'IT' });
        new Modal({ lang: 'IT' });
        //Remove the footer subscription to avoid ID duplicates
        const footerSubscr = document.querySelector('.block-subscribe');
        footerSubscr.remove();
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
        break;
      case '2':
        new HeaderBlock({ lang: 'IT' });
        new JumpTo({ lang: 'IT' });
        new WizardForm({ lang: 'IT' });
        new Contacts({ lang: 'IT' });
        const stores = document.querySelectorAll('.store-to-show');
        Array.from(stores).forEach((store) => {
          if (store.innerHTML.indexOf('Durini') !== -1) {
            const targetEl = store.querySelector('.filoblu-grid-address');
            targetEl.innerHTML = '';
            targetEl.innerHTML = 'via Durini 1 - Milano';
          }
        });
        changeHeader('IT');
        break;
      default:
        break;
    }
  }
};
export default activate;
