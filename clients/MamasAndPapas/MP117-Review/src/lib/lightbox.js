import filtersInstance from './filters'; // Filters
/**
 * A lightbox component, filters container
 */

class Lightbox {
  /**
   * Create lightbox
   */
  create(totalNumberOfProducts, lightboxPartContainer) {
    const lightboxContainer = `<div class='MP117-filterLightboxContainer hide'>
    <div class='MP117-filterLightbox'>
      <div class='MP117-filterBox__header MP117-filterBox__part'>
        <span class='MP117-filterBox-header__item' id='MP117-resetFilters'>reset</span>
        <span class='MP117-filterBox-header__item'>products (${totalNumberOfProducts})</span>
        <span id='MP117-filterBox__close'></span>
      </div>
      <div class='MP117-selectedFilter MP117-filterBox__part hide'>
      </div>
      ${lightboxPartContainer}
      <div class='col-xs-6 px-2'>
        <button type='submit' class='btn-primary btn font-weight-light w-100 js-applyFilters' id='MP117-applyFilters__btn'>Apply Filters</button>
      </div>
    </div>
    </div>`;

    document.querySelector('.plp-block.row').insertAdjacentHTML('beforeend', lightboxContainer);
  }

  /**
   * Create box top section
   */
  createFilterBoxTopSection(selectedFilter, checkedFilterId) {
    const { services } = Experiment;
    // Adds filter box on Filters Section
    const selectedBox = `<span class='MP117-filterSelected'>${selectedFilter}<span class='MP117-removeFilter' id='selected-${checkedFilterId}'>X</span></span>`;
    document.querySelector('.MP117-selectedFilter').insertAdjacentHTML('beforeend', selectedBox);
    document.querySelector('.MP117-selectedFilter').classList.remove('hide');
    /**
     * @desc Adds Event Listener to each Filter Box (x)
     * When X on Filter Box is clicked, it unticks all checkboxes for this filter
     */
    document.querySelector(`.MP117-filterSelected span#selected-${checkedFilterId}`).addEventListener('click', () => {
      document.querySelector(`#${checkedFilterId}`).classList.remove('active');
      document.querySelector(`#checkbox-${checkedFilterId}`).classList.remove('active');

      // Checks if any filters in category are checked. If not, it hides the green dot
      const filterCat = document.querySelector(`#checkbox-${checkedFilterId}`).closest('div.MP117-filterBox__part');
      const filtersLength = filtersInstance.checkCategoryForCheckedBoxes(filterCat); // now on filters instance
      if (filtersLength === 0) {
        filterCat.querySelector('span.selected').classList.add('hide');
      }
      const elToDelete = document.querySelector(`#selected-${checkedFilterId}`).parentElement;
      elToDelete.parentNode.removeChild(elToDelete);
      services.hideFilterSection();
    });
  }

  /**
   * Helper hide filter section
   */
  hideFilterSection() {
    if (document.querySelector('.MP117-selectedFilter').children.length === 0) {
      document.querySelector('.MP117-selectedFilter').classList.add('hide');
    }
  }

  /**
   * Build lightbox part container
   *
   * @return {String} Our HTML
   */
  buildLightboxPartContainer(filters) {

    // !!!! let filterCount = 0; // eslint-disable-line no-unused-vars
    // !!!! Removed as unused
    let lightboxPartContainer = '';
    [].forEach.call(filters, (filter) => {
      const filterText = filter.querySelector('a').textContent;
      // Get filter categories
      const filterCategory = filter.getAttribute('data-goto-category').replace('filter_', '');

      // Get filter items
      const filterItems = document.querySelectorAll(`.js-checkbox.filter_group .d-inline-block .checkbox>div[data-search-query*='${filterCategory}']`);
      let listItemContainer = '';

      [].forEach.call(filterItems, (filterItem) => {
        let activeClass = '';
        /**
         * @desc If there are active filters on the page,
         * checks each filter and adds active class on the new checkbox
         */
        if (activeFilters > 0) {
          if (filterItem.classList.contains('active')) {
            activeClass = 'active';
          }
        }
        let listItem = filterItem.getAttribute('data-search-query').replace(`${filterCategory}:`, '');
        if (listItem === 'inStock') {
          listItem = 'In Stock';
        }
        const filterId = services.camelize(listItem);
        filterItem.setAttribute('id', `MP117-${filterId}`);
        listItemContainer += `<li class='MP117-filter__item'><div class='MP117-filterItem d-inline-block'>
        <div class='checkbox'>
          <div class='checkbox_toggle cursor-pointer text-center ${activeClass}' id='checkbox-MP117-${filterId}' data-name='MP117-${filterId}' data-search-query='priceRange:${listItem}'></div>
            <div class='MP117-filterName checkbox_text pl-2'>${listItem}</div>
          </div>
        </div></li>`;

        // !!!! Removed as unused
        //filterCount++; // eslint-disable-line no-plusplus
      });

      lightboxPartContainer += `<div class='MP117-filterBox__part'>
      <span class='MP117-filterCategory' data-count='0'>${filterText}<span class='selected hide'></span><span class='MP117-showFilters'></span></span>
        <ul class='MP117-filterList'>${listItemContainer}</ul>
      </div>`;
    });

    return lightboxPartContainer;
  }
}

const lightboxInstance = new Lightbox();

export default lightboxInstance;
