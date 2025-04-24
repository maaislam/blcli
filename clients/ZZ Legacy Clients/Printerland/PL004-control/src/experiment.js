import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
/* eslint-disable */
pollerLite([
  '.detail_items.cross-sell',
], () => {

  events.send('PL004', 'View', 'PL004 activated - Control');

  const scrollIntoView = function () {
    window.addEventListener('scroll', function () {
      const elementTarget = document.querySelector('.detail_items.cross-sell');
      if (window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight - 100)) {
        events.send('PL004', 'View', 'PL004 cross sell items shown - Control', { sendOnce: true });
      }
    });
  };
  scrollIntoView();
});
