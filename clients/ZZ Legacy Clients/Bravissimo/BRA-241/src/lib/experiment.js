/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup } from './services';
import { events, logMessage } from '../../../../../lib/utils';
import { trackClicks } from '../../../../../lib/tracking';
import settings from './shared';
import siema from './siema';

export default () => {

  const { ID, VARIATION } = settings;

  logMessage(ID + " Variation: "+VARIATION);

  if(localStorage.getItem(`${ID}-did-close`)) {
    return;
  }

  const currentBagItems = window?.bvHelpers?.dataObject?.bag?.items;
  if(!currentBagItems || currentBagItems.length == 0) {
    return;
  }


  events.send(`${ID}-${VARIATION}`, 'Did Show');
  if(VARIATION == 'control') {
    return;
  }

  setup();

  // ----------------
  // Get basket if available
  // ----------------
  const container = document.querySelector('.c-page .c-container__main');

  if(container) {
    // ---------------
    // Remove prevent duplication
    // ---------------
    const existing = document.querySelector(`.${ID}-container`);
    if(existing) {
      existing.parentNode.removeChild(existing);
    }

    const currentBagItems = window?.bvHelpers?.dataObject?.bag?.items;
    if(currentBagItems && currentBagItems.length) {
      let total = '';
      if(window.bvHelpers?.dataObject?.bag?.subTotal) {
        const subTotalValue = window.bvHelpers?.dataObject?.bag?.subTotal;

        total = new Intl.NumberFormat(
          document.documentElement.lang, { 
            style: 'currency', 
            currency: window.universal_variable.basket.currency 
          }).format(subTotalValue);
      }

      // ---------------
      // Iterate over bag items
      // ---------------
      let itemsHtml = '';
      currentBagItems.forEach(item => {
        itemsHtml += `
            <section 
                class="${ID}-item c-product-summary c-product-summary--block c-product-summary--LNX"
            >
              <a class="c-product-summary__container u-block-link" 
                  href="${item.url}">
                <div class="c-product-summary__media">
                  <div class="c-product-summary__img-container">
                    <span>
                      <div class="c-ratio-box">
                        <div class="c-ratio-box__before" style="padding-top: 100%;"></div>
                        <div class="c-ratio-box__content">
                          <picture class="c-picture">
                            <img alt="${item.brandName} ${item.styleName}" 
                              src="${item.imgUrl.replace(/\?.+$/, '').replace('}', '')}?q=80&w=400" 
                              class="c-product-summary__img">
                          </picture>
                        </div>
                      </div>
                    </span>
                    ${item.price != item.originalPrice ? `
                      <p class="c-sticker c-sticker--sale c-sticker--round">
                        <em class="c-sticker__label">Sale</em>
                      </p>
                    ` : ''}
                  </div>
                </div>
                <div class="c-product-summary__main">
                  <div class="c-product-summary__title">
                    <small class="c-product-summary__code">${item.styleCode}</small>
                    <h3 class="c-product-summary__name">${item.brandName} ${item.styleName} <br>X${item.quantity}</h3>
                  </div>
                  <dl class="c-product-summary__meta">
                    <dt class="u-hidden"><span>Price:</span></dt>
                    <dd class="c-product-summary__price">
                      ${item.price != item.originalPrice ? `
                        <span>
                          <del class="c-price--old">
                            <span class="u-hidden">
                              <span>Was</span>:
                            </span>
                            <span>£${item.originalPrice.toFixed(2)}</span>
                          </del>
                          <ins class="c-price--new">
                            <span class="u-hidden"><span>Now</span>:</span>
                            <span>£${item.price.toFixed(2)}</span>
                          </ins>
                        </span>
                      ` : `
                        <span class="c-price"><span>£${item.price.toFixed(2)}</span></span>
                      `}
                    </dd>
                  </dl>
                </div>
              </a>
            </section>
        `;
      });

      // ---------------
      // Append
      // ---------------
      container.insertAdjacentHTML('afterbegin', `
        <div class="${ID}-container l-grid l-grid--wraps">
          <div class="l-grid__unit">
            <h2>Welcome Back! You have items in your bag.</h2>

            <span class="${ID}-container__close">
              <span class="c-icon c-icon--dismiss--large c-icon--label-after"><svg class="c-icon__glyph" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 240 240" role="img" style="
  "><g transform="rotate(45, 120, 120)"><rect x="-20" y="110" width="280" height="24" rx="12"></rect><rect x="110" y="-20" width="24" height="280" rx="12"></rect></g></svg><span class="c-icon__label"><span>Close</span></span></span>
            </span>

            <div class="${ID}-container__itemsouter">
              <div class="${ID}-container__items">
                ${itemsHtml}
              </div>
            </div>

            <div class="${ID}-container__subtotal">
              Total (excluding delivery): ${total}
            </div>

            <div class="${ID}-container__btns">
              <a class="${ID}-view-bag c-button-link c-button-link--small c-button-link--major-filled" href="/bag/">View Bag</a>
              <a class="${ID}-view-checkout c-button-link c-button-link--small c-button-link--major-filled" href="/checkout/">Go to Checkout</a>
            </div>
          </div>
        </div>
      `);

      const runSlick = () => {
        siema();

        const numItems = currentBagItems.length;
        const toShow = window.screen.width <= 325 ? 2 : ( window.screen.width < 768 ? 3 : 5);

        if(numItems > toShow) {
          const mySiema = new Siema({
            selector: `.${ID}-container__items`,
            perPage: toShow,
            loop: true,
            draggable: true,
            onInit: () => {
              const container = document.querySelector(`.${ID}-container__items`);

              if(container) {
                container.classList.add('xinit');

                container.insertAdjacentHTML('beforeend', `
                  <div><button class="c-carousel-nav c-carousel-nav--next"><div class="c-carousel-nav__arrow"><span class="c-icon c-icon--right--large"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 120 240"><path d="M116 112c4 4 4 12 0 16L16 228c-4 4-9 3-12 0s-4-8 0-12l96-96L4 24c-4-4-3-9 0-12s8-4 12 0l100 100z"></path></svg></span></div></button><button class="c-carousel-nav c-carousel-nav--prev"><div class="c-carousel-nav__arrow"><span class="c-icon c-icon--left--large"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 120 240"><path d="M4 112c-4 4-4 12 0 16l100 100c4 4 9 3 12 0s4-8 0-12l-96-96 96-96c4-4 3-9 0-12s-8-4-12 0L4 112z"></path></svg></span></div></button></div>
                `);

                const next = document.querySelector('.xinit .c-carousel-nav--next');
                if(next) {
                  next.addEventListener('click', e => mySiema.next());
                }
                
                const prev = document.querySelector('.xinit .c-carousel-nav--prev');
                if(prev) {
                  prev.addEventListener('click', e => mySiema.prev());
                }
              }
            }
          });
        }
      };

      runSlick();

      // Close
      const myContainer = document.querySelector(`.${ID}-container`);
      const close = document.querySelector(`.${ID}-container__close`);
      if(close && myContainer) {
        close.addEventListener('click', () => {
          myContainer.parentNode.removeChild(myContainer);

          events.send(`${ID}-${VARIATION}`, 'Click Close');
          localStorage.setItem(`${ID}-did-close`, 1);
        });
      }

      // Event Tracking
      const elms = {
        'View Bag Link': `.${ID}-view-bag`,
        'View Checkout Link': `.${ID}-view-checkout`,
        'Product Item': `.${ID}-item`,
      };
      trackClicks(events, elms, `${ID}-${VARIATION}`, 'Click');
    }
  }
};
