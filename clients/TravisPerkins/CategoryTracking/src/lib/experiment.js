/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events, observePageChange } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

/**
 * Track from breadcrumbs
 */
const doTrack = () => {
  pollerLite(['[data-test-id="breadcrumbs"] [class*=Breadcrumbs__LinkWrapper]'], () => {
    const links = document.querySelectorAll('[data-test-id="breadcrumbs"] [class*=Breadcrumbs__LinkWrapper]');

    if(links && links[1]) {
      const data = JSON.parse(localStorage.getItem('UCCatTrk') || '[]');

      const result = links[1].innerText.trim();
      if(data[data.length - 1] != result) {
        data.push(result);

        localStorage.setItem('UCCatTrk', JSON.stringify(data)); 
      }
    }
  });
};

/**
 * URL is listing page or product page
 */
const shouldTrack = (url) => {
  return (url.match(/\/p\/\d+/i) || url.match(/\/product\//i));
};

/**
 * Entry point for experiment code
 */
export default () => {

  // When a page changes (async router behaviour)
  observePageChange(document.body, (p) => {
    if(shouldTrack(p.href)) {
      doTrack();
    }
  });

  // On page load
  if(shouldTrack(window.location.href)) {
    doTrack();
  }
};
