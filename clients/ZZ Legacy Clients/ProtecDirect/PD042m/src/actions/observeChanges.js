import { observer } from '../../../../../lib/uc-lib';
import cache from '../lib/cache';
import { qs, qsa, elementExists } from '../lib/dom';
import pubSub from '../lib/publishSubscribe';

const changesObserved = (cb) => {
  const cartPopup = cache.map.get('body');
  if (cartPopup) {
    observer.connect(cartPopup, () => {
      if (cartPopup.classList.contains('active_popup')) {
        cb();
      }
    }, {
      config: {
        attributes: true,
        childList: false,
        subTree: false,
      },
    });
  }
};

export default changesObserved;

