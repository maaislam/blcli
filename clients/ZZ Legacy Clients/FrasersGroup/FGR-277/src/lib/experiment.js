/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {

  events.analyticsReference = window.ga ? 'ga' : '_gaUAT';

  setup();

  fireEvent('Conditions Met');

  let max30Found = false;

  pollerLite([".sectionWrap .activeSection"], () => {
    const target = document.querySelector(".leftMain .sectionWrap");

    const Observer = new MutationObserver((mutationList, observer) => {
      observer.disconnect();


      let allErrorMessages = document.querySelectorAll('.errorMessage');
      [].slice.call(allErrorMessages).forEach((error) => {
        if(error.innerText.toLowerCase().indexOf('max 30') > -1 && max30Found === false) {
          max30Found = true;
          fireEvent('Interaction - the user has caused the Max 30 Characters error to appear on the checkout', true);
        }
      })

      observer.observe(target, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    });
    Observer.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  });
};
