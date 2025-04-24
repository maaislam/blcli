import { events } from '../../../../../../lib/utils';

export default () => {
  // Change input amount
  const inputAmount = document.querySelector('input#form-change-amount-input');
  if (inputAmount) {
    inputAmount.addEventListener('click', () => {
      events.send('Google Optimize', `BR003 Clicked`, `Form field for donation amount`, { sendOnce: true });
    });
  }

  // Click Address Manually
  const addressBtn = document.querySelector('button.form-address__manual.js-address-lookup-manual');
  if (addressBtn) {
    addressBtn.addEventListener('click', () => {
      events.send('Google Optimize', `BR003 Clicked`, `Enter address manually`, { sendOnce: true });
    });
  }

  // Clicked Find Address
  const findAddressBtn = document.querySelector('button.js-address-lookup.button.button--turquoise.form-address__lookup');
  if (findAddressBtn) {
    findAddressBtn.addEventListener('click', () => {
      events.send('Google Optimize', `BR003 Clicked`, `Find address`, { sendOnce: true });
    });
  }
};