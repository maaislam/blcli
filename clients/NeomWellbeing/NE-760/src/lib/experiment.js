import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import initSwiper from './helpers/initSwiper';
import compareColumn from './components/compareColumn';
import compareTable from './components/compareTable';
import { headerData, podFamilyData } from './data';
import fetchHandles from './helpers/getData';
import { addCssToPage, addJsToPage, obsIntersection } from './helpers/utils';
import setHeaderImageHeight from './helpers/setHeaderImageHeight';
import renderSections from './helpers/renderSections';
import podFamily from './components/podFamily';

const { ID, VARIATION } = shared;
const swiperJs = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
const swiperCss = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';

const init = () => {
  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    const intersectionCallback = (entry) => {
      if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
        entry.target.classList.add(`${ID}__seen`);
        fireEvent('User scrolls to see the comparison table');
      }
    };

    obsIntersection(document.querySelector('[data-section-type="featured-products-section"]'), 0.3, intersectionCallback);
    return;
  }

  const anchorPoint = document.querySelector('.compare-products-section');

  const podFamilySection = `
    <div class="${ID}__podFamilySection">
        <h1>THE WELLBEING POD FAMILY</h1>
        <p class="${ID}__subTitle">Cleverly created to scent your space and boost your wellbeing... all at the touch of a button.</p>
        ${podFamilyData.map((product) => podFamily(ID, product)).join('')}
    </div>
  `;

  //anchorPoint.insertAdjacentHTML('beforeend', podFamilySection);
  //render skeleton
  anchorPoint.querySelector('div').style.display = 'none';

  const table = document.querySelector(`.${ID}__comparison`);

  if (table) {
    table.remove();
  }

  anchorPoint.insertAdjacentHTML('beforeend', compareTable(ID, headerData));

  //get data
  fetchHandles().then((result) => {
    //render comparison products
    const comparisonColumns = document.querySelector('.comparison-columns-wrapper');
    result.forEach((product) => {
      comparisonColumns.insertAdjacentHTML('beforeend', compareColumn(ID, product));
    });

    pollerLite([() => typeof window.Swiper === 'function', `.${ID}__carousel`], () => {
      initSwiper(`.${ID}__carousel`);

      const intersectionCallback = (entry) => {
        if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
          entry.target.classList.add(`${ID}__seen`);
          fireEvent('User scrolls to see the comparison table');
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

    if (target.closest('.pods a')) {
      fireEvent('User interacts with the quicklinks');
    } else if (target.closest(`.${ID}-cta a[href="/products/feel-refreshed-pod-luxe-starter-pack"]`)) {
      fireEvent('User interacts with the Luxe shop now cta');
    } else if (target.closest(`.${ID}-cta a[href="/products/feel-refreshed-pod-starter-pack"]`)) {
      fireEvent('User interacts with the Pod shop now cta');
    } else if (target.closest(`.${ID}-cta a[href="/products/feel-refreshed-pod-mini-starter-pack"]`)) {
      fireEvent('User interacts with the Mini Pod shop now cta');
    } else if (target.closest(`.${ID}-learnMore[href*="/wellbeing-pod-luxe"]`)) {
      fireEvent('User interacts with the Luxe learn more cta');
    } else if (target.closest(`.${ID}-learnMore[href*="/wellbeing-pod-essential-oil-diffuser"]`)) {
      fireEvent('User interacts with the Pod learn more cta');
    } else if (target.closest(`.${ID}-learnMore[href*="/wellbeing-pod-mini-car"]`)) {
      fireEvent('User interacts with the Mini Pod learn more cta');
    } else if (target.closest('a[title="https://www.neomorganics.com/collections/the-wellbeing-pod/products/wellbeing-pod"]')) {
      fireEvent('User interacts with the Luxe shop now cta');
    } else if (target.closest('a[title="https://www.neomorganics.com/products/wellbeing-pod-luxe"]')) {
      fireEvent('User interacts with the Pod shop now cta');
    } else if (
      target.closest(
        'a[title="https://www.neomorganics.com/collections/the-wellbeing-pod-mini/products/wellbeing-pod-mini-essential-oil-diffuser-nude"]'
      )
    ) {
      fireEvent('User interacts with the Mini Pod shop now cta');
    } else if (target.closest('.scene-1 > div:nth-of-type(100) a')) {
      fireEvent('User interacts with the Luxe learn more cta');
    } else if (target.closest('.scene-1 > div:nth-of-type(64) a')) {
      fireEvent('User interacts with the Pod learn more cta');
    } else if (target.closest('.scene-1 > div:nth-of-type(65) a')) {
      fireEvent('User interacts with the Mini Pod learn more cta');
    } else if (target.closest('.group > div:nth-of-type(7)')) {
      fireEvent('On mobile, user selects Luxe tab');
    } else if (target.closest('.group > div:nth-of-type(9)')) {
      fireEvent('On mobile, user selects Pod tab');
    } else if (target.closest('.group > div:nth-of-type(8)')) {
      fireEvent('On mobile, user selects Mini Pod tab');
    }
  });

  //add swiper js
  addJsToPage(swiperJs, `${ID}__swiperjs`);
  addCssToPage(swiperCss, `${ID}__swipercss`);

  init();
  //renderSections(ID);
  setTimeout(() => {
    setHeaderImageHeight(ID);
    window.addEventListener('resize', () => setHeaderImageHeight(ID));
  }, 2000);
};
