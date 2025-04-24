import { setup, fireEvent } from '../../../../../core-files/services';
import { copyToClipboard } from '../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (VARIATION === 'control') {
    return;
  }

  const DISCOUNT_CODE = 'NEWVIPME';

  const isSignupSuccess = window.location.href.match(/^.*(VipMeSignUp-Proccess).*$/);

  if (isSignupSuccess) {
    const discountContainer = document.querySelector('.vipme-container .welcome-block .discount');

    if (discountContainer && discountContainer.innerText === DISCOUNT_CODE) {
      localStorage.setItem(`${ID}-vip-discount`, DISCOUNT_CODE);
    }
  }

  const isTransactionSuccess = window.location.href.match(
    /(checkout\/confirmation|ApplePayConfirmationPage|KLARNA_PAYMENTS-Confirmation)/
  );

  if (isTransactionSuccess) {
    window.localStorage.removeItem(`${ID}-vip-discount`);
  }

  const hasDiscountCode = window.localStorage.getItem(`${ID}-vip-discount`) === DISCOUNT_CODE;

  if (hasDiscountCode) {
    var checkAccount = setInterval(function () {

      if (document.querySelector('#my-account-dropdown > .menu-title')) {

        if (document.querySelector('#my-account-dropdown > .menu-title').textContent.indexOf('VIP.ME') > -1) {
          console.log('logged in');
          clearInterval(checkAccount);
          const entryElement = document.querySelector('#header-promo-banner');
          const rootElement = document.createElement('div');
          rootElement.classList.add(`${ID}-vip-banner`);

          /* html */
          rootElement.innerHTML = `
      <div class='${ID}-vip-banner-container'>
        <p>
          Don't forget to save 15% by using code <strong>NEWVIPME</strong>
          <button class='${ID}-vip-banner-copy-button' data-${ID}-copy-button>Click to Copy</button>
        </p>
      </div>
    `;

          entryElement.parentNode.insertBefore(rootElement, entryElement.nextSibling);

          const copyButton = document.querySelector(`[data-${ID}-copy-button]`);

          copyButton.addEventListener('click', (e) => {
            copyToClipboard(DISCOUNT_CODE, () => {
              e.target.classList.add(`${ID}-copied`);
              setTimeout(() => {
                e.target.classList.remove(`${ID}-copied`);
              }, 2000);
            });
          });
        }
      }
    }, 500)
  }
};
