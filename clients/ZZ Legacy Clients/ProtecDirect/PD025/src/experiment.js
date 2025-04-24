import { fullStory, events } from '../../../../lib/utils';


/**
 * {{PD025}} - {{Mobile filters}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'PD025',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const refineResultsText = bodyVar.querySelector('h4.col-sky.ui-collapsible-heading');
      const filterOptions = $('div.ui-checkbox.ui-mini > input');
      const appliedFilters = bodyVar.querySelectorAll('#facetRefinements-page>div[data-role="collapsibleset"] .ui-grid > div');
      const filterParent = bodyVar.querySelector('#facetFilter');
      return {
        bodyVar,
        refineResultsText,
        filterOptions,
        appliedFilters,
        filterParent,
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
        // Insert the number of checked options
        Exp.cache.refineResultsText.textContent = 'Filter options';
        // Move applied fliter to top of the filter options area, if any applied
        if (Exp.cache.appliedFilters.length > 0) {
          for (let i = 0; i < Exp.cache.appliedFilters.length; i += 1) {
            // Add styling class to element
            Exp.cache.appliedFilters[i].classList.add('PD025_Applied_Filter');
            // Append applied filter to filter options
            Exp.cache.filterParent.insertAdjacentElement('afterbegin', Exp.cache.appliedFilters[i]);
          }
        }
        this.setupTracking();
      },
      setupTracking() {
        // Add tracking to filter open
        Exp.cache.refineResultsText.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Filters Open', { sendOnce: true });
        });
        // Add tracking to each individual filter options if options exist
        // Allows the test to run when no more filters are available
        if (Exp.cache.filterOptions) {
          Exp.cache.filterOptions.change((e) => {
            // Send event only for filter selection
            if ($(e.target).is(':checked')) {
              let filterHeader = $(e.target).closest('.ui-collapsible.ui-collapsible-inset.ui-corner-all').find('h3 > a').text();
              // Filter category text appended with "click to expand contents", remove added text
              filterHeader = filterHeader.replace(/ click to expand contents/g, '');
              events.send(`${Exp.settings.ID}`, 'Click', `Filter: ${filterHeader}`, { sendOnce: true });
            }
          });
        }
      },
    },
  };

  Exp.init();
};

export default Run;
