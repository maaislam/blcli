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
import { pollerLite, checkIntersection } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;
const formatPrice = (amount, code = 'en-GB', currency = 'GBP') => {
  return new Intl.NumberFormat(code, {
    style: 'currency',
    currency,
  }).format(amount);
};
export default () => {
  setup();

  console.log('Test Code Fired');

  const addToCart = (Sku) => {
    const addToCartEndpoint = '/api/cartapi/add';
    const payloads = [
      {
        Campaign: window._ShopContext.CampaignNumber,
        Quantity: 1,
        Sku,
      },
    ];

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payloads),
    };

    return fetch(addToCartEndpoint, options).then((response) => response.json());
  };

  document.body.addEventListener('click', ({ target }) => {
    console.log(target);
    if (target.closest(`.${ID}__Addtobag`)) {
      const skuClicked = target.dataset.sku;
      target.classList.add('adding');
      target.innerText = 'adding';
      addToCart(skuClicked).then((data) => {
        console.log('data', data);

        fireEvent(`User adds ${data.Data.LastProductChanged.Name} to basket`);
        window.location.reload();
      });
    }
  });

  if (window.location.pathname === '/cart') {
    fireEvent('User is on /cart page');

    if (VARIATION == 'control') {
      checkIntersection(document.querySelector('.Cart-ButtonsBottom'), 0, false).then(() => {
        fireEvent('Conditions Met');
      });
      //fireEvent('Conditions Met');
      //return;
    }

    fetch(`/api/Cartapi/Cart?_=${Date.now()}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const basketProducts = data.Data.Campaigns[0].Products;
        const sampleInBasket = basketProducts.reduce((acc, curr) => {
          let lineSampleQuantity;
          if (curr['Name'].indexOf('Sample') !== -1) {
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
    pollerLite(['.Cart-Products', () => window.location.pathname.includes('/cart')], () => {
      const basketContainer = document.querySelector('.Cart-Footer');

      const rootElement = document.createElement('div');
      rootElement.classList.add(`${ID}-root`);
      rootElement.innerHTML = /* HTML */ `
        <div class="${ID}-container">
          <div class="${ID}-header">
            <div class="${ID}-header-content">
              <h4 class="${ID}-header-title">${VARIATION === '1' ? 'EARLY BLACK FRIDAY OFFERS' : 'Find your next fragrance'}</h4>
              <p>Beat the rush and grab one of these unmissable offers before you checkout.</p>
            </div>
          </div>
          <div class="${ID}-loader"></div>
          <div class="${ID}-splide">
            <div class="splide__track">
              <ul class="splide__list"></ul>
            </div>
          </div>
        </div>
      `;

      basketContainer.insertAdjacentElement('afterend', rootElement);

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

      let allSampleProductIds;
      //https://avon.uk.com/products/dark-circle-corrector-dual-sachet
      if (VARIATION === '1') {
        allSampleProductIds = ['17165', '17166'];
      }

      if (VARIATION === '2' || VARIATION === '3') {
        allSampleProductIds = [
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

      allSampleProductIds.forEach((id) =>
        promises.push(
          fetch(`/api/productsapi/getproducts?language=en&campaignNumber=${window._ShopContext.CampaignNumber}&productIds=${id}`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              const variantIndex = 0;

              const { Id: id, Name, Slug, ProfileNumber, ListPrice, SalePrice, VariantGroups } = data.Data[0];
              const { Availability, IsAvailable, Sku, Name: variantName } = VariantGroups[0].Variants[variantIndex];

              const url = `/product/${id}/${Slug}`;
              const title = Name;
              const isOnSale = SalePrice;
              const price = SalePrice || ListPrice;
              const prevPrice = ListPrice;
              const image = `https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_${ProfileNumber}_1_613x613.jpg`;
              const soldOut = !IsAvailable;
              //const form = temp.querySelector('.shopify-product-form');
              const variantId = Sku;
              const discountPercent = prevPrice ? ((prevPrice - price) * 100) / prevPrice : '0';
              return {
                id,
                url,
                title,
                price,
                prevPrice,
                isOnSale,
                image,
                soldOut,
                variantId,
                discountPercent,
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

          console.log('product', product);
          // if (product.soldOut) {
          //   //continue;
          // }

          iterations += 1;

          const isAlreadyInBasket = !!document.querySelector('.Cart-Products').querySelector(`[href*="${product.id}"]`);

          const btnText = isAlreadyInBasket ? 'Added' : product.soldOut ? 'Out of stock' : 'Add to bag';
          carousel.add(/* HTML */ `
            <li class="splide__slide ${ID}__splide-slide">
              <div class="${ID}-product-card" data-sample-card>
                <a class="${ID}-product-card-image" href="${product.url}">
                  <img src="${product.image}" alt="${product.title}" />
                  ${product.discountPercent > 0
                    ? `<span class="${ID}-product-card-discount-label">${product.discountPercent.toFixed(0)}% OFF</span>`
                    : ''}
                </a>
                <div class="${ID}-product-card-content">
                  <a class="${ID}-product-card-title" href="${product.url}">
                    <h5>${product.title}</h5>
                  </a>
                  <p>
                    <span class="${ID}-product-card-price">${formatPrice(product.price)}</span>
                    ${product.isOnSale
                      ? `<span class="${ID}-product-card-prevprice">${formatPrice(product.prevPrice)}</span>`
                      : ''}
                  </p>
                  <div>
                    <button
                      class="${ID}-cta ${ID}-ghost ${ID}__${btnText.split(' ').join('')}"
                      type="submit"
                      data-sku="${product.variantId}"
                    >
                      ${btnText}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          `);
        }

        // Tracking

        document.querySelectorAll(`.${ID}-product-card .${ID}-cta`).forEach((item) => {
          item.addEventListener('click', () => {
            fireEvent('User adds a product from the list to the bag via the add cta');
          });
        });

        const carouselLength = document.querySelectorAll(`.${ID}__splide-slide`).length;

        checkIntersection(rootElement, 0, false).then(() => {
          fireEvent('Conditions Met');
          if (carouselLength < 3) {
            fireEvent('User shown fewer than 3 products');
          }
        });
      });
    });
  }
};
