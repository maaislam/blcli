/**
 * BI035
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { addPoller, addEventListener, addObserver } from './winstack';
import { isLoggedIn, isVibCustomer, getUserData } from './services';
import settings from './settings';
import pubSub from './PublishSubscribe';

/**
 * Add header link
 */
const addHeaderLinkDesktop = () => {
  let ilTag = null;

  const existingLis = document.querySelectorAll(`.${settings.ID}-header-vib-li`);
  [].forEach.call(existingLis, (li) => {
    li.remove();
  });

  if(isLoggedIn()) {
    ilTag = document.querySelector('if-logged-in'); 
  } else {
    ilTag = document.querySelector('if-not-logged-in'); 
  }

  if(ilTag) {
    ilTag.insertAdjacentHTML('afterbegin', `
      <li class="inline-block ${settings.ID}-header-vib-li ${settings.ID}-DOD">
        <a href="/account#vib" class="no-wrap link-1 ${settings.ID}-header-vib-link">access vib benefits</a>
      </li>
      <li class="inline-block ${settings.ID}-header-vib-li ${settings.ID}-DOD p-r-1 p-l-1"><bar class="fs-1 col-11"></bar></li>
    `);

    pubSub.publish('did-show-header-link-access-vib', isVibCustomer());

    const headerVibLink = document.querySelector(`.${settings.ID}-header-vib-link`);
    if(headerVibLink) {
      addEventListener(headerVibLink, 'click', () => {
        pubSub.publish('did-click-header-vib-link')
      });
    }
  }
};

/**
 * Add header link on Mobile
 */
const addHeaderLinkMobile = () => {
  const existingLis = document.querySelectorAll(`.${settings.ID}-header-vib-wrap`);
  [].forEach.call(existingLis, (li) => {
    li.remove();
  });

  const dashboardLink = document.querySelector('off-canvas-menu [ui-sref="account.dashboard"]');

  if(dashboardLink && dashboardLink.parentNode) {
    dashboardLink.parentNode.insertAdjacentHTML('beforebegin', `
      <li class="${settings.ID}-DOD ${settings.ID}-header-vib-wrap">
        <a class="block p-t p-b ${settings.ID}-header-vib-link--mobile" href="/account#vib">
          <i class="m-r-1 col-11 icon-user"></i> 
          <span class="link-2">access vib benefits</span>
        </a>
      </li>
    `);

    pubSub.publish('did-show-header-link-access-vib', isVibCustomer());

    const headerVibLink = document.querySelector(`.${settings.ID}-header-vib-link--mobile`);
    if(headerVibLink) {
      addEventListener(headerVibLink, 'click', () => {
        pubSub.publish('did-click-header-vib-link')
      });
    }
  }

};

/**
 * Show dashboard content
 */
const showDashboardContent = () => {
  const paragraphToReplace = document.querySelector('account-dashboard-view div:first-of-type p.lowercase + p');
  if(paragraphToReplace) {

    if(isVibCustomer()) {
      setTimeout(() => {
        paragraphToReplace.insertAdjacentHTML('afterend', `
          <div class="${settings.ID}-dashboard-copy ${settings.ID}-DOD ${settings.ID}-dashboard-copy--vib">
            <img image="/front/logo-vib.jpg" class="${settings.ID}-crown-image" fit-in="1" alt="VIB logo" src="https://thumbor-gc.tomandco.uk/unsafe/fit-in/342x342/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/images/logo-vib.jpg">
            <p>You're a VIB! That's a Very Important Biscuiteer, which means you get:</p>
            <ul class="${settings.ID}-list ${settings.ID}-list--ticks">
              <li>
                FREE next day delivery using the code VIBFREE
                <span class="${settings.ID}-list-subitem">on orders over £30. Make sure you're always logged in, then enter the code in the basket</span>
              </li>
              <li>
                sneak peaks at our new collections (look out for our emails)
              </li>
              <li>
                rewards on your biscuiteers anniversary
              </li>
            </ul>
          </div>
        `);
      }, 100);

      pubSub.publish('show-dashboard-messaging', 'vib')
    } else {
      setTimeout(() => {
        paragraphToReplace.insertAdjacentHTML('afterend', `
          <div class="${settings.ID}-dashboard-copy ${settings.ID}-DOD ${settings.ID}-dashboard-copy--nonvib">
            <img image="/front/logo-vib.jpg" class="${settings.ID}-crown-image" fit-in="1" alt="VIB logo" src="https://thumbor-gc.tomandco.uk/unsafe/fit-in/342x342/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/images/logo-vib.jpg">
            <p><span class="BI035-list-title">Oh no! You're not currently a VIB.</span><span class="${settings.ID}-list-subitem">Unlock VIB status by making two purchases of £30 or more and you'll get:</span></p>
            <ul class="${settings.ID}-list ${settings.ID}-list--keys">
              <li>
                FREE next day delivery on orders over £30
              </li>
              <li>
                sneak peaks at our new collections (look out for our emails)
              </li>
              <li>
                rewards on your biscuiteers anniversary
              </li>
            </ul>
          </div>
        `);
      }, 100);

      pubSub.publish('show-dashboard-messaging', 'non-vib')
    }

    paragraphToReplace.style.display = 'none';
  }

  const yourBenefitsBlock = document.querySelector('[url="/content-block/vib-benefits"]');
  if(yourBenefitsBlock) {
    yourBenefitsBlock.style.display = 'none';
  }

  const youAreAVibBlock = document.querySelector('account-dashboard-view [ng-if="vm.customer.data.vib.is_vib"]');
  const vibImage = youAreAVibBlock.parentNode.nextElementSibling;
  if(youAreAVibBlock) {
    youAreAVibBlock.style.display = 'none';
  }
  if(vibImage) {
    vibImage.style.display = 'none';
  }
};

