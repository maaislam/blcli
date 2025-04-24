/**
 * BO140 - Quick Links
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import content from './data';

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

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const pathname = window.location.pathname;
  const pageData = content[`${pathname}`];
  const quicklinksWrapper = `<div class="${ID}-quickLinks__wrapper">
    <div class="${ID}-quickLinks__container">
      <ul class="${ID}-quickLinks__container"></ul>
    </div>
  </div>`;

  document.querySelector('#estores_product_listing_widget .header_bar').insertAdjacentHTML('beforebegin', quicklinksWrapper);

  let quicklinks = '';
  for (var key in pageData) {
    if (pageData.hasOwnProperty(key)) {
        quicklinks += `<li class="${ID}-quickLink"><a href="${key}">${pageData[key]}</a></li>`;
        
    }
  }
  if (document.querySelectorAll(`ul.${ID}-quickLinks__container li`).length == 0) {
    document.querySelector(`ul.${ID}-quickLinks__container`).insertAdjacentHTML('beforeend', quicklinks);
  }
  
  const allLinks = document.querySelectorAll(`li.${ID}-quickLink`);
  [].forEach.call(allLinks, (link) => {
    const linkText = link.querySelector('a').innerText.trim();
    link.addEventListener('click', (e) => {
      fireEvent(`Clicked - Quick Link - ${linkText}`);
    });
  });
};
