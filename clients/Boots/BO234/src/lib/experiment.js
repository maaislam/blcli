/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
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
  if(VARIATION == 'control') {
    return;
  }


  const pointsAmount = document.querySelector('.rwdPointsContent strong');

  const pointsNo = parseFloat(pointsAmount.innerText.replace('points', ''));
  const newPoints = pointsNo * 2;
  const value = newPoints/100;


  const parentBanner = document.createElement('div');
  parentBanner.classList.add(`${ID}-pc-banner`);
  parentBanner.innerHTML = 
  `<div class="pc-logo"></div>
  <div class="pc-banner__points">
    <p>Collect <span class="points">${newPoints}</span> points with this purchase when you join the Parenting Club = <span class="amount">£${value.toFixed(2)}</span> to spend online*</p>

  </div>
  <div class="pc-terms">
    <p>*Join Boots Parenting Club & get 8 points for every £1 spend on eligible baby products</p>
    <p>*Ts & Cs apply. <a href="/advantage-card-terms-and-conditions" target="_blank">Read more here</a></p>
  </div>
  <div class="parenting-club">
    <a class="pc-button" href="/baby-child/parenting-club">Join now</a>
  </div>`;


  document.querySelector('#estore_adcard_points_to_earn_widget').insertAdjacentElement('beforebegin', parentBanner);

  document.querySelector(`.${ID}-pc-banner .pc-button`).addEventListener('click', () => {
    fireEvent('Clicked parenting banner join button');
  });

};
