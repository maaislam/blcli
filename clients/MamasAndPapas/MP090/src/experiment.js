import { fullStory, events } from '../../../../lib/utils';
import { categories } from './lib/categories';

/**
 * {{TestID}} - {{Test Description}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'MP090',
      VARIATION: '1',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;

      return {
        doc,
        bodyVar,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder: () => {
        // create the new filters dropdown
        const newFilterBox = document.createElement('div');
        newFilterBox.classList.add('MP090-filters');

        // loop through the filters object
        for (let i = 0; i < Object.keys(categories).length; i += 1) {
          const data = Object.entries(categories)[i];
          const key = data[0];
          const category = data[1];

          const URL = window.location.href;
          if (URL.indexOf(key) > -1) {
            newFilterBox.innerHTML = `<h3>Refine your ${category.name}</h3><p>Make it easier by filtering a specific ${category.name}</p><div class="MP090-sizes"><div class="MP090-size_filter"></div>`;
            document.querySelector('.productFilter_filterSelectors').appendChild(newFilterBox);

            const matchingFilters = document.querySelector(category.filter);
            const allFilters = matchingFilters.querySelectorAll('.checkbox');

            // loop through the current matching filters, create the new filters
            [].forEach.call(allFilters, (element) => {
              const elementText = element.querySelector('.checkbox_text').textContent.trim();
              const elementID = element.querySelector('.checkbox_toggle_bordered').id;

              // add the filter names to the dropdown
              const filterSelect = document.createElement('div');
              filterSelect.classList.add('MP090-filter_select');
              filterSelect.innerHTML = `<span></span><p>${elementText}</p>`;
              filterSelect.setAttribute('MP090filter-click', elementID);
              document.querySelector('.MP090-size_filter').appendChild(filterSelect);
            });
          }
        }

        const allNewFilters = document.querySelectorAll('.MP090-filter_select');
        if (allNewFilters) {
          // loop through all the new filters, on click, click the matching filter
          for (let x = 0; x < allNewFilters.length; x += 1) {
            const element = allNewFilters[x];
            element.addEventListener('click', () => {
              events.send(`${Exp.settings.ID}`, 'Click', 'Primary filter option', { sendOnce: true });
              const matchingFilter = element.getAttribute('mp090filter-click');

              const filterToMatch = document.getElementById(`${matchingFilter}`);

              // if the filter clicked matches the new filter click it.
              if (element.textContent === filterToMatch.parentElement.querySelector('.checkbox_text').textContent.trim()) {
                document.getElementById(`${matchingFilter}`).click();
                document.querySelector('.js-applyFilters').click();
              }

              // add/remove active class
              if (element.classList.contains('MP090-filter_active')) {
                element.classList.remove('MP090-filter_active');
              } else {
                element.classList.add('MP090-filter_active');
              }
            });

            // if any filters are currently active on page refresh click the new filters
            const appliedFilters = document.querySelectorAll('.productFilter_footer-bottom .productFilter_label');
            for (let j = 0; j < appliedFilters.length; j += 1) {
              const filtersApplied = appliedFilters[j].textContent.trim();

              if (filtersApplied === element.textContent) {
                element.classList.add('MP090-filter_active');
              }
            }
          }
        }
      },
    },
  };

  Exp.init();
};

export default Run;
