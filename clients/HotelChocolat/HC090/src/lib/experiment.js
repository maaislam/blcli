import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import Calculator from './components/calculator';
import calcLogic from './components/calcLogic';
import QueryLightbox from './components/formLightbox';
import AddressLightbox from './components/addressLightbox';
import Products from './components/productsMarkup';
import QuickViewLightbox from './components/quickView';
import success from './components/success';
import { openLightbox } from './components/helpers';
import BottomFormLightbox from './components/bottomFormLightbox';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  // add added to bag message
  const addedToBagMessage = () => { 
    const addedProductMessage = document.createElement('div');
    addedProductMessage.classList.add(`${ID}-addedBox`);
    addedProductMessage.innerHTML = 
    `<div class="${ID}-innerText">
        <div class="${ID}-productsAdded">
        <h3>Successfully added to bag</h3>
        <div class="${ID}-buttons">
          <a href="/basket" class="${ID}-button ${ID}-checkout">View Basket</a>
        </div>
    </div>`;

    document.querySelector('#main').insertAdjacentElement('afterbegin', addedProductMessage);

    const allButtons = document.querySelectorAll(`.${ID}-button`);
    for (let index = 0; index < allButtons.length; index += 1) {
      const element = allButtons[index];
      element.addEventListener('click', (e) => {
        const buttonName = e.currentTarget.textContent.trim();
        fireEvent(`Clicked ${buttonName}`);
      }) 
    }
  }


  // add overlay
  document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);

  // lightboxes
  if(window.location.href.indexOf('chocolate-corporate-gifts-submitted.html') === -1) {
    new QueryLightbox();
    new AddressLightbox();
  }
  new QuickViewLightbox();
  new BottomFormLightbox();

  // success page
  if(window.location.href.indexOf('chocolate-corporate-gifts-submitted.html') > -1) {
    success();
  }

  // products
  new Products();

  // calculator
  if(window.location.href.indexOf('chocolate-corporate-gifts-submitted.html') === -1) {
    new Calculator();
    calcLogic();
  }

  addedToBagMessage();

  // add form button further down
  const formButton = document.querySelector('.toggle-information .toggle-title');
  formButton.textContent = 'Submit a Query';

  formButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const formLightbx = document.querySelector(`.${ID}-form`);
    formLightbx.querySelector('h3').textContent = "Fill in the form below and a member of our team will get back to you";
    openLightbox(formLightbx, 'bottom');
  })


};
