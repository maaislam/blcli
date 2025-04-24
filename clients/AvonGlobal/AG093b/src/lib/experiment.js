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
      console.log('seen', entry);
      intersectingElemClasses.add(`${ID}__seen`);
      fireEvent('Conditions Met');
    }
  };
  const { addedNodes } = mutation;
  const isMobile = DY.deviceInfo.type !== 'desktop';
  addedNodes.length <= 1 &&
    addedNodes.forEach((node) => {
      //console.log(node);

      if (node.nodeType === 1 && node.matches('.page_products_section') && !document.querySelector('#v7_vue_basket')) {
        swipeHnadler(fireEvent);
        initClickTrackings(fireEvent);
        obsIntersection(node, 0.9, intersectionCallback);
        if (VARIATION == 'control') {
          return;
        }
        PDP_MANAGER.getShopperId().then((shopperId) => {
          window.AG093aSpperId = shopperId;
          DYO.recommendationWidgetData('${Select Strategy}', {}, function (err, data) {
            console.log(data);
            if (data.slots.length <= 0) {
              //hide carousel
              node.classList.add(`${ID}__hide`);
              //fireEvent to say product data missing
              fireEvent('no products loaded');
              //check
            } else {
              (function pollForElements() {
                if (
                  document.querySelectorAll('.page_product_slide').length === data.slots.length &&
                  document.querySelectorAll(`.${ID}__cartbtn--container`).length === 0 &&
                  document.querySelector(`.page_products_section`)
                ) {
                  const sliderSection = document.querySelector(`.page_products_section`);
                  const swiperSlides = sliderSection.querySelectorAll('.swiper-slide');

                  sliderSection.classList.add(`${ID}__sliderSection`);

                  swiperSlides.forEach((slide, i) => {
                    const anchorElm = slide.querySelector('.page_product_slide');
                    const itemName = anchorElm.querySelector(`${isMobile ? '.title' : '.product_title'}`).innerText.trim();

                    const matchingProd = data.slots.filter((prod) => prod.item.name.trim() === itemName);

                    const inStock = matchingProd[0].item['in_stock'];
                    const productSku = matchingProd[0].item.url.split('prodId=')[1].split('&')[0];
                    anchorElm.classList.add(`${ID}__anchorElm`);

                    addToCartBtn(ID, productSku, anchorElm, fireEvent, inStock);
                  });
                } else {
                  setTimeout(pollForElements, 25);
                }
              })();
            }
          });
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
