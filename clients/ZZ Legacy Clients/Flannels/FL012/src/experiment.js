import { fullStory, events } from '../../../../lib/utils';


/**
 * {{FL012}} - {{Mobile Filters update}}
 */

const Run = () => {
  events.analyticsReference = '_gaUAT';
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL012',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const sortByOptions = bodyVar.querySelectorAll('.MobSortSelector>.productFilterList>.FilterListItem>span>span>label');
      const sortByAccordion = bodyVar.querySelector('#dnn_ctr179057_ViewTemplate_ctl00_ctl09_CollapseDiv');
      const filterOptionParent = bodyVar.querySelector('#mobFilterControls');
      const resetFilters = bodyVar.querySelector('#mobclrfltrs');
      const floorTitle = bodyVar.querySelector('#dnn_ctr179057_ViewTemplate_ctl00_ctl10_lstFilters_CollapseDiv_0  .productFilterTitle');
      const productGroupTitle = bodyVar.querySelector('#dnn_ctr179057_ViewTemplate_ctl00_ctl10_lstFilters_CollapseDiv_2  .productFilterTitle');
      const applyFilters = bodyVar.querySelector('#mobappfltrs');
      const appliedFiltersParent = bodyVar.querySelectorAll('.mobFiltInnerWrap');
      const filtersButtonText = bodyVar.querySelector('#filterByMob > .MobFiltersText');
      const pageTitleContainer = bodyVar.querySelector('.s-maincontent-container > .row');
      const openFilters = bodyVar.querySelector('#filterByMob');
      const filterIconChange = $('#filterlist > .productFilter > .productFilterTitleBox');
      const selectedFiltersMarkup = `
      <div class="FL012-Wrap FL012-Hide">
        <p class="FL012-Filters-Header">Filters</p>
        <div class="FL012-Applied-Filters-Wrap">
        </div>
        <p class="FL012-Change-Filters">Change Filters</p>
      </div>
      `;
      let selectedFiltersWrap;
      let selectedFiltersParent;

      return {
        bodyVar,
        sortByOptions,
        sortByAccordion,
        filterOptionParent,
        resetFilters,
        floorTitle,
        productGroupTitle,
        applyFilters,
        appliedFiltersParent,
        filtersButtonText,
        pageTitleContainer,
        selectedFiltersMarkup,
        selectedFiltersWrap,
        selectedFiltersParent,
        openFilters,
        filterIconChange,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // Change text of "Floor" and "Product Group"
        if (Exp.cache.floorTitle) {
          Exp.cache.floorTitle.textContent = 'Category';
        }
        if (Exp.cache.productGroupTitle) {
          Exp.cache.productGroupTitle.textContent = 'Product Type';
        }
        // Toggle class on filters to change their icons onload, currently '-' instead of '+'
        Exp.cache.filterIconChange.toggleClass('FilterClosed');
        // Insert markup for selected filters
        Exp.cache.pageTitleContainer.insertAdjacentHTML('afterend', Exp.cache.selectedFiltersMarkup);
        // Add click event to clear filters
        Exp.cache.bodyVar.querySelector('.FL012-Change-Filters').addEventListener('click', () => {
          // click reset filters button
          Exp.cache.openFilters.click();
        });
        // Store selectors
        Exp.cache.selectedFiltersWrap = Exp.cache.bodyVar.querySelector('.FL012-Applied-Filters-Wrap');
        Exp.cache.selectedFiltersParent = Exp.cache.bodyVar.querySelector('.FL012-Wrap');
        this.sortByFunctionality();
        this.filtersFunctionality();
        this.buildAppliedSearches();
        this.setupTracking();
        // QA - amend empty results on page load
        // If there are no filters in the header then hide the header
        // Toggle class to hide applide filters, if it does not have class
        if (!Exp.cache.bodyVar.querySelector('.FL012-Applied-Filter')) {
          if (!Exp.cache.selectedFiltersParent.classList.contains('FL012-Hide')) {
            Exp.cache.selectedFiltersParent.classList.add('FL012-Hide');
          }
        }
      },
      sortByFunctionality() {
        // Add a click event to every sort option
        for (let i = 0; i < Exp.cache.sortByOptions.length; i += 1) {
          Exp.cache.sortByOptions[i].addEventListener('click', () => {
            // Click the search accordion to collapse it, after an option is clicked
            Exp.cache.sortByAccordion.click();
            // Toggle styling to match applied filters
            if (!Exp.cache.filterOptionParent.classList.contains('FL012-Sort-By')) {
              Exp.cache.filterOptionParent.classList.add('FL012-Sort-By');
            }
          });
        }
      },
      filtersFunctionality() {
        Exp.cache.resetFilters.addEventListener('click', () => {
          // Remove previous searches if they exist
          if ($('.FL012-Applied-Filter').length > 0) {
            $('.FL012-Applied-Filter').remove();
          }
          // Toggle class to hide applide filters, if it does not have class
          if (!Exp.cache.selectedFiltersParent.classList.contains('FL012-Hide')) {
            Exp.cache.selectedFiltersParent.classList.add('FL012-Hide');
          }
          // reset filters, to remove custom styling
          if (Exp.cache.filterOptionParent.classList.contains('FL012-Sort-By')) {
            Exp.cache.filterOptionParent.classList.remove('FL012-Sort-By');
          }
          // Reset button text
          if (Exp.cache.filtersButtonText.textContent.trim().toUpperCase() !== 'REFINE & SORT') {
            Exp.cache.filtersButtonText.textContent = 'Refine & Sort';
          }
        });
        // Add a click event to apply filters button
        Exp.cache.applyFilters.addEventListener('click', () => {
          // Send Event
          events.send(`${Exp.settings.ID}`, 'Click', 'Apply Filters', { sendOnce: true });
          // Change button text
          if (Exp.cache.filtersButtonText.textContent.trim().toUpperCase() !== 'CHANGE FILTERS') {
            Exp.cache.filtersButtonText.textContent = 'Change Filters';
          }
          // Build Applied searches
          this.buildAppliedSearches();
          // Scroll to page top
          window.scrollTo(0, 0);
        });
      },
      buildAppliedSearches() {
        // Check if previous filters are applied, remove from banner if they are
        if ($('.FL012-Applied-Filter').length > 0) {
          $('.FL012-Applied-Filter').remove();
        }
        // Retrieve the text of applied filters, build markup and add to header
        for (let i = 0; i < Exp.cache.appliedFiltersParent.length; i += 1) {
          let appliedFilter = Exp.cache.appliedFiltersParent[i].querySelector('.mobAppliedFilters.visible-xs.visible-sm');
          const appliedFilterHeader = Exp.cache.appliedFiltersParent[i].querySelector('div > h3').textContent;
          if (appliedFilter.textContent) {
            appliedFilter = appliedFilter.textContent;
            const appliedFilterMarkup = `
            <div class="FL012-Applied-Filter">
              <span class="FL012-Applied-Filter-Header">${appliedFilterHeader}: </span>
              <span class="FL012-Applied-Filters">${appliedFilter}</span>
            </div>
            `;

            Exp.cache.selectedFiltersWrap.insertAdjacentHTML('beforeend', appliedFilterMarkup);
          }
        }
        // Toggle class to show applide filters, if it has class
        if (Exp.cache.selectedFiltersParent.classList.contains('FL012-Hide')) {
          Exp.cache.selectedFiltersParent.classList.remove('FL012-Hide');
        }
      },
      setupTracking() {
        Exp.cache.openFilters.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Sort & Refine', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;

