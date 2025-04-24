/**
 * PDXXX - Protec Fake PayPal Button
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  const ref = document.querySelector('#checkout_summary_payment_div .item_container');

  if (document.querySelector('#PDXXX-PP')) return;
  ref.insertAdjacentHTML('afterend', `
      <div class="item_container" id="PDXXX-PP">
        <p><label><input type="radio" name="PayPal" value="paypal">PayPal</label></p>
      </div>
  `);


  const showMessage = () => {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="PDXXX-message">
        <div class="PDXXX-message--wrap">
          <p>We're sorry, this feature is not available just yet, please pay by an alternative payment method</p>
        </div>
      </div>
    `);

    const addedEl = document.querySelector('.PDXXX-message');
    if (addedEl) {
      setTimeout(() => {
        addedEl.classList.add('PDXXX-show');
      }, 300);

      setTimeout(() => {
        addedEl.classList.remove('PDXXX-show');
      }, 4500);
    }
  };

  const clickEl = document.querySelector('#PDXXX-PP label input');
  clickEl.addEventListener('click', (e) => {
    e.preventDefault();
    if (document.querySelector('.PDXXX-show')) return;

    events.send('PDXXX', 'PDXXX Click', 'PDXXX User Clicked PayPal');

    // Show message
    showMessage();
  });
};
