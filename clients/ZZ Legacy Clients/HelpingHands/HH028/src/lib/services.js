import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};


/**
 * Get Google Maps script URL with API key from /our-locations/
 */
export const getGoogleMaps = () => {
  const request = new XMLHttpRequest();
  request.open('GET', '/our-locations/', true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const temp = document.createElement('div');
      temp.innerHTML = request.responseText;
      const script = temp.querySelector('script[src*="https://maps.google.com/maps/api/"]');
      if (script && script.src) {
        // Wait for jQuery
        pollerLite([() => !!window.jQuery], () => {
          window.jQuery.getScript(script.src, () => {
            this.bindLocSearch.call(this);
          });
        });
      }
    }
  };

  request.send();
}
