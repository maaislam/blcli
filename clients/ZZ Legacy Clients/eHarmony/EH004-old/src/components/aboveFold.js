import settings from '../settings';

export default () => {
  const id = settings.ID;

  const topBanner = document.querySelector('#mobile-hero');
  const form = document.querySelector('#social-registration');

  /**
   * @desc add top title & form title
   */
  const newTitle = document.createElement('div');
  newTitle.classList.add(`${id}-title`);
  newTitle.innerHTML = '<h1>The brains behind <span class="faith">the butterflies</span></h1>';
  topBanner.appendChild(newTitle);

  const formTitle = document.createElement('div');
  formTitle.classList.add(`${id}-formTitle`);
  formTitle.innerHTML = 'Sign up for <span class="faith">free</span></h1>';
  form.insertAdjacentElement('beforebegin', formTitle);
};
