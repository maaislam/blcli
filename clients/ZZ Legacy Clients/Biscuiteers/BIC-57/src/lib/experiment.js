/**
 * IDXXX - Description
 */
import { setup, getUserData } from './services';
import { events } from '../../../../../lib/utils';
import { addPoller, addEventListener, addObserver } from './winstack';
import { addProductToBasketById } from '../../../lib/helpers';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Did add item to basket
 */
const onSuccessfulAddToBasket = () => {
  if(document.querySelector(`.${ID}-wrapper`)) {
    return;
  }

  events.send(`${ID}-${VARIATION}`, 'did-show-invasion', '');

  if(VARIATION == 'control') {
    return;
  }

  const main = document.querySelector('main');
  const title = (document.documentElement.querySelector('meta[property="og:title"]') || {}).content || '';
  const ogImage = (document.documentElement.querySelector('meta[property="og:image"]') || {}).content || '';

  const minibasket = document.querySelector('minibasket');
  if(minibasket) {
    minibasket.classList.add('ng-hide');
  }

  const localBasketAddNotice = document.querySelector('local-basket-add-notice');
  if(localBasketAddNotice) {
    localBasketAddNotice.classList.add('ng-hide');
  }

  window.scrollTo(0,0);

  if(main) {
    let addonsHtml = '';

    const upsellProds = parseUpsellProducts();
    if(upsellProds.length) {
      addonsHtml += `
        <div class="${ID}-addons">
          <h2 class="fs-9 fs-7-s m-b-8 m-b-4-s col-11 center">Add a little extra to make your gift extra special...</h2>
          <div class="${ID}-addons__items">
            ${(
              upsellProds.map(p => {
                return `
                  <div class="${ID}-addons__item" data-id="${p.id}">
                    <a class="${ID}-addons__item-img" href="${p.link}">
                      <img src="${p.img.replace(/228x171/, '513x385')}">
                    </a>
                    <a class="${ID}-addons__item-text" href="${p.link}">
                      ${p.title}
                    </a>
                    <div class="${ID}-addons__item-price">
                      £${p.price}
                    </div>
                    <div class="${ID}-addons__item-add">
                      <button 
                        class="${ID}-addons__item-add-btn button" 
                        data-id="${p.id}">add to bag</button>
                    </div>
                  </div>
                `;
              })
            ).join('')}
          </div>
        </div>
      `;
    }

    const html = `
      <div class="${ID}-wrapper ${ID}-DOD">
        <div class="${ID}-upsell">
          <div class="${ID}-upsell__img">
            <img src="${ogImage}">
          </div>
          <div class="${ID}-upsell-banner">
            <div class="${ID}-upsell-banner__text">
              <div class="bg-col-11 pos-relative b-radius-max p-a-3 m-r ${ID}-upsell-banner__tick"><i class="pos-absolute left-50 bottom-0 top-0 flex flex-middle icon-ok col-w fs-3"></i></div>
              <span>${title} was added to your bag</span>
            </div>
            <div class="${ID}-upsell-banner__btns">
              <a class="${ID}-upsell-banner__btn button ${ID}-upsell-banner__btn--checkout" href="/basket">continue to basket</a>
              <a class="${ID}-upsell-banner__btn button ${ID}-upsell-banner__btn--continue">continue shopping</a>
            </div>
          </div>
        </div>
        ${addonsHtml}
      </div>
    `;

    main.insertAdjacentHTML('afterbegin', html);

    // Event Listeners add to basket
    const addToBagBtns = document.querySelectorAll(`.${ID}-addons__item-add-btn`);
    [].forEach.call(addToBagBtns, btn => {
      addEventListener(btn, 'click', (e) => {
        btn.classList.add('busy');

        addProductToBasketById(btn.dataset.id, 1);

        setTimeout(() => {
          events.send(`${ID}-${VARIATION}`, 'added-to-basket', '');

          btn.classList.remove('busy');
          //const miniToggle = document.querySelector('span[minibasket-toggle]');
          //if(miniToggle) {
          //  miniToggle.click();
          //}

          const localBasketAddNotice = document.querySelector('local-basket-add-notice');
          if(localBasketAddNotice) {
            localBasketAddNotice.classList.remove('ng-hide');
          }

          // Show notification
          const prod = btn.closest(`.${ID}-addons__item`);
          prod.insertAdjacentHTML('afterbegin', `
            <div class="pos-absolute left-0 top-0 fs-2-s z-1 badge is-label">
              <span>added to your order</span>
            </div>
          `);

          const bannerTxt = document.querySelector(`.${ID}-upsell-banner__text span`);
          if(bannerTxt) {
            bannerTxt.innerHTML = (prod.querySelector(`.${ID}-addons__item-text`)?.innerText || 'product') + `
              was added to your bag
            `;
          }
          const bannerImg = document.querySelector(`.${ID}-upsell__img img`);
          if(bannerImg) {
            const pImg = prod.querySelector(`.${ID}-addons__item-img img`);
            if(pImg) {
              bannerImg.src = pImg.src;
            }
          }
        }, 3000);
      });
    });

    // Go to checkout btn
    const checkoutBtn = document.querySelector(`.${ID}-upsell-banner__btn--checkout`);
    if(checkoutBtn) {
      checkoutBtn.addEventListener('click', (e) => {
        events.send(`${ID}-${VARIATION}`, 'clicked-checkout-btn', '');
      });
    }

    // Continue shopping
    const contBtn = document.querySelector(`.${ID}-upsell-banner__btn--continue`);
    if(contBtn) {
      contBtn.addEventListener('click', (e) => {

        events.send(`${ID}-${VARIATION}`, 'clicked-continue-btn', '');

        const wrapper = document.querySelector(`.${ID}-wrapper`);
        wrapper.parentNode.removeChild(wrapper);
      });
    }
  }
};

