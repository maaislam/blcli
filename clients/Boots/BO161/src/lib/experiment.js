import Swiper, { Navigation } from 'swiper';
import { setup, fireEvent } from '../../../../../core-files/services';
// import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { sendHttpRequest, insertAfterElement, pollerLite } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem(`${ID}`) !== 'Fired') {
      window.cmCreateManualLinkClickTag(
        `/${ID}?cm_sp=AdobeTarget${ID}-_-${ID} V${VARIATION}-_-fired`
      );

      sessionStorage.setItem(`${ID}`, 'Fired');
    }
  });

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION === 'control') {
    return;
  }

  console.log(`${ID} LOADED`);

  const getTodaysDate = () => {
    const d = new Date();

    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  const getDayDifference = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = Math.abs(d1.getTime() - d2.getTime());

    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const storedDate = localStorage.getItem(`${ID}-LastVisitedDate`);

  if (!storedDate) localStorage.setItem(`${ID}-LastVisitedDate`, getTodaysDate());

  if (storedDate && getTodaysDate() > 7) {
    localStorage.setItem(`${ID}-LastVisitedDate`, getTodaysDate());
    localStorage.removeItem(`${ID}-RecentlyViewedItems`);
  }

  const recentlyViewedItems = JSON.parse(localStorage.getItem(`${ID}-RecentlyViewedItems`));

  if (!recentlyViewedItems) localStorage.setItem(`${ID}-RecentlyViewedItems`, '[]');

  pollerLite(['#estore_productpage_template_container'], () => {
    const isPDP = document.querySelector('#estore_productpage_template_container');

    if (isPDP) {
      if (recentlyViewedItems && recentlyViewedItems.length === 10) {
        recentlyViewedItems.shift();
      }
      if (recentlyViewedItems.length < 10) {
        const productURL = window.location.href;
        const newItems = [...recentlyViewedItems, productURL];

        if (!recentlyViewedItems.includes(productURL)) {
          localStorage.setItem(`${ID}-RecentlyViewedItems`, JSON.stringify(newItems));
        }
      }
    }
  });

  const isHomepage =
    window.location.pathname === '/' || window.location.pathname === '/TopCategoriesDisplay';

  if (isHomepage && !!recentlyViewedItems) {
    pollerLite(['.oct-grid__row'], () => {
      if (getDayDifference(storedDate, getTodaysDate()) < 7 && recentlyViewedItems.length > 1) {
        const entryElement = document.querySelectorAll(
          '.oct-grid__row.oct-grid__row--full-width'
        )[1];
        const rootElement = document.createElement('div');

        rootElement.classList.add(`${ID}-root`);
        rootElement.innerHTML = /* HTML */ `
          <div class="${ID}-header">
            <h4>You Recently Viewed</h4>
          </div>
          <div
            class="${ID}-swiper swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events swiper-container-free-mode"
          >
            <div class="swiper-wrapper"></div>
            <div
              aria-label="next slide"
              role="button"
              tabindex="-1"
              class="swiper-button-next"
            ></div>
            <div
              aria-label="previous slide"
              role="button"
              tabindex="-1"
              class="swiper-button-prev"
            ></div>
            <div class="${ID}-loader"></div>
          </div>
        `;

        insertAfterElement(entryElement, rootElement);

        Swiper.use([Navigation]);

        const swiper = new Swiper(`.${ID}-swiper`, {
          direction: 'horizontal',
          observer: true,
          observeParents: true,
          observeSlideChildren: true,
          slidesPerView: 2.5,
          spaceBetween: 10,
          breakpoints: {
            640: {
              slidesPerView: 3.5,
              spaceBetween: 30,
            },
            900: {
              slidesPerView: 4.5,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          },
          navigation: {
            loop: true,
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          },
        });

        swiper.init();

        const promises = [];

        recentlyViewedItems.forEach((item) => {
          promises.unshift(
            sendHttpRequest('GET', item).then((res) => {
              const temp = document.createElement('html');
              temp.innerHTML = res;

              const itemId = item.match(/.*([\d]{8}).*/);
              const itemImageId = itemId[itemId.length - 1];

              const url = item;
              const name = temp.querySelector('#estore_product_title').innerText.trim();
              const image = `https://boots.scene7.com/is/image/Boots/${itemImageId}?wid=200&hei=200&op_sharpen=1`;

              return { url, name, image };
            })
          );
        });

        Promise.all(promises).then((res) => {
          res.forEach((item) => {
            const productElement = document.createElement('div');
            productElement.classList.add('swiper-slide');
            productElement.innerHTML = /* HTML */ `
              <a class="${ID}-product" href="${item.url}">
                <div class="${ID}-product-image">
                  <img src="${item.image}" alt="${item.name}" />
                </div>
                <h4>${item.name}</h4>
              </a>
            `;

            swiper.addSlide(1, productElement);
          });

          document.querySelector(`.${ID}-loader`).remove();
        });
      }
    });

    // Tracking
    pollerLite([`.${ID}-product`], () => {
      const recentProducts = document.querySelectorAll('.BO161-product');

      recentProducts.forEach((product) =>
        product.addEventListener('click', () =>
          fireEvent(`${ID} Variation ${VARIATION} - User clicked on recently viewed product`)
        )
      );
    });

    pollerLite([`.${ID}-root`], () => {
      fireEvent(`${ID} Variation ${VARIATION} - Recently viewed component rendered`);
    });
    // End Tracking
  }
};
