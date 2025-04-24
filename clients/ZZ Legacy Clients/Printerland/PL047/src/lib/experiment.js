/**
 * PL047 Filter Prominence (Mobile)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    document.querySelector('.show-mobile-filter.d-flex').addEventListener('click', (e) => {
      if (document.querySelector('.algolia-filter-container').classList.contains('active')) {
        fireEvent('Click - Filter CTA');
      }
      
    });

    
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  observer.connect(document.querySelector('#aisSearchContainer.al-search'), () => {
    if (document.querySelector('#aisSearchContainer.al-search').classList.contains('active')) {
      // alert('show results');
      const newFilters = `<div class="${ID}-filters__wrapper">
        <div class="${ID}-filter__container numOfProductsOnPage">
        </div>
        <div class="${ID}-filter__container filterBtn">
          <div class="${ID}-filter__btn" id="filter_by">
            <span class="filter"><i class="fas fa-filter"></i></span>
            <span>
              Filter Results
              <svg height='30px' width='30px'  fill="#ffffff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><g><polygon points="8.771,16.305 13.076,11.999 8.771,7.695 9.848,6.618 15.229,11.999 9.848,17.382  "></polygon></g></svg>
            </span>
          </div>
        </div>
      </div>`;
      // document.querySelector('#pnlPager').insertAdjacentHTML('beforebegin', newFilters);
      if (!document.querySelector(`.${ID}-filters__wrapper`)) {
        document.querySelector('.category-results-container').insertAdjacentHTML('beforebegin', newFilters);


        /**
         * @desc Filter by CTA click event
         */
        document.querySelector(`.${ID}-filter__btn#filter_by`).addEventListener('click', (e) => {
          // document.querySelector('.category-filter-bar-button').click();
          document.querySelector('.show-mobile-filter.d-flex').click();

          fireEvent('Click - Filter CTA');
        });
      }
      
      pollerLite(['.category-filters .category-current-filters-section .category-matching-products-icon span'], () => {
          document.querySelector(`.${ID}-filter__container.numOfProductsOnPage`).innerHTML = document.querySelectorAll('.category-filters .category-current-filters-section')[0].outerHTML;
      });

    } else {
      setTimeout(() => {
        // alert('remove header styling')
        document.querySelector(`.${ID}-filters__wrapper`).classList.remove('sticky');
        document.querySelector('header').removeAttribute('style');
        document.querySelector('header .header-top-container').removeAttribute('style');
      }, 500);
      
    }
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
    },
  });
  // --- Hide Control Filter Button
  pollerLite(['.show-mobile-filter.d-flex'], () => {
    document.querySelector('.show-mobile-filter.d-flex').parentNode.classList.add('hidden');
  });

  /**
   * @desc Update number of products in the Search results
   */
  pollerLite(['.category-results-container #hits ol.ais-Hits-list', 
  '#aisProductsCount span.ais-Stats-text',
  '.category-filters .category-current-filters-section',
  `.${ID}-filter__container.numOfProductsOnPage`], () => {
    document.querySelector(`.${ID}-filter__container.numOfProductsOnPage`).innerHTML = document.querySelectorAll('.category-filters .category-current-filters-section')[0].outerHTML;
    
    // observer.connect(document.querySelector('.category-results-container #hits ol.ais-Hits-list'), () => {
    observer.connect(document.querySelector('#aisProductsCount span.ais-Stats-text'), () => {
      if (document.querySelector('#aisSearchContainer.al-search').classList.contains('active')) {
        setTimeout(() => {
          // window.scrollTo({top: 0, behavior: 'smooth'});
          if (document.querySelector('#hits .ais-Hits.ais-Hits--empty')) {
            // --- No results
            document.querySelector('body').classList.add(`${ID}-noScroll`);
            window.scrollTo({top: 0, behavior: 'smooth'});
          } else {
            // --- Results found
            document.querySelector('body').classList.remove(`${ID}-noScroll`);
          }

          /**
           * @desc Every time the number of search results changes
           * update number of products
           */
          document.querySelector(`.${ID}-filter__container.numOfProductsOnPage`).innerHTML = document.querySelectorAll('.category-filters .category-current-filters-section')[0].outerHTML;
        }, 500);
        
  
      } 
    }, {
      throttle: 200,
      config: {
        attributes: false,
        // childList: true,
        subtree: true,
      },
    });
  });
  
  

  /**
   * @desc Create quicklinks container and move quick links inside
   */
  if (!document.querySelector(`.${ID}-quick-links__wrapper`)) {
    document.querySelector('#departmentLinks').insertAdjacentHTML('beforebegin', `<div class="${ID}-quick-links__wrapper"></div>`);
    document.querySelector(`.${ID}-quick-links__wrapper`).insertAdjacentElement('afterbegin', document.querySelector('#departmentLinks'));
  }
  


  // const productsOnPage = document.querySelector('.category-filters .category-current-filters-section').outerHTML;
  // const newFilters = `<div class="${ID}-filters__wrapper">
  //   <div class="${ID}-filter__container">
  //     <div class="${ID}-filter__btn" id="sort_by">
  //       <span class="m-auto"><i class="fas fa-arrows"></i></span>
  //       <span>Popularity</span></div>
  //     </div>
  //   <div class="${ID}-filter__container">
  //     <div class="${ID}-filter__btn" id="filter_by">
  //       <span class="m-auto"><i class="fas fa-filter"></i></span>
  //       <span>Filter</span>
  //     </div>
  //   </div>
  // </div>`;

  /*
  const newFilters = `<div class="${ID}-filters__wrapper">
    <div class="${ID}-filter__container numOfProductsOnPage">
    </div>
    <div class="${ID}-filter__container filterBtn">
      <div class="${ID}-filter__btn" id="filter_by">
        <span class="filter"><i class="fas fa-filter"></i></span>
        <span>
          Filter Results
          <svg height='30px' width='30px'  fill="#ffffff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><g><polygon points="8.771,16.305 13.076,11.999 8.771,7.695 9.848,6.618 15.229,11.999 9.848,17.382  "></polygon></g></svg>
        </span>
      </div>
    </div>
  </div>`;
  document.querySelector('#pnlPager').insertAdjacentHTML('beforebegin', newFilters);

  pollerLite(['.category-filters .category-current-filters-section .category-matching-products-icon span'], () => {
      document.querySelector(`.${ID}-filter__container.numOfProductsOnPage`).innerHTML = document.querySelectorAll('.category-filters .category-current-filters-section')[2].outerHTML;
  });

  document.querySelector(`.${ID}-filter__btn#filter_by`).addEventListener('click', (e) => {
    document.querySelector('.category-filter-bar-button').click();

    fireEvent('Click - Filter CTA');
  });
  */


  // pollerLite(['.category-filters .category-filter-accordion-container'], () => {
  //   const allFilterTypes = document.querySelectorAll('.category-filters .category-filter-accordion-container');
  //   [].forEach.call(allFilterTypes, (filter) => {
  //     if (filter.getAttribute('data-filter-name') !== 'Brand'
  //     && filter.classList.contains('is-active')) {
  //       console.log(filter);
  //       console.log(filter.querySelector('.category-filter-accordion-button'));
  //       filter.querySelector('.category-filter-accordion-button').click();
  //       // filter.classList.remove('is-active');
  //       // filter.querySelector('.category-filter-accordion-panel').setAttribute('style', 'display: none;');
  //       console.log('- - - - - -');
  //     } 
  //     if (filter.classList.contains('category-filter-price')) {
  //       filter.querySelector('.category-filter-accordion-button').click();
  //     }
  //   });
  // });

  /**
   * @desc Observe algolia filter container
   * When visible, show Control Filters CTA
   */
  pollerLite(['.show-mobile-filter.d-flex'], () => {
    observer.connect(document.querySelector('.algolia-filter-container'), () => {
      if (document.querySelector('.algolia-filter-container').classList.contains('active')) {
        document.querySelector('.show-mobile-filter.d-flex').parentNode.classList.remove('hidden');
      } else {
        document.querySelector('.show-mobile-filter.d-flex').parentNode.classList.add('hidden');
      }
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
      },
    });
  });
  

  /**
   * @desc Make New Filters CTA Sticky
   */
  pollerLite([`.${ID}-filters__wrapper`], () => {
    window.addEventListener("scroll", function() {
      let elementTarget = document.querySelector(`.${ID}-filters__wrapper`);
      let productList = document.querySelector('.category-results-container');
      if (document.querySelector('#aisSearchContainer.al-search').classList.contains('active')) {
        if (window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight)) {
          document.querySelector(`.${ID}-filters__wrapper`).classList.add('sticky');
          document.querySelector('header').setAttribute('style', 'padding-top: 0;');
          document.querySelector('header .header-top-container').setAttribute('style', 'display: none;');
        }
        if (window.scrollY < productList.offsetTop) {
          document.querySelector(`.${ID}-filters__wrapper`).classList.remove('sticky');
          document.querySelector('header').removeAttribute('style');
          document.querySelector('header .header-top-container').removeAttribute('style');
        }
      }
      
    });
    
    // observer.connect(document.querySelector('.header__search'), () => {
    //   if (!document.querySelector('.header__search').classList.contains('active')) {
    //     document.querySelector(`.${ID}-filters__wrapper`).classList.remove('sticky');
    //     document.querySelector('header').removeAttribute('style');
    //     document.querySelector('header .header-top-container').removeAttribute('style');
    //   } 
    // }, {
    //   throttle: 200,
    //   config: {
    //     attributes: true,
    //     childList: false,
    //   },
    // });
     
  });
  
};
