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

  const posFixed = document.querySelector('local-basket-add-notice .pos-fixed');
  if(posFixed) {
    posFixed.classList.add(`${ID}-hide`);
  }

  events.send(`${ID}-${VARIATION}`, 'did-show-invasion', '');

  const localBasketAddNotice = document.querySelector('local-basket-add-notice');
  if(localBasketAddNotice) {
    addPoller(['local-basket-add-notice upsell-products-item action'], () => {
      [].forEach.call(document.querySelectorAll('upsell-products-item action'), (l) => {
        l.addEventListener('click', () => {
          events.send(`${ID}-${VARIATION}`, 'addons-added-to-basket', '');
        });
      });
    });
  }

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

  if(localBasketAddNotice) {
    localBasketAddNotice.classList.add('ng-hide');
  }

  window.scrollTo(0,0);

  if(main) {
    let addonsHtml = '';

    const upsellProds = getUpsellProds();

    upsellProds.forEach(cat => {
      const name = cat.name;
      const items = cat.items;

      addonsHtml += `
        <div class="${ID}-addons">
          <div class="${ID}-addons__cat">
            <h2 class="col-11 center fs-9 fs-7-s m-b-8 m-b-4-s">${name}</h2>
          </div>
          <div class="${ID}-addons__items">
            ${(
              items.map(p => {
                return `
                  <div class="${ID}-addons__item" data-id="${p.id}">
                    <a class="${ID}-addons__item-img" href="${p.link}">
                      <img src="${p.img.replace(/228x171/, '513x385')}">
                    </a>
                    <a class="${ID}-addons__item-text" href="${p.link}">
                      ${p.name}
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
    });

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
        <h2 class="fs-9 fs-7-s m-b-8 m-b-4-s col-12 center b-dotted-t">add a little extra to make your gift extra special...</h2>

        ${addonsHtml}

        <div class="${ID}-after-addons-btns">
          <a class="${ID}-upsell-banner__btn button ${ID}-upsell-banner__btn--checkout" href="/basket">continue to basket</a>
          <a class="${ID}-upsell-banner__btn button ${ID}-upsell-banner__btn--continue">continue shopping</a>
        </div>
      </div>
    `;

    main.insertAdjacentHTML('afterbegin', html);

    // Hide local product view
    const localProdView = document.querySelector('local-product-view');
    if(localProdView) {
      localProdView.classList.add('ng-hide');
    }

    // Event Listeners add to basket
    const addToBagBtns = document.querySelectorAll(`.${ID}-addons__item-add-btn`);
    [].forEach.call(addToBagBtns, btn => {
      addEventListener(btn, 'click', (e) => {
        btn.classList.add('busy');

        addProductToBasketById(btn.dataset.id, 1);

        setTimeout(() => {
          events.send(`${ID}-${VARIATION}`, 'added-to-basket', '');
          events.send(`${ID}-${VARIATION}`, 'addons-added-to-basket', '');

          btn.classList.remove('busy');
          //const miniToggle = document.querySelector('span[minibasket-toggle]');
          //if(miniToggle) {
          //  miniToggle.click();
          //}

          const localBasketAddNotice = document.querySelector('local-basket-add-notice');
          if(localBasketAddNotice) {
            localBasketAddNotice.classList.remove('ng-hide');
          }

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
    const checkoutBtns = document.querySelectorAll(`.${ID}-upsell-banner__btn--checkout`);
    [].forEach.call(checkoutBtns, (checkoutBtn) => {
      if(checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
          events.send(`${ID}-${VARIATION}`, 'clicked-checkout-btn', '');
        });
      }
    });

    // Continue shopping
    const contBtns = document.querySelectorAll(`.${ID}-upsell-banner__btn--continue, .${ID}-close`);
    [].forEach.call(contBtns, (contBtn) => {
      if(contBtn) {
        contBtn.addEventListener('click', (e) => {

          events.send(`${ID}-${VARIATION}`, 'clicked-continue-btn', '');

          const wrapper = document.querySelector(`.${ID}-wrapper`);
          wrapper.parentNode.removeChild(wrapper);

          const localProdView = document.querySelector('local-product-view');
          if(localProdView) {
            localProdView.classList.remove('ng-hide');
            window.scrollTo(0,0);
          }
        });
      }
    });

    // Slick sliders
    addSlick();
  }
};

/**
 * Get upsell prods
 */
const getUpsellProds = () => {
  return [
    {
      name: 'Prosecco & Sparkling Wine',
      items: [
        {
          id: 943,
          link: 'https://www.biscuiteers.com/send-a-gift/prosecco',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/fit-in/228x171/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/w/_/w.jpg',
          price: '22.00',
          name: 'Prosecco'
        },
        {
          id: 1016,
          link: '',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/fit-in/228x171/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/h/a/hamper_3_1.jpg',
          price: '10.00',
          name: 'Prosecco Mini 200ml'
        },
        {
          id: 942,
          link: 'https://www.biscuiteers.com/send-a-gift/gusbourne',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/fit-in/228x171/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/g/u/gusbourne_2.jpg',
          price: '50.00',
          name: 'Gusbourne Sparking Rose 2013'
        },
      ]
    },
    {
      name: 'Letterbox Cocktails',
      items: [
        {
          id: 1528,
          link: 'https://www.biscuiteers.com/christmas-gifts-by-biscuiteers/mini-gin-1-1289',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/fit-in/228x171/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/z/i/zing_negroni_100ml.jpg',
          price: '9.50',
          name: 'Negroni Letterbox Cocktail 100ml'
        },
        {
          id: 1526,
          link: 'https://www.biscuiteers.com/christmas-gifts-by-biscuiteers/mini-gin-1-1287',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/fit-in/342x256/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/n/e/new_zing_rhubarb_cosmo_100ml.jpg',
          price: '9.50',
          name: 'Rhubarb cosmo letterbox cocktail 100ml'
        },
        {
          id: 1527,
          link: 'https://www.biscuiteers.com/christmas-gifts-by-biscuiteers/mini-gin-1-1288',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/fit-in/228x171/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/e/s/espresso_martini_zing_100ml.jpg',
          price: '9.50',
          name: 'Salted Caramel Martini Letterbox Cocktail 100ml'
        },
        {
          id: 1529,
          link: 'https://www.biscuiteers.com/christmas-gifts-by-biscuiteers/mini-gin-1-1290',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/trim/fit-in/228x171/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/z/i/zing_100ml_mojito.jpg',
          price: '9.50',
          name: 'Pineapple Mojito Letterbox Cocktail 100ml'
        },
      ]
    },
    {
      name: 'Letterbox Tea',
      items: [
        {
          id: 1485,
          link: 'https://www.biscuiteers.com/biscuits/tregothnan-for-biscuiteers-tea-tin',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/fit-in/228x171/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/t/r/tregothnan_for_biscuiteers_great_british_tea.jpg',
          price: '5.00',
          name: 'Tregothnan Letterbox Tea'
        },
        {
          id: 1486,
          link: '',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/fit-in/228x171/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/t/r/tregothnan_for_biscuiteers_afternoon_tea_pouch.jpg',
          price: '5.00',
          name: 'Tregothnan Letterbox Afternoon Tea'
        },
      ]
    },
    {
      name: 'Gin',
      items: [
        {
          id: 1537,
          link: 'https://www.biscuiteers.com/send-a-gift/mini-gin-1-1291',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/trim/fit-in/228x171/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/m/i/mini_gin_trio_-_front_angle_3d_2_.png',
          price: '15.00',
          name: 'Triple Mini Sipsmith Gin'
        },
      ]
    },
    {
      name: 'Biscuiteers Merchandise',
      items: [
        {
          id: 907,
          link: 'https://www.biscuiteers.com/send-a-gift/biscuiteers-tote-bag',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/trim/fit-in/228x171/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/c/u/cutout_-_tote_bag_shopper_-_low_res_1.jpg',
          price: '10.00',
          name: 'Biscuiteers Shopper'
        },
        {
          id: 1028,
          link: 'https://www.biscuiteers.com/send-a-gift/biscuiteers-mug',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/trim/fit-in/228x171/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/m/u/mug_with_box.jpg',
          price: '14.95',
          name: 'Biscuiteers Mug'
        },
        {
          id: 1030,
          link: 'https://www.biscuiteers.com/send-a-gift/biscuiteers-tea-towel',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/trim/fit-in/228x171/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/b/i/biscuiteers_tea_towel_2.jpg',
          price: '10.00',
          name: 'Biscuiteers Tea Towel'
        },
        {
          id: 459,
          link: 'https://www.biscuiteers.com/send-a-gift/biscuiteers-womens-and-mens-apron',
          img: 'https://thumbor-gc.tomandco.uk/unsafe/trim/fit-in/228x171/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/product/b/i/biscuiteers_tea_towel_2.jpg',
          price: '15.00',
          name: 'Biscuiteers Apron'
        },
      ]
    },
  ];
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
 * Slick
 */
const addSlick = () => {
  const jqStr = 'jQuery';

  addPoller([
    `.${ID}-addons__items`,
    () => !!window[jqStr],
  ], () => {
    const $ = window[jqStr];

    const slickSliders = () => {
      const opts = {
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        dots: false,
        autoplay: false,
        speed: 350,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          }
        ],
      };

      $(`.${ID}-addons__items`).slick(opts);
      
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

/**
 * Did click add to basket button
 */
const onClickAddToCart = () => {
  events.send(`${ID}-${VARIATION}`, 'click-add-to-cart', '');
  let addonsSelectedDesktop = 0;

  [].forEach.call(document.querySelectorAll('upsell-products-item label.is-checked'), (l) => {
    addonsSelectedDesktop += 1;
  });

  if(addonsSelectedDesktop > 0) {
    events.send(`${ID}-${VARIATION}`, 'addons-added-to-basket', addonsSelectedDesktop);
  }

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
      timeout: 12000,
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
    timeout: 12000
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
    addEventListener(productPageAdd, 'click', onClickAddToCart);
  }


  // --------------------------
  // Workaround for orientation change
  // --------------------------
  addEventListener(window, 'orientationchange', () => {
    window.location.reload();
  });
};

export default activate;
