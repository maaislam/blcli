/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;
const DUMMY_DATA = '1';

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  if (window.location.href.indexOf('us.neomwellbeing.com') > -1) {
    newEvents.property = 'G-KJ9062XWWK';
  } else if (window.location.href.indexOf('neomwellbeing.eu') > -1) {
    newEvents.property = 'G-9CQMVE6E0J';
  } else {
    newEvents.property = 'G-884D6MBLFG';
  }

  setup();

  const visitCountElement = document.querySelector('.visitor-counter-content-box-carecartbysalespop-2020');
  const visitCount = visitCountElement ? visitCountElement.innerText.trim() : DUMMY_DATA; // just for testing
  const quantityElement = document.querySelector('#quantity');
  if (visitCountElement) {
    visitCountElement.style.display = 'none';
  }

  quantityElement.addEventListener('change', () => {
    fireEvent('User interact with quantity');
  });

  if (visitCount * 1 >= 2) {
    fireEvent('Conditions Met');
  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    //hide if control
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const customHtml = `
    <div class="${ID}__vistorcount">${visitCount} people currently viewing</div>
  `;
  const anchorPointSelector = VARIATION === '1' ? '.product-images' : '.product__stock_points';
  const anchorPoint = document.querySelector(anchorPointSelector);

  const badge = document.querySelector(`.${ID}__vistorcount`);

  if (badge) {
    badge.remove();
  }
  console.log('visitCount', visitCount);

  visitCount * 1 >= 2 && anchorPoint.insertAdjacentHTML('afterbegin', customHtml);
};