/**
 * Show PDP content
 */
const showPDPContent = () => {
  const addToBasket = document.querySelector('local-product-view local-add-to-basket');
  if(addToBasket) {
    if(isVibCustomer()) {
      addToBasket.insertAdjacentHTML('afterend', `
        <div class="${settings.ID}-pdp-messaging ${settings.ID}-DOD">
          dear VIB, you have FREE delivery on this item  

          <span class="${settings.ID}-info">i</span>

          <div class="${settings.ID}-tooltip ${settings.ID}-pdp-messaging__tooltip">
            enter the code VIBFREE in the basket
          </div>
        </div>
      `);

      pubSub.publish('show-pdp-messaging', 'vib');
    } else {
      addToBasket.insertAdjacentHTML('afterend', `
        <div class="${settings.ID}-pdp-messaging ${settings.ID}-DOD">
          unlock VIB status with this order 
          <span class="${settings.ID}-info">i</span>

          <div class="${settings.ID}-tooltip ${settings.ID}-pdp-messaging__tooltip">
            make two purchases of £30 or more to unlock VIB status! perks include
            FREE next day delivery over £30.
          </div>
        </div>
      `);

      pubSub.publish('show-pdp-messaging', 'non-vib');
    }

    const info = document.querySelector(`.${settings.ID}-info`);
    const tooltip = document.querySelector(`.${settings.ID}-pdp-messaging__tooltip`);
    if(info && tooltip) {
      addEventListener(info, 'click', () => {
        if(tooltip.classList.contains(`${settings.ID}-tooltip--active`)) {
          tooltip.classList.remove(`${settings.ID}-tooltip--active`)
        } else {
          tooltip.classList.add(`${settings.ID}-tooltip--active`)
        }

        pubSub.publish('did-click-pdp-info-icon');
      });
    }
  }
};

/**
 * Show basket content
 */
