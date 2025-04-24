import { fullStory, events } from '../../../../lib/utils';

/**
 * {{TP123}} - {{Forced Category Interaction}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TP123',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /**
     * Hide other filters
     */
    const filters = document.querySelectorAll('#facets_filters > .item');
    components.hideFilters(filters);
    /**
     * Get Category titles and find the highest number of products.
     */
    const catTitles = document.querySelectorAll('#facets_filters #divFacet > .allFacetValues > .termtext > form > .control .facet');
    // const topCategoryNumber = components.orderCategories(catTitles);
    /**
     * Use the number to move that category to the top.
     */
    // const topCat = components.getTopCategory(topCategoryNumber, catTitles);
    /**
     * Top Category
     */
    // const oldTopCat = document.querySelector('#facets_filters #divFacet > .allFacetValues > .termtext:first-of-type');
    // components.moveCategory(oldTopCat, topCat);
    /**
     * Toggle other filters
     */
    components.showAllFilters(filters);
    /**
     * Toggle title on open and close of filters
     */
    components.toggleTitle(filters);
    /**
     * Add Breadcrumbs if on sub cat page
     */
    components.addBreadcrumb();
    /**
     * Only show top 3 cats on sub cat page
     */
    components.showTopThreeCats(filters);
    /**
     * Order the other categories
     */
    components.orderOtherCats(catTitles);
    /**
     * Hide categories after first five
     */
    components.hideAfterFive();
    /**
     * Run Test tracking
     */
    services.subCatTracking();
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
    subCatTracking() {
      const catTitles = document.querySelectorAll('#facets_filters #divFacet > .allFacetValues > .termtext > form > .control .facet');
      [].forEach.call(catTitles, (title) => {
        title.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Click', 'User clicked secondary filter', { sendOnce: false });
        });
      });
    },
  },

  components: {
    hideFilters(filterArr) {
      const alreadyOpened = sessionStorage.getItem('TP123-active-filters');
      if (alreadyOpened) {
        return;
      }
      [].forEach.call(filterArr, (filter) => {
        filter.classList.add('TP123-hide');
      });
    },
    /**
     * @desc Returns highest number in the category titles.
     * @param {Arr} catArr
     */
    orderCategories(catArr) {
      const numberArr = [];
      const topCategoryEl = null;
      function addToArr(number) {
        numberArr.push(number);
      }
      function getNumber() {
        [].forEach.call(catArr, (cat) => {
          const catText = cat.textContent;
          if (catText) {
            const numberText = catText.replace(/[a-zA-Z|((|)|&|,)]+/g, '').trim();
            const number = parseInt(numberText, 10);
            addToArr(number);
          }
        });
      }
      function highestNumber(arr) {
        return Math.max(...arr);
      }
      // Run functions
      getNumber(); // Returns numberArr
      const finalNum = highestNumber(numberArr);
      return finalNum;
    },
    /**
     * @desc Returns the top category in terms of products.
     * @param {Int} number
     * @param {Elements} titles
     */
    getTopCategory(topNumber, titles) {
      for (let i = 0; titles.length > i; i += 1) {
        const titleEl = titles[i];
        const titleText = titleEl.textContent;
        if (titleText) {
          const numberText = titleText.replace(/[a-zA-Z|((|)|&|,)]+/g, '').trim();
          const number = parseInt(numberText, 10);
          // If the numbers match
          if (number === topNumber) {
            const topCat = titleEl.parentNode.parentNode.parentNode;
            // If the topCat is actually a category element
            if (topCat.classList.contains('termtext')) {
              return topCat;
            }
          }
        }
      }
    },
    /**
     * @desc move the new top category to the top of the list.
     * @param {El} ref
     * @param {El} catEl
     */
    moveCategory(ref, catEl) {
      if (ref && catEl) {
        ref.insertAdjacentElement('beforebegin', catEl);
      }
    },
    /**
     * @desc Toggle all filters visible
     * @param {Arr} hiddenFilters
     */
    showAllFilters(hiddenFilters) {
      function addToggle() {
        const html = `
          <div class="TP123-refine-search">
            <h3><strong>Refine Search</strong></h3>
            
            <div class="category">
                <a class="TP123-toggle-others" title="Toggle Refinement">
                  View All Filters
                </a>
                <a class="collapsableArrow toggleArrow" onclick="return false;">
                  <span class="dropdown">
                    <span class="dropdown-img"></span>
                  </span>
                </a>
              </div>
          </div>
        `;
        const ref = document.querySelector('#facets_filters #facetWrapper');
        if (ref) {
          ref.insertAdjacentHTML('beforeend', html);
        }
      }
      addToggle();
      /**
       * Toggle categories from the View All Categories text
       */
      function toggle() {
        const clickEl = document.querySelector('.TP123-refine-search .TP123-toggle-others');
        const onSubCat = document.querySelector('#facets_filters #selected_facet_options span.remove');
        if (onSubCat) {
          return;
        }
        if (clickEl) {
          clickEl.addEventListener('click', () => {
            [].forEach.call(hiddenFilters, (filter) => {
              filter.classList.toggle('TP123-hide');
              // Add session storage to keep filters open
              sessionStorage.setItem('TP123-active-filters', 'true');
            });
          });
        }
      }
      toggle();
      /**
       * On click of the top category links show other filters.
       */
      function toggleFromCat() {
        const catTitles = document.querySelectorAll('#facets_filters #divFacet > .allFacetValues > .termtext > form > .control');
        [].forEach.call(catTitles, (title) => {
          title.addEventListener('click', () => {
            [].forEach.call(hiddenFilters, (filter) => {
              // Add session storage to keep filters open
              sessionStorage.setItem('TP123-active-filters', 'true');
            });
          });
        });
      }
      toggleFromCat();
    },
    /**
     * @desc Toggle the title text and icon
     * @param {Arr} filters
     */
    toggleTitle(filters) {
      const title = document.querySelector('.TP123-refine-search a.TP123-toggle-others');
      if (!title) {
        return;
      }
      /**
       * Changes text
       */
      function toggleText() {
        const icon = title.nextElementSibling.firstElementChild;
        if (filters[0].classList.contains('TP123-hide')) {
          title.textContent = 'View All Filters';
          icon.classList.remove('TP123-icon');
        } else {
          title.textContent = 'Close All Filters';
          icon.classList.add('TP123-icon');
        }
        events.send(Experiment.settings.ID, 'Click', 'User clicked View All Filters', { sendOnce: false });
      }
      const onSubCat = document.querySelector('#facets_filters #selected_facet_options span.remove');
      if (onSubCat) {
        return;
      }
      toggleText();
      title.addEventListener('click', toggleText);
    },
    addBreadcrumb() {
      const onSubCat = document.querySelector('#facets_filters #selected_facet_options span.remove');
      if (onSubCat) {
        const html = `
          <div class="TP123-breadcrumb">
            <a class="TP123-breadcrumb--link" href="#" onclick="window.history.back()">All Categories</a>
          </div>
        `;
        const ref = document.querySelector('#selected_facet_options');
        if (ref) {
          ref.insertAdjacentHTML('afterend', html);
        }
      }
    },
    showTopThreeCats(filters) {
      const onSubCat = document.querySelector('#facets_filters #selected_facet_options span.remove');
      if (onSubCat) {
        for (let i = 0; filters.length > i; i += 1) {
          if (i < 3) {
            filters[i].classList.remove('TP123-hide');
          } else {
            filters[i].classList.add('TP123-hide');
          }
        }
        // Toggle those 3 cats on click
        const toggleTitle = document.querySelector('.TP123-refine-search .TP123-toggle-others');
        // Reset title and icon
        if (toggleTitle) {
          toggleTitle.textContent = 'View All Filters';
          toggleTitle.nextElementSibling.firstElementChild.classList.remove('TP123-icon');
          toggleTitle.addEventListener('click', () => {
            // Send event
            events.send(Experiment.settings.ID, 'Click', 'User clicked View All Filters', { sendOnce: false });
            for (let i = 0; filters.length > i; i += 1) {
              if (i >= 3) {
                filters[i].classList.toggle('TP123-hide');
              }
            }
            if (toggleTitle.textContent === 'View All Filters') {
              toggleTitle.textContent = 'View Fewer Filters';
              toggleTitle.nextElementSibling.firstElementChild.classList.add('TP123-icon');
            } else if (toggleTitle.textContent === 'View Fewer Filters') {
              toggleTitle.textContent = 'View All Filters';
              toggleTitle.nextElementSibling.firstElementChild.classList.remove('TP123-icon');
            }
          });
        }
      }
    },
    /**
     * Order the rest of the categories
     */
    orderOtherCats(titles) {
      const numberOrder = [];
      if (titles) {
        // Skip first one
        for (let i = 0; titles.length > i; i += 1) {
          const text = titles[i].textContent;
          const numberText = text.replace(/[a-zA-Z|((|)|&|,)]+/g, '').trim();
          const number = parseInt(numberText, 10);
          numberOrder.push(number);
        }
      }
      // console.log(numberOrder);
      numberOrder.sort((a, b) => {
        return b - a;
      });
      numberOrder.forEach(number => {
        // console.log(number);
        for (let i = 0; titles.length > i; i += 1) {
          const el = titles[i];
          const text = el.textContent;
          const numberText = text.replace(/[a-zA-Z|((|)|&|,)]+/g, '').trim();
          const elNumber = parseInt(numberText, 10);
          if (elNumber === number) {
            const item = el.parentNode.parentNode.parentNode;
            const ref = item.parentNode;
            ref.insertAdjacentElement('beforeend', item);
          }
        }
      });
    },
    hideAfterFive() {
      const catTitles = document.querySelectorAll('#facetWrapper > #divFacet > .allFacetValues > .termtext');
      for (let i = 4; catTitles.length > i; i += 1) {
        catTitles[i].classList.add('TP123-hide');
        catTitles[i].classList.add('TP123-toggle-hide');
      }
      // const ref = document.querySelector('#facetWrapper > #divFacet');
      // if (ref) {
      //   ref.insertAdjacentHTML('beforeend', `
      //     <div class="category TP123-cat-filter">
      //       <a class="TP123-toggle-others">View All Categories</a>
      //       <a class="collapsableArrow toggleArrow" onclick="return false;">
      //         <span class="dropdown">
      //           <span class="dropdown-img"></span>
      //         </span>
      //       </a>
      //     </div>
      //   `);
      // }
      // On click
      const toggle = document.querySelector('.TP123-cat-filter > a.TP123-toggle-others');
      const icon = document.querySelector('.TP123-cat-filter .collapsableArrow span.dropdown');
      
      if (toggle) {
        toggle.addEventListener('click', () => {
          [].forEach.call(catTitles, (title) => {
            if (title.classList.contains('TP123-toggle-hide')) {
              if (title.classList.contains('TP123-hide')) {
                title.classList.remove('TP123-hide');
                toggle.textContent = 'View Fewer Categories';
                if (icon) {
                  icon.classList.add('TP123-icon');
                }
              } else {
                title.classList.add('TP123-hide');
                toggle.textContent = 'View All Categories';
                if (icon) {
                  icon.classList.remove('TP123-icon');
                }
              }
            }
          });
        });
      }
    },
  },
};

export default Experiment;
