/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { h, render } from 'preact';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { poller } from '../../../../../lib/utils';

import AdventCalendar from './AdventCalendar';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION === 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const rootEntry = document.querySelectorAll('.oct-grid__row .oct-grid__row--full-width');
  const rootElement = document.createElement('div');
  const no7Entry = document.querySelectorAll('.oct-grid__row .oct-grid__row--full-width');

  const allTracking = () => {
    poller([`.${ID}-advent-header button`], () => {
      const revealAll = document.querySelector(`.${ID}-advent-header`);
      
      if(revealAll) {
        revealAll.addEventListener('click', () => {
          fireEvent('Clicked reveal all offers');
        })
      }
    });
  }

  

  if (no7Entry[12] && document.location.pathname === '/no7'){
    no7Entry[12].parentElement.insertBefore(rootElement, no7Entry[12]);
    rootElement.id = `${ID}-root`;

    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', `${ID}-modal`);
    document.body.appendChild(modalContainer);

    render(<AdventCalendar id={ID} />, rootElement);

    allTracking();
    
  }
  if ( rootEntry[2] && (document.location.pathname === '/') ) {
    rootEntry[2].parentElement.insertBefore(rootElement, rootEntry[2]);
    rootElement.id = `${ID}-root`;

    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', `${ID}-modal`);
    document.body.appendChild(modalContainer);

    render(<AdventCalendar id={ID} />, rootElement);

    allTracking();
  }

  const discountInput = document.querySelector('#promoCode');
  const discountApply = document.querySelector('#WC_PromotionCodeDisplay_links_1');

  if (localStorage.getItem('NO7DISCOUNT') !== null && discountInput && discountApply) {
    discountInput.value = localStorage.getItem('NO7DISCOUNT');
    discountApply.click();
    localStorage.removeItem('NO7DISCOUNT');
  }

  const feedbackTab = document.querySelector('.usabilla_live_button_container');
  if (feedbackTab) feedbackTab.style.top = '45%';
 
};
