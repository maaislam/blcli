/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';

import swiper from './helpers/swiper';
import initSwiper from './helpers/initSwiper';
import setupUi from './helpers/seupUi';
import obsIntersection from './helpers/obsIntersection';

let seenChocolatebox = false;
let resizeTimeout;
const { ID, VARIATION } = shared;

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.method = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  const widgetWrapper = document.querySelector('[impression-list-type]');

  const intersectionCallback = (entry) => {
    //console.log('entry', entry);
    if (entry.isIntersecting && seenChocolatebox === false) {
      seenChocolatebox = true;
      //console.log('Users sees a chocolate box PDP');
      fireEvent('Users sees a chocolate box PDP');
    }
  };

  obsIntersection(widgetWrapper, 0.5, intersectionCallback);

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    //console.log('🚀 ~ document.body.addEventListener ~ target:', target);

    if (target.closest('.componentPagination') && !target.closest('button:not(.btn-active)')) {
      //console.log('user clicked show more');
      fireEvent('user clicked show more');
    } else if (target.closest('#componentQvBtn')) {
      fireEvent('User clicks "Quick View" ');
    } else if (target.closest('.product-component-item') && !target.closest('#componentQvBtn') && VARIATION === 'control') {
      fireEvent('User interacts with the chocolate " menu " item');
    }
  });

  setupUi();
  swiper();
  initSwiper('.swiper');

  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
      window.swiper.destroy(true, true);
      setupUi();
      initSwiper('.swiper');
    }, 500);
  });
};
