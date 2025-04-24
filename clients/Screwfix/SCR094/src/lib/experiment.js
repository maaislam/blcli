/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { fetchSkus, getProductsData, isGoogleShopper, onUrlChange } from './helpers/utils';
import sliderWrapper from './components/sliderWrapper';
import swiper from './helpers/swiper';
import initSwiper from './helpers/initSwiper';
import products from './data/data';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 500;

const sliderRender = (targetPoint, filteredProducts) => {
  if (!document.querySelector(`.${ID}__sliderWrapper`)) {
    targetPoint.insertAdjacentHTML('afterend', sliderWrapper(ID, filteredProducts.slice(0, 20)));
  }
};

const init = () => {
  const { basicPageId, basicVatPriceDisplay, prodPrice, prodPriceIncVat } = window.utag.data;
  const pageCondition = basicPageId === 'product page';

  const productPrice = Number(basicVatPriceDisplay === 'INC-VAT' ? prodPriceIncVat[0] : prodPrice[0]);
  const generatePiceQueryString = () => {
    //?price_from=20&price_to=70
    const maxPrice = productPrice + 100;
    const minPrice = productPrice * 0.75;
    return { price_from: minPrice, price_to: maxPrice };
  };

  if (!pageCondition) {
    const element = document.querySelectorAll(`.${ID}__sliderWrapper`);
    if (element && element.length) {
      element.forEach((item) => item.remove());
    }
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  setup();

  if (VARIATION === 'control') {
    fireEvent('Conditions Met');
    return;
  }

  swiper();

  /*****add experiment specific code here*****/

  const targetPointV2 = document.querySelector('.store-locator-container nav[aria-label="Breadcrumb"]');
  const lastBreadcrumbItem = document.querySelector('[data-qaid="breadcrumb-qa"] > li:last-child a');
  const plpLink = lastBreadcrumbItem.href;
  const brandImageElement = document.querySelector('[data-qaid="pdp-brand-logo"]');
  const brandName = brandImageElement ? brandImageElement.alt : '';

  const newUrlForLastPlp = new URL(plpLink);
  const priceQueryString = generatePiceQueryString();

  newUrlForLastPlp.searchParams.set('price_from', priceQueryString.price_from);
  newUrlForLastPlp.searchParams.set('price_to', priceQueryString.price_to);
  newUrlForLastPlp.searchParams.set('page_size', 100);

  VARIATION === '2' && newUrlForLastPlp.searchParams.set('brand', brandName.toLowerCase());

  if (sessionStorage.getItem(`${ID}__data-${VARIATION}`)) {
    const storedData = JSON.parse(sessionStorage.getItem(`${ID}__data-${VARIATION}`));
    const getAllCategoryLinks = storedData.map((item) => item.lastBreadcrumbLink);
    const currentPageCategoryID = window.utag.data.prodCategoryId[0];

    if (!getAllCategoryLinks.some((item) => item.includes(currentPageCategoryID))) {
      const element = document.querySelectorAll(`.${ID}__sliderWrapper`);
      if (element && element.length) {
        element.forEach((item) => item.remove());
      }
      document.documentElement.classList.remove(ID);
      document.documentElement.classList.remove(`${ID}-${VARIATION}`);
      return;
    }

    const validSkus = storedData.map((item) => item.sku);

    const isSkuInUrl = validSkus.some((sku) => window.location.href.toLowerCase().includes(sku));

    if (isSkuInUrl) {
      const filteredProducts = storedData;
      fireEvent('Conditions Met');

      sliderRender(targetPointV2, filteredProducts);
      initSwiper(`.${ID}__sliderBox`, VARIATION);
    }
  }

  !sessionStorage.getItem(`${ID}__data-${VARIATION}`) &&
    plpLink &&
    fetchSkus(newUrlForLastPlp || plpLink)
      .then((skus) => getProductsData(skus))
      .then((products) => {
        const filteredProducts = products.filter((element) => element !== undefined);
        if (filteredProducts.length === 0) return;
        sliderRender(targetPointV2, filteredProducts);
        initSwiper(`.${ID}__sliderBox`, VARIATION);
        sessionStorage.setItem(`${ID}__data-${VARIATION}`, JSON.stringify(filteredProducts.slice(0, 20)));
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  // add css
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }
  /*****Request from Screwfix*****/

  const clickHandler = (e) => {
    if (window.utag.data.basicPageId !== 'product page') return;

    const { target } = e;
    if (target.closest(`.${ID}__next`) || target.closest(`.${ID}__prev`)) {
      fireEvent('User rotates the carousel');
    } else if (target.closest(`.${ID}__productLink`)) {
      fireEvent('User interacts with products in the carousel');
    } else if (
      target.closest('[data-qaid="pdp-best-seller-container"]') &&
      (target.closest('button.slick-next') || target.closest('button.slick-prev'))
    ) {
      fireEvent('User rotates "You may also like" carousel');
    } else if (target.closest('[data-qaid="pdp-best-seller-container"]') && target.closest('slick-slide')) {
      fireEvent('User clicks on "You may also like" carousel');
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  onUrlChange(() => {
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        const link = window.location.href;
        const isToplistProduct = products.find((item) => link.toLocaleLowerCase().includes(item.toLocaleLowerCase()));

        if ((isToplistProduct && isGoogleShopper()) || sessionStorage.getItem(`${ID}__data-${VARIATION}`)) {
          setTimeout(init, DOM_RENDER_DELAY);
        }
      }
    );
  });
};
