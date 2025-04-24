/**
 * A filters component
 *
 * - Functions should only do one thing
 * -- E.g. checkActiveFilters becomes 
 * --- checkActiveFilters()
 * --- countActiveFilters()
 * --- populateGreenCircle()
 */

class Filters {

  /**
   * Helper
   *
   * --- checkActiveFilters()
   * --> countActiveFilters()
   * --> populateGreenCircle()
   */
  checkActiveFilters() {
    const numFilters = this.countActiveFilters();

    if(numFilters > 0) {
      this.populateGreenCircle(numFilters);
    }
  }

  /**
   * Count number of active filters
   *
   * @return {Number}
   */
  countActiveFilters() {
      // !!!!! const filters = document.querySelectorAll('.filter_group.list-unstyled li');
      // !!!!! We now have a reusable method for getting filters
      const filters = this.getAllFilters();
      
      let count = 0;
      [].forEach.call(filters, (filter) => {
        // Get filter categories
        const filterCategory = filter.getAttribute('data-goto-category').replace('filter_', '');
        // Get filter items
        const filterItems = document.querySelectorAll(`.js-checkbox.filter_group .d-inline-block .checkbox>div[data-search-query*='${filterCategory}']`);
        [].forEach.call(filterItems, (filterItem) => {
          if (filterItem.classList.contains('active')) {
            count++; // eslint-disable-line no-plusplus
          }
        });
      });

      return count;
  }

  /**
   * Populate the green circle...
   * 
   * @param {Number} count
   */
  populateGreenCircle(count) {
    document.querySelector('.MP117-filtersApplied').classList.remove('hidden');
    document.querySelector('.MP117-filtersApplied > span#MP117-filters').textContent = count;
  }

  /**
   * Helper create filter button
   */
  createFilterBtn() {
    const newFilter = `<div class='MP117-filterWrapper'>
    <button class='MP117-filterBtn__container' id='MP117-filterBox__open'>
      <span class='MP117-filterBtn'>
        <span class='MP117-filterIcon' color='inherit' size='24'>
          <svg width='24' height=;24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z' fill='#000' fill-rule='evenodd'></path>
          </svg>
        </span>Filter 
          <span class='MP117-filtersApplied hidden'><span id='MP117-filters'></span></span>
      </span>
    </button>
    </div>`;

    document.querySelector('#js-productFilters').insertAdjacentHTML('beforeend', newFilter);
  }

  /**
   * Helper check category for checked boxes
   * @return {Number}
   */
  checkCategoryForCheckedBoxes(filterCat) {
    const filters = filterCat.querySelectorAll('li.MP117-filter__item .checkbox .checkbox_toggle.cursor-pointer.active');
    return filters.length;
  },

  /**
   * Helper get all filters
   */
  getAllFilters() {
    const filters = document.querySelectorAll('.filter_group.list-unstyled li');
    return filters;
  }

  /**
   * Count products
   *
   * @return {Number} -- !!!! We would have to enforce type return e.g. using parseInt() || 0
   */
  getTotalNumProducts() {
    const totalNumberOfProducts = document.querySelector('.plp-title span.total-count').textContent.replace(' items', '');

    // !!!! Note that we should *ensure* that the value returned here is numeric or string
    // consistent, e.g.  parseInt(totalNumberOfProducts) || 0

    return totalNumberOfProducts;
  }
}


// Return a single instance of the Filters class, we'll reuse
// that everywhere in code...
const filtersInstance = new Filters();

export default filtersInstance;
