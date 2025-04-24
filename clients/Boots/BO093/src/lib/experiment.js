/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { pollerLite } from '../../../../../lib/utils';
import topFilters from './filterData';
import {
  cookieOpt,
  fireEvent,
  setup
} from './services';
import shared from './shared';

export default () => {
  const {
    ID,
    VARIATION
  } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
  Experiment code 
  ------------------ */

  if(VARIATION === '1') {
    let allBrandFilters;
    let products;
    if (window.location.href.indexOf('?searchTerm') > -1) {
      products =  document.querySelector('.product_listing_container');
      allBrandFilters = document.querySelectorAll('#productsFacets #brandRefinementList .ais-RefinementList-list li');
    } else {
      products = document.querySelector('#estores_product_listing_widget');
      allBrandFilters = document.querySelectorAll('#productsFacets #brand .facetSelect li');
    }

    // create filter component
    const createFilterWrapper = () => {
      const heroFilter = document.createElement('div');
      heroFilter.classList.add(`${ID}-heroFilters`);
      heroFilter.innerHTML = `
        <h3>Filter by our top brands</h3>
        <div class="${ID}-filters">
        
        </div>
        <div class="${ID}-allBrands">
          <h3>View all brands</h3>
          <div class="${ID}-brands"></div>
        </div>`;

      products.insertAdjacentElement('afterbegin', heroFilter);
    }


    /**
     * PLP Functions
     */

    // loop through the filters and add brands
    const addBrandFilters = () => {
      const urlReg = window.location.pathname.match(/((\/)(health-pharmacy|beauty|fragrance|baby-child|wellness|toiletries|electrical|mens)(\/)[\w\d-]+)(\/)/)
      const data = topFilters;

      if (urlReg[0]) {
        const filterBrands = data[urlReg[0]];

        for (let index = 0; index < allBrandFilters.length; index += 1) {
          const element = allBrandFilters[index];
          const filterName = element.querySelector('.outline *[id^="facetLabel_"]');

          // add filter if it's in the list
          if (filterBrands.indexOf(filterName.textContent) > -1) {

            const filterTarget = element.querySelector('.facetbutton').id;

            const brandFilter = document.createElement('div');
            brandFilter.classList.add(`${ID}-brandFilter`);
            brandFilter.classList.add(`${ID}-topFilter`);
            brandFilter.setAttribute('filter-target', filterTarget);
            brandFilter.innerHTML = `<span>${filterName.textContent}</span>`;

            document.querySelector(`.${ID}-filters`).appendChild(brandFilter);

          } else {
            // add the rest to all brands

            const otherfilterTarget = element.querySelector('.facetbutton').id;
            const otherbrandFilter = document.createElement('div');
            otherbrandFilter.classList.add(`${ID}-allbrandFilter`);
            otherbrandFilter.classList.add(`${ID}-topFilter`);
            otherbrandFilter.setAttribute('filter-target', otherfilterTarget);
            otherbrandFilter.innerHTML = `<span>${filterName.textContent}</span>`;

            document.querySelector(`.${ID}-brands`).appendChild(otherbrandFilter);
          }
        }

      }
    }

    // trigger all brands component
    const allBrandTrigger = () => {
      const brandToggle = document.querySelector(`.${ID}-allBrands`);
      brandToggle.querySelector('h3').addEventListener('click', () => {
        if (brandToggle.classList.contains(`${ID}-brandsOpen`)) {
          brandToggle.classList.remove(`${ID}-brandsOpen`);
        } else {
          brandToggle.classList.add(`${ID}-brandsOpen`);
          fireEvent('Clicked View all brands');
          // move the all the brands on click of all brands
          if (window.location.href.indexOf('?searchTerm') > -1 && document.querySelector(`.${ID}-brands`).innerHTML === '') {
            addAllSearchBrands();
          }
        }
      });
    }

    // slick filters
    const slickFilters = () => {
      window.jQuery(`.${ID}-filters`).slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        draggable: true,
        rows: 0,
        infinite: true,
        nextArrow: `<button class="slide-arrow ${ID}-next"></button>`,
        prevArrow: `<button class="slide-arrow ${ID}-back"></button>`,

        mobileFirst: true,
        responsive: [{
            breakpoint: 9999,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              dots: false,
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              dots: false,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              dots: false,
            }
          },
          {
            breakpoint: 200,
            settings: "unslick"
          }
        
        ]
      });
    }

    // check if any filters already active
    const checkActiveFilter = () => {
      const filters = document.querySelectorAll(`.${ID}-topFilter`);
      for (let index = 0; index < filters.length; index += 1) {
        const element = filters[index];

        const filterTargets = element.getAttribute('filter-target');
        
        console.log(element);
        let matchingFilter;
          if (window.location.href.indexOf('?searchTerm') > -1) {
            matchingFilter = document.querySelector(`.ais-RefinementList-checkbox[value="${filterTargets}"]`);

            if (matchingFilter) {
              if (matchingFilter.checked) {
                element.classList.add(`${ID}-filterActive`);
              } else {
                element.classList.remove(`${ID}-filterActive`);
              }
            }

          } else {
            matchingFilter = document.querySelector(`.row.facetContainer a[id^="${filterTargets.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&")}"`);
            if (matchingFilter) {
              if (matchingFilter.getAttribute('aria-checked') === 'true') {
                element.classList.add(`${ID}-filterActive`);
              } else {
                element.classList.remove(`${ID}-filterActive`);
              }
            }
          
          }

        
      }
    }

    

    // on click of new filters
    const filterClick = () => {
      const filters = document.querySelectorAll(`.${ID}-topFilter`);
      for (let index = 0; index < filters.length; index += 1) {
        const element = filters[index];
        element.addEventListener('click', (e) => {
          const targetEl = e.currentTarget.getAttribute('filter-target');
          const filterName = e.currentTarget.querySelector('span');

          let matchingEl;
          if (window.location.href.indexOf('?searchTerm') > -1) {
            matchingEl = document.querySelector(`.ais-RefinementList-checkbox[value="${targetEl}"]`);
          } else {
            matchingEl = document.querySelector(`.row.facetContainer a[id^="${targetEl.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&") }"`);
          }

          matchingEl.click();

          if (filterName) {
          fireEvent('Clicked Hero Filter');
          }
        });
      }
    }

    /**
     * Search Page Functions
     */
    const addtopBrandFilters = () => {
      const prodArr = Array.from(allBrandFilters);
      const firstTen = prodArr.slice(0,10);

      for (let index = 0; index < firstTen.length; index += 1) {
        const element = firstTen[index];

        const filterTarget = element.querySelector('.ais-RefinementList-checkbox').value;
        const filterName = element.querySelector('.ais-RefinementList-labelText').textContent.replace(/\(.*\)/, '');

        const brandFilter = document.createElement('div');
        brandFilter.classList.add(`${ID}-brandFilter`);
        brandFilter.classList.add(`${ID}-topFilter`);
        brandFilter.setAttribute('filter-target', filterTarget);
        brandFilter.innerHTML = `<span>${filterName}</span>`;

        document.querySelector(`.${ID}-filters`).appendChild(brandFilter);
      }
    }

    const addAllSearchBrands = () => {
      if(document.querySelector('#productsFacets #brandRefinementList .ais-RefinementList-showMore')) {
        document.querySelector('#productsFacets #brandRefinementList .ais-RefinementList-showMore').click();
      }
      pollerLite([ () => {
        if(document.querySelectorAll('#productsFacets #brandRefinementList .ais-RefinementList-item').length > 10) {
          return true
        }
      }], () => {
        const allBrands = document.querySelectorAll('#productsFacets #brandRefinementList .ais-RefinementList-list li');
        const products = Array.from(allBrands);
        const afterTen = products.slice(10);

        for (let index = 0; index < afterTen.length; index += 1) {
          const element = afterTen[index];

          const otherfilterTarget = element.querySelector('.ais-RefinementList-checkbox').value;
          const filterName = element.querySelector('.ais-RefinementList-labelText').textContent.replace(/\(.*\)/, '');

          const otherbrandFilter = document.createElement('div');
          otherbrandFilter.classList.add(`${ID}-allbrandFilter`);
          otherbrandFilter.classList.add(`${ID}-topFilter`);
          otherbrandFilter.setAttribute('filter-target', otherfilterTarget);
          otherbrandFilter.innerHTML = `<span>${filterName}</span>`;
          

          document.querySelector(`.${ID}-brands`).appendChild(otherbrandFilter);
        }

        allBrandFilterclick();

      });
      
    }

    const allBrandFilterclick = () => {
      pollerLite([`.${ID}-allbrandFilter`], () => {
        const filters = document.querySelectorAll(`.${ID}-allbrandFilter`);
        for (let index = 0; index < filters.length; index += 1) {
          const element = filters[index];
          element.addEventListener('click', (e) => {
            const targetEl = e.currentTarget.getAttribute('filter-target');
            const filterName = e.currentTarget.querySelector('span');

            let matchingEl;
            if (window.location.href.indexOf('?searchTerm') > -1) {
              matchingEl = document.querySelector(`.ais-RefinementList-checkbox[value="${targetEl}"]`);
            } else {
              matchingEl = document.querySelector(`.row.facetContainer a[id^="${targetEl.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&") }"`);
            }

            matchingEl.click();

            if (filterName) {
              fireEvent('Clicked all brand filter');
            }
          });
        }
      });
      
    }



    if (window.location.href.indexOf('?searchTerm') > -1) {
      createFilterWrapper();
      addtopBrandFilters();
      allBrandTrigger();
      filterClick();
      checkActiveFilter();

      if (window.innerWidth > 767) {
        if (document.querySelectorAll(`.${ID}-brandFilter`).length > 2) {
          slickFilters();
          window.jQuery(`.${ID}-filters`).slick('resize');
        }
      }

      window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
          if (document.querySelectorAll(`.${ID}-brandFilter`).length > 2) {
            slickFilters();
            window.jQuery(`.${ID}-filters`).slick('resize');
          }
        }
    }, true);
    } else {
      createFilterWrapper();
      addBrandFilters();
      allBrandTrigger();
      checkActiveFilter();
      filterClick();


      if (window.innerWidth > 767) {
        if (document.querySelectorAll(`.${ID}-brandFilter`).length > 2) {
          slickFilters();
          window.jQuery(`.${ID}-filters`).slick('resize');
        }
      }
    }
  }
};
