import settings from '../../settings';

const { ID } = settings;

export default () => {
  /**
   * @desc Create the sticky filter bar
   */
  const stickyFilterBar = () => {
    const filterBar = document.createElement('div');
    filterBar.classList.add(`${ID}-filter_bar`);
    filterBar.innerHTML = `<span class="${ID}-sticky_bar">Refine Products</div>`;
    document.body.appendChild(filterBar);
  };
  /**
   * @desc Create the filter popup box
   */
  const createfilterBox = () => {
    const filterBox = document.createElement('div');
    filterBox.classList.add(`${ID}-filters_box`);
    filterBox.innerHTML = `
      <div class="${ID}-filters">
        <div class="${ID}-exit">&times;</div>
        <h3>- Refine Products -</h3>
        <div class="${ID}-filterlist">
          <span>Product Category</span>
          <div class="${ID}-categories"></div>
          <div class="${ID}-refine_button"><span>Refine</span></div>
        </div>
      </div>`;
    document.body.appendChild(filterBox);
  };
  /**
   * @desc Get the categories on the page, put in array and
   * then add them to a list in the filter box
   */
  const addCategories = () => {
    const categoriesArr = [];
    const allCategories = document.querySelectorAll('.entry-content h2');
    for (let i = 0; i < allCategories.length; i += 1) {
      const element = allCategories[i];
      const categoryText = element.textContent;
      categoriesArr.push(categoryText);
    }
    /**
    * @desc loop through array, add the categories as li
    */
    for (let j = 0; j < categoriesArr.length; j += 1) {
      const element = categoriesArr[j];
      const filterOption = document.createElement('div');
      filterOption.classList.add(`${ID}-filter_option`);
      filterOption.innerHTML = `<span>${element}</span>`;

      document.querySelector(`.${ID}-categories`).appendChild(filterOption);
    }
  };
  /**
   * @desc add active on click of filters
   */
  const activeFilters = () => {
    const popUpFilters = document.querySelectorAll(`.${ID}-filter_option`);
    popUpFilters.forEach((element) => {
      element.addEventListener('click', () => {
        if (!element.classList.contains(`${ID}-filter_active`)) {
          element.classList.add(`${ID}-filter_active`);
        } else {
          element.classList.remove(`${ID}-filter_active`);
        }
      });
    });
  };
  /**
   * @desc Show the lightbox on click of refine button
   */
  const showHideLightbox = () =>  {
    const filterBar = document.querySelector(`.${ID}-filter_bar`);
    const filterBox = document.querySelector(`.${ID}-filters_box`);
    filterBar.addEventListener('click', () => {
      document.body.classList.add(`${ID}-no_scroll`);
      filterBox.classList.add(`${ID}-box_active`);
    });
  };
  /**
   * @desc When the refine button is clicked, loop through the categories
   * on the page, if matching category is active, show it, if not add class
   * to hide it
   */
  const showHideCategories = () => {
    const refineButton = document.querySelector(`.${ID}-refine_button`);
    const filterBox = document.querySelector(`.${ID}-filters_box`);
    refineButton.addEventListener('click', () => {
      window.scrollTo(0, 0);
      // hide the filter boxqqqa
      filterBox.classList.remove(`${ID}-box_active`);
      document.body.classList.remove(`${ID}-no_scroll`);

      // hide the matching categories based on the previous h2 tag
      const brandCategories = document.querySelectorAll('.entry-content .woocommerce.columns-4');
      for (let i = 0; i < brandCategories.length; i += 1) {
        const brandCategory = brandCategories[i];
        const categoryText = brandCategory.previousElementSibling.textContent;

        const activeFiltersEl = document.querySelectorAll(`.${ID}-filter_option.${ID}-filter_active`);
        if (activeFiltersEl.length) {
          brandCategory.classList.add(`${ID}-category-hidden`);
          brandCategory.previousElementSibling.classList.add(`${ID}-title_hide`);
        } else {
          brandCategory.classList.remove(`${ID}-category-hidden`);
          brandCategory.previousElementSibling.classList.remove(`${ID}-title_hide`);
        }
        [].forEach.call(activeFiltersEl, (element) => {
          const activeFilterText = element.textContent;
          if (activeFilterText === categoryText) {
            brandCategory.previousElementSibling.classList.remove(`${ID}-title_hide`);
            brandCategory.classList.remove(`${ID}-category-hidden`);
          }
        });
      }
    });
  };
  /**
   * @desc lightbox exit click
   */
  const exitLightbox = () => {
    const filterBox = document.querySelector(`.${ID}-exit`);
    filterBox.addEventListener('click', () => {
      document.querySelector(`.${ID}-filters_box`).classList.remove(`${ID}-box_active`);
      document.body.classList.remove(`${ID}-no_scroll`);
      const allCategories = document.querySelectorAll('.entry-content h2');
      for (let i = 0; i < allCategories.length; i += 1) {
        const element = allCategories[i];
        element.classList.remove(`${ID}-category-hidden`);
      }
    });
    const filterOverlay = document.querySelector(`.${ID}-filters_box`);
    const innerFilters = document.querySelector(`.${ID}-filters`);
    filterOverlay.addEventListener('click', () => {
      document.body.classList.remove(`${ID}-no_scroll`);
      document.querySelector(`.${ID}-filters_box`).classList.remove(`${ID}-box_active`);
      const allCategories = document.querySelectorAll('.section-category-heading');
      for (let i = 0; i < allCategories.length; i += 1) {
        const element = allCategories[i];
        element.classList.remove(`${ID}-category-hidden`);
      }
    });
    innerFilters.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  };

  stickyFilterBar();
  createfilterBox();
  addCategories();
  showHideLightbox();
  activeFilters();
  showHideCategories();
  exitLightbox();
};