/**
 * Parse upsell products
 */
const parseUpsellProducts = () => {
  const upsellProducts = document.querySelectorAll('upsell-products-item');

  let results = [];
  [].forEach.call(upsellProducts, (prod) => {
    const link = prod.querySelector('a[opt-href]');
    if(link) {
      const img = link.querySelector('img');
      const price = link.querySelector('price');
      const checkbox = prod.querySelector('.checkbox input[type=checkbox]');
      const title = prod.querySelector('a[ng-bind*=name]');

      results.push({
        link: link.getAttribute('opt-href'),
        title: (title || {}).innerText || '',
        img: img.getAttribute('src'),
        price: price.innerText.replace(/[\$£]/g, ''),
        id: checkbox.value,
      });
    }
  });

  return results;
};

/**
 * Did click add to basket button
 */
const onClickAddToCart = () => {
  // When the number of items in the basket changes, we know we've got a 
  // successful add to basket
  let headerBasket = document.querySelector('#header span[minibasket-toggle]');
  if(!headerBasket) {
    headerBasket = document.querySelector('#header .header-basket');
  }

  if(headerBasket) {
    const itemsInBasketInitially = headerBasket.innerText.trim().match(/\d+/)?.[0] || 0;

    addPoller([
      () => {
        let headerBasket = document.querySelector('#header span[minibasket-toggle]');
        if(!headerBasket) {
          headerBasket = document.querySelector('#header .header-basket');
        }
        const currentItemsInBasket = headerBasket.innerText.trim().match(/\d+/)?.[0] || 0;

        return itemsInBasketInitially != currentItemsInBasket;
      }
    ], () => {
      onSuccessfulAddToBasket();
    }, {
      multiplier: 1,
      wait: 40,
      timeout: 6000,
    });
  }
};

/**
 * MObile changes
 */
const mobileChanges = () => {
  window.scrollTo(0,0);

  addPoller([
    'upsell-products',
    'local-basket-add-notice > .pos-fixed',
    '.basket-add-notice-open'
  ], () => {
    const elm = document.querySelector('local-basket-add-notice > .pos-fixed');
    const main = document.querySelector('main');

    if(elm && main) {
      main.insertAdjacentElement('afterbegin', elm);
      elm.classList.add(`${ID}-mobile-addons`);

      setTimeout(() => {
        // Price & title
        const prods = elm.querySelectorAll('upsell-products-item');
        [].forEach.call(prods, p => {
          const titleElm = p.querySelector('a.link-2');
          const priceElm = p.querySelector('price');

          if(titleElm && priceElm) {
            titleElm.insertAdjacentElement('afterend', priceElm);
          }
        
          // Actions
          const action = p.querySelector('action');
          action.addEventListener('click', (e) => {
            addPoller([
              () => !!action.classList.contains('success')
            ], () => {
              p.querySelector('.product').insertAdjacentHTML('afterbegin', `
                <div class="pos-absolute left-0 top-0 fs-2-s z-1 badge is-label">
                  <span>added to your order</span>
                </div>
              `);
            });
          });
        });

      }, 1000);

      // Scroll
      const jqStr = 'jQuery';

      const addSlick = () => {
        addPoller([
          `upsell-products > div > .flex`,
          'upsell-products .product img.rf.loaded',
          () => !!window[jqStr],
        ], () => {
          const $ = window[jqStr];

          const slickSliders = () => {
            const opts = {
              slidesToShow: 2,
              slidesToScroll: 2,
              arrows: false,
              dots: true,
              autoplay: false,
              speed: 350,
              adaptiveHeight: true,
              autoplaySpeed: 4500,
            };
      
            $(`upsell-products > div > .flex`).slick(opts);
            
          };
      
          if($.fn.slick) {
            slickSliders();
          } else {
            $.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
              slickSliders();
            });
          }
        
        });
      };

      addSlick();
    }
  }, {
    multiplier: 1,
    wait: 40,
    timeout: 6000
  });
};

/**
 * Entry point for running experiment
 */
const activate = () => {
  setup();

  const productPageAdd = document.querySelector('local-add-to-basket .button');
  if(window.innerWidth > 519) {
    addEventListener(productPageAdd, 'click', onClickAddToCart);
  } else {
    addEventListener(productPageAdd, 'click', mobileChanges);
  }


  // --------------------------
  // Workaround for orientation change
  // --------------------------
  addEventListener(window, 'orientationchange', () => {
    window.location.reload();
  });
};

export default activate;
