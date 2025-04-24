/**
 * FL083 - Free delivery option
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events, setCookie, getCookie, deleteCookie } from '../../../../../lib/utils';
import { observer, pollerLite } from '../../../../../lib/uc-lib';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;
  if (VARIATION == 2) {
    events.send(ID, 'FL083 Control', 'FL083 Control is active');
    return false;
  } else {
    events.send(ID, 'FL083 Variation Active', 'FL083 Variation 1 is active');
  }

  let hasScrolled = false;
  let scrollPos = 0;
  

  // Add observer to header to monitor the sticky nav class
  const header = document.querySelector('#HeaderGroup');
  const sortBy = document.querySelector('.mobCbRow');
  
  const banner = document.querySelector('.HeaderTopFlan');
  let bannerHeight = 0;
  if (banner) {
    bannerHeight = banner.offsetHeight;
  }
  
  if (bannerHeight > 0 && sortBy) {
    sortBy.classList.add('FL083-extraH');
  }

  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 120) {
      if (bannerHeight > 0) {
        sortBy.style.top = `${bannerHeight}px`;
      } else {
        sortBy.style.top = '0px';
      }
    } else {
      if (bannerHeight > 0) {
        sortBy.style.top = `${bannerHeight + 90}px`;
      } else {
        sortBy.style.top = '90px';
      }
    }
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop){
        // downscroll code
    } else {
        sortBy.style.top = `${bannerHeight + 90}px`;
    }
    lastScrollTop = st <= 0 ? 0 : st;
  });





};
