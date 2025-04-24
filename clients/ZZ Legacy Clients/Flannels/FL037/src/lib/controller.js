import { cacheDom } from './../../../../../lib/cache-dom';
import { removeExtraLabels } from './services';

/**
 * Cache existing
 */
const existingFiltersD = cacheDom.getAll('.FilterListItem.ABRA span.FilterName');

/**
 * Control Filters
 */
const controlFilters = {
  toggleFilter(e) {
    e.preventDefault();

    // Get filtername
    const filterEl = e.currentTarget.querySelector('.FilterName');
    if (filterEl) {
      const filterName = filterEl.textContent.trim();

      // Match to existing filter and click.
      if (existingFiltersD.length) {
        for (let i = 0; existingFiltersD.length > i; i += 1) {
          if (existingFiltersD[i].dataset.filtername === filterName) {
            existingFiltersD[i].click();
          }
        }
      }
    }
    removeExtraLabels();
  },
  applyFilters(applyFilterBtn) {
    // console.log('called apply filters!');
    applyFilterBtn.click();
  },
};


export default controlFilters;
