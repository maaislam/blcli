import pubSub from './publishSubscribe';
import settings from './settings';
import { addEvents, updateCart, closePopup } from '../actions/popupChanges';
import { events } from '../../../../../lib/utils';

const init = () => {
  if (document.body.classList.contains('PD002')) {
    // return false;
  }
  events.send(settings.ID, 'Active', 'Test is active');
  document.body.classList.add(settings.ID);

  /**
   * Run Changes
   */
  (() => {
    // store variables
    const searchElement = document.querySelector('#header .ui-header form');
    const popupRef = document.getElementById('body');
    let thisSize;
    let quantityVal = 0;

    // PDP Image
    let productImg = document.querySelector('.productDetailsContent .productDetailPanel div.prod_image_main img:last-of-type');
    if (!productImg) {
      // PLP images
      const atbButtons = document.querySelectorAll('.productlistItem .positive.add-to-basket.ui-mini');
      if (atbButtons.length) {
        for (let i = 0; atbButtons.length > i; i += 1) {
          atbButtons[i].addEventListener('click', () => {
            productImg = atbButtons[i].parentElement.parentElement.parentElement.parentElement.querySelector('.productlistItem .prod_image_main');
            thisSize = atbButtons[i].parentElement.parentElement.parentElement.parentElement.querySelector('.variant_options select.select');
            thisSize = thisSize.options[thisSize.selectedIndex].text;
            // Quantity
            const productQty = atbButtons[i].parentElement.parentElement.parentElement.parentElement.querySelector('.common-qty .qty .ui-controlgroup-controls .qtyTextbox');
            if (productQty) {
              quantityVal = productQty.value;
            }
          });
        }
      }
    }

    /**
     * Clear popup if already exists.
     */
    const popup = document.querySelector('.PD042m-popup');
    if (popup) {
      popupRef.removeChild(popup);
    }

    updateCart((cartData) => {
      if (cartData && searchElement) {
        const newTotal = cartData.cartData.total;
        const thisProductNumber = cartData.cartData.products.length - 1;
        const thisProduct = cartData.cartData.products[thisProductNumber];

        if (document.querySelector('.productDetailsContent')) {
          thisSize = [];
          const sizes = document.querySelectorAll('.pd2-size-selector .pd2-size-selector__option');
          if (sizes.length) {
            for (let i = 0; sizes.length > i; i += 1) {
              const sizeInput = sizes[i].querySelector('.pd2-size-selector__quantity');
              quantityVal += parseInt(sizeInput.value, 10);
              const sizeName = sizes[i].querySelector('.pd2-size-selector__details');
              if (sizeInput && sizeInput.value > 0) {
                thisSize.push({
                  name: sizeName.innerHTML,
                  val: sizeInput.value,
                });
              }
            }
          }
        }

        let sizeHtmlEl = '';
        let html = null;
        if (Array.isArray(thisSize)) {
          for (let i = 0; thisSize.length > i; i += 1) {
            sizeHtmlEl += `
              <div class="PD042-size--row">
                <p>${thisSize[i].name} x ${thisSize[i].val}</p>
              </div>
            `;
          }
        } else {
          // const sizeText = thisSize.match(/^Size\s\w+/i)[0];
          sizeHtmlEl += `
            <p>${thisSize}</p>
          `;
        }
        const loginEl = document.querySelector('#header .btn-signin a[href="/login"]');
        if (!loginEl) {
          html = `
            <div class="PD042m-popup">
              <div class="PD042m-popup-wrap">
                <div class="PD042m-title">
                  <h4>Added to Bag!</h4>
                  <div class="PD042m-close">
                    <span></span>
                    <span></span>
                  </div>
                </div>

                <div class="PD042m-popup-info">
                  <div class="PD042m-img">
                    ${productImg.outerHTML}
                  </div>
                  <div class="PD042m-info">
                    <h5>${thisProduct.name}</h5>

                    ${sizeHtmlEl}

                    <p>Quantity: ${quantityVal}</p>
                  </div>

                  <div class="PD042m-orders">
                    <h4>Find your next product:</h4>
                    <a href="https://www.protecdirect.co.uk/my-account/orders">View Previous Orders</a>
                    <p>or</p>
                    ${searchElement.outerHTML}
                  </div>

                  <div class="PD042m-totals">
                    <div class="PD042m-basket-total">
                      <p>Basket Total:<br />£${parseFloat(newTotal).toFixed(2)}</p>
                    </div>
                    <div class="PD042m-basket">
                      <a href="https://www.protecdirect.co.uk/cart" class="btn">View Basket</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        } else {
          html = `
          <div class="PD042m-popup">
            <div class="PD042m-popup-wrap">
              <div class="PD042m-title">
                <h4>Added to Bag!</h4>
                <div class="PD042m-close">
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div class="PD042m-popup-info">
                <div class="PD042m-img">
                  ${productImg.outerHTML}
                </div>
                <div class="PD042m-info">
                  <h5>${thisProduct.name}</h5>
                  ${sizeHtmlEl}
                  <p>Quantity: ${quantityVal}</p>
                </div>

                <div class="PD042m-orders">
                  <h4>Find your next product:</h4>
                  ${searchElement.outerHTML}
                </div>

                <div class="PD042m-totals">
                  <div class="PD042m-basket-total">
                    <p>Basket Total:<br />£${parseFloat(newTotal).toFixed(2)}</p>
                  </div>
                  <div class="PD042m-basket">
                    <a href="https://www.protecdirect.co.uk/cart" class="btn">View Basket</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        }
        popupRef.insertAdjacentHTML('afterbegin', html);
        addEvents();
        closePopup(popupRef.querySelector('.PD042m-popup'), popupRef.querySelector('.PD042m-popup .PD042m-title .PD042m-close'));
      }
    });
  })();
  /**
   * Fire event on open of popup
   */
  pubSub.publish('user-saw');
};

export default init;
