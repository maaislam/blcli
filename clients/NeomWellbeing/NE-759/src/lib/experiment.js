import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import initSwiper from './helpers/initSwiper';
import compareColumn from './components/compareColumn';
import compareTable from './components/compareTable';
import { headerData } from './data';

import fetchHandles from './helpers/getData';
import { addCssToPage, addJsToPage, obsIntersection } from './helpers/utils';
import setHeaderImageHeight from './helpers/setHeaderImageHeight';

const { ID, VARIATION } = shared;
const swiperJs = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
const swiperCss = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';

const init = () => {
  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    const intersectionCallback = (entry) => {
      if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
        entry.target.classList.add(`${ID}__seen`);
        fireEvent('User scrolls to see the recommendation carousel');
      }
    };

    obsIntersection(document.querySelector('[data-section-type="featured-products-section"]'), 0.3, intersectionCallback);
    return;
  }

  //remove existing

  const existing = document.querySelector(`.${ID}__comparison`);
  if (existing) {
    existing.remove();
  }

  const productTabs = document.querySelector('.js-product-description-overlay-bg');
  const attachPoint = productTabs.closest('.shopify-section');

  //render skeleton
  attachPoint.insertAdjacentHTML('afterend', compareTable(ID, headerData));
  //get data

  fetchHandles().then((result) => {
    console.log('🚀 ~ fetchHandles ~ result:', result);
    //render comparison products
    const comparisonColumns = document.querySelector('.comparison-columns-wrapper');
    result.forEach((product) => {
      comparisonColumns.insertAdjacentHTML('beforeend', compareColumn(ID, product));
    });

    pollerLite([() => typeof window.Swiper === 'function'], () => {
      initSwiper(`.${ID}__carousel`);

      const intersectionCallback = (entry) => {
        if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
          entry.target.classList.add(`${ID}__seen`);
          fireEvent('User scrolls to see the test');
        }
      };

      obsIntersection(document.querySelector(`.${ID}__carousel`), 0.3, intersectionCallback);
    });
  });

  //render comparison products
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  if (window.location.href.indexOf('us.neomwellbeing.com') > -1) {
    newEvents.property = 'G-KJ9062XWWK';
  } else if (window.location.href.indexOf('neomwellbeing.eu') > -1) {
    newEvents.property = 'G-9CQMVE6E0J';
  } else {
    newEvents.property = 'G-884D6MBLFG';
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('.product__description-more')) {
      fireEvent('User interacts with the read more cta on the PDP');
    } else if (target.closest('.product-tabs__headings h3')) {
      fireEvent('User interacts with product description tabs');
    } else if (target.closest('.product__variant-container a')) {
      fireEvent('User interacts with the size variants');
    } else if (target.closest(`.${ID}-cta a[href="/products/wellbeing-pod-luxe"]`)) {
      fireEvent('User interacts with the Luxe shop now CTA');
    } else if (target.closest(`.${ID}-cta a[href="/products/wellbeing-pod"]`)) {
      fireEvent('User interacts with the Pod shop now CTA');
    } else if (target.closest(`.${ID}-cta a[href="/products/wellbeing-pod-mini-essential-oil-diffuser-nude"]`)) {
      fireEvent('User interacts with the Mini shop now CTA');
    }
  });

  //add swiper js
  addJsToPage(swiperJs, `${ID}__swiperjs`);
  addCssToPage(swiperCss, `${ID}__swipercss`);

  init();
  setTimeout(() => {
    setHeaderImageHeight(ID);
    window.addEventListener('resize', () => setHeaderImageHeight(ID));
  }, 2000);
};
