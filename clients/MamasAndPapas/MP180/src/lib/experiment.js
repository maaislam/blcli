/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  const submitBtn = document.querySelector('button.subscribe-register');
  const globalMessageEl = document.querySelector('#globalMessages');

  // On Submit Click Trigger the pollers
  // const triggerPolls = () => {
    
  // };
  
  observer.connect(globalMessageEl, () => {
    // Poll for New Email
    pollerLite(['#globalMessages p.d-inline'], () => {
      const text = document.querySelector('#globalMessages p.d-inline');
      if (text && text.textContent.trim() == 'You’ve subscribed! Welcome to our world…') {
        // Success
        text.insertAdjacentHTML('afterend', `<p>Your coupon code is WELCOME10. Please use this in your basket for all orders over £150</p>`);
      }
    });
  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    }
  })

  // submitBtn.addEventListener('click', () => {
  //   triggerPolls();
  // });

  


};
