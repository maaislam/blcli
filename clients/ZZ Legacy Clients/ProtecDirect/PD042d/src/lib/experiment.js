// import pubSub from './publishSubscribe';
// import cache from './cache';
import settings from './settings';
// import { qs, qsa, elementExists } from './dom';
// import changesObserved from '../actions/observeChanges';
import { addHTML, updatePrice, updateCart, closePopup } from '../actions/popupChanges';
import { events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

const init = () => {
  events.send(settings.ID, 'Active', 'Test is active');
  document.body.classList.add(settings.ID);

  // Run on PDP
  const onPDP = document.getElementById('productDetailUpdateable');
  const PDPAddToBag = document.querySelector('button.positive.large');
  if (onPDP && PDPAddToBag) {
    // Poll for increasingly lightbox
    PDPAddToBag.addEventListener('click', () => {
      pollerLite([
        'body.active_popup.active_loader',
      ], () => {
        addHTML();
        setTimeout(() => {
          updatePrice();
        }, 500);
      });
    });
  } else {
    const popupRef = document.querySelector('body');
    const searchElement = document.querySelector('#nav_secondary .search form');
    // PLP Image
    let productImg = null;
    const plpProducts = document.querySelectorAll('.subcat_column-item');
    if (plpProducts.length) {
      for (let i = 0; plpProducts.length > i; i += 1) {
        const atbBtn = plpProducts[i].querySelector('button.pd3-addto__button');
        if (atbBtn) {
          atbBtn.addEventListener('click', () => {
            productImg = plpProducts[i].querySelector('.pd3-prod-content .thumb img');
          });
        }
      }
    }

    /**
     * Clear popup if already exists.
     */
    const popup = document.querySelector('.PD042d-popup');
    if (popup) {
      popupRef.removeChild(popup);
    }

    updateCart((cartData) => {
      if (cartData && searchElement) {
        const newTotal = cartData.cartData.total;
        const thisProductNumber = cartData.cartData.products.length - 1;
        const thisProduct = cartData.cartData.products[thisProductNumber];
        const thisSize = document.querySelector('.variant_options span.select.productVariantSelector');
        let sizeHtmlEl = '';
        let html = null;

        if (thisSize) {
          const sizeText = thisSize.textContent.match(/^Size\s\w+/i)[0];
          sizeHtmlEl = `
            <p>${sizeText}</p>
          `;
        }

        const loginEl = document.querySelector('#header ul.nav li.register');
        if (!loginEl) {
          html = `
            <div class="PD042d-popup clearfix">
              <div class="PD042d-popup-wrap">
                <div class="PD042d-title">
                  <h4>Added to Bag!</h4>
                  <div class="PD042d-close">
                    <span></span>
                    <span></span>
                  </div>
                </div>

                <div class="PD042d-popup-info clearfix">
                  <div class="PD042d-orders">
                    <h4>Find your next product:</h4>
                    <a href="https://www.protecdirect.co.uk/my-account/orders">View Previous Orders</a>
                    <p>or</p>
                    ${searchElement.outerHTML}
                  </div>

                  <div class="PD042d-img">
                    ${productImg.outerHTML}
                  </div>
                  <div class="PD042d-info">
                    <h5>${thisProduct.name}</h5>
                    ${sizeHtmlEl}
                    <p>Quantity: ${thisProduct.quantity}</p>
                  </div>

                  <div class="PD042d-totals">
                    <div class="PD042d-basket-total">
                      <p>Basket Total: £${parseFloat(newTotal).toFixed(2)}</p>
                    </div>
                    <div class="PD042d-basket">
                      <a href="https://www.protecdirect.co.uk/cart" class="btn">View Basket</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        } else {
          html = `
          <div class="PD042d-popup clearfix">
            <div class="PD042d-popup-wrap">
              <div class="PD042d-title">
                <h4>Added to Bag!</h4>
                <div class="PD042d-close">
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div class="PD042d-popup-info clearfix">

                <div class="PD042d-orders">
                  <h4>Find your next product:</h4>
                  ${searchElement.outerHTML}
                </div>

                <div class="PD042d-img">
                  ${productImg.outerHTML}
                </div>
                <div class="PD042d-info">
                  <h5>${thisProduct.name}</h5>
                  ${sizeHtmlEl}
                  <p>Quantity: ${thisProduct.quantity}</p>
                </div>

                <div class="PD042d-totals">
                  <div class="PD042d-basket-total">
                    <p>Basket Total: £${parseFloat(newTotal).toFixed(2)}</p>
                  </div>
                  <div class="PD042d-basket">
                    <a href="https://www.protecdirect.co.uk/cart" class="btn">View Basket</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        }
        popupRef.insertAdjacentHTML('afterbegin', html);
        // addEvents();
        closePopup(popupRef.querySelector('.PD042d-popup'), popupRef.querySelector('.PD042d-popup .PD042d-title .PD042d-close'));
      }
    });
  }
};

export default init;
