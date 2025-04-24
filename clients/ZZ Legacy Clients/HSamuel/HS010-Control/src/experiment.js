import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/* eslint-enable */
pollerLite([
  'body',
  '.browse__main-content',
  '.items .product-tile-list__item',

  /**
   * Video DOM support
   */
  () => {
    if(!HTMLMediaElement || !HTMLVideoElement) {
      return false;
    }

    return HTMLMediaElement.prototype.hasOwnProperty('muted') 
      && HTMLMediaElement.prototype.hasOwnProperty('autoplay')
      && ('oncanplay' in window)
  },

  /**
   * Not IE11
   */
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
], () => {
  events.send('HS010', 'Control', 'HS010 activated');
});
