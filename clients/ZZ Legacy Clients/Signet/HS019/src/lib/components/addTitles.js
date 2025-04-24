/* Change the existing filters and add title */
import settings from '../settings';

const { ID } = settings;

const addTitles = () => {
  const allFilters = document.querySelectorAll('#filter-modal .filters-panel__refinement-section-container');
  // add the title block
  for (let index = 0; index < allFilters.length; index += 1) {
    const element = allFilters[index];
    if (element.querySelector(`.${ID}-filter_title`)) {
      break;
    }
    const filterTitle = document.createElement('div');

    filterTitle.classList.add(`${ID}-filter_title`);
    filterTitle.innerHTML = `<span class="${ID}-filter_close"></span><h3></h3>`;
    element.insertAdjacentElement('afterbegin', filterTitle);
  }
};

export default addTitles;
