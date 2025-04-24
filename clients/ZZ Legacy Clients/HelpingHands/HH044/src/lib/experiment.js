/**
 * HH044 - Mobile Call CTA Update
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, updateInfinityNumbers } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  const { ID } = shared;

  const mobileCallBlock = document.querySelector('#mobile-call-block');
  mobileCallBlock.insertAdjacentHTML('beforebegin', `
    <div class="${ID}_newMobileCallBlock">
      <div class="${ID}_section ${ID}_section--care">
        <i class="glyphicon glyphicon-earphone"></i>
        <div class="${ID}_callBtn">
          <a data-tracked="true" id="${ID}_careNumber" class="phone-number InfinityNumber" href="tel:03300376958" data-ict-discovery-number="03300376958" data-number-type="care">03300376958</a>
        </div>
        <div class="${ID}_existingCustomers">Existing customers <a href="https://www.helpinghandshomecare.co.uk/existing-customers/">click here</a></div>
      </div>

      <div class="${ID}_section ${ID}_section--jobs">
        <i class="glyphicon glyphicon-earphone"></i>
        <div class="${ID}_callBtn">
          <a data-tracked="true" id="${ID}_jobNumber" class="phone-number InfinityNumber" href="tel:03331224269" data-ict-discovery-number="03331224269" data-number-type="job">03331224269</a>
        </div>
      </div>

      <div class="${ID}_section HH008_mobile">
        <p>
          <img src="/wp-content/uploads/icon-contact-experts.png">
          Our Experts are here to help, give us a<br class="HH008-sm_mobile"> call. Our team is available from: <br> Mon - Fri: 8am - 7pm Sat &amp; Sun: 9am - 5:30pm
        </p>
      </div>
    </div>
  `);

  // Bind events
  const newMobileCallBlock = document.querySelector(`.${ID}_newMobileCallBlock`);
  const careNumber = newMobileCallBlock.querySelector('[data-number-type="care"]');
  const jobNumber = newMobileCallBlock.querySelector('[data-number-type="job"]');
  const existingCustomers = newMobileCallBlock.querySelector(`.${ID}_existingCustomers a`);

  careNumber.addEventListener('click', () => {
    events.send(ID, 'Click', 'User clicked care number');
  });

  jobNumber.addEventListener('click', () => {
    events.send(ID, 'Click', 'User clicked job number');
  });

  existingCustomers.addEventListener('click', () => {
    events.send(ID, 'Click', 'User clicked existing customer');
  });

  updateInfinityNumbers();
};
