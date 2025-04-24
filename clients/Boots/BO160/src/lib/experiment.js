/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { observer, pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import topFilters from './filterData';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }



  // FIX - ISSUE WITH VIEW ALL BECOMING UNDEFINED, NOT LOADING ON PAGE REFRESH

  // open features and click view all
  // const showAllFeatures = () => {
  //   SearchBasedNavigationDisplayJS.toggleExpand("ads_f24004_ntk_cs_4_3074457345618264155_3074457345619374529");
  //   setTimeout(() => {
  //     document.querySelector('#productsFacets #key\\ features #morelink_ads_f24004_ntk_cs').click();
  //     //SearchBasedNavigationDisplayJS.toggleShowMore('#morelink_ads_f24004_ntk_cs', 'ads_f24004_ntk_cs')
  //   }, 2000)
   
  //   //document.querySelector('#productsFacets #key\\ features #morelink_ads_f24004_ntk_cs').click();


  // //  // SearchBasedNavigationDisplayJS.toggleShowMore('#morelink_ads_f24004_ntk_cs', 'ads_f24004_ntk_cs')
  // //   //document.querySelector('#productsFacets #key\\ features #morelink_ads_f24004_ntk_cs').click();
  // //   // if (document.querySelector('#productsFacets #key\\ features #showMoreLabel_ads_f24004_ntk_cs').textContent.trim() === 'View all') {
  // //   //   document.querySelector('#productsFacets #key\\ features #morelink_ads_f24004_ntk_cs').click();
  // //   // }

  // //   // wait for all list to be shown
  // //   return new Promise((resolve, reject) => {
  // //     pollerLite(['#productsFacets #key\\ features li[data-additionalvalues="More"]'], () => {
  // //       resolve();
  // //     });
  // //   });

  // // }

  // // // -----------------------------
  // // // Write experiment code here
  // // // -----------------------------
  // // // ...

  // const removeFilter = () => {
  //   if (document.querySelector(`.${ID}-heroFilters`)) {
  //     document.querySelector(`.${ID}-heroFilters`).remove();
  //   }
  // }

  const createFilterWrapper = () => {
    const heroFilter = document.createElement('div');
    heroFilter.classList.add(`${ID}-heroFilters`);
    heroFilter.innerHTML = `
      <h3>Shop by product feature</h3>
      <div class="${ID}-filters"></div>`;

    const products = document.querySelector('#estores_product_listing_widget');
    products.insertAdjacentElement('afterbegin', heroFilter);
  }

  const addFilters = () => {
    const heroFilters = topFilters;

    //const allFeatureFilters = document.querySelectorAll('#productsFacets #key\\ features .facetSelect li');

    Object.keys(heroFilters).forEach((i) => {
      const data = heroFilters[i];
      const skinFilter = document.createElement('div');
      skinFilter.classList.add(`${ID}-topFilter`);
      skinFilter.setAttribute('filter-target', data.id);
      skinFilter.innerHTML = `<span></span><p>${[i][0]}</p>`;

      document.querySelector(`.${ID}-filters`).appendChild(skinFilter);

    });

    // for (let index = 0; index < allFeatureFilters.length; index += 1) {
    //   const element = allFeatureFilters[index];
    //   const filterName = element.querySelector('.outline *[id^="facetLabel_"]');

    //   if (filterName) {
    //     // add filter if it's in the list
    //     if (heroFilters.indexOf(filterName.textContent) > -1) {

    //       const filterTarget = element.querySelector('.facetbutton').id;
    //       const brandFilter = document.createElement('div');
    //       brandFilter.classList.add(`${ID}-topFilter`);
    //       brandFilter.setAttribute('filter-target', filterTarget);
    //       brandFilter.innerHTML = `<span></span><p>${filterName.textContent}</p>`;

    //       document.querySelector(`.${ID}-filters`).appendChild(brandFilter);

    //     }
    //   }
    // }
  }

  const filterClick = () => {
    const filters = document.querySelectorAll(`.${ID}-topFilter`);
    for (let index = 0; index < filters.length; index += 1) {
      const element = filters[index];
      element.addEventListener('click', (e) => {
        const targetEl = e.currentTarget.getAttribute('filter-target');
        const filterName = e.currentTarget.querySelector('span');

        let matchingEl;
        matchingEl = document.querySelector(`.row.facetContainer a[id^="${targetEl.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&") }"`);

        matchingEl.click();

        if (filterName) {
          fireEvent('Clicked Hero Filter');
        }
      });
    }
  }

  // const checkActiveFilter = () => {
  //   const filters = document.querySelectorAll(`.${ID}-topFilter`);
  //   for (let index = 0; index < filters.length; index += 1) {
  //     const element = filters[index];

  //     const filterTargets = element.getAttribute('filter-target');

  //     let matchingFilter;
  //     matchingFilter = document.querySelector(`.row.facetContainer a[id^="${filterTargets.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&")}"`);
  //     if (matchingFilter) {
  //       if (matchingFilter.getAttribute('aria-checked') === 'true') {
  //         element.classList.add(`${ID}-filterActive`);
  //       } else {
  //         element.classList.remove(`${ID}-filterActive`);
  //       }
  //     }
  //   }
  // }

  // const slickFilters = () => {
  //   window.jQuery(`.${ID}-filters`).slick({
  //     slidesToShow: 2,
  //     slidesToScroll: 1,
  //     draggable: true,
  //     rows: 0,
  //     infinite: true,
  //     nextArrow: `<button class="slide-arrow ${ID}-next"></button>`,
  //     prevArrow: `<button class="slide-arrow ${ID}-back"></button>`,

  //     mobileFirst: true,
  //     responsive: [{
  //         breakpoint: 9999,
  //         settings: {
  //           slidesToShow: 4,
  //           slidesToScroll: 1,
  //           dots: false,
  //         }
  //       },
  //       {
  //         breakpoint: 1023,
  //         settings: {
  //           slidesToShow: 4,
  //           slidesToScroll: 1,
  //           dots: false,
  //         }
  //       },
  //       {
  //         breakpoint: 200,
  //         settings: "unslick"
  //       }

  //     ]
  //   });
  // }


  createFilterWrapper();
  addFilters();

  if(window.innerWidth >= 1024) {
    slickFilters();

    window.jQuery(window).resize(function() {
      if(window.innerWidth >= 1024) {
          if(!document.querySelector(`.${ID}-product.slick-slide`)) {
            runSlick();
              window.jQuery(`.${ID}-topFilter`).slick('resize');
          }
      } else {
          if(document.querySelector(`.${ID}-filters.slick-initialized`)) {
              window.jQuery(`.${ID}-filters`).slick('unslick');
          }
      }
    });
  }



  // observer.connect(document.querySelector('.product_listing_container ul.grid_mode'), () => {
  //   if (document.querySelector('#productsFacets #key\\ features #showMoreLabel_ads_f24004_ntk_cs').textContent.trim() === 'undefined') {
  //     console.log('obs undefined')
  //     document.querySelector('#productsFacets #key\\ features #morelink_ads_f24004_ntk_cs').click();
  //   }
  // }, {
  //   throttle: 200,
  //   config: {
  //     attributes: false,
  //     childList: true,
  //     // subtree: true,
  //   },
  // }); 


};
