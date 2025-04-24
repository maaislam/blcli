// import cache from '../lib/cache';
// import elementExists from '../lib/dom';
import settings from '../lib/settings';
import pubSub from '../lib/publishSubscribe';
import { pollerLite } from '../../../../../lib/uc-lib';


export const updateCart = (cb) => {
  // Use either jQuery or JQSG
  let $ = null;
  const getCartDetails = () => {
    $ = window.jQuery;
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

const closeIncreasingly = () => {
  // Click increasingly to close the lightbox
  pollerLite([
    '#plp_modal > .inc_icon_close',
  ], () => {
    document.querySelector('#plp_modal > .inc_icon_close').click();
  });
};

export const addHTML = () => {
  /**
   * Add Elements
   */
  const searchElm = document.querySelector('.nav_secondary .manage_users.search form');
  const productImage = document.querySelector('.prod_primary_image');
  const productTitle = document.querySelector('.catBanner > h2').textContent;
  const productQuantity = document.getElementById('qty').value;
  const productVariationEl = document.getElementById('variant');
  let variationOption = '';
  if (productVariationEl) {
    const tempText = productVariationEl.options[productVariationEl.selectedIndex].text;
    variationOption = `<p class="PD042_Product_Variant">${tempText.substring(0, tempText.indexOf(','))}</p>`;
  }
  const detailMarkUp = `
    <img src="${productImage.getAttribute('src')}" class="PD042_Cart_Image" alt=${productImage.getAttribute('alt')} />
    <p class="PD042_Cart_Product_Title">${productTitle}</p>
    ${productVariationEl ? variationOption : ''}
    <p class="PD042_Cart_Product_Quantity">Quantity Added ${productQuantity}</p>
  `;
  /**
   * Check if user is logged in
   */
  const loginEl = document.querySelector('#header ul.nav li.register');
  let html = null;
  if (!searchElm) {
    return false;
  }
  if (loginEl) {
    // Not logged in
    html = `
      <div class="PD042_Modal_BG">
        <div class="${settings.ID}-popup-PDP clearfix">
          <p class="PD042_Cart_Header">Added to Bag!<span class="PD041_Cart_Close">x</span></p>
          <div class="PD042_Cart_Detail_Container">
            <div class="PD042_Next_Product_Container">
              <h4>Find your next product:</h4>
              <p>Or</p>
              ${searchElm.outerHTML}
            </div>
            <div class="${settings.ID}-details">
              ${detailMarkUp}
              <a href="/cart" class="PD042_Cart_ATB">View Basket</a>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    html = `
    <div class="PD042_Modal_BG">
      <div class="${settings.ID}-popup-PDP clearfix">
      <p class="PD042_Cart_Header">Added to Bag!<span class="PD041_Cart_Close">x</span></p>
        <div class="PD042_Cart_Detail_Container">
          <div class="PD042_Next_Product_Container">
            <h4>Find your next product:</h4>
            <a href="/my-account/orders" class="${settings.ID}-prev-orders">View Previous Orders</a>
            <p>Or</p>
            ${searchElm.outerHTML}
          </div>
          <div class="${settings.ID}-details">
            ${detailMarkUp}
            <a href="/cart" class="PD042_Cart_ATB">View Basket</a>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  document.body.insertAdjacentHTML('beforeend', html);
  document.querySelector('.PD041_Cart_Close').addEventListener('click', closeIncreasingly);
  document.querySelector('.PD042_Modal_BG').addEventListener('click', closeIncreasingly);

  /**
   * Add Click events
   */
  (() => {
    const prevOrders = document.querySelector('#cart_popup.cart_popup .PD042d-popup a.PD042d-prev-orders');
    const search = document.querySelector('#cart_popup.cart_popup .PD042d-popup form input#search');
    const viewBasket = document.querySelector('.PD042d #cart_popup.cart_popup .links a.neutral.large.autodisable');
    const closePopup = document.querySelector('#cart_popup.cart_popup .title a.close');
    const popup = document.querySelector('#cart_popup.cart_popup');

    if (closePopup) {
      closePopup.addEventListener('click', () => {
        popup.classList.remove('PD042d-show');
      });
      document.addEventListener('click', (e) => {
        const clickInside = popup.contains(e.target);
        if (!clickInside) {
          popup.classList.remove('PD042d-show');
        }
      });
    }

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

export const updatePrice = () => {
  // Get latest total
  let total = document.querySelector('#cart_content dl#minicart_data > dd span.total');
  if (!total) {
    total = document.querySelector('#cart_header #cart_content dl#minicart_data dd');
  }
  const totalRef = document.querySelector(`.${settings.ID}-popup .${settings.ID}-total p`);
  if (totalRef && total) {
    totalRef.innerHTML = `Basket total: ${total.textContent}`;
  }
};


export const closePopup = (popup, btn) => {
  if (popup && btn) {
    const popupWrap = popup.querySelector('.PD042d-popup-wrap');
    /**
     * Close btn
     */
    btn.addEventListener('click', () => {
      popup.parentNode.removeChild(popup);
      closeIncreasingly();
    });
    /**
     * Click outside
     */
    popup.addEventListener('click', (e) => {
      if (!popupWrap.contains(e.target)) {
        popup.parentNode.removeChild(popup);
        pubSub.subscribe('close-popup');
        closeIncreasingly();
      }
    });
  }
};
