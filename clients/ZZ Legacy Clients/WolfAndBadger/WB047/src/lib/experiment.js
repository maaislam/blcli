/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import renderprodSlider from './components/productSlider';
import { cartRecommendations, currencyConfig } from './data';
import initExternalLib from './helpers/addExternalLib';
import initSwiper from './helpers/initSwiper';
import obsIntersection from './helpers/observeIntersection';
import { swiperConfig } from './helpers/swiperConfigs';

const { ID, VARIATION } = shared;

const init = () => {
  const componentAlreadyExists = false;

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();

  //fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  //console.log(window.dataStore);
  const isCartPage = location.pathname.indexOf('/shopping-bag') !== -1;
  if (VARIATION == 'control' && isCartPage) {
    return;
  }
  // const isCartPage = location.pathname.indexOf('/shopping-bag') !== -1;
  // if (VARIATION == 'control' && isCartPage) {
  //   if(mutation.length > 0 ){
  //     mutation.addedNodes.forEach((item)=>{
  //       if(item.matches('[href*="/checkout/welcome/"]')){
  //         console.log
  //       }
  //     })
  //   }
  //   console.log(mutation);
  //   (function pollForLoadVariation() {
  //     if (document.querySelectorAll('[class^="Heading___StyledHeadingLevel-"]').length >= 3) {
  //       fireEvent('Test Code Fired');
  //     } else {
  //       setTimeout(pollForLoadVariation, 25);
  //     }
  //   })();
  //   return;
  // }

  const isMobile = window.matchMedia('(max-width: 700px)').matches;
  const anchorNodeNumber = isMobile && VARIATION == '2' ? 1 : 0;
  const anchorElm = document.querySelectorAll('[class^="Heading___StyledHeadingLevel-"]')[anchorNodeNumber];
  const anchorNode = anchorElm?.closest('.container');
  //console.log(anchorNode);
  if (!anchorNode) {
    return;
  }

  const data = window.dataStore.slice(0, 16);
  const currentCountry = location.pathname.split('/')[1];
  const currency = {
    country: currentCountry === 'global' ? 'row' : currentCountry,
    currencyData: currencyConfig[currentCountry] || currencyConfig['row'],
  };
  const sliderPresent = document.querySelectorAll(`${ID}__cart-recommendation-slider`).length <= 0;
  sliderPresent && renderprodSlider(ID, data, anchorNode, currency);

  const sliderContainer = `.${ID}__cart-recommendation-slider`;
  const intersectionCallback = (entry) => {
    if (entry.isIntersecting) {
      fireEvent('Conditions Met');
    }
  };
  initSwiper(sliderContainer, swiperConfig, fireEvent);

  obsIntersection(document.querySelector(sliderContainer), 0.5, intersectionCallback);
  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};

export default () => {
  // Poll and re-run init
  pollerLite(['body'], () => {
    //init();
    setup();
    const isCartPage = () => location.pathname.indexOf('/shopping-bag') !== -1;
    const appContainer = document.querySelector('body');
    const swiperJs = 'https://m7cdn.io/common/js/swiper.js';
    const swiperCss = 'https://dev.m7cdn.io//common/css/swiper.css';
    const getProdData = () => {
      Promise.all(cartRecommendations.map((item) => fetch(`/api/v1/products/${item.productId}/`)))
        .then((responses) => Promise.all(responses.map((response) => response.json())))
        .then((data) => {
          const mergedData = data.map((item, index) => {
            return {
              item,
              staticData: cartRecommendations[index],
            };
          });
          const filteredData = mergedData.filter((item) => item.item.available);
          //console.log(filteredData);
          const outOfStockPriority = mergedData.filter((item) => !item.item.available && item.staticData.top15 == 'true');
          if (outOfStockPriority.length > 0) {
            const outOfStockPriorityId = outOfStockPriority.map((item) => {
              return item.staticData.productId;
            });
            fireEvent(`out of stock priority product Ids: ${outOfStockPriorityId.join()}`);
          }

          window.dataStore = filteredData;
          //console.log(data);
          // observer.observe(appContainer, config);
          // setInterval(() => {
          //   if (
          //     location.pathname.indexOf('/shopping-bag/') !== -1 &&
          //     document.querySelectorAll(`.${ID}__cart-recommendation-slider`).length == 0
          //   ) {
          //     init();
          //   }
          // }, 25);
        })
        .catch((error) => {
          // if there's an error, log it
          // console.log(error);
          console.warn(error);
        });
    };
    fireEvent('Test Code Fired');

    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (!mutation.previousSibling?.matches('iframe') && isCartPage()) {
          getProdData();
          initExternalLib(swiperJs, swiperCss);
          setTimeout(() => {
            // -----------------------------------
            init();
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
          }, 2000);
        }

        if (oldHref != document.location.href && isCartPage()) {
          oldHref = document.location.href;

          document.body.classList.remove(`${shared.ID}`);

          document.body.addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches('[data-testid="add-to-bag"]')) {
              if (window.dataStore.some((item) => location.pathname.indexOf(item.staticData.ProductUrl) !== -1)) {
                // console.log('1 test');
                fireEvent('Adds product from carousel to basket');
              }
            }
          });
          getProdData();
          initExternalLib(swiperJs, swiperCss);
          setTimeout(() => {
            // -----------------------------------
            init();
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
          }, 2000);
        }
      });
    });

    const config = {
      childList: true,
      subtree: false,
    };
    observer.observe(appContainer, config);

    document.body.addEventListener('click', (e) => {
      const target = e.target;
      if (target.matches('[data-testid="add-to-bag"]')) {
        //console.log(target);
        if (window.dataStore.some((item) => location.pathname.indexOf(item.staticData.ProductUrl) !== -1)) {
          //console.log('2 test', location.pathname);
          fireEvent('Adds product from carousel to basket');
        }
      } else if (target.matches(`[class^="${ID}__swiper-button-"]`) || target.closest(`[class^="${ID}__swiper-button-"]`)) {
        fireEvent('Interact with arrows');
      } else if (target.matches(`.${ID}__recommendations--card`) || target.closest(`.${ID}__recommendations--card`)) {
        fireEvent('Clicks a product in carousel');
      }
    });
  });
};
