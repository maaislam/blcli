/**
 * IDXXX - Description
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
import { getUrlParameter, events } from './../../../../../lib/utils';
import { addPoller, addEventListener, addObserver, addInterval } from './winstack';

/**
 * Hold reference to num items in basket
 */
let numItemsInBasket = null;

/**
 * @vars
 */
const loadedProducts = settings.UPSELL_PRODS;
const imageUrlPrefix = '';
const toCheckoutLink = settings.TO_CHECKOUT_LINK;

/**
 * did add to basket checker
 */
const runBasketAddedChecker = (cb) => {
  addInterval(() => {
    const numItemsNowInBasket = window.tco.get('customer').basket.qty;
    if(numItemsInBasket !== null && numItemsNowInBasket > numItemsInBasket) {
      cb();

      numItemsInBasket = numItemsNowInBasket;
    }
  }, 1000);
};

/**
 * Entry point for checkout page
 */
const runCheckout = () => {
  var urlParam = getUrlParameter(`ucx-progressed`),
    isSuccessPage = window.location.pathname.match(/success/i),
    didAlreadyVisitAddons = sessionStorage.getItem(`${settings.ID}-did-visit-addons`);

  if(!urlParam && !isSuccessPage && !didAlreadyVisitAddons && numItemsInBasket == 1) {
    events.send(settings.ID, 'did-redirect-from-checkout-to-addons');
    window.location = '/add-ons';
  }
};

/**
 * Entry point for add-ons page
 */
const runAddons = () => {

  if(loadedProducts.length) {
    document.body.classList.add(`${settings.ID}--loaded`);

    events.send(settings.ID, 'did-show-products');

    sessionStorage.setItem(`${settings.ID}-did-visit-addons`, 1);

    // ---------------------------------------------------------
    // Create HTML
    // ---------------------------------------------------------
    cacheDom.get('page-view .page').innerHTML = `
      <div class="${settings.ID}-content-wrap wrap">
        <h1 class="${settings.ID}-page-title h1 center lowercase">Do you want to make their pressie even more special?</h1>
        <p class="${settings.ID}-subtitle m-t-6 center lowercase">Add a little extra to really spoil them</p>
        <p class="${settings.ID}-no-link-wrap center m-t-5">
            <a class="lowercase col-11" href="${toCheckoutLink}">No, go straight to checkout &gt;</a>
        </p>

        <div class="${settings.ID}-products-wrap b-dotted-b"></div>

        <p class="${settings.ID}-go-to-checkout-wrap p-t p-b center">
            <a class="button button--grey button--bigger b-radius ${settings.ID}-go-to-checkout ${settings.ID}-go-to-checkout--bottom" 
                href="${toCheckoutLink}">Go to checkout</a>
        </p>
      </div>
    `;

    addEventListener(cacheDom.get(`.${settings.ID}-no-link-wrap a`), 'click', () => {
        events.send(settings.ID, 'did-click-go-to-checkout-link');
    });

    addEventListener(cacheDom.get(`.${settings.ID}-go-to-checkout--bottom`), 'click', () => {
        events.send(settings.ID, 'did-click-go-to-checkout-button-bottom');
    });

    // ---------------------------------------------------------
    // Add all loaded products
    // ---------------------------------------------------------
    loadedProducts.forEach((item) => {
      cacheDom.get(`.${settings.ID}-products-wrap`).insertAdjacentHTML('beforeend', `<!--
        --><div class="${settings.ID}-upsell-item c-3-set p-b block-item c-6-set-s">
            <div class="${settings.ID}-upsell-item__image block-item__image block m-b-2">
                <a class="block ratio-1-1">
                    <img class="fill" src="${imageUrlPrefix + item.image}" />
                </a>
            </div>
            <div class="${settings.ID}-upsell-item__text">
                ${item.name}
            </div>
            <div class="${settings.ID}-upsell-item__text-desc">
              <em>${item.desc}</em>
            </div>
            <div class="${settings.ID}-upsell-item__price col-pink">
                £${item.price.toFixed(2)}
            </div>
            <div class="${settings.ID}-upsell-item__addbox">
                <a 
                    data-${settings.ID.toLowerCase()}prodid="${item.id}"
                    class="${settings.ID}-upsell-item__add button--pink button--bigger b-radius p-r-10 p-l-10 inline-block button">add</a>
            </div>
        </div><!--
      -->`);
    });

    // ---------------------------------------------------------
    // Add basket event handler
    // ---------------------------------------------------------
    [].forEach.call(cacheDom.getAll(`.${settings.ID}-upsell-item__add`), (item) => {
      addEventListener(item, 'click', (e) => {
        e.currentTarget.innerText = 'adding...';

        const prodId = e.currentTarget.dataset[`${settings.ID.toLowerCase()}prodid`];
        if(prodId) {
          tco.get('customer').basket.add({}, {
            id: prodId,
            qty: 1
          }, {}, {});
        }
      });
    });
  }
};

/**
 * Helper on did add to basket
 */
const didAddAddonToBasket = () => {
  events.send(settings.ID, 'did-add-to-basket');

  [].forEach.call(cacheDom.getAll(`.${settings.ID}-upsell-item__add`), (item) => {
    item.innerText = 'add';
  });

  const titleElm = cacheDom.get(`.${settings.ID}-page-title`);
  if(titleElm) {
    const existingSuccessMessage = cacheDom.get(`.${settings.ID}-page-success`, true);
    if(existingSuccessMessage) {
        existingSuccessMessage.remove();
    }

    titleElm.insertAdjacentHTML('afterend', `
        <div class="${settings.ID}-page-success center">
          <p>Successfully added to basket</p>
          <p class="m-t-4"><a class="button button--grey b-radius ${settings.ID}-go-to-checkout ${settings.ID}-go-to-checkout--postadd" 
              href="${toCheckoutLink}">Go to checkout</a></p>
        </div>
    `);

    cacheDom.get(`.${settings.ID}-go-to-checkout--postadd`).addEventListener('click', () => {
        events.send(settings.ID, 'did-click-success-go-to-checkout-button');
    });

    document.body.classList.add(`${settings.ID}-added-to-basket`);

    window.scrollTo(0,0);
  }

  // ---------------------------------------------------------
  // Mini basket buy now link
  // ---------------------------------------------------------
  setTimeout(() => {
    const buyBtn = document.querySelector('minibasket .button');
    if(buyBtn) {
      buyBtn.href = toCheckoutLink;
      addEventListener(buyBtn, 'click', () => {
        events.send(settings.ID, 'did-go-to-checkout-via-minibasket', '', {
            sendOnce: true    
        });
      });
    }
  }, 500);
};

/**
 * Entry point
 */
const activate = () => {
  numItemsInBasket = window.tco.get('customer').basket.qty; 

  if(window.location.pathname.match(/checkout/i)) {
    // Run Checkout determine redirect
    runCheckout();
  } else if(window.location.pathname.match(/add-ons/i)) {
    // Run Add-Ons
    setup();

    addPoller([
      'page-view .page',
    ], () => {
      runBasketAddedChecker(didAddAddonToBasket);

      runAddons();    
    });
  }
};

export default activate;
