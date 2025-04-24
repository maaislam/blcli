/**
 * @constant
 */
const scrollEventListeners = [];

/**
 * Check item in view
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
 * @param {NodeList} items
 * @return {Promise}
 */
export const checkItemsInViewOnScroll = (items) => {
  const promise = new Promise((res, rej) => {
    const listener = () => {
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