const showBasketContent = () => {
  if(tco.get('customer').basket.subtotal >= settings.PRICE_THRESHOLD) {
    // -------------------------------------
    // Show the delivery message
    // -------------------------------------
    const deliveryPrice = document.querySelector('delivery-price');
    const ul = deliveryPrice.previousElementSibling;
    if(deliveryPrice && ul && ul.nodeName.toLowerCase() == 'ul') {
      ul.classList.add(`${settings.ID}-price-ul`);

      // -------------------------------------
      // Modify subtotal messaging
      // -------------------------------------
      const li = ul.children[ul.children.length - 1];
      const sub = li.querySelector('span > span.fs-3');
      const main = li.querySelector('span > span.fs-7');

      if(main) {
        main.innerHTML = 'items total';
      }
      if(sub) {
        sub.remove();
      }

      // -------------------------------------
      // Show vib button or messaging
      // -------------------------------------
      if(!tco.get('customer').basket.data.coupon) {
        if(!isVibCustomer()) {
        
          // -------------------------------------
          // Show the delivery message
          // -------------------------------------
          const existing = document.querySelector(`.${settings.ID}-delivery-row`);
          if(!existing && deliveryPrice.innerHTML.trim() == '') {
            ul.insertAdjacentHTML('beforeend', `
              <li class="${settings.ID}-delivery-row p-l-3 p-r-3 p-t-1 p-b-1 lh-3 bg-col-13">
                <span class="fs-5">delivery</span>
                <price class="f-right price fs-5">
                  calculated at checkout
                </price>
              </li>
            `);
          }

          ul.insertAdjacentHTML('beforeend', `
            <li class="${settings.ID}-DOD p-l-3 p-r-3 p-t-1 p-b-1 lh-3 bg-col-13"">
              <div class="${settings.ID}-basket-content">
                <img fit-in="1" src="//cdn-sitegainer.com/gxd1jmx7zt2omqg.png">

                VIBs, don't forget to claim FREE DELIVERY using your discount code
                <span class="${settings.ID}-info">i</span>

                <div class="${settings.ID}-tooltip ${settings.ID}-basket-content__tooltip">
                  <p>When you order twice, we'll enrol you as a VIB, with all the perks, including FREE next day delivery over £30.</p>
                  <p>If you're a VIB, login to your account, where you'll see your discount code.</p>
                </div>
              </div>
            </li>
          `, 'beforeend');

          const info = document.querySelector(`.${settings.ID}-info`);
          const tooltip = document.querySelector(`.${settings.ID}-basket-content__tooltip`);
          if(info && tooltip) {
            addEventListener(info, 'click', () => {
              if(tooltip.classList.contains(`${settings.ID}-tooltip--active`)) {
                tooltip.classList.remove(`${settings.ID}-tooltip--active`)
              } else {
                tooltip.classList.add(`${settings.ID}-tooltip--active`)
              }

              pubSub.publish('did-click-basket-info-icon');
            });
          }

          // Since we don't want to block the checkout from view
          addEventListener(document, 'keydown', (e) => {
            const key = e.keyCode || e.which;
            if(key == 27) {
              tooltip.classList.remove(`${settings.ID}-tooltip--active`)
            }
          });
          addEventListener(document, 'click', (e) => {
            if(!e.target.classList.contains(`${settings.ID}-info`)) {
              tooltip.classList.remove(`${settings.ID}-tooltip--active`)
            }
          });
          
          pubSub.publish('amended-basket-totals-for-non-vib');
        } else {
          // -------------------------------------------
          // Apply free delivery button for VIB customers
          // -------------------------------------------
          ul.insertAdjacentHTML('beforeend', `
            <li class="${settings.ID}-DOD p-l-3 p-r-3 p-t-1 p-b-1 lh-3 bg-col-13"">
              <div class="${settings.ID}-free-delivery-wrap ta-right">
                <a class="${settings.ID}-apply-free-delivery w-12 button-4 w-6-x">apply free delivery</a>
              </div>
            </li>
          `, 'beforeend');

          const applyFreeDelivery = document.querySelector(`.${settings.ID}-apply-free-delivery`);
          const couponForm = document.querySelector('coupon-form');
          const couponInput = document.querySelector('input-wrap[name=coupon] input.input');
          const couponBtn = document.querySelector('coupon-form action[role=button]');

          if(couponInput && applyFreeDelivery && couponBtn) {
            addEventListener(applyFreeDelivery, 'click', () => {
              const couponBtnWrap = document.querySelector(`.${settings.ID}-free-delivery-wrap`);
              // Variables need to be requeried as the DOM can change
              const couponInput = document.querySelector('input-wrap[name=coupon] input.input');
              const couponBtn = document.querySelector('coupon-form action[role=button]');
              couponInput.value = 'VIBFREE';
              couponInput.dispatchEvent(new Event('change'));

              // Remove the button
              couponBtnWrap.remove();

              // Blink attention
              if(couponForm) {
                couponForm.classList.add(`${settings.ID}-blink`);
              }

              couponBtn.click();
            });
          }
          
          pubSub.publish('did-show-apply-button-to-vib');
        }
      }
    }
  }
};

/**
 * ACTIVATE
 *
 * Entry point for running experiment
 */
const activate = () => {
  setup();

  // ---------------------------------------------------
  // Header Link
  // ---------------------------------------------------
  if(window.innerWidth > 959) {
    addPoller([
      () => {
        return document.querySelector('if-logged-in') || document.querySelector('if-not-logged-in');
      },
    ], addHeaderLinkDesktop);
  } else {
    addPoller([
      'off-canvas-menu',
    ], addHeaderLinkMobile);
  }
  
  // ---------------------------------------------------
  // Dashboard (logged in, non-VIB and VIB users)
  // ---------------------------------------------------
  if(/^\/account(\/?\?.+)?$/i.test(window.location.pathname) && isLoggedIn()) {
    addPoller([
      'account-dashboard-view div:first-of-type p.lowercase + p',
    ], showDashboardContent);
  }

  // ---------------------------------------------------
  // PDP Amends
  // ---------------------------------------------------
  addPoller([
    'local-product-view local-add-to-basket',
    'price .price-value',
    () => {
      let priceGreaterThanThreshold = false;

      const priceValue = document.querySelector('price .price-value');
      if(priceValue) {
        const priceParsed = parseInt(priceValue.innerHTML.trim());
        if(priceParsed >= settings.PRICE_THRESHOLD) {
          priceGreaterThanThreshold = true;
        }
      }

      return priceGreaterThanThreshold;
    },
  ], showPDPContent);
  
  // ---------------------------------------------------
  // Basket amends
  // ---------------------------------------------------
  addPoller([
    'delivery-price'
  ], showBasketContent);
};

export default activate;
