/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import addToCartBtn from './components/addToCartBtn';
import initClickTrackings from './helpers/clickTrackings';
import getDYData from './helpers/getDYStrategyData';
import obsIntersection from './helpers/observeIntersection';
import { swipeHnadler } from './helpers/swipeHandler';

const { rootScope, ID, VARIATION } = shared;
const init = (mutation) => {
  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  const intersectionCallback = (entry) => {
    const intersectingElemClasses = entry.target.classList;
    if (
      entry.isIntersecting &&
      !intersectingElemClasses.contains(`${ID}__seen`) &&
      !intersectingElemClasses.contains(`${ID}__hide`)
    ) {
      //console.log('seen', entry);
      intersectingElemClasses.add(`${ID}__seen`);
      fireEvent('Conditions Met');
    }
  };
  const { addedNodes } = mutation;
  const isMobile = DY.deviceInfo.type !== 'desktop';
  addedNodes.length <= 1 &&
    addedNodes.forEach((node) => {
      if (node.nodeType === 1 && node.matches('.page_products_section') && location.href.indexOf('#basket') !== -1) {
        //swipeHnadler(fireEvent);

        obsIntersection(node, 0.9, intersectionCallback);
        if (VARIATION == 'control') {
          return;
        }

        PDP_MANAGER.getShopperId().then((shopperId) => {
          window.AG100aSpperId = shopperId;
          getDYData().then((data) => {
            console.log('combinedData', data);
            if (data.length <= 0) {
              //hide carousel
              node.classList.add(`${ID}__hide`);
              //fireEvent to say product data missing
              fireEvent('no products loaded');
              //check
            } else {
              (function pollForElements() {
                if (
                  document.querySelectorAll('.page_product_slide').length === data.length &&
                  document.querySelectorAll(`.${ID}__cartbtn--container`).length === 0 &&
                  document.querySelector(`.page_products_section`)
                ) {
                  const sliderSection = document.querySelector(`.page_products_section`);
                  const swiperSlides = sliderSection.querySelectorAll('.swiper-slide');

                  sliderSection.classList.add(`${ID}__sliderSection`);

                  swiperSlides.forEach((slide, i) => {
                    const anchorElm = slide.querySelector('.page_product_slide');
                    const itemNameBlock = anchorElm.querySelector('.product_title') || anchorElm.querySelector('.title');
                    const itemName = itemNameBlock.innerText.trim();

                    const matchingProd = data.filter((prod) => prod.name.trim() === itemName);
                    console.log('mProd', matchingProd);
                    //  const inStock = matchingProd[0]['in_stock'];
                    const productSku = matchingProd[0].url.split('prodId=')[1].split('&')[0];
                    const inStock = matchingProd[0]['in_stock'] && productSku.indexOf('-') !== -1;
                    console.log(inStock);
                    anchorElm.classList.add(`${ID}__anchorElm`);
                    addToCartBtn(ID, productSku, anchorElm, fireEvent, inStock);
                  });
                } else {
                  setTimeout(pollForElements, 25);
                }
              })();
            }
          });
          // DYO.recommendationWidgetData(130171, {}, function (err, data) {

          // });
        });
      }
    });

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};

// Make device specific changes when layout changes
// rootScope.$on('App_LayoutChanged', () => {
//   setTimeout(init, 500);
// });

export default () => {
  // Poll and re-run init

  pollerLite(['body'], () => {
    const appContainer = document.querySelector('body');
    setup();
    initClickTrackings(ID, fireEvent);
    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    //let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        setTimeout(() => {
          init(mutation);
        }, 2000);
      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
  });
};
