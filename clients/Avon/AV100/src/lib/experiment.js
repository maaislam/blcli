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
import {
  insertAfterElement,
  pollerLite,
  sendHttpRequest,
  checkIntersection,
} from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Test Code Fired');

  if (window.location.pathname === '/cart') {
    fireEvent('User is on /cart page');

    if (VARIATION == 'controls') {
      fireEvent('Conditions Met');
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
  if (VARIATION === 'controls') {
    return;
  } else {
    pollerLite(['#basket-main', () => window.location.pathname === '/cart'], () => {
      pollerLite(['.AV083__promo-message'], () => {
        const discountCodeMessage = document.querySelector('.AV083__promo-message');
        discountCodeMessage.innerHTML = /* HTML */ `Sample <span>discount</span> applied at checkout`;
      });

      const basketContainer = document.querySelector('form');

      const rootElement = document.createElement('div');
      rootElement.classList.add(`${ID}-root`);
      rootElement.innerHTML = /* HTML */ `
        <div class="${ID}-container">
          <div class="${ID}-header">
            <div class="${ID}-header-content">
              <h4 class="${ID}-header-title">
                ${VARIATION === '1' ? 'Complete your routine' : 'Find your next fragrance'}
              </h4>
              <p>Try something new with our 3 for £1 samples</p>
            </div>
            <form
              method="post"
              action=""
              accept-charset="UTF-8"
              class="shopify-product-form"
              enctype="multipart/form-data"
            >
              <button class="${ID}-cta" type="submit">Add all 3 samples for £1</button>
            </form>
          </div>
          <div class="${ID}-loader"></div>
          <div class="${ID}-splide">
            <div class="splide__track">
              <ul class="splide__list"></ul>
            </div>
          </div>
        </div>
      `;

      insertAfterElement(basketContainer, rootElement);

      const carousel = new Splide(`.${ID}-splide`, {
        breakpoints: {
          725: {
            perPage: 1,
            fixedWidth: 200,
            gap: 40,
            focus: 'center',
            padding: 10,
            drag: true,
            pagination: true,
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

      let allSampleProductUrls;
      //https://avon.uk.com/products/dark-circle-corrector-dual-sachet
      if (VARIATION === '1') {
        allSampleProductUrls = [
          'https://avon.uk.com/products/anti-wrinkle-retinol-serum-sample',
          'https://avon.uk.com/products/anew-protinol-power-serum-sample',
          'https://avon.uk.com/products/supreme-dual-elixir-dual-sachet',
          'https://avon.uk.com/products/even-texture-tone-serum-sample',
          'https://avon.uk.com/products/ultimate-day-cream-sample',
        ];
      }

      if (VARIATION === '2' || VARIATION === '3') {
        allSampleProductUrls = [
          'https://avon.uk.com/products/far-away-beyond-parfum-thermador-sample',
          'https://avon.uk.com/products/the-moment-for-her-sample',
          'https://avon.uk.com/products/little-black-dress-lace-spray-sample',
          'https://avon.uk.com/products/the-moment-for-him-sample',
          'https://avon.uk.com/products/artistique-wisteria-sublime-eau-de-parfum-sample',
          'https://avon.uk.com/products/artistique-nymphea-lumiere-eau-de-parfum-sample',
          'https://avon.uk.com/products/maxime-icon-for-him-sample-spray',
          'https://avon.uk.com/products/lucky-me-for-her-spray-sample',
          'https://avon.uk.com/products/lucky-me-for-him-spray-sample',
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
            const image = temp.querySelectorAll('#product-large-images img')[0].src;
            const soldOut = !!temp.querySelector('.notify:not(.hide)');
            const form = temp.querySelector('.shopify-product-form');
            const variantId = form.querySelector('.variant-id').value;

            return {
              url,
              title,
              price,
              image,
              soldOut,
              variantId,
            };
          })
        )
      );

      let sampleProducts;

      Promise.all(promises).then((res) => {
        document.querySelector(`.${ID}-loader`).remove();
        sampleProducts = res;

        let i = 0;
        let iterations = 0;

        while (i < sampleProducts.length && iterations <= 2) {
          const product = sampleProducts[i];
          i += 1;

          console.log(product);
          if (product.soldOut) {
            continue;
          }

          iterations += 1;

          carousel.add(/* HTML */ `
            <li class="splide__slide ${ID}__splide-slide">
              <div class="${ID}-product-card" data-sample-card>
                <a class="${ID}-product-card-image" href="${product.url}">
                  <img src="${product.image}" alt="${product.title}" />
                </a>
                <div class="${ID}-product-card-content">
                  <a class="${ID}-product-card-title" href="${product.url}">
                    <h5>${product.title}</h5>
                  </a>
                  <p class="${ID}-product-card-price">${product.price}</p>
                  <form
                    method="post"
                    action="/cart/add?id[]=${product.variantId}"
                    accept-charset="UTF-8"
                    class="shopify-product-form"
                    enctype="multipart/form-data"
                  >
                    <input
                      type="hidden"
                      name="id"
                      class="variant-id"
                      value="${product.variantId}"
                    />
                    <button class="${ID}-cta ${ID}-ghost" type="submit">Add sample</button>
                  </form>
                </div>
              </div>
            </li>
          `);
        }

        const addAllSamplesForm = document.querySelector(`.${ID}-header form`);
        const addAllSamplesButton = document.querySelector(`.${ID}-header .${ID}-cta`);
        const allSampleIds = document.querySelectorAll(`.${ID}-product-card .variant-id`);
        const ids = [];

        allSampleIds.forEach((id) => ids.push(id.value));

        const requestString = `cart/add?${ids.map((id) => `id[]=${id}`).join('&')}`;

        addAllSamplesForm.action = requestString;

        addAllSamplesButton.addEventListener('click', (e) => {
          e.preventDefault();
          //addAllSamplesButton.innerText = 'Adding samples';

          //dirty patch work
          const payloads = ids.map((id) => {
            return {
              id,
              quantity: 1,
            };
          });
          const options = {
            method: 'POST',
            headers: {
              Accept: '*/*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: payloads }),
          };
          fetch('/cart/add.js', options).then((response) => {
            if (response.status === 200) {
              location.reload();
            }
          });
        });

        const availableSamples = document.querySelectorAll(`.${ID}-product-card`);

        if (availableSamples.length < 3) {
          addAllSamplesButton.remove();
        } else {
          addAllSamplesButton.classList.add('visible');
        }

        availableSamples.forEach((sample) => {
          const cta = sample.querySelector(`.${ID}-cta`);
          cta.addEventListener('click', () => {
            cta.innerText = 'Adding sample';
          });
        });

        // Tracking
        addAllSamplesButton.addEventListener('click', () => {
          fireEvent('User adds 3 products at once to their basket');
        });

        document.querySelectorAll(`.${ID}-product-card .${ID}-cta`).forEach((item) => {
          item.addEventListener('click', () => {
            fireEvent('User adds a product from the Samples list to the bag via the add cta');
          });
        });

        // const products = document.querySelectorAll('.basket-main product-title');
        // const basketSamples = [];

        // products.forEach((product) => {
        //   if (product.innerText.includes('Sample')) {
        //     basketSamples.push(product);
        //   }
        // });

        const carouselLength = document.querySelectorAll(`.${ID}__splide-slide`).length;

        checkIntersection(rootElement, 0, false).then(() => {
          fireEvent('Conditions Met');
          if (carouselLength < 3) {
            fireEvent('User shown fewer than 3 samples');
          }
        });
        // fireEvent(
        //   `User has at least 3 samples in their basket (${basketSamples.length} samples)`
        // );

        // Tracking End
      });
    });

    if (location.pathname.includes('checkouts')) {
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

          pollerLite(['#checkout-template', '#checkout_reduction_code'], () => {
            //const allBasketProductNames = document.querySelectorAll('.product-title');

            if (sampleInBasket > 2) {
              const discountField = document.querySelector('#checkout_reduction_code');
              const submitBtn = discountField
                .closest('.field__input-btn-wrapper')
                .querySelector('button');

              discountField.addEventListener('change', () => {
                submitBtn.removeAttribute('disabled');
                submitBtn.classList.remove('btn--disabled');
                submitBtn.click();
              });

              discountField.value = 'SAMPLES';
              const changeEvent = new Event('change');
              discountField.dispatchEvent(changeEvent);
            }
          });
        });
    }
  }
};
