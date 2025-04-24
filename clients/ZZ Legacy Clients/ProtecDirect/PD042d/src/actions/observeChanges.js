import { observer } from '../../../../../lib/uc-lib';
import cache from '../lib/cache';
// import { qs, qsa, elementExists } from '../lib/dom';
// import pubSub from '../lib/publishSubscribe';

const changesObserved = (cb) => {
  const cartPopup = cache.map.get('#cart_popup');
  if (cartPopup) {
    observer.connect(cartPopup, () => {
      if (cartPopup.style.display === 'block') {
        cb();
      }
    }, {
      config: {
        attributes: false,
        childList: true,
        subTree: false,
      },
    });
  }
};

export default changesObserved;

