import pubSub from '../lib/publishSubscribe';
import { pollerLite } from '../../../../../lib/uc-lib';

export const addEvents = () => {
  /**
   * Add Click events
   */
  (() => {
    const prevOrders = document.querySelector('.PD042m .PD042m-popup-info .PD042m-orders > a');
    const search = document.querySelector('.PD042m .PD042m-popup-info form > div input#search');
    const viewBasket = document.querySelector('.PD042m .PD042m-popup-info .PD042m-totals .PD042m-basket a.btn');

    const runEvent = (elem, pubSubName) => {
      elem.addEventListener('click', () => {
        pubSub.publish(pubSubName);
      });
    };

    if (prevOrders) {
      runEvent(prevOrders, 'click-orders');
    }
    if (search) {
      runEvent(search, 'click-search');
    }
    if (viewBasket) {
      runEvent(viewBasket, 'click-basket');
    }
  })();
};

export const updateCart = (cb) => {
  // Use either jQuery or JQSG
  let $ = null;
  const determinePage = () => {
    // PDP to use JQSG
    if (document.querySelector('.productDetailsContent')) {
      $ = window.JQSG;
    }
    // PLP to use window.jQuery
    if (document.getElementById('resultsList')) {
      $ = window.jQuery;
    }
  };
  determinePage();
  const getCartDetails = () => {
    $(document).ajaxComplete((event, request, options) => {
      if (options.url === '/cart/add') {
        const data = JSON.parse(request.responseText);
        if (data) {
          cb(data);
        }
      }
    });
  };
  pollerLite([() => {
    return !!window.jQuery;
  }], () => {
    getCartDetails();
  });
};

export const closePopup = (popup, btn) => {
  if (popup && btn) {
    const popupWrap = popup.querySelector('.PD042m-popup-wrap');
    /**
     * Close btn
     */
    btn.addEventListener('click', () => {
      popup.parentNode.removeChild(popup);
      pubSub.subscribe('close-popup');
    });
    /**
     * Click outside
     */
    popup.addEventListener('click', (e) => {
      if (!popupWrap.contains(e.target)) {
        popup.parentNode.removeChild(popup);
        pubSub.subscribe('close-popup');
      }
    });
  }
};