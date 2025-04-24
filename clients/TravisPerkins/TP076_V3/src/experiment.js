import { setup } from './services';
import { events } from '../../../../lib/utils';
import settings from './settings';

/**
 * {{TP076}} - {{Mobile Expose Filters Rebuild 3}}
 */

const Run = () => {
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const filterSearchButtonContainer = bodyVar.querySelector('.tp_filtersWrapper > .ui-block-a.tp_filterSearchBtnWrapper');
      const allFilterLabels = bodyVar.querySelectorAll('#tpFilterSearch ul.ui-collapsible-set  > li a > label');
      const allFilterOptions = bodyVar.querySelectorAll('#tpFilterSearch ul.ui-collapsible-set  > li > h2 > a');
      const filterSearchButton = bodyVar.querySelector('.tp_filtersWrapper > .ui-block-a.tp_filterSearchBtnWrapper > a');
      const allFilterOptionContainers = bodyVar.querySelectorAll('#tpFilterSearch ul.ui-collapsible-set  > li');

      return {
        docVar,
        bodyVar,
        filterSearchButtonContainer,
        allFilterLabels,
        allFilterOptions,
        filterSearchButton,
        allFilterOptionContainers,
      };
    })(),
    init: () => {
      setup();
      Exp.components.setupElements();
    },
    components: {
      setupElements() {
        Exp.render.filterContainer();
        Exp.bindExperimentEvents.addFilterFunctionality();
      },
    },
    render: {
      filterContainer() {
        // Add header for new filter buttons
        Exp.cache.filterSearchButtonContainer.insertAdjacentHTML('afterend', `
        <div class="TP076_Container">
          <h3 class="TP076_Header">Filter by...</h3>
          <div class="TP076_Filter_Container"></div>
        </div>
      `);
        this.filterButtons();
      },
      filterButtons() {
        const filterContainer = Exp.cache.bodyVar.querySelector('.TP076_Filter_Container');
        // Loop through all filter options and render markup
        for (let i = 0, n = Exp.cache.allFilterLabels.length; i < n; i += 1) {
          filterContainer.insertAdjacentHTML('beforeend', `
            <span class="TP076_Filter_Option" data-tp076-number="${i}">${Exp.cache.allFilterLabels[i].textContent}</span>
          `);
        }
      },
    },
    bindExperimentEvents: {
      handleFilterClick(e) {
        // Send event
        const filterOption = e.target.textContent;
        events.send(`${settings.ID}`, 'Click', `${filterOption}`, { sendOnce: true });
        // retrieve data attribute, click relevant filter option
        const filterNumber = parseInt(e.target.getAttribute('data-tp076-number'), 10);
        // Check if chosen filter is open, if not then open
        if (Exp.cache.allFilterOptionContainers[filterNumber].classList.contains('ui-collapsible-collapsed')) {
          Exp.cache.allFilterOptions[filterNumber].click();
        }
        // Click filter search button to open filters,
        Exp.cache.filterSearchButton.click();
      },
      addFilterFunctionality() {
        // Add funtionality to all filters
        const allRenderedFilters = Exp.cache.bodyVar.querySelectorAll('.TP076_Filter_Option');
        for (let i = 0, n = allRenderedFilters.length; i < n; i += 1) {
          allRenderedFilters[i].addEventListener('click', this.handleFilterClick);
        }
      },
    },
  };

  Exp.init();
};

export default Run;
