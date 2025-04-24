/**
 * @desc holding page markup
 */
import settings from '../settings';

export default () => {
  const holdingWrapper = document.createElement('div');
  holdingWrapper.classList.add(`${settings.ID}-holding_wrapper`);
  holdingWrapper.innerHTML = `
  <h3></h3>
  <div class="${settings.ID}-main_image">
    <div class="${settings.ID}-countdown" id="${settings.ID}-countdown"></div>
  </div> 
  <div class="${settings.ID}-emailBox">
    <span>Enter your email and be the first to know when we launch</span>
  </div>`;

  document.querySelector('#content').appendChild(holdingWrapper);

  const emailForm = document.querySelector('.chimpy-reset.chimpy_shortcode_content');
  document.querySelector(`.${settings.ID}-emailBox`).appendChild(emailForm);
  emailForm.querySelector('button').textContent = 'Sign up';


  const url = window.location.href;
  if (url.indexOf('email') > -1) {
    const email = url.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)[0];
    emailForm.querySelector('#chimpy_shortcode_field_EMAIL').value = email;
  }
};
