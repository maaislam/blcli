import { fullStory, events } from '../../../../lib/utils';


/**
 * {{TP076}} - {{Mobile Expose Filters - V2}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP076',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const filtersContainer = docVar.getElementById('tpFilterSearch-popup');
      const filterSearchButton = bodyVar.querySelector('.tp_filtersWrapper > .ui-block-a.tp_filterSearchBtnWrapper');
      const individualFilters = bodyVar.querySelectorAll('#tpFilterSearch .ui-listview a.ui-collapsible-heading-toggle');
      const applyFilterButton = bodyVar.querySelector('.ui-footer > .tpApplyFilter');

      return {
        docVar,
        bodyVar,
        filtersContainer,
        filterSearchButton,
        individualFilters,
        applyFilterButton,
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
      // Default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
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
        Exp.render.filtersArea();
        // Test content rendered, add tracking
        Exp.bindExperimentEvents.addFilterTracking();
        Exp.bindExperimentEvents.trackApplyFilterButton();
      },
    },
    render: {
      filtersArea() {
        // Add header, move filters out of popup modal
        Exp.cache.filterSearchButton.insertAdjacentHTML('afterend', `
          <div class="TP076_Container">
            <h3 class="TP076_Header">Filter by...</h3>
          </div>
        `);
        // Markup added, move filters
        const TP076InsertedContainer = Exp.cache.bodyVar.querySelector('.TP076_Container');
        TP076InsertedContainer.insertAdjacentElement('beforeend', Exp.cache.filtersContainer);
      },
    },
    bindExperimentEvents: {
      // Tracking code for filters
      // For filters that are links
      trackFilterLink(e) {
        let filterHeader = $(e.target).closest('.ui-collapsible-content.ui-body-inherit').parent();
        filterHeader = $(filterHeader).find('h2 > a > label');
        if (filterHeader[0]) {
          filterHeader = filterHeader[0].textContent.trim();
          // Send event
          events.send(`${Exp.settings.ID}`, 'Click', `${filterHeader}`, { sendOnce: true });
        }
      },
      trackFilterCB(e) {
        // For checkboxes - only send if checked
        if (e.target.checked) {
          let filterHeader = $(e.target).closest('.ui-collapsible-content.ui-body-inherit').parent();
          filterHeader = $(filterHeader).find('h2 > a > label');
          if (filterHeader[0]) {
            filterHeader = filterHeader[0].textContent.trim();
            // Send event
            events.send(`${Exp.settings.ID}`, 'Click', `${filterHeader}`, { sendOnce: true });
          }
        }
      },
      addFilterTracking() {
        for (let i = 0, n = Exp.cache.individualFilters.length; i < n; i += 1) {
          const currentFilterParent = Exp.cache.individualFilters[i];
          let currentFilter = currentFilterParent.querySelector('input[type="checkbox"]');
          // Check for checkbox input
          if (currentFilter) {
            $(currentFilter).change(this.trackFilterCB);
          } else {
            // Reassign to span if not found
            currentFilter = currentFilterParent.querySelector('.singleSelectionFacetLink');
            if (currentFilter) {
              currentFilter.addEventListener('click', this.trackFilterLink);
            }
          }
        }
      },
      trackApplyFilterButton() {
        // Track apply filter button
        Exp.cache.applyFilterButton.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Apply Filter', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
