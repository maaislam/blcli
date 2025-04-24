import { fullStory, events } from '../../../../lib/utils';
import { filters } from './lib/filters';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP071',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const URL = window.location.href;

    // Change filter by text
    document.querySelector('.d-inline-block.px-2.productFilter_select').childNodes[0].nodeValue = 'More filters';

    components.createFiltersDropDown();
    components.applyFilter();

    if (sessionStorage.getItem('MP071-addSizeUrl') && URL.indexOf('?q=%') > -1) {
      components.changeProductURL();

      document.querySelector('.js-clearCheckbox').addEventListener('click', () => {
        sessionStorage.removeItem('MP071-addSizeUrl');
      });
    }
  },
  /* put outside functions in here */
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Pull out the filters in to a new div
     */
    createFiltersDropDown: function createFiltersDropDown() {
      const newFilterBox = document.createElement('div');
      newFilterBox.classList.add('MP071-filters');
      newFilterBox.innerHTML = '<h3>Refine your size</h3><p>Make it easier by filtering a specific size for your little one</p><div class="MP071-sizes"><select class="MP071-size_filter"><option>Select a size</option></select></div>';
      document.querySelector('.productFilter_filterSelectors').appendChild(newFilterBox);

      const filterObj = filters;
      for (let i = 0; i < Object.keys(filterObj).length; i += 1) {
        const data = Object.entries(filterObj)[i];
        const newFilter = document.createElement('option');
        newFilter.classList.add('MP071-filter_option');
        newFilter.innerHTML = `${data[1].title}`;
        newFilter.setAttribute('value', data[1].linkURL);
        newFilter.setAttribute('data-match-1', data[1].filter1);
        newFilter.setAttribute('data-match-2', data[1].filter2);
        newFilterBox.querySelector('select').appendChild(newFilter);
      }
    },
    /**
     * @desc Find the current filters that match the new filter selected
     */
    applyFilter: function applyFilter() {
      const optionFilters = document.querySelector('.MP071-filters select');
      const currentFilters = document.querySelectorAll('[data-category="filter_size"] .checkbox_toggle_bordered');

      optionFilters.addEventListener('change', () => {
        const selectedFilter = optionFilters.querySelector('option:checked');
        const firstmatchingID = selectedFilter.getAttribute('data-match-1');
        const secondMatchingID = selectedFilter.getAttribute('data-match-2');
        const urlToadd = selectedFilter.value;

        [...currentFilters].forEach((element) => {
          const sideSizeFilter = element.getAttribute('id');
          if (sideSizeFilter === firstmatchingID || sideSizeFilter === secondMatchingID) {
            element.click();
            document.querySelector('.js-applyFilters').click();
            sessionStorage.setItem('MP071-addSizeUrl', `${urlToadd}`);
            events.send('MP071 Size clothing filters', 'Size filter clicked', 'Size dropdown clicked', { sendOnce: true });
          }
        });
      });
    },
    /**
     * @desc add the value from the sessions storage from the selected filters to the products
     */
    changeProductURL: function changeProductURL() {
      const filterValue = sessionStorage.getItem('MP071-addSizeUrl');
      const allProducts = document.querySelectorAll('.productLister .col-xs-6.col-sm-3.mt-3 a');
      for (let i = 0; i < allProducts.length; i += 1) {
        const element = allProducts[i];
        const URL = element.getAttribute('href');
        element.setAttribute('href', `${URL + filterValue}`);
      }
    },
    /**
     * @desc Add the text that is shown when one is selected
     */
    selectedText: function selectedText() {
      const sizeSelectedText = document.createElement('div');
      sizeSelectedText.classList.add('MP071-size_text');
    },
  },
};

export default Experiment;
