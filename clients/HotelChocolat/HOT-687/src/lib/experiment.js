import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';
import { productData } from './data/data';
import initSlider from './helpers/initSlider';

const { ID, VARIATION } = shared;

const sliderConfigV1 = {
  type: 'slider',
  startAt: 0,
  perView: 5.5,
  gap: 30,
  rewind: false,
  dragThreshold: false,
  breakpoints: {
    768: {
      perView: 2.5,
      dragThreshold: 80,
      gap: 8
    }
  }
};

const sliderConfigV2 = {
  type: 'slider',
  startAt: 0,
  perView: 2.5,
  gap: 22,
  rewind: false,
  dragThreshold: false,
  breakpoints: {
    768: {
      dragThreshold: 80,
      gap: 8
    }
  }
};

const sliderConfig = VARIATION === '1' ? sliderConfigV1 : sliderConfigV2;

const startTracking = () => {
  pollerLite(['body', () => typeof window.dataLayer === 'object'], () => {
    const isPdpPage = window.dataLayer.find((item) => item['event'] === 'productDetails');
    if (isPdpPage) {
      const pdpsViewed = parseInt(localStorage.getItem(`${ID}-pdpsViewed`));
      if (!pdpsViewed) {
        localStorage.setItem(`${ID}-pdpsViewed`, 1);
        return;
      } else {
        localStorage.setItem(`${ID}-pdpsViewed`, pdpsViewed + 1);
      }
    }
  });
};

