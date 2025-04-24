import { events } from '../../../../../../lib/utils';

export default () => {
  const inputAmount = document.querySelector('input#form-change-amount-input');
  const topOfForm = document.querySelector('form#form-personal-details-pre-wp');

  if (inputAmount) {
    const allUpsellMessages = document.querySelectorAll('.BR002-upsell__message');

    [].forEach.call(allUpsellMessages, (message) => {
      const updateBtn = message.querySelector('.update__amount');
      if (updateBtn) {
        updateBtn.addEventListener('click', () => {
          const newValue = updateBtn.getAttribute('value');
          inputAmount.value = newValue;
          inputAmount.dispatchEvent(new Event('input'));
          topOfForm.scrollIntoView();
          events.send('Google Optimize', `BR002 Clicked`, `Update Donation CTA: £${newValue}`, { sendOnce: true });
        });
      }
    });
  }
};