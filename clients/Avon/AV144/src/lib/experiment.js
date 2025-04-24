/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import Splide from '@splidejs/splide';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { insertAfterElement, pollerLite, sendHttpRequest, checkIntersection } from '../../../../../lib/utils';
import { arrowIcon } from './files/data';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  if (window.location.pathname === '/cart') {
    if (VARIATION == 'control') {
      checkIntersection(document.querySelector('.continue-shopping'), 0, false).then(() => {
        fireEvent('Conditions Met');
      });
      //return;
    }

    fetch('/cart.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const basketProducts = data.items;
        const sampleInBasket = basketProducts.reduce((acc, curr) => {
          let lineSampleQuantity;
          if (curr['product_title'].indexOf('Sample') !== -1) {
            lineSampleQuantity = curr.quantity * 1;
          }

          return acc + lineSampleQuantity;
        }, 0);

        if (sampleInBasket > 2) {
          fireEvent(`User has at least 3 samples in their basket (${sampleInBasket} samples)`);
        }
      });
  }

  if (VARIATION === 'control') {
    return;
  } else {
    pollerLite(['#basket-main', () => window.location.pathname === '/cart'], () => {
      let carousel;
      const basketContainer = document.querySelector('form #mobile-quick-checkout');

      const rootElement = document.createElement('div');
      rootElement.classList.add(`${ID}-root`);

      rootElement.innerHTML = /* HTML */ `
        <div class="${ID}-container container${VARIATION}">
          <div class="${ID}-header ${ID}-header0${VARIATION}">
            <div class="${ID}-header-content header${VARIATION}">
              <h4 class="${ID}-header-title">Add 3 samples for the price of 2</h4>
              ${arrowIcon()}
            </div>
            <p class="${ID}-header-subcopy">Use code <span>SAMPLES</span> at checkout for 3 for 2</p>
          </div>
          <div class="${ID}-loader ${ID}-loader${VARIATION}"></div>
          <div class="${ID}-splide splide${VARIATION}">
            <div class="splide__track">
              <ul class="splide__list list-for-${VARIATION}"></ul>
            </div>
          </div>
        </div>
      `;

      insertAfterElement(basketContainer, rootElement);

      if (VARIATION === '2') {
        carousel = new Splide(`.${ID}-splide`, {
          breakpoints: {
            725: {
              perPage: 1,
              fixedWidth: 250,
              gap: 10,
              focus: 'center',
              padding: 10,
              drag: true,
            },
            850: {
              gap: 30,
            },
          },
          perPage: 3,
          gap: 90,
          arrows: false,
          padding: 50,
          drag: false,
          pagination: false,
          dragMinThreshold: 10,
          flickPower: 100,
        });

        carousel.mount();
      }

      let allSampleProductUrls;
      // 'https://avon.uk.com/products/anew-renewal-power-eye-cream-sample',
      if (VARIATION === '1' || VARIATION === '2') {
        allSampleProductUrls = [
          'https://avon.uk.com/products/avon-nutra-effects-matte-oil-control-day-cream-spf20-sample',
          'https://avon.uk.com/products/anew-protinol-power-serum-sample',
          'https://avon.uk.com/products/platinum-day-cream-sample',
          'https://avon.uk.com/products/platinum-night-cream-sample',
          'https://avon.uk.com/products/reversalist-day-cream-sample',
          'https://avon.uk.com/products/reversalist-night-cream-sample',
          'https://avon.uk.com/products/lifting-serum-cream-sample',
          'https://avon.uk.com/products/ultimate-day-cream-sample',
          'https://avon.uk.com/products/ultimate-night-cream-sample',
          'https://avon.uk.com/products/anew-skin-reset-plumping-shot-sample',
          'https://avon.uk.com/products/anew-sensitive-dual-collagen-cream-sample',
          'https://avon.uk.com/products/anti-wrinkle-retinol-serum-sample',
          'https://avon.uk.com/products/anew-hydrate-plump-concentrate-sample',
          'https://avon.uk.com/products/anew-hydra-pro-vita-d-water-cream-sample',
          'https://avon.uk.com/products/even-texture-tone-day-cream-sample',
          'https://avon.uk.com/products/even-texture-tone-serum-sample',
          'https://avon.uk.com/products/anew-brightening-dual-eye-system-sample',
          'https://avon.uk.com/products/nutra-effects-ageless-day-cream-spf30-sample',
          'https://avon.uk.com/products/avon-soothe-day-cream-sachet-emea',
        ];
      }

      const promises = [];

      allSampleProductUrls.forEach((url) =>
        promises.push(
          sendHttpRequest('GET', url).then((res) => {
            const temp = document.createElement('html');
            temp.innerHTML = res;

            const title = temp.querySelector('.product-title.main-product-title').innerText;
            const price = temp.querySelector('.product-price .money')?.innerText;
            const prevPrice = temp.querySelector('.original-price.money').innerText;
            const image = temp.querySelectorAll('#product-large-images img')[0].src;
            const soldOut = !!temp.querySelector('.notify:not(.hide)');
            const form = temp.querySelector('.shopify-product-form');
            const variantId = form.querySelector('.variant-id').value;
            const currentPrice = parseInt(price.split('£')[1]);
            const previousPrice = parseInt(prevPrice.split('£')[1]);
            const discountPercent = prevPrice ? ((previousPrice - currentPrice) * 100) / previousPrice : '0';

            return {
              url,
              title,
              price,
              prevPrice,
              image,
              soldOut,
              variantId,
              discountPercent,
            };
          })
        )
      );

      let sampleProducts;

      Promise.all(promises.map((promise) => promise.catch((error) => error)))
        .then((res) => {
          console.log('🚀 ~ file: experiment.js:172 ~ .then ~ res:', res);
          sampleProducts = res.filter(
            (promiseResult) =>
              promiseResult.discountPercent !== undefined &&
              !document.getElementById('basket-main').querySelector(`[data-variant-id="${promiseResult.variantId}"]`) &&
              !promiseResult.soldOut
          );
          console.log('🚀 ~ file: experiment.js:177 ~ .then ~ sampleProducts:', sampleProducts);

          document.querySelector(`.${ID}-loader`).remove();

          let i = 0;
          let iterations = 0;
          let mainMarkup = ``;

          while (i < sampleProducts.length && iterations <= 3) {
            const product = sampleProducts[i];
            i += 1;

            if (product.price === undefined && product.soldOut && product.variantId === '') {
              continue;
            }

            iterations += 1;

            const isAlreadyInBasket = !!document
              .getElementById('basket-main')
              .querySelector(`[data-variant-id="${product.variantId}"]`);

            const btnText = isAlreadyInBasket ? 'Added' : product.soldOut ? 'Out of stock' : 'Add to basket';

            if (product.soldOut) {
              fireEvent(`${product.title} is out of stock`);
            }

            let markup = `
          <li class="splide__slide ${ID}__splide-slide variation${VARIATION}">
            <div class="${ID}-product-card" data-sample-card>
              <a class="${ID}-product-card-image product-image${VARIATION}" href="${product.url}">
                <img src="${product.image}" alt="${product.title}" />
                ${
                  product.discountPercent > 0
                    ? `<span class="${ID}-product-card-discount-label">${product.discountPercent.toFixed(0)}% OFF</span>`
                    : ''
                }
              </a>
              <div class="${ID}-product-card-content card-content${VARIATION}">
                <a class="${ID}-product-card-title" href="${product.url}">
                  <h5>${product.title}</h5>
                </a>
                <p>
                  <span class="${ID}-product-card-price">${product.price}</span>
                  <span class="${ID}-product-card-prevprice">${product.prevPrice}</span>
                </p>
                <form
                  method="post"
                  action="/cart/add?id[]=${product.variantId}"
                  accept-charset="UTF-8"
                  class="shopify-product-form"
                  enctype="multipart/form-data"
                >
                  <input type="hidden" name="id" class="variant-id" value="${product.variantId}" />
                  <button
                    class="${ID}-cta ${ID}-ghost variant${VARIATION} ${ID}__${btnText.split(' ').join('')}"
                    type="submit"
                    data-title="${product.title}"
                  >
                    ${btnText}
                  </button>
                </form>
              </div>
            </div>
          </li>`;

            mainMarkup += markup;

            if (VARIATION === '2') {
              carousel.add(markup);
            }
          }

          if (VARIATION === '1') {
            let myTarget = document.querySelector('ul.splide__list');

            let sampleHeader = `
          <div class="${ID}-sample-header ${ID}-sample-header${VARIATION}">
              <div class="sample-header">
                  <p>Add these 3 samples for £1</p>
              </div>
          </div>`;

            let sampleLink = `
          <div class="${ID}-sample-link ${ID}-sample-link${VARIATION}">
              <div class="sample-link">
                  <a href="https://avon.uk.com/collections/sample">View more samples</a>
              </div>
          </div>`;

            myTarget.insertAdjacentHTML('beforeend', mainMarkup);
            myTarget.insertAdjacentHTML('beforebegin', sampleHeader);
            myTarget.insertAdjacentHTML('afterend', sampleLink);
            document.querySelector('ul.splide__list.list-for-1 > li')?.remove();
          }

          if (VARIATION === '2') {
            let caroselSample = `
            < li class="splide__slide ${ID}__splide-slide" >
              <div class="${ID}-sample-card">
                <a href="https://avon.uk.com/collections/sample">View more samples</a>
              </div>
          </li > `;
            carousel.remove(0);
            carousel.add(caroselSample);
          }

          const allSampleIds = document.querySelectorAll(`.${ID}-product-card`);
          const ids = [];
          allSampleIds.forEach((id) => ids.push(id.value));

          document.querySelectorAll(`.${ID}-product-card .${ID}-cta`).forEach((item) => {
            item.addEventListener('click', ({ target }) => {
              fireEvent(`User adds ${target.dataset.title} to basket`);
              if (target.closest('.variant1')) {
                fireEvent('User adds a product from the Samples list to the bag via the add cta for V1');
              }
              if (target.closest('.variant2')) {
                fireEvent('User adds a product from the Samples list to the bag via the add cta for V2');
              }
            });
          });

          const availableSamples = document.querySelectorAll(`.${ID}-product-card`);
          availableSamples.forEach((sample) => {
            const cta = sample.querySelector(`.${ID}-cta`);
            cta.addEventListener('click', () => {
              cta.innerText = 'Adding';
            });
          });

          checkIntersection(rootElement, 0, false).then(() => {
            fireEvent('Conditions Met');
          });
        })
        .catch((error) => {
          // Handle any errors that might occur during Promise.all
          console.error('An error occurred while processing promises:', error);
        });

      // click event listener
      document.body.addEventListener('click', function (event) {
        const { target } = event;
        console.log('🚀 ~ file: experiment.js:319 ~ target:', target);

        if (target.closest('.AV144-header01')) {
          document.querySelector('.AV144-header01')?.classList.toggle('slide-down');
          document.querySelector('.AV144-splide.splide1')?.classList.toggle('slide-down');
          document.querySelector('.AV144-header01 .AV144-header-subcopy')?.classList.toggle('slide-down');
        }

        if (target.closest('.AV144-sample-link1')) {
          fireEvent('User interacts with the view more samples cta for variation 1');
        }

        if (target.closest('.AV144-sample-card')) {
          fireEvent('User interacts with the view more samples cta for variation 2');
        }

        if (target.closest('.AV144-header01') && target.closest('.slide-down')) {
          fireEvent('User expands list of samples for variation 1');
        }

        if (target.closest('.AV144-header01') && !target.closest('.slide-down')) {
          fireEvent('User collapses list of samples for variation 1');
        }

        if (target.closest('.AV144__splide-slide') && target.closest('.variation1')) {
          fireEvent('User interacts with a product from the samples list and is taken to the PDP of the product for Varaition 1');
        }

        if (target.closest('.AV144__splide-slide') && target.closest('.variation2')) {
          fireEvent('User interacts with a product from the samples list and is taken to the PDP of the product for Varaition 2');
        }
      });
    });
  }
};
