/**
 * n.b. note logic runs on control, with variation conditional checks
 */
import { setup } from './services';
import shared from './shared';
import { events, pollerLite } from '../../../../../lib/utils';
import data from './data';

const { ID, VARIATION } = shared;

// ----
// Is minibag and basket image update enabled?
// ----
const BASKET_ENABLED = false;

/**
 * Get store
 */
const getStore = () => {
  let store = localStorage.getItem(`${shared.ID}-store`) || '{}';
  store = JSON.parse(store);

  return store;
};

/**
 * Helper store
 */
const deleteItemFromStore = (path) => {
  const store = getStore();

  if(store[path]) {
    delete store[path];
  }
};

/**
 * Remove item from store
 */
const getItemFromStore = (path) => {
  const store = getStore();

  return store[path];
};

/**
 * V-Day image interaction
 */
const updateStore = (path, title, replacementImage) => {
  const store = getStore();

  store[path] = {
    replacement: replacementImage,
    title: (title?.innerText || '').trim()
  };

  localStorage.setItem(`${shared.ID}-store`, JSON.stringify(store)); 
};

/**
 * Helper minibag
 */
const updateMinibag = () => {
  if(BASKET_ENABLED) {
    pollerLite([
      '.mini-cart-container .mini-cart-item img',
    ], () => {
      const store = getStore();

      [].forEach.call(document.querySelectorAll('.mini-cart-container .mini-cart-item'), item => {
        const img = item.querySelector('img');

        if(img) {
          for(let i in store) {
            if(store[i].title == img.getAttribute('alt')) {
              img.src = store[i].replacement;
            }
          }
        }
      });
    });
  }
};

/**
 * Entry point for experiment
 */
export default () => {
  setup();

  const path = location.pathname;

  // ------------------------
  // PLP Page Valentine's Day
  // ------------------------
  if(path == '/collections/valentines-day') {
    events.send(`${shared.ID} Occasion Personalisation`, `V-${shared.VARIATION}`, 'View V-Day PLP');

    pollerLite(['.product-list-item-image img', '.product-list-item a'], () => {
      const pageProds = document.querySelectorAll('.product-list-item');

      if(shared.VARIATION !== 'control') {
        [].forEach.call(pageProds, prod => {
          const prodLink = prod.querySelector('a');
          const prodImg = prod.querySelector('.product-list-item-image img');
          const title = prod.querySelector('.product-list-item__title');

          if(prodLink && prodImg && title) {
            prodImg.removeAttribute('data-src'); // Remove to prevent lazy load

            const prodPath = prodLink.pathname;

            if(data[prodPath]) {
              const replacement = data[prodPath]['v-day-image'];
              prodImg.src = replacement;

              const prodBtn = prod.querySelector('.button');

              if(prodBtn) {
                prodBtn.addEventListener('click', () => {
                  events.send(
                    `${shared.ID} Occasion Personalisation`, 
                    `V-${shared.VARIATION}`, 
                    `Add-to-bag PLP [${prodBtn.innerText.trim()}]`,
                    {
                      sendOnce: true
                    }
                  );

                  updateStore(prodPath, title, replacement)
                });
              }
              if(prodLink) {
                prodLink.addEventListener('click', () => {
                  events.send(`${shared.ID} Occasion Personalisation`, `V-${shared.VARIATION}`, 'View-eligible-product');

                  updateStore(prodPath, title, replacement);
                });
              }
            }

          }

        });
      } else {
        [].forEach.call(pageProds, prod => {
          const prodBtn = prod.querySelector('.button');
          const prodLink = prod.querySelector('a');
          const prodPath = prodLink.pathname;

          if(prodBtn) {
            prodBtn.addEventListener('click', () => {
              events.send(
                `${shared.ID} Occasion Personalisation`, 
                `V-${shared.VARIATION}`, 
                `Add-to-bag PLP [${prodBtn.innerText.trim()}]`,
                {
                  sendOnce: true
                }
              );

              updateStore(prodPath, '', '');
            });
          }

          if(prodLink) {
            prodLink.addEventListener('click', () => {
              events.send(`${shared.ID} Occasion Personalisation`, `V-${shared.VARIATION}`, 'View-eligible-product', {
                sendOnce: true
              });

              updateStore(prodPath, '', '');
            });
          }
        });
      }
    });
  }

  // ------------------------
  // PDP page
  // ------------------------
  if(location.pathname.indexOf('/products/') > -1) {
    const curPath = location.pathname;

    if(document.referrer.match(/products/) || document.referrer.match(/valentines/)) {
      // ------------------------
      // User visits a PDP - check Valentine's day object and show replacement image
      // ------------------------
      if(getItemFromStore(curPath) && shared.VARIATION !== 'control') {
        pollerLite([
          '.product-main .thumb-slider',
          '.product-main .thumb-slider .lazyloaded'
        ], () => {
          // ------------------------
          // Trigger click on valentines day thumb to set it as the default image
          // ------------------------
          const valImgLinks = document.querySelectorAll('.product-main .thumb-slider a[data-product-single-thumbnail]');
          [].forEach.call(valImgLinks, l => {
            if(l.href.match(/valentine/i)) {
              setTimeout(() => {
                l.click();
              }, 1000);
            }
          });
        });

        pollerLite([
          '.product-main .product-slider.slick-initialized',
          () => document.readyState == 'complete',
        ], () => {
          setTimeout(() => {
            // ------------------------
            // Trigger click on valentines day thumb to set it as the default image
            // ------------------------
            const valImgLinks = document.querySelectorAll('.product-main .product-slider.slick-initialized .slick-slide img');
            [].forEach.call(valImgLinks, l => {
              if(l.src.match(/valentine/i) || (l.getAttribute('data-src') || '').match(/valentine/)) {
                const slickElm = document.querySelector('.product-main .product-slider.slick-initialized');

                if(slickElm && slickElm.slick) {
                  slickElm.slick.goTo(l.parentNode.parentNode.parentNode.getAttribute('data-slick-index'));
                }
              }
            });
          }, 500);
        });
      }

      // On add to bag update mini bag
      pollerLite([
        '.product-main button[data-add-to-cart]'
      ], () => {
        const addBtn = document.querySelector('button[data-add-to-cart]');

        if(addBtn) {
          addBtn.addEventListener('click', () => {
            setTimeout(() => {
              if(getItemFromStore(curPath)) {
                events.send(`${shared.ID} Occasion Personalisation`, `V-${shared.VARIATION}`, 'Add-to-bag PDP', {
                  sendOnce: true
                });
              }

              if(shared.VARIATION !== 'control') {
                updateMinibag();
              }
            }, 800);
          });
        }
      })
    } else {
      // ------------------------
      // Reset if user visits PDP from non Valentine's day referrer
      // ------------------------
      deleteItemFromStore(curPath);
    }
  }

  if(shared.VARIATION !== 'control') {
    // ------------------------
    // Cart page
    // ------------------------
    if(location.pathname == '/cart') {
      if(BASKET_ENABLED) {
        pollerLite([
          '.cart-items .column',
        ], () => {
          const store = getStore();

          [].forEach.call(document.querySelectorAll('.cart-items > div'), item => {
            const img = item.querySelector('img');

            if(img) {
              for(let i in store) {
                if(store[i].title == img.getAttribute('alt')) {
                  img.src = store[i].replacement.replace('480x480', '100x100');
                }
              }
            }
          });
        });
      }
    } else {
      // ------------------------
      // All non-cart Pages - Minicart
      // ------------------------
      updateMinibag();
    }
  }
};
