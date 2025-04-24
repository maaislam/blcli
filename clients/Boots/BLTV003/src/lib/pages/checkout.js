import { pollerLite } from '../../../../../../lib/utils';
import postConsent from '../helpers/postConsent';

const checkoutPage = (ID) => {
  pollerLite(['#your-details-email-address'], () => {
    const emailField = document.querySelector('#your-details-email-address');
    const fieldGroup = emailField.closest('.oct-form-field__group');

    const consentHtml = `<div class='${ID}__consent'>
          <div class="${ID}__consentHeader">Subscribe to unlock exclusive perks & be first in line for amazing offers:</div>
          <input type='checkbox' class='${ID}__checkbox' id='${ID}__checkbox' ${
      window[`${ID}__consent`] === true ? 'checked' : ''
    }>   
          <label class='${ID}__checkboxLabel' for='${ID}__checkbox'>
            <span class="${ID}__icon"></span>
            <span class="${ID}__text">Yes please, I would like to receive exclusive deals, information on the latest products and relevant offers. Please tick to receive these by email and digital communications</span></label>
        </div>`;

    if (document.querySelector(`.${ID}__consent`)) {
      document.querySelector(`.${ID}__consent`).remove();
    }

    fieldGroup.insertAdjacentHTML('afterend', consentHtml);

    const checkbox = document.querySelector(`.${ID}__checkbox`);

    checkbox.addEventListener('change', () => {
      const email = emailField.value;
      const checked = checkbox.checked;
      window[`${ID}__consent`] = checked;

      const payload = {
        email,
        consentGiven: checked ? true : false,
      };

      if (email.length > 0) {
        postConsent(payload);
      }
    });
  });
};

export default checkoutPage;
