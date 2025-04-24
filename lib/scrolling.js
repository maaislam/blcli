/**
 * Check intersection
 *
 * @param {HTMLElement} target
 * @param {Number} threshold (0 to 1)
 * @param {Boolean} runOnce If true, disconnects the observer
 */
export const checkIntersection = (target, threshold = 0, runOnce = true) => {
  return new Promise((resolve, reject) => {
    const options = {
      rootMargin: '0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      const entry = entries?.[0];
      if(entry && entry.isIntersecting) {
        if(runOnce) {
          observer.disconnect();
        }

        resolve(observer);
      }
    }, options);

    observer.observe(target);  
  });
};
