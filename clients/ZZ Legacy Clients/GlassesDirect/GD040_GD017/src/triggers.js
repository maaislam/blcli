import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([() => typeof window.mobileSite !== 'undefined'], () => {
  const mobileCheck = window.mobileSite;
  if (mobileCheck === true) {
    pollerLite([
      '#nav-primary-inner',
      '#nav-secondary .contact-phone.menu-item',
    ], activate);
  } else {
    pollerLite([
      '#nav-primary-inner',
      '.nav-help.item-level-1',
    ], activate);
  }
});

// Qubit Triggers
/*
const poller = require('@qubit/poller');

poller(['window.mobileSite'], () => {
  const isMobile = window.mobileSite;
  if (isMobile) {
    poller([
      '#nav-primary-inner',
      '#nav-secondary .contact-phone.menu-item',
    ], () => {
      cb(true);
    });
  } else {
    poller([
      '#nav-primary-inner',
      '.nav-help.item-level-1',
    ], () => {
      cb(true);
    });
  }
});
*/
