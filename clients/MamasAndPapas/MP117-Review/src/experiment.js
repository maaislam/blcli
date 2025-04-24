import { fullStory, events } from '../../../../lib/utils';

// ------------------------------------------------------
// REVIEW NOTES
//
// - 1. some functions have been moved from services and components into
// their own classes - it's a first step in breaking down into
// the relative responsibilities of individual functions
// - 2. the init() function is too large so some of that code has been
// marked as needed breaking down into individual functions
// ------------------------------------------------------

// import specific components here..

import filtersInstance from './lib/filters'; // Filters
import lightboxInstance from './lib/lightbox'; // lightbox

/**
 * {{MP117}} - {{Prominent Filters - Mobile (MP091 Iteration)}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP117',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // Changes Text in Sale Filter
    if (document.querySelector('.SaleFilter')) {
      document.querySelector('.SaleFilter>a>p span').textContent = 'Sale Items';
    }
    // !!!!!
    // -> Move to function setFilterText(txt)
    // Low importance given that this is only done once 

    // Creates new filter button
    // !!!!! components.createFilterBtn();
    // !!!!! Moved to Filters class
    filtersInstance.createFilterBtn();

    // Checks active filters
    // !!!!! const activeFilters = services.checkActiveFilters();
    // !!!!! Moved to Filters class
    filtersInstance.checkActiveFilters();
    const numActiveFilters = filtersInstance.countActiveFilters();

    // !!!!! const totalNumberOfProducts = document.querySelector('.plp-title span.total-count').textContent.replace(' items', '');
    // !!!!! see filtersInstance.getTotalNumProducts()
    const totalNumberOfProducts = filtersInstance.getTotalNumProducts();

    const lightboxPartContainer = filtersInstance.buildLightboxPartContainer();
    // !!!!!
    // ...
    // Below code is used to build a filter 'part' so we 
    // move this to its own method
    // See filtersInstance.buildLightboxPartContainer()
    // ...
    // !!!!! let filterCount = 0; // eslint-disable-line no-unused-vars
    // !!!!! let lightboxPartContainer = '';
    // !!!!! [].forEach.call(filters, (filter) => {
    // !!!!!   const filterText = filter.querySelector('a').textContent;
    // !!!!!   // Get filter categories
    // !!!!!   const filterCategory = filter.getAttribute('data-goto-category').replace('filter_', '');

    // !!!!!   // Get filter items
    // !!!!!   const filterItems = document.querySelectorAll(`.js-checkbox.filter_group .d-inline-block .checkbox>div[data-search-query*='${filterCategory}']`);
    // !!!!!   let listItemContainer = '';

    // !!!!!   [].forEach.call(filterItems, (filterItem) => {
    // !!!!!     let activeClass = '';
    // !!!!!     /**
    // !!!!!      * @desc If there are active filters on the page,
    // !!!!!      * checks each filter and adds active class on the new checkbox
    // !!!!!      */
    // !!!!!     if (activeFilters > 0) {
    // !!!!!       if (filterItem.classList.contains('active')) {
    // !!!!!         activeClass = 'active';
    // !!!!!       }
    // !!!!!     }
    // !!!!!     let listItem = filterItem.getAttribute('data-search-query').replace(`${filterCategory}:`, '');
    // !!!!!     if (listItem === 'inStock') {
    // !!!!!       listItem = 'In Stock';
    // !!!!!     }
    // !!!!!     const filterId = services.camelize(listItem);
    // !!!!!     filterItem.setAttribute('id', `MP117-${filterId}`);
    // !!!!!     listItemContainer += `<li class='MP117-filter__item'><div class='MP117-filterItem d-inline-block'>
    // !!!!!     <div class='checkbox'>
    // !!!!!       <div class='checkbox_toggle cursor-pointer text-center ${activeClass}' id='checkbox-MP117-${filterId}' data-name='MP117-${filterId}' data-search-query='priceRange:${listItem}'></div>
    // !!!!!         <div class='MP117-filterName checkbox_text pl-2'>${listItem}</div>
    // !!!!!       </div>
    // !!!!!     </div></li>`;
    // !!!!!     filterCount++; // eslint-disable-line no-plusplus
    // !!!!!   });

    // !!!!!   lightboxPartContainer += `<div class='MP117-filterBox__part'>
    // !!!!!   <span class='MP117-filterCategory' data-count='0'>${filterText}<span class='selected hide'></span><span class='MP117-showFilters'></span></span>
    // !!!!!     <ul class='MP117-filterList'>${listItemContainer}</ul>
    // !!!!!   </div>`;
    // !!!!! });

    /**
     * @desc Creates filter lightbox
     */
    // !!!! components.createLightbox(totalNumberOfProducts, lightboxPartContainer);
    // !!!! Moved to lightboxInstance.buildLightboxPartContainer()
    //
    const filters = filtersInstance.getAllFilters(); // !!! new method
    const lightboxPartContainer = lightboxInstance.buildLightboxPartContainer(filters); // !!! pass filters..

    lightboxInstance.create(totalNumberOfProducts, lightboxPartContainer);

    setTimeout(function() {
      lightboxInstance.destroy();
    }, 100000);

    someElement.addEventListener('click', () => {
        lightboxInstance.destroy();
    });

    /**
     * @desc If there are active filters,
     * adds green dot on its category and filter boxes on top section of lightbox
     */
    if (activeFilters > 0) {
      let count;
      const lightboxFilterCats = document.querySelectorAll('.MP117-filterLightbox div.MP117-filterBox__part');
      [].forEach.call(lightboxFilterCats, (cat) => {
        count = 0;
        const lightboxFilters = cat.querySelectorAll('.MP117-filter__item');
        [].forEach.call(lightboxFilters, (filter) => {
          if (filter.querySelector('div.checkbox')) {
            if (filter.querySelector('div.checkbox_toggle').classList.contains('active')) {
              count++; // eslint-disable-line no-plusplus
              cat.querySelector('span.MP117-filterCategory').setAttribute('data-count', count);
              cat.querySelector('span.MP117-filterCategory > span.selected').classList.remove('hide');

              const preSelectedFilter = filter.querySelector('.MP117-filterName').textContent;
              const preCheckedFilterId = filter.querySelector('.checkbox_toggle').getAttribute('id').replace('checkbox-', '');
              components.createFilterBoxTopSection(preSelectedFilter, preCheckedFilterId);
            }
          }
        });
      });
    }

    // Show Filters (+)
    const showFilters = document.querySelectorAll('.MP117-showFilters');
    [].forEach.call(showFilters, (filter) => {
      filter.addEventListener('click', (e) => {
        if (!e.currentTarget.parentElement.nextElementSibling.classList.contains('show')) {
          e.currentTarget.parentElement.nextElementSibling.classList.add('show');
          e.currentTarget.style.backgroundImage = `url('https://dd6zx4ibq538k.cloudfront.net/static/images/4068/785d733457081d31f714be5c56fe0747_32_32.png')`; // eslint-disable-line quotes
        } else {
          e.currentTarget.parentElement.nextElementSibling.classList.remove('show');
          e.currentTarget.style.backgroundImage = `url('https://dd6zx4ibq538k.cloudfront.net/static/images/4068/de97baa2646f14a78287053612283fb9_32_32.png')`; // eslint-disable-line quotes
        }
      });
    });

    // Select Filters (check)
    const checkboxes = document.querySelectorAll('.checkbox_toggle.cursor-pointer.text-center');
    let countFilters;
    let checkedFilterId;
    [].forEach.call(checkboxes, (checkbox) => {
      checkbox.addEventListener('click', (e) => {
        const selectedFilter = e.currentTarget.nextElementSibling.textContent;
        if (!e.currentTarget.classList.contains('active')) {
          e.currentTarget.classList.add('active');
          events.send('MP117', 'Clicked', 'Filter Options', { sendOnce: true });
          // Click Filter's Checkbox (on Control)
          checkedFilterId = e.currentTarget.getAttribute('data-name');
          document.querySelector(`#${checkedFilterId}`).classList.add('active');
          // Adds filter box on Filters Section
          components.createFilterBoxTopSection(selectedFilter, checkedFilterId);
          // Show Green Dot on Filter Type
          e.currentTarget.closest('ul.MP117-filterList').previousElementSibling.querySelector('span.selected').classList.remove('hide');
          countFilters = e.currentTarget.closest('ul.MP117-filterList').previousElementSibling.getAttribute('data-count');
          countFilters++; // eslint-disable-line no-plusplus
          e.currentTarget.closest('ul.MP117-filterList').previousElementSibling.setAttribute('data-count', countFilters);
        } else {
          const allSelectedFilters = document.querySelectorAll('.MP117-selectedFilter .MP117-filterSelected');
          [].forEach.call(allSelectedFilters, (filter) => {
            if (filter.textContent.replace('X', '') === selectedFilter) {
              filter.parentNode.removeChild(filter);
              // Checks if last filter was removed, then hides the filters section
              services.hideFilterSection();
            }
          });
          e.currentTarget.classList.remove('active');
          events.send('MP117', 'Clicked', 'Item Removed', { sendOnce: true });
          // Removes Filter's Check (on Control)
          checkedFilterId = e.currentTarget.getAttribute('data-name');
          document.querySelector(`#${checkedFilterId}`).classList.remove('active');

          // Updated Count Filter on Category
          countFilters = e.currentTarget.closest('ul.MP117-filterList').previousElementSibling.getAttribute('data-count');
          countFilters--; // eslint-disable-line no-plusplus
          e.currentTarget.closest('ul.MP117-filterList').previousElementSibling.setAttribute('data-count', countFilters);
          // If filter removed is the last one in the category, then hide green dot
          if (countFilters === 0) {
            e.currentTarget.closest('ul.MP117-filterList').previousElementSibling.querySelector('span.selected').classList.add('hide');
          }
        }
      });
    });
    /**
     * @desc Reset Filters
     */
    document.querySelector('#MP117-resetFilters').addEventListener('click', () => {
      if (document.querySelector('.MP117-selectedFilter').children.length > 0) {
        document.querySelector('.MP117-selectedFilter').innerHTML = '';
        // Untick all boxes
        const allCheckedFilters = document.querySelectorAll('.checkbox_toggle.cursor-pointer.text-center.active');
        [].forEach.call(allCheckedFilters, (checkbox) => {
          checkbox.classList.remove('active');
        });
        // Removes all green dots (on selected filter types)
        const allDots = document.querySelectorAll('span.MP117-filterCategory > span.selected');
        [].forEach.call(allDots, (dot) => {
          dot.classList.add('hide');
        });
        // Hides Filter Section
        document.querySelector('.MP117-selectedFilter').classList.add('hide');
      }
      events.send('MP117', 'Clicked', 'Reset Filter', { sendOnce: true });
    });

    // Show Filter Lightbox
    document.querySelector('#MP117-filterBox__open').addEventListener('click', () => {
      document.querySelector('.MP117-filterLightboxContainer').classList.remove('hide');
      events.send('MP117', 'User Saw', 'Filter Options', { sendOnce: true });
    });
    // Close Filter Lightbox
    document.querySelector('#MP117-filterBox__close').addEventListener('click', () => {
      document.querySelector('.MP117-filterLightboxContainer').classList.add('hide');
    });

    // Apply Filters - CTA Button
    document.querySelector('#MP117-applyFilters__btn').addEventListener('click', () => {
      document.querySelector('.col-xs-6.px-2 button.btn-primary.btn.js-applyFilters.os-zoom-out').click();
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Checks Control for active filters
     */
    checkActiveFilters: function checkActiveFilters() {
      // Moved to filtersInstance.checkActiveFilters()
    },
    /**
     * @desc Transforms element IDs to camelCase
     */
    /*eslint-disable */
    camelize: function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      }).replace(/(\s+|[!@#$%^&*])/g, '');
    /* eslint-enable */
    },
    /**
     * @desc Checks Category for Active Filters
     */
    /*eslint-disable */
    checkCategoryForCheckedBoxes: function checkCategoryForCheckedBoxes(filterCat) {
      // Moved to filtersInstance.checkCategoryForCheckedBoxes()
    },
    /**
     * @desc Checks Category for Active Filters
     */
    /*eslint-disable */
    hideFilterSection: function hideFilterSection() {
      // Moved to lightboxInstance.hideFilterSection()
    },
  },

  components: {
    /**
     * @desc Creates Filter Button
     */
    createFilterBtn: function createFilterBtn() {
      // Moved to filtersInstance.createFilterBtn()
    },
    /**
     * @desc Creates Lightbox
     */
    createLightbox: function createLightbox(totalNumberOfProducts, lightboxPartContainer) {
      // Moved to lightboxInstance.create()
    },

    /*eslint-disable */
    createFilterBoxTopSection: function createFilterBoxTopSection(selectedFilter, checkedFilterId) {
      // Moved to lightboxInstance.createFilterBoxTopSection()
    },
  },
};

export default Experiment;
