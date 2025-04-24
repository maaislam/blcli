import Run from './experiment';
import { pollerLite } from '../../../../../../../lib/uc-lib';

export default () => {
  const URL = window.location.pathname;

  pollerLite([
    '#nav-primary-inner',
    () => {
      if (sessionStorage.getItem('GD017_offers')) {
        return true;
      } else if (URL === '/' && document.getElementById('GD_3_banner_img')) {
        return true;
      } else {
        return true
      }
    },
  ], Run);

  // Mobile poller 
  // pollerLite([
  //   '#nav-primary-inner',
  //   '#nav-secondary .contact-phone.menu-item',
  // ], Run);
};
