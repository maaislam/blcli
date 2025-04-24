/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import renderProdlist from './components/products';
import initExternalLib from './helpers/addExternalLib';
import initSwiper from './helpers/initSwiper';
import { multiplePurchaseConfig, singlePurchaseConfig } from './helpers/swiperConfigs';
import { addToCart, getCart } from './helpers/addToCart';
import clickHandler from './helpers/clickHandler';
import obsIntersection from './helpers/observeIntersection';
import resizeHandler from './helpers/resizeHandler';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  const intersectionAnchor = document.getElementById('MainContent').getElementsByTagName('section')[0];
  const intersectionCallback = (entry) => {
    //console.log(entry);
    if (!entry.isIntersecting && location.pathname == '/' && !document.querySelector(`.${ID}__seen`)) {
      entry.target.classList.add(`${ID}__seen`);
      fireEvent('Conditions Met');
    }
  };

  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const swiperJs = 'https://m7cdn.io/common/js/swiper.js';
  const swiperCss = 'https://dev.m7cdn.io//common/css/swiper.css';

  DYO.recommendationWidgetData(143282, {}, (error, data) => {
    if (data.slots.length <= 0) return;
    obsIntersection(intersectionAnchor, 0.5, intersectionCallback);
    //console.log(data);
    if (VARIATION == 'control') {
      return;
    }

    const wrapperElm = document.createElement('div');

    const overlay = document.createElement('div');
    overlay.id = `${ID}__site-overlay`;
    wrapperElm.className = `${ID}__cards-wrapper`;
    intersectionAnchor.insertAdjacentElement('afterend', wrapperElm);
    document.getElementsByTagName('footer')[0].insertAdjacentElement('afterend', overlay);
    const anchorElm = document.querySelector(`.${ID}__cards-wrapper`);
    anchorElm.classList.add('container-fluid');

    //console.log(data);
    const excludeSample = data.slots.filter((slot) => slot.item.name.indexOf('Sample') === -1);
    const recentPurchase = excludeSample.slice(0, 4); //increase to 4 when testing done
    console.log(recentPurchase);
    const getAvonProdData = (slicedDtaFromDY) =>
      slicedDtaFromDY.map((data) => fetch(`${data.item.url.split('?')[0].split('.com')[1]}.js`));
    const fetchProdDetails = getAvonProdData(recentPurchase);

    Promise.all(fetchProdDetails)
      .then((results) => Promise.all(results.map((response) => response.json())))
      .then((data) => {
        console.log(data);
        //filter out fashion products
        const excludingFashion = data.filter((item) => item.tags.indexOf('fashion') === -1);

        if (excludingFashion.length === 0) return;
        renderProdlist(excludingFashion, anchorElm, ID, 'Buy it again');
        fireEvent(`User sees ${excludingFashion.length} products in the "buy it again" section`);
        const sliderContainer = `.${ID}__prodcards`;
        isMobile && initExternalLib(swiperJs, swiperCss);
        const swiperConfig = excludingFashion.length === 1 ? singlePurchaseConfig : multiplePurchaseConfig;

        isMobile && initSwiper(sliderContainer, swiperConfig, fireEvent);
        const resizeCallback = (entries) => {
          if (entries[0].contentRect.width <= 768) {
            if (localStorage.getItem('add-swiper') == 'true') return;

            localStorage.setItem('add-swiper', true);
            localStorage.removeItem('remove-swiper');
            location.reload();
          } else {
            if (localStorage.getItem('remove-swiper') == 'true') return;

            localStorage.setItem('remove-swiper', true);
            localStorage.removeItem('add-swiper');
            location.reload();
          }
        };
        resizeHandler(document.body, resizeCallback);

        return excludingFashion;
      })
      .then((excludingFashion) => {
        if (excludingFashion === undefined) return;
        const recentPurchaseQuantity = excludingFashion.length;
        if (recentPurchaseQuantity >= 3) return;
        DYO.recommendationWidgetData(143281, {}, function (error, response) {
          console.log('samples', response);
          const numOfSamplesReq = 3 - recentPurchaseQuantity;
          const extractSamples = response.slots.filter((slot) => slot.item.name.indexOf('Sample') !== -1);
          const samplesData = extractSamples.slice(0, numOfSamplesReq);
          const fetchProdDetails = getAvonProdData(samplesData);

          Promise.all(fetchProdDetails)
            .then((res) => Promise.all(res.map((response) => response.json())))
            .then((sampleData) => {
              console.log('sample data from Avon', sampleData);

              !isMobile && renderProdlist(sampleData, anchorElm, ID, 'Or try a sample');
            });
        });
      })
      .catch((err) => console.log('tada', err));
  });

  VARIATION !== 'control' && clickHandler(addToCart, getCart, isMobile, ID, fireEvent);
};
