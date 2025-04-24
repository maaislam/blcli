/**
 * AG013 - UX Basket update
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { getLayoutName } from '../../../../../lib/utils/avon';
import shared from './shared';
import desktopChanges from './changes/desktop';
import mobileChanges from './changes/mobile';

export default () => {
  const { rootScope, cartScope } = shared;
  setup();

  /**
   * Return a function for changes specific to the
   * current layout
   * @param {string} layout Current layout
   * @returns {function}
   */
  const getLayoutChanges = (layout) => {
    const changes = {
      Desktop: desktopChanges,
      Tablet: desktopChanges,
      Phone: mobileChanges,
    };

    return changes[layout];
  };

  const init = () => {
    getLayoutChanges(getLayoutName())();
  };

  const root = document.querySelector('#CartPage > div');
  const rootObserver = new MutationObserver(() => {
    setTimeout(init, 0);
  });
  rootObserver.observe(root, {
    childList: true,
    subtree: false,
    attributes: false,
  });


  // Make device specific changes when actions happen
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 0);
  });
  cartScope.$on('CartService_ChangeProductQuantitySuccess', () => {
    setTimeout(init, 0);
  });
  cartScope.$on('CartService.RemoveProductSuccess', () => {
    setTimeout(init, 0);
  });
  cartScope.$on('CartService_GetCartSuccess', () => {
    setTimeout(init, 0);
  });
  cartScope.$on('CartService.ApplyCouponSuccess', () => {
    setTimeout(init, 0);
  });
  cartScope.$on('CartService.RemoveCouponSuccess', () => {
    setTimeout(init, 0);
  });

  init();
};
