/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { mentalHealthContent } from './files/mentalHealthContent';

const { ID, VARIATION } = shared;

const init = () => {
  //console.log(`${ID} is working`);

  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if (!document.querySelector(`.${ID}__mental-health-container`)) {
    document.querySelector('.course-info .wrapper').innerHTML = mentalHealthContent(ID);

    if (location.pathname.includes('/wellbeing-support-at-work')) {
      document.querySelector('.mh-tag.hour-tag').innerText = '2 Hours';
    }

    if (
      location.pathname.includes('/stress-management-at-work/') ||
      location.pathname.includes('/mental-health-awareness-for-managers/')
    ) {
      document.querySelector('.mh-tag.hour-tag').innerText = '1 day';
      document.querySelector('li.mh-bullet.bullet-one').innerText = 'Group bookings of 6-24 learners per course';
      document.querySelector('li.mh-bullet.bullet-three').innerText = 'From £1,420 + VAT';
    }
  }
};

export default () => {
  // newEvents.initiate = true;
  // newEvents.methods = ['ga4'];
  // newEvents.property = 'G-2N7DXLH3YG';
  setup();
  fireEvent('Conditions Met');
  document.querySelector('body').addEventListener('click', ({ target }) => {
    if (target.closest('.mh-button a')) {
      const isGroupBooking = target.closest('.group-booking');
      fireEvent('User clicks Enquire Now');
      fireEvent(`User clicks Enquire Now for ${isGroupBooking ? 'group' : 'individual'} booking`);
    }
  });
  init();
};
