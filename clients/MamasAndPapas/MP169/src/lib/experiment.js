/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  const { ID, VARIATION } = settings;
  const header = document.querySelector('header');

  // addToCartButton btn btn-primary 
  const btn = cacheDom.get('#addToCartForm > button.btn.btn-default');
  if (btn && VARIATION == '2') {
    const form = document.querySelector('#addToCartForm');
    if (form) {
      form.insertAdjacentHTML('beforeend', `
        <div class="MP169-fakeBtn"></div>
      `);
    }
    const fakeBtn = document.querySelector('.MP169-fakeBtn');
    if (fakeBtn) {
      fakeBtn.addEventListener('click', () => {
        events.send(ID, 'MP169 Click', 'MP169 ATB Grey Click');
      });
    }
    return false;
  }

  // If the product has 0 Stock, return to default
  if (btn.textContent.trim() == 'out of stock') {
    return;
  }

  btn.classList.add('addToCartButton', 'btn', 'btn-primary');
  btn.removeAttribute('disabled');

  if (!document.querySelector('.MP169-message')) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Add new message
      btn.insertAdjacentHTML('afterend', `
        <div class="MP169-message">
          <p>Please select an option</p>
        </div>
      `);

      const addedMessage = document.querySelector('.MP169-message');
      if (addedMessage) {
        events.send(ID, 'Saw Validation', 'MP169 Validation Message');
        setTimeout(() => {
          addedMessage.parentNode.removeChild(addedMessage);
        }, 3000);
      }
  
    });
  }
};

export default activate;
