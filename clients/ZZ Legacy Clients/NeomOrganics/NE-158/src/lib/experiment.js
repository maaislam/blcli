/**
 * n.b. note logic runs on control, with variation conditional checks
 */
import { setup } from './services';
import shared from './shared';
import { events, pollerLite } from '../../../../../lib/utils';
import data from './data';

const { ID, VARIATION } = shared;

/**
 * Entry point for experiment
 */
export default () => {
  setup();

  const path = location.pathname;

  if(path.indexOf('/collections/candles') > -1) {
    events.send(`${shared.ID} Cutout Candles`, `V-${shared.VARIATION}`, 'View Candles PLP');

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
              const replacement = data[prodPath];
              prodImg.src = replacement;

              const prodBtn = prod.querySelector('.button');

              if(prodBtn) {
                prodBtn.addEventListener('click', () => {
                  events.send(
                    `${shared.ID} Cutout Candles`, 
                    `V-${shared.VARIATION}`, 
                    `Add-to-bag PLP [${prodBtn.innerText.trim()}]`,
                    {
                      sendOnce: true
                    }
                  );

                });
              }

              if(prodLink) {
                prodLink.addEventListener('click', () => {
                  events.send(`${shared.ID} Cutout Candles`, `V-${shared.VARIATION}`, 'View-product');

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
                `${shared.ID} Cutout Candles`, 
                `V-${shared.VARIATION}`, 
                `Add-to-bag PLP [${prodBtn.innerText.trim()}]`,
                {
                  sendOnce: true
                }
              );

            });
          }

          if(prodLink) {
            prodLink.addEventListener('click', () => {
              events.send(`${shared.ID} Coutout Candles`, `V-${shared.VARIATION}`, 'View-product', {
                sendOnce: true
              });
            });
          }
        });
      }
    });
  }
};
