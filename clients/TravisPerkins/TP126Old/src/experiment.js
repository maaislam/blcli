import { fullStory, events } from '../../../../lib/utils';

/**
 * {{TP126}} - {{Prioritised filters}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TP126',
    VARIATION: '{{VARIATION}}',
  },

  searchTerms: /(gravel)|(screw)|(timber)|(shingle)/ig,

  cache: (() => {
    const doc = document;
    const bodyVar = doc.body;
    const catFilter = bodyVar.querySelector('#facets_filters > #facetWrapper');

    return {
      doc,
      bodyVar,
      catFilter,
    };
  })(),

  init() {
    // Setup
    const { settings, services, cache, components } = Experiment;
    // Check if to run
    const matchesTerm = services.checkResultTerm();
    if (!matchesTerm) {
      return;
    }

    services.tracking();
    document.body.classList.add(settings.ID);
    /**
     * Will name the function in relation to the wireframes. 01
     */
    const filterYourSearchHeader = () => {
      services.moveComponent(cache.catFilter, `
        <div class="TP126-filter-header" id="TP126-filters">
          <h3>Filter your search</h3>
        </div>
      `, 'afterend');
    };

    filterYourSearchHeader();
    /**
     * Re build search term
     */
    services.rebuildSearchTerm();
    /**
     * Get Term
     */
    const term = services.getTerm();
    /**
     * Begin building filters
     */
    components.newFilters(term);
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
     * Check the search term against the regex terms above.
     */
    checkResultTerm() {
      const searchTerm = Experiment.cache.bodyVar.querySelector('.prod_search_result_pagination h1.bold');
      let match = false;
      if (searchTerm) {
        const trimmedText = searchTerm.textContent.trim();
        if (trimmedText.match(Experiment.searchTerms)) {
          match = true;
        } else {
          match = false;
        }
      }
      return match;
    },
    /**
     * Returns current term
     */
    getTerm() {
      const title = Experiment.cache.bodyVar.querySelector('.prod_search_result_pagination h1.bold span');
      let returnedTerm = null;
      if (title) {
        returnedTerm = title.textContent.replace(/"/g, '');
        console.log('returned term ', returnedTerm);
        // if (returnedTerm.match(Experiment.searchTerms)) {}
      }
      return returnedTerm;
    },
    /**
     * @desc Move existing components around
     * @param {Element} ref
     * @param {Element} element
     * @param {String} position options; beforebegin, afterbegin, beforeend, afterend
     */
    moveComponent(ref, element, position) {
      if (ref && element && position) {
        if (typeof element === 'object') {
          ref.insertAdjacentElement(position, element);
        } else {
          ref.insertAdjacentHTML(position, element);
        }
      }
    },
    /**
     * Pull the actual search term and re build with surrounding span tags.
     */
    rebuildSearchTerm() {
      const searchTerm = Experiment.cache.bodyVar.querySelector('.prod_search_result_pagination h1.bold');
      if (searchTerm) {
        const term = searchTerm.textContent.trim().match(/("\w+")/)[0];
        if (term) {
          const newTerm = `
            You searched for <span>${term}</span>
          `;
          searchTerm.innerHTML = newTerm;
        }
      }
    },
  },

  components: {
    /**
     * @desc takes in a term and displays a hardcoded filter dependant on term.
     * @param {String} term
     */
    newFilters(term) {
      const currentFilters = Experiment.cache.bodyVar.querySelectorAll('.nav_column#facets_filters > .item');
      const getFilterElement = (filterName) => {
        if (currentFilters === 0) {
          return;
        }
        for (let i = 0; currentFilters.length > i; i += 1) {
          const anchor = currentFilters[i].querySelector('.category a.refinementToggle');
          const text = anchor.textContent.trim().toLowerCase();
          if (text.match(`by ${filterName}`)) {
            const element = currentFilters[i];
            return element;
          }
        }
      };
      const whichFilters = () => {
        /**
         * Dependant on term show certain filters. This will return an object
         * with needed elements.
         */
        let filtersToUse = {};
        switch (term) {
          case 'gravel':
            filtersToUse = {
              one: getFilterElement('type'),
              two: getFilterElement('brand'),
              three: getFilterElement('package type'),
            };
            break;
          case 'timber':
            filtersToUse = {
              one: getFilterElement('width'),
              two: getFilterElement('length'),
              three: getFilterElement('depth'),
              four: getFilterElement('type'),
            };
            break;
          case 'screw':
            filtersToUse = {
              one: getFilterElement('length'),
              two: getFilterElement('width'),
              three: getFilterElement('type'),
              four: getFilterElement('pack quantity'),
            };
            break;
          case 'shingle':
            filtersToUse = {
              one: getFilterElement('colour'),
              two: getFilterElement('brand'),
              three: getFilterElement('material'),
            };
            break;
          default:
            break;
        }
        console.log('filter to use object ', filtersToUse);
      };
      whichFilters();
      // const html = `
      //   <div class="TP126-top-filters">
      //     <h4>Popular filter options</h4>

      //     <div class="TP126-filters--wrap">
      //       ${filterSelects}
      //       <a href="#TP126-filters" class="TP126-all-filters">View All Filter Options ></a>
      //     </div>
      //   </div>
      // `;
    },
  },

};

export default Experiment;
