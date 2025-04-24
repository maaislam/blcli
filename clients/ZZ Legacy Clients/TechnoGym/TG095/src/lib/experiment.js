/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();
  const { ID } = shared;

  let homeLink;
  let businessLink;
  let businessTitle;
  let homeTitle;

  const URL = window.location.href;
  if(URL.indexOf('/gb/') > -1) {
    homeTitle = 'For your home';
    businessTitle = 'For your business';
    homeLink = 'https://www.technogym.com/gb/home-wellness/';
    businessLink = 'https://www.technogym.com/gb/for-your-business';
  }
  else if(URL.indexOf('/int/') > -1) {
    homeTitle = 'For your home';
    businessTitle = 'For your business';
    homeLink = 'https://www.technogym.com/int/home-wellness/';
    businessLink = 'https://www.technogym.com/int/for-your-business';
  }
  else if(URL.indexOf('/us/') > -1) {
    homeTitle = 'For your home';
    businessTitle = 'For your business';
    homeLink = 'https://www.technogym.com/us/home-wellness/';
    businessLink = 'https://www.technogym.com/us/for-your-business';
  }
  else if(URL.indexOf('/it/') > -1) {
    homeTitle = 'Per la tua casa';
    businessTitle = 'Per il tuo business';
    homeLink = 'https://www.technogym.com/it/wellness-in-casa/';
    businessLink = 'https://www.technogym.com/it/per-il-business';
  }

  const addHeader = () => {
    const categoryHeader = document.createElement('div');
    categoryHeader.classList.add(`${ID}-categoryHeader`);
    categoryHeader.innerHTML = 
    `<div class="${ID}-block ${ID}-home">
      <div class="${ID}-block_background"></div>
      <a href="${homeLink}"></a>
        <span>${homeTitle}</span>
      </div>
      <div class="${ID}-or"><span>OR</span></div>
      <div class="${ID}-block ${ID}-business">
      <div class="${ID}-block_background"></div>
      <a href="${businessLink}"></a>
        <span>${businessTitle}</span>
      </div>`;

    const currentHeader = document.querySelector('.container-fluid.homepage_slider');
    currentHeader.insertAdjacentElement('afterbegin', categoryHeader);
  }
  addHeader();
};