const startExperiment = () => {
  //check if previouspage is home page
  const previousePage = localStorage.getItem('previousePage');
  pollerLite(['body #main'], () => {
    const upsellContainerMayLike = `
    <div class="${ID}-upsells v-${VARIATION} ${ID}-upsells-mightalsolike">
      <div class="${ID}-upsellcontainer ab-atc-upsells ab-atc-upsells-mightalsolike"></div>
    </div>
    `;

    const upsellContainerRecentlyViewed = `
    <div class="${ID}-upsells v-${VARIATION} ${ID}-upsells-recentlyviewed">
      <div class="${ID}-upsellcontainer ab-atc-upsells ab-atc-upsells-recentlyviewed ${ID}-recentlyviewed">
        <div class="${ID}__recommendation-glide">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              ${productData.map((recommendationProd) => {
                const product = recommendationProd.products[0];
                return `
                  <li class="glide__slide">
                    <a href="${product.url}">
                      <img src="${product.imageURL[0]}" alt="${product.name}" class="${ID}__productImage" />
                      <div class="${ID}__productInfo">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">${product.price}</p>
                      </div>
                    </a>
                  </li>
                  `
              }).join('')}
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls">
              <button class="glide__arrow ${ID}__glideArrowLeft" data-glide-dir="<"> 
                <svg height="64px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 49.656 49.656" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon style="fill:#000000;" points="14.535,48.242 11.707,45.414 32.292,24.828 11.707,4.242 14.535,1.414 37.949,24.828 "></polygon> <path style="fill:#000000;" d="M14.535,49.656l-4.242-4.242l20.585-20.586L10.293,4.242L14.535,0l24.829,24.828L14.535,49.656z M13.121,45.414l1.414,1.414l22-22l-22-22l-1.414,1.414l20.585,20.586L13.121,45.414z"></path> </g> </g></svg>
              </button>
              <button class="glide__arrow ${ID}__glideArrowRight" data-glide-dir=">"> 
                <svg height="64px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 49.656 49.656" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon style="fill:#000000;" points="14.535,48.242 11.707,45.414 32.292,24.828 11.707,4.242 14.535,1.414 37.949,24.828 "></polygon> <path style="fill:#000000;" d="M14.535,49.656l-4.242-4.242l20.585-20.586L10.293,4.242L14.535,0l24.829,24.828L14.535,49.656z M13.121,45.414l1.414,1.414l22-22l-22-22l-1.414,1.414l20.585,20.586L13.121,45.414z"></path> </g> </g></svg>
              </button>
          </div>
        </div>
      </div>
      <button class="${ID}__continueShopping">CONTINUE SHOPPING</button>
    </div>
    `;

    let upsellMayLikeAndRecentlyViewed;
    if (VARIATION === '1' && previousePage === 'https://www.hotelchocolat.com/uk' && window.location.pathname !== '/uk') {
      pollerLite(['.refinements'], () => {
        upsellMayLikeAndRecentlyViewed = `
        <div class="${ID}-upsells-overlay"></div>
        <div class="${ID}-upsells-recentlyviewed-mightalsolike-1 ${ID}-upsells-combined-1">
          <div class="${ID}-upsellcontainer">
            <div class="${ID}-upsellcontainer-close">
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.3 12.7214L7 7.8L1.70002 12.7214C1.50002 12.9071 1.30001 13 1.00001 13C0.400011 13 1.22115e-05 12.6286 1.22115e-05 12.0714C1.22115e-05 11.7929 0.0999998 11.6071 0.299999 11.4214L5.60001 6.5L0.299999 1.57857C-0.0999998 1.20714 -0.0999998 0.65 0.299999 0.278571C0.699999 -0.0928571 1.30002 -0.0928571 1.70002 0.278571L7 5.2L12.3 0.278571C12.7 -0.0928571 13.3 -0.0928571 13.7 0.278571C14.1 0.65 14.1 1.20714 13.7 1.57857L8.39999 6.5L13.7 11.4214C14.1 11.7929 14.1 12.35 13.7 12.7214C13.3 13.0929 12.7 13.0929 12.3 12.7214Z" fill="black"/>
              </svg>
            </div>
            
            <p class='${ID}__headerTitle'>Pick Up Where You Left Off</p>
            ${upsellContainerRecentlyViewed}
            ${upsellContainerMayLike}
          </div>
        </div>
        `;
      });
    } else if (VARIATION === '2' && window.location.pathname === '/uk') {
      upsellMayLikeAndRecentlyViewed = `
        <div class="${ID}-upsells-overlay"></div>
        <div class="${ID}-upsells-recentlyviewed-mightalsolike-2 ${ID}-upsells-combined-2">
          <div class="${ID}-upsellcontainer-close">
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.3 12.7214L7 7.8L1.70002 12.7214C1.50002 12.9071 1.30001 13 1.00001 13C0.400011 13 1.22115e-05 12.6286 1.22115e-05 12.0714C1.22115e-05 11.7929 0.0999998 11.6071 0.299999 11.4214L5.60001 6.5L0.299999 1.57857C-0.0999998 1.20714 -0.0999998 0.65 0.299999 0.278571C0.699999 -0.0928571 1.30002 -0.0928571 1.70002 0.278571L7 5.2L12.3 0.278571C12.7 -0.0928571 13.3 -0.0928571 13.7 0.278571C14.1 0.65 14.1 1.20714 13.7 1.57857L8.39999 6.5L13.7 11.4214C14.1 11.7929 14.1 12.35 13.7 12.7214C13.3 13.0929 12.7 13.0929 12.3 12.7214Z" fill="black"/>
            </svg>
          </div>
          
          <p>Pick Up Where You Left Off</p>
          ${upsellContainerRecentlyViewed}
          ${upsellContainerMayLike}
        </div>
        `;
    }

    if (VARIATION === '1' && window.location.pathname === '/uk') return;

    const targetElement = document.querySelector('#header-promo-banner')
      ? document.querySelector('#header-promo-banner')
      : document.querySelector('body #desktop-navigation');

    if (upsellMayLikeAndRecentlyViewed) {
      targetElement.insertAdjacentHTML('afterend', upsellMayLikeAndRecentlyViewed);

      initSlider(ID, sliderConfig);
    }
  });
};

export default () => {
  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    if (e.target.closest(`.${ID}__continueShopping`) || e.target.closest(`.${ID}-upsellcontainer-close`)) {
      const upsellsOverlay = document.querySelector(`.${ID}-upsells-overlay`);
      const upsellsCombined = document.querySelector(`.${ID}-upsells-combined-${VARIATION}`);
      upsellsOverlay && (upsellsOverlay.style.display = 'none');
      upsellsCombined && (upsellsCombined.style.display = 'none');
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  const previousePage = location.href;
  //store in local storage
  //if homepage
  if (window.location.href === 'https://www.hotelchocolat.com/uk') {
    localStorage.setItem('previousePage', previousePage);
  }

  //localStorage.setItem('previousePage', previousePage);

  startTracking();

  if (localStorage.getItem(`${ID}-pdpsViewed`) >= 2) {
    startExperiment();
  }
};
