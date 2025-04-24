import { events } from '../../../../lib/utils';
import { pollerLite, throttle } from '../../../../lib/uc-lib';

/* eslint-disable */
pollerLite([
  '.buying-options',
  '#buy',
  () => {
    try {
      return !!window.digitalData.product[0];
    } catch(e) {}
  },
  () => {
    try {
      return !!window.jQuery;
    } catch(e) {}
  },
], () => {
  events.send('HS016', 'Control', 'HS016 activated');

  const buyingForm = document.querySelector('.buying-buttons');
  const scrollCheck = throttle(() => {
    const waypoint = buyingForm.getBoundingClientRect().bottom;
    if (waypoint < 0) {
      events.send('HS016', 'Control', 'Scrolled to sticky CTA point', { sendOnce: true });
      window.removeEventListener('scroll', scrollCheck);
    }
  }, 200);

  window.addEventListener('scroll', scrollCheck);
});
/* eslint-enable */
