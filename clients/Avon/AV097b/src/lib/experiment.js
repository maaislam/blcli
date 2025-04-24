/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import renderCarousel from './components/carousel';
import { promotionTile } from './components/newContent';
import { carouselData } from './data';
import initExternalLib from './helpers/addExternalLib';
import initSwiper from './helpers/initSwiper';
import obsIntersection from './helpers/observeIntersection';
import { swiperConfig } from './helpers/swiperConfigs';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Test Code Fired');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    const anchor = document.querySelector(`#shopify-section-1635510569cde3d0a3`);
    const callbackFn = (entry) => {
      if (entry.isIntersecting) {
        fireEvent('Conditions Met');
      }
    };

    obsIntersection(anchor, 1, callbackFn);
    return;
  }

  if (VARIATION == '2') {
    const tiles = document
      .getElementById('shopify-section-1635510569cde3d0a3')
      .getElementsByClassName('featured-images__product');

    const giftTile = tiles[tiles.length - 1];
    const adjustTileHeight = () => {
      const tileHeight = tiles[1].clientHeight;

      giftTile.style.height = `${tileHeight - 9}px`;
    };

    giftTile.innerHTML = promotionTile;
    // const colRight = giftTile.closest('.featured-images__holder-row');
    // const colLeft = colRight.previousElementSibling;

    // colRight.prepend(colLeft.lastElementChild);
    // colLeft.prepend(colRight.lastElementChild);
    tiles[0].closest('.featured-images__holder-row').prepend(giftTile);
    var timesRun = 0;
    const interval = setInterval(() => {
      timesRun += 1;
      if (timesRun === 60) {
        clearInterval(interval);
      }
      adjustTileHeight();
    }, 1000);

    //adjustTileHeight();

    window.addEventListener('resize', adjustTileHeight);

    document.querySelector(`.${ID}-promotion__tile`).addEventListener('click', () => {
      fireEvent('Click -  returning user sample category tiles');
    });
    //}
    const anchor = document.querySelector(`.${ID}-promotion__tile`);
    const callbackFn = (entry) => {
      if (entry.isIntersecting) {
        fireEvent('Conditions Met');
      }
    };

    obsIntersection(anchor, 1, callbackFn);

    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const swiperJs = 'https://m7cdn.io/common/js/swiper.js';
  const swiperCss = 'https://dev.m7cdn.io//common/css/swiper.css';
  const mainContent = document.getElementById('MainContent');
  const sliderContainer = `.${ID}__carousel`;

  mainContent.classList.add(`${ID}__MainContent`);
  const controlSlider = mainContent.querySelector('.hero-holiday');

  controlSlider.classList.add(`${ID}__hide`, `${ID}__invisible`);

  initExternalLib(swiperJs, swiperCss);

  renderCarousel(ID, carouselData, mainContent);
  ///
  const adjustHeight = () => {
    const newSlider = document.querySelector(`.${ID}__carousel--section`);
    controlSlider.classList.remove(`${ID}__hide`);
    setTimeout(() => {
      const height = controlSlider.offsetHeight;
      controlSlider.classList.add(`${ID}__hide`);
      const anchors = newSlider.querySelectorAll('a');
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      console.log(height);

      anchors.forEach((item) => {
        if (!isMobile) {
          item.style.height = height > 330 ? height - 100 + 'px' : height + 'px';
        }
      });
    }, 500);
  };
  adjustHeight();
  window.addEventListener('resize', adjustHeight);

  setTimeout(() => {
    initSwiper(sliderContainer, swiperConfig, fireEvent);
    fireEvent('Conditions Met');
  }, 2000);

  //create new carousel
};
