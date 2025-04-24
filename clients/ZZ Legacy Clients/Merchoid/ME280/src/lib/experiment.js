/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { getCookie, pollerLite } from '../../../../../lib/utils';
import formSubmit from '../formSubmit';
import EmailPopup from './emailBox';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  
  // Create lightbox that will show, different class for each postion for slide out and up
  const createOverlay = () => {
    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
  }

  // create side tab
  const createSideTab = () => {
    const triggerTab = document.createElement('div');
    triggerTab.classList.add(`${ID}-tabTrigger`);
    triggerTab.classList.add(`${ID}-sideTabShow`);
    triggerTab.innerHTML = `<div class="${ID}-closeTab"></div><p>Get an <span>exclusive discount</span></p>`;
    document.body.appendChild(triggerTab);
  }

if(!getCookie(`${ID}-emailSignUp`)) {
  if(VARIATION === '1') {
    if(!localStorage.getItem(`${ID}-emailShow`)){
      createOverlay();
      new EmailPopup();
      formSubmit();
    }
  }


  if(VARIATION === '2') {
    if(!localStorage.getItem(`${ID}-tabRemoved`)) {
      createOverlay();
      createSideTab();
      new EmailPopup();
      formSubmit();
    }
  }

  if(VARIATION === '3') {
    new EmailPopup();
    pollerLite([`.${ID}-form`], () => {
      formSubmit();
    });
  }
}
};
