import settings from './settings';
import pubSub from './PublishSubscribe';

/**
 * @constant
 */
const scrollEventListeners = [];

/**
 * On scroll check items in view
 *
 * @access private
 */
export const checkInView = (elm) => {
  const rect = elm.getBoundingClientRect();

  return rect.top < window.innerHeight && rect.bottom >= 0;
}

/**
 * On scroll
 *
 * @return {Promise}
 */
export const checkItemsInViewOnScroll = () => {
  const promise = new Promise((res, rej) => {
    const listener = () => {
      const items = document.querySelectorAll(`.${settings.ID}-list-item`);
      [].forEach.call(items, (item) => {
        if(checkInView(item)) {
          res();
        }
      });
    };

    scrollEventListeners.push(listener);

    window.addEventListener('scroll', listener, false);
  });

  return promise;
};

/**
 * Kill scroll listeners
 */
export const killScrollListeners = () => {
  scrollEventListeners.forEach((listener, idx) => {
    window.removeEventListener('scroll', listener, false);
  });
};
