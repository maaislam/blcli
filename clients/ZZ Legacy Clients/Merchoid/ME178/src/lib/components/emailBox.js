import settings from '../settings';
import { pollerLite } from '../../../../../../lib/uc-lib';

export default () => {
  let jumperText;
  /* eslint-disable */
  if (wc_aelia_currency_switcher_params.selected_currency !== 'GBP') {
    jumperText = 'Sweaters';
  } else {
    jumperText = 'Jumpers';
  }
  /* eslint-enable */

  const emailBox = document.createElement('div');
  emailBox.classList.add(`${settings.ID}-email_wrapper`);
  emailBox.innerHTML = `<p>
  Be the first to hear about out latest Christmas ${jumperText} releases. Join our newsletter today
  </p>
  <div class="${settings.ID}-email_box"></div>`;

  const secondCategory = document.querySelector('#top ~ div');
  secondCategory.insertAdjacentElement('afterend', emailBox);


  const secondEmailBox = document.createElement('div');
  secondEmailBox.classList.add(`${settings.ID}-email_wrapper_bottom`);
  secondEmailBox.innerHTML = `<p>
  Be the first to hear about out latest Christmas ${jumperText} releases. Join our newsletter today
  </p>
  <div class="ME178-success">Thankyou for signing up!</div>
  <div class="${settings.ID}-email_box">
    <div class="chimpy_signup_form">
      <fieldset>
        <input type="email" placeholder="Your e-mail"/>
      </fieldset>
      <footer>
      <button type="button" class="ME178-button">Join</button>
        <span class="ME178-error"></span>
      </footer>
    </div>
  </div>
  <div class="ME178-unknown_error">Unknown error. Please try again later</div>`;

  const decorations = document.querySelector('#decorations');
  decorations.insertAdjacentElement('beforebegin', secondEmailBox);


  pollerLite([`.${settings.ID}-email_box`], () => {
    const emailForm = document.querySelector('.chimpy-reset.chimpy_shortcode_content');
    emailForm.querySelector('button').textContent = 'Join';
    document.querySelector('.ME178-email_box').appendChild(emailForm);

    const bottomForm = document.querySelector(`.${settings.ID}-email_wrapper_bottom .ME178-email_box`);
    const emailInput = emailForm.querySelector('#chimpy_shortcode_field_EMAIL');
    const emailSubmit = emailForm.querySelector('#chimpy_shortcode_submit');
    const errorOnBottomForm = bottomForm.querySelector('.ME178-error');
    const succesBottom = document.querySelector(`.${settings.ID}-email_wrapper_bottom`).querySelector('.ME178-success');
    const unknownError = document.querySelector('.ME178-unknown_error');

    bottomForm.querySelector('input').addEventListener('keyup', () => {
      emailInput.value = bottomForm.querySelector('input').value;
    });
    bottomForm.querySelector('.ME178-button').addEventListener('click', () => {
      emailInput.dispatchEvent(new Event('change'));
      emailSubmit.click();
      const errorInEmail = emailForm.querySelector('em');
      const errorSubmit = document.querySelector('.chimpy_signup_error');

      if (errorSubmit.style.display !== 'none') {
        unknownError.style.display = 'block';
        bottomForm.style.display = 'none';
      } else if (emailInput.classList.contains('invalid')) {
        errorOnBottomForm.textContent = errorInEmail.textContent;
        errorOnBottomForm.style.display = 'block';
      } else if (errorSubmit.style.display === 'none') {
        bottomForm.style.display = 'none';
        succesBottom.style.display = 'block';
      }
    });
  });
};
