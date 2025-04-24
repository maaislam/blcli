import { events } from '../../../../../../lib/utils';
import { pollerLite } from '../../../../../../lib/uc-lib';

export default () => {
  const lightbox = document.querySelector('.BI034_Lightbox');
  const overlay = document.querySelector('.BI034_Lightbox__overlay');
  const currentEmailBox = document.querySelector('.footer .wrap form input');
  const currentEmailSubmit = document.querySelector('.footer .wrap form action');
  const emailInLightbox = document.querySelector('.BI034_email');
  const emailSubmit = document.querySelector('.BI034_go');
  const emailInvalid = document.querySelector('.BI034-email_invalid');
  const emailSuccess = document.querySelector('.BI034-success');

  emailInLightbox.addEventListener('keyup', () => {
    currentEmailBox.value = emailInLightbox.value;
  });

  emailSubmit.addEventListener('click', () => {
    currentEmailBox.dispatchEvent(new Event('change'));
    currentEmailSubmit.click();
    const errorMessage = document.querySelector('.footer .wrap field-notice');
    if (errorMessage.textContent !== '') {
      const errorMessageText = errorMessage.textContent;
      emailInvalid.classList.add('BI034-error_show');
      emailInvalid.textContent = errorMessageText;
    } else {
      /* eslint-disable */
      const elementExists = () => {
        const alreadySubscribed = document.querySelector('.footer .error:not(.ng-hide)');
        if(alreadySubscribed){
        console.log(alreadySubscribed);
        console.log(alreadySubscribed.outerHTML);
          if (alreadySubscribed && alreadySubscribed.style.display !== 'none') {
            return true;
          }
        }
      };
      pollerLite([elementExists], () => {
        emailInvalid.classList.add('BI034-error_show');
        emailSuccess.classList.remove('BI034_success_show');
        emailInvalid.textContent = 'You are already subscribed';
      });
    }
    // success message
    pollerLite(['.fs-3.col-11.success'], () => {
      emailInvalid.classList.remove('BI034-error_show');
      emailSuccess.classList.add('BI034_success_show');
      events.send('BI034', 'Clicked', 'Arrow to send email - success');

      const existingTerms = document.querySelector('.BI034-voucher-message');
      if(existingTerms) {
        existingTerms.remove();
      }

      const terms = document.querySelector('.BI034-terms');
      terms.insertAdjacentHTML('beforebegin', `
        <div class="BI034-voucher-message">
          <p class="BI034-voucher-message__message">
            Your 15% off discount code is
          </p>
          <p class="BI034-voucher-message__code">BISCUITNEWS15</p>
          <p class="BI034-voucher-message__instruction">
            (enter the discount code at the basket when you check out)
          </p>
        </div>
      `);
    });
  });
};
