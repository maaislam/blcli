/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "./services";
import { pollerLite } from "../../../../../lib/utils";
import shared from "./shared";

const runMobileChanges = () => {
  pollerLite(["#cart-link"], () => {
    const existingBasketBtn = document.querySelector("#cart-link");
    if (existingBasketBtn) {
      existingBasketBtn.removeAttribute("href");

      const cartButton = document.querySelector("#cart-link");
      if (cartButton) {
        const cartLink = cartButton.querySelector("a");
        cartLink.removeAttribute("href");

        // Set currency:
        var currencyCode = '';
        switch (window.universal_variable.basket.currency) {
          case "AUD":
            currencyCode = 'A$';
            break;
          case "CAD":
            currencyCode = "C$";
            break; 
          case "GBP":
            currencyCode = "£";
            break;
          case "USD":
            currencyCode = "$";
            break;
          case "EUR":
            currencyCode = "€";
            break;
          default:
            currencyCode = "$";
        }

        const cartMarkup = `
            <div class="${shared.ID}__minibag">
            <div class="minicart modal in ${shared.ID}__minibag-bag" aria-hidden="false">
              <div class="${shared.ID}__minibag__x-bar">
                <div class="${shared.ID}__minibag__x-bar__btn">&#215;</div>
              </div>
                  <div class="product-list ${shared.ID}__minibag-bag__product-list">
                    <p class="center text-center ${shared.ID}__loading">Loading...</p>
                  </div>
                  <div class="mincart-totals">
                    
                      <span class="minicart-delivery-line"><span>Estimated delivery
                        
                          
                        :
                      </span> <span>${currencyCode} ${window.universal_variable.basket.shipping_cost}</span></span>
                    
                    <br>
                    <span class="minicart-items-total-line"><span>Items total:</span> <span>${currencyCode} ${window.universal_variable.basket.subtotal}</span></span>
                  </div>
                
                <a href="/uk/shopping-bag/" class="large button secondary">View bag</a>
                <span class="checkout-group"><span class="checkout-action-item"><a href="/uk/checkout/welcome/" class="large button normal-checkout">Checkout securely</a></span></span>
              
              </div>
              <div class="modal-backdrop  in ${shared.ID}__backdrop"></div>
              </div>
          `;

        document.body.insertAdjacentHTML("afterbegin", cartMarkup);

        const basketItems = window.universal_variable.basket.line_items;
        const basketItemQty = basketItems.length;
        if (basketItems.length > 0) {
          const productList = document.querySelector(`.${shared.ID}__minibag .product-list`);
          productList.innerHTML = '';
          var slicedBasket = basketItems.slice(Math.max(basketItems.length -2, 0));
            [].forEach.call(slicedBasket, (basketItem) => {

              // Grab image ?
              var productImageUrl = '';
              jQuery.ajax({
                url: basketItem.product.url,
                success(data) {
                  var d = document.createElement('div');
                  d.innerHTML = data;
                  const foundImage = d.querySelector('#zoom1');
                  productImageUrl = foundImage.href;
                  const markup = `
                  <div class="cart-item" style="display: block;">
                    <div class="cartitem-image"><a href="/uk/faux-fur-coat-agostina_s/"><img src="${productImageUrl}" width="125" height="125" alt="${basketItem.product.name}"></a></div>
                    <div class="cartitem-details">
                      <div class="cartitem-desc">
                          <p><a class="desc" href="${basketItem.product.url}">
                            ${basketItem.product.name}
                            </a>
                          </p>
                          <p class="from-designer"><a class="designer-name">${basketItem.product.manufacturer}</a></p>
                      </div>
                      <div class="cartitem-amounts">
                          <div class="cartitem-prices">
                            <div class="product-price-detail">${currencyCode}${basketItem.subtotal}</div>
                          </div>
                          <div class="cartitem-quantity">×${basketItem.quantity}</div>
                      </div>
                    </div>
                  </div>
                    `;
                  productList.insertAdjacentHTML('afterbegin', markup);
                }
              })
            });
          // }
          // if (basketItems.length > 2) {

          // Handle extra items
          if (basketItemQty > 2) {
            var remainingItems = basketItemQty - 2;
            const moreItemsMarkup = `
              <div class="more-items">
                <a href="/shopping-bag/">+ ${remainingItems} more</a>
              </div>
            `;
            productList.insertAdjacentHTML('beforeend', moreItemsMarkup);
          }

        }

        // Initial ajax implementation:
        // jQuery.ajax({
        //   url: '/shopping-bag',
        //   success(data) {
        //     var d = document.createElement('div');
        //     d.innerHTML = data;
        //     const products = d.querySelectorAll('.order-details-table .item-table .packageitem-container');

        //     const productList = document.querySelector(`.${shared.ID}__minibag .product-list`);
        //     productList.innerHTML = '';

        //     [].forEach.call(products, (product) => {
        //       const markup = `
        //         <div class="${shared.ID}__product">
        //           ${product.innerHTML}
        //         </div>
        //       `;

        //       productList.insertAdjacentHTML('afterbegin', markup);
        //     })

        //   }
        // })

        const overlay = document.querySelector(`.${shared.ID}__backdrop`);

        if (overlay) {
          overlay.addEventListener("click", () => {
            const ucMinibag = document.querySelector(`.${shared.ID}__minibag`);
            ucMinibag.style.display = "none";
          });
          const continueBtn = document.querySelector(`.${shared.ID}__continue`);
          if (continueBtn) {
            continueBtn.addEventListener("click", () => {
              const ucMinibag = document.querySelector(
                `.${shared.ID}__minibag`
              );
              ucMinibag.style.display = "none";
            });
          }
        }
        // Add click to basket button
        const ourMinibag = document.querySelector(`.${shared.ID}__minibag`);
        if (ourMinibag) {
          cartButton.addEventListener("click", () => {
            ourMinibag.style.display = "block";
          });
        }

        const closeBtn = document.querySelector(`.${shared.ID}__minibag__x-bar__btn`);
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            ourMinibag.style.display = 'none';
          })
        }

        pollerLite(["#loading-overlay"], () => {
          ourMinibag.remove();
          cartButton.addEventListener("click", () => {
            const wbOverlay = document.querySelector("#loading-overlay");
            const wbMinibag = document.querySelector(".minicart");
            const wbBackdrop = document.querySelector('.modal-backdrop');
            // const wbBackdrop = document.querySelector(".modal-backdrop");
            const continueShopping = document.querySelector('[data-dismiss=modal]');
            continueShopping.addEventListener('click', () => {
              wbMinibag.style.display = 'none';
              wbMinibag.setAttribute("aria-hidden", true);
              wbBackdrop.style.display = 'none';
            })
            const myBackdrop = `
              <div class="modal-backdrop in"></div>
            `;
            wbMinibag.style.display = "block";
            wbMinibag.setAttribute("aria-hidden", false);
            wbMinibag.insertAdjacentHTML('afterend', myBackdrop);
            pollerLite([
              '.modal-backdrop'
            ], () => {
              const wbBackdrop = document.querySelector('.modal-backdrop');
              if (wbBackdrop) {
                wbBackdrop.addEventListener('click', () => {
                  wbMinibag.style.display = 'none';
                  wbMinibag.setAttribute("aria-hidden", true);
                  wbBackdrop.style.display = 'none';
                })
              }
            })
          });
        });

        // })
      }
    }
  });
};

export default () => {
  const init = () => {
    pollerLite([".on-phone"], () => {
      runMobileChanges();
    });
    setup();
  };
  init();
  // Write experiment code here
};
