/**
 * HH047 - Out of Hours CTA
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, checkOfficeHours, addOutOfOfficeElementsDesktop, addOutOfOfficeElementsMobile } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import nextAvailable from './nextAvailable';

const { ID, VARIATION } = shared;

export default () => {
  
  // Get Device Template
  const width = window.innerWidth;
  let device = '';
  if (width > 767) {
    device = 'desktop';
  } else {
    device = 'mobile';
  }

  // -- Coronavirus Yellow Banner
  pollerLite(['.c19-header-strip', '.container-fluid .row .logo-block'], () => {
    document.querySelector('body').classList.add('yellow-banner__exists');
    if (document.querySelectorAll('.container-fluid .row .logo-block')[0]) {
      document.querySelectorAll('.container-fluid .row .logo-block')[0].classList.add('yellow-banner__exists');
    }
    if (document.querySelectorAll('.container-fluid .row .logo-block')[1]) {
      document.querySelectorAll('.container-fluid .row .logo-block')[1].classList.add('yellow-banner__exists');
    }
    
  });
  // Write experiment code here
  // --- Day of Week
  const d = new Date();
  const n = d.getDay();
  const h = d.getHours();
  // --- Office Hours ---
  // ---- Weekdays
  const startTime = '08:00:00';
  const endTime = '19:00:00';
  // const endTime = '12:00:00';
  const outOfOfficeWeek = checkOfficeHours(startTime, endTime);
  // --- Weekend
  const weekendStartTime = '09:00:00';
  const weekendEndTime = '18:00:00';
  const outOfOfficeWeekend = checkOfficeHours(weekendStartTime, weekendEndTime);

  // *** Week Days
  if (n !== 0 && n !== 6) {
    if (!outOfOfficeWeek ) {
    //if (!outOfOfficeWeekend ) {
      setup();
      if (device === 'desktop') {
        addOutOfOfficeElementsDesktop();
      } else {
        addOutOfOfficeElementsMobile();
      } 
    }
    if (h < 8) {
      nextAvailable.availableHour = '8am';
      nextAvailable.availableDay = 'today';
    } else if (h > 18) {
      nextAvailable.availableHour = '8am';
      nextAvailable.availableDay = 'tomorrow';
    }
    // -- Friday
    if (n === 5 && h > 18) {
      nextAvailable.availableHour = '9am';
      nextAvailable.availableDay = 'tomorrow';
    }
  } else if (n === 0 || n === 6) {
    if (!outOfOfficeWeekend ) {
    //if (!outOfOfficeWeekend ) {
      setup();
      if (device === 'desktop') {
        addOutOfOfficeElementsDesktop();
      } else {
        addOutOfOfficeElementsMobile();
      }
      if (h < 9) {
        nextAvailable.availableHour = '9am';
        nextAvailable.availableDay = 'today';
      } else if (h > 17) {
        nextAvailable.availableHour = '9am';
        nextAvailable.availableDay = 'tomorrow';
      }
      // -- Sunday
      if (n === 0 && h > 17) {
        nextAvailable.availableHour = '8am';
        nextAvailable.availableDay = 'tomorrow';
      }
    }
  }
  
  
};
