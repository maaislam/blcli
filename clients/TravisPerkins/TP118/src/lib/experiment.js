/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup, checkStatus, getName, addMessage, addTracking } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events } from './../../../../../lib/utils';
import settings from './settings';

const activate = () => {
  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'Control', 'Control is active');
    return false;
  }

  setup();

  events.send(settings.ID, 'Active', 'Variation 1 is active');
  // Cache
  const bodyVar = cacheDom.get('body');
  const greenBar = cacheDom.get('#header .tpHeaderLinks');

  // Experiment code
  const loggedInUser = checkStatus();
  if (loggedInUser === 'no') {
    const loginCta = document.querySelector('.feature-design #header .tpHeaderContent_holder .tpHeaderLinks .nav li:first-of-type .button_text a');
    bodyVar.classList.add('TP118-loggedOut');
    /**
     * Change Register / Log in to just Register
     */
    if (loginCta) {
      loginCta.textContent = 'Register';
    }
    /**
     * Add text and Log in CTA to the left
     */
    addMessage(greenBar);
    /**
     * Add tracking
     */
    const newLoginCta = document.querySelector('.TP118.TP118-loggedOut.feature-design #header .tpHeaderContent_holder .tpHeaderLinks .TP118-message a.TP118-login-cta');
    const oldRegisterCta = document.querySelector('.feature-design #header .tpHeaderContent_holder .tpHeaderLinks .nav li:first-of-type .button_text a');
    addTracking(newLoginCta, oldRegisterCta, null);
  } else if (loggedInUser === 'yes') {
    bodyVar.classList.add('TP118-loggedIn');
    const accountElement = document.querySelector('.tpHeaderLinks ul.nav .your-acc-wrapper');
    const usersName = getName();
    /**
     * Add text and CTA to the left
     */
    addMessage(greenBar, true, usersName, accountElement);
    /**
     * Add tracking
     */
    const viewAccount = document.querySelector('.TP118.feature-design #header .tpHeaderContent_holder .tpHeaderLinks .TP118-message a.dropDownHeaderLink');
    addTracking(null, null, viewAccount);

  }

  // If top red banner, add class
  const redBanner = document.querySelector('#page > #monetate_selectorBanner_75f998f4_00');
  const messageEl = document.querySelector('.TP118-message');
  if (redBanner) {
    if (messageEl) {
      messageEl.classList.add('TP118-has-banner');
      messageEl.parentElement.classList.add('TP118-adjust-nav');
    }
  }
};

export default activate;
