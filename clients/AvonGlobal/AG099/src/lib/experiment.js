/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import renderLeftBanner from './components/leftBanner';
import { renderLoader } from './components/loader';
import renderProdlist from './components/products';
import topCategory from './components/topCategory';
import { topCategoryData } from './data';
import initExternalLib from './helpers/addExternalLib';
import { isFavorite } from './helpers/favorite';
import getImages from './helpers/getimages';
import getProductDetails from './helpers/getProduct';

import initSwiper from './helpers/initSwiper';
import obsIntersection from './helpers/observeIntersection';
//import scrollDepth from './helpers/scrollDepth';
import { localStorageGet, localStorageRemove, localStorageSave } from './helpers/storage';
import { highlightConfig } from './helpers/swiperConfigs';

window.dyVariables = topCategoryData;
export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = (data) => {
    // fireEvent('Conditions Met');

    // -----------------------------
    // Add events that apply to both variant and control
    // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
    // -----------------------------
    // ...

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    document.body.addEventListener('click', (e) => {
      if (e.target.closest(`.${ID}__leftbanner`) || e.target.matches(`.${ID}__leftbanner`)) {
        localStorageSave('showcase-category-user', 'true');
      }
    });

    const pdpEvent = (eventLabel) => {
      console.log(eventLabel);
      document.body.addEventListener('click', (e) => {
        if (e.target.closest(`.button-add-to-cart`) || e.target.matches(`.button-add-to-cart`)) {
          fireEvent(eventLabel);
        }
      });
    };

    const urlBasedTrackings = () => {
      const userDefinedCategory = window.dyVariables.map((item) => item.url);
      const heroProducts = localStorageGet('hero-product-data');
      console.log('heroProducts', heroProducts);

      // if (location.pathname === '/') {
      //   return;
      // }

      if (userDefinedCategory.indexOf(location.pathname) !== -1 && localStorageGet('showcase-category-user') !== 'true') {
        fireEvent('Views hero category in navigation');
      } else if (userDefinedCategory.indexOf(location.pathname) !== -1 && localStorageGet('showcase-category-user') === 'true') {
        fireEvent('Views hero category through homepage');
        localStorageRemove('showcase-category-user');
      } else if (heroProducts?.indexOf(location.pathname) !== -1 && localStorageGet('hero-product-user') !== 'true') {
        fireEvent('Views hero products in navigation');
        pdpEvent('Add to bag of hero product from navigation');
      } else if (heroProducts?.indexOf(location.pathname) !== -1 && localStorageGet('hero-product-user') === 'true') {
        fireEvent('Views hero product through homepage');
        pdpEvent('Add to bag of hero product from homepage');

        localStorageRemove('hero-product-user');
      }
    };
    // if (location.pathname === '/') {
    //   //scrollDepth(fireEvent);
    // }
    //urlBasedTrackings();

    //heroProducts();

    if (VARIATION === 'control') {
      const getScrollPercent = () => {
        const winHeight = $(window).height();
        const docHeight = $(document).height();
        const scrollTop = $(window).scrollTop(); //NaN or zero at top
        const trackLength = docHeight - winHeight;
        const pctScrolled = Math.floor((scrollTop / trackLength) * 100);
        return pctScrolled;
      };

      window.addEventListener('scroll', () => {
        if (getScrollPercent() == 25) {
          fireEvent('Conditions Met', true);
        }
      });
      return;
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...
    console.log('I am in');

    const swiperJs = 'https://m7cdn.io/common/js/swiper.js';
    const swiperCss = 'https://dev.m7cdn.io//common/css/swiper.css';
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const mainContainer = document.querySelector('.BodyModuleContainers');
    mainContainer.classList.add(`${ID}__bodymodulecontainer`);

    //const anchorElem = mainContainer.children[`${isMobile ? 3 : 1}`];
    // const testAnchorElm = document.querySelector(
    //   `${isMobile ? '${Anchor element for mobile}' : '${Anchor element for desktop}'}`
    // );
    const testAnchorElm = document.querySelector('.BodyModuleContainers>div>div > div:nth-child(5)');

    const categoryShowcase = document.createElement('div');

    testAnchorElm.insertAdjacentElement('afterend', categoryShowcase);
    categoryShowcase.classList.add(`${ID}__categoty--showcase`);
    const showcaseContainer = document.querySelector(`.${ID}__categoty--showcase`);

    isMobile && initExternalLib(swiperJs, swiperCss);

    const renderCategorySection = (fireEvent, strategyID = '${Default Strategy ID}', heroImg, href, text1, text2) => {
      const id = parseInt(strategyID);
      //console.log(id);
      DYO.recommendationWidgetData(id, {}, function (error, data) {
        console.log('dy', data);

        isFavorite().then((favResult) => {
          //console.log(favResult);

          //const groupIds = data.slots.map((item) => item.item['group_id']);
          const groupIds = window.groupIds;
          //console.log('group-id', groupIds);

          getProductDetails(groupIds).then((res) => {
            console.log('dadada', res);

            // const dataPlusImage = res.Data.map((item) => {
            //   const filteredData = data.slots.filter((singleProd) => singleProd.item['group_id'] == item.Id)[0];
            //   console.log('filterData', filteredData);
            //   const imgUrl = filteredData.item['image_url'];
            //   const productUrl = filteredData.item.url;
            //   item.imgUrl = imgUrl;
            //   item.prodUrl = productUrl;
            //   return item;
            // });
            // console.log('dataPlusImage', dataPlusImage);

            // const staticIds = ['17651', '16425', '18559', '23731', '15310', '5327']; // for sorting
            // const sortedArr = staticIds
            //   .reduce((acc, curr) => {
            //     const item = dataPlusImage.filter((product) => product.Id == curr)[0];
            //     console.log(item);
            //     item && acc.push(item);
            //     return acc;
            //   }, [])
            //   .filter(Boolean)
            //   .slice(0, 4);

            // console.log('sortedArr', sortedArr);

            setTimeout(() => {
              showcaseContainer.innerHTML = '';
              showcaseContainer.classList.remove(`${ID}__loader-height`);
              renderProdlist(fireEvent, res.Data, favResult, categoryShowcase, ID);
              setTimeout(() => {
                renderLeftBanner(categoryShowcase, ID, heroImg, href, text1, text2);
              }, 3000);
              const intersectionCallback = (entry) => {
                // console.log(entry);
                const intersectingElemClasses = entry.target.classList;
                if (entry.isIntersecting && !intersectingElemClasses.contains(`${ID}__seen`)) {
                  // console.log('seen', entry);
                  intersectingElemClasses.add(`${ID}__seen`);
                  fireEvent('Conditions Met');
                }
              };

              obsIntersection(document.querySelector(`.${ID}__categoty--showcase`), 0.5, intersectionCallback);

              const sliderContainer = `.${ID}__prodcards`;

              isMobile && initSwiper(sliderContainer, highlightConfig, fireEvent);
              fireEvent('Test Code Fired');
            }, 500);
          });
        });
      });
    };

    topCategory(categoryShowcase, topCategoryData, ID);
    renderCategorySection(fireEvent);

    document.querySelector(`.${ID}__categories`).addEventListener('click', (e) => {
      const target = e.target;
      const categoryClicked = target.closest(`.${ID}__category`);
      console.log(categoryClicked);
      //clear current category section

      showcaseContainer.innerHTML = '';
      showcaseContainer.classList.add(`${ID}__loader-height`);

      showcaseContainer.innerHTML = renderLoader(ID);

      const strategyID = categoryClicked.getAttribute('data-strategyid');
      const heroImg = categoryClicked.getAttribute('data-heroimg');
      const catUrl = categoryClicked.getAttribute('data-href');
      const subtitle1 = categoryClicked.getAttribute('data-subtitle1');
      const subtitle2 = categoryClicked.getAttribute('data-subtitle2');

      renderCategorySection(fireEvent, strategyID, heroImg, catUrl, subtitle1, subtitle2);
    });
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    location.reload();
    //setTimeout(init, 500);
  });

  //

  init();
};
