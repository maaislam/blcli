import { fireEvent } from '../../../../core-files/services';
import shared from '../../../../core-files/shared';
import { removeCategoryHeighlit } from './lib/helpers/utils';

const { ID, VARIATION } = shared;
export const customClickHandler = (target) => {
  const checkSelected = () => {
    const filterInputs = document.querySelectorAll('[id^="plp_filter_category"]');
    const selectedFilters = [];
    filterInputs.forEach((input) => {
      if (input.checked) {
        const filterItem = input.closest('label').getAttribute('for');
        //const itemId = filterItem.slice(filterItem.lastIndexOf('_') + 1);
        selectedFilters.push(filterItem);
      }
    });
    document.querySelectorAll('[data-selected]').forEach((item) => {
      item.classList.remove('active_category');
    });
    selectedFilters.forEach((input) => {
      const filterItem = document.querySelector(`[data-selected="${input}"]`);
      filterItem.classList.add('active_category');
    });
    //console.log(selectedFilters);
  };
  setTimeout(() => {
    checkSelected();
  }, 500);

  if (target.closest('.filter_head')) {
    const filter = target.textContent.trim();

    fireEvent(`User interacts with filters: ${filter}`);
    //console.log(`User interacts with filters: ${filter}`)
  } else if (target.matches(`.filter_content_list_head [type="checkbox"]`)) {
    const clickedByJs = target.closest(`label.clicked-by-js`);
    //const normalFilter = target.closest(`label:not(.clicked-by-js)`)
    const filter = target.closest(`label`);
    const filterContent = filter.textContent.trim();
    if (clickedByJs) {
      filter.classList.remove('clicked-by-js');
      return;
    }

    fireEvent(`User interacts with filters: ${filterContent}`);
    //console.log(`User interacts with filters: ${filterContent}`)
  } else if (target.matches(`[type="radio"]`)) {
    const sortLists = target.closest(`label`).textContent.trim();
    if (sortLists) {
      fireEvent(`User interacts with sort by ${sortLists}`);
      //console.log(`User interacts with sort by ${sortLists}`)
    }
  } else if (target.closest(`[data_identifier="cate__top-rated"]`)) {
    const filterItem = document.querySelector(`[for="plp_filter_category_773"]`);
    filterItem.classList.add('clicked-by-js');
    filterItem.click();
    const category = target.textContent.trim();
    fireEvent(`User interacts with quicklinks ${category}`);
    //console.log(`User interacts with quicklinks ${category}`)
  } else if (target.closest(`[data_identifier="cate__whats_new"]`)) {
    const filterItem = document.querySelector(`[for="plp_filter_category_655"]`);
    filterItem.classList.add('clicked-by-js');
    filterItem.click();
    const category = target.textContent.trim();
    fireEvent(`User interacts with quicklinks ${category}`);
    //console.log(`User interacts with quicklinks ${category}`)
  } else if (target.closest(`[data_identifier="cate__make-up"]`)) {
    const filterItem = document.querySelector(`[for="plp_filter_category_301"]`);
    filterItem.classList.add('clicked-by-js');
    filterItem.click();
    const category = target.textContent.trim();
    fireEvent(`User interacts with quicklinks ${category}`);
    //console.log(`User interacts with quicklinks ${category}`)
  } else if (target.closest(`[data_identifier="cate__skincare"]`)) {
    const filterItem = document.querySelector(`[for="plp_filter_category_302"]`);
    filterItem.classList.add('clicked-by-js');
    filterItem.click();
    const category = target.textContent.trim();
    fireEvent(`User interacts with quicklinks ${category}`);
    //console.log(`User interacts with quicklinks ${category}`)
  } else if (target.closest(`[data_identifier="cate__perfume"]`)) {
    const filterItem = document.querySelector(`[for="plp_filter_category_304"]`);
    filterItem.classList.add('clicked-by-js');
    filterItem.click();
    const category = target.textContent.trim();
    fireEvent(`User interacts with quicklinks ${category}`);
    //console.log(`User interacts with quicklinks ${category}`)
  } else if (target.closest(`[data_identifier="cate__toiletries"]`)) {
    const filterItem = document.querySelector(`[for="plp_filter_category_306"]`);
    filterItem.classList.add('clicked-by-js');
    filterItem.click();
    const category = target.textContent.trim();
    fireEvent(`User interacts with quicklinks ${category}`);
    //console.log(`User interacts with quicklinks ${category}`)
  } else if (target.closest(`[data_identifier="cate__gifts"]`)) {
    const filterItem = document.querySelector(`[for="plp_filter_category_1154"]`);
    filterItem.classList.add('clicked-by-js');
    filterItem.click();
    const category = target.textContent.trim();
    fireEvent(`User interacts with quicklinks ${category}`);
    //console.log(`User interacts with quicklinks ${category}`)
  } else if (target.closest(`[data_identifier="cate_sale"]`)) {
    const filterItem = document.querySelector(`[for="plp_filter_category_313"]`);
    filterItem.classList.add('clicked-by-js');
    filterItem.click();
    const category = target.textContent.trim();
    fireEvent(`User interacts with quicklinks ${category}`);
    //console.log(`User interacts with quicklinks ${category}`)
  } else if (target.closest(`[data_identifier="cate__view-all"]`)) {
    const filterItem = document.querySelector(`.clear_all`);
    filterItem.classList.add('clicked-by-js');
    filterItem.click();
    removeCategoryHeighlit(`${ID}`);
    const category = target.textContent.trim();
    fireEvent(`User interacts with quicklinks ${category}`);
    //console.log(`User interacts with quicklinks ${category}`)
  } else if (target.closest(`.close_button`)) {
    fireEvent(`User interacts with x on scrollshop`);
    //console.log(`User interacts with x on scrollshop`)
  } else if (target.closest(`.clear_all`)) {
    removeCategoryHeighlit(`${ID}`);
  }
};
