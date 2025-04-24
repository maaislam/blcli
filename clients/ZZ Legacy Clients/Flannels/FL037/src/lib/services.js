import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

/**
 * @desc Return the top 5 brands
 * @param {ElementArray} filterList
 */
const getBrands = (filterList) => {
  const brandList = [];
  if (filterList.length) {
    const orderedFilters = Array.from(filterList).sort((a, b) => {
      return +a.getAttribute('data-productcount') - +b.getAttribute('data-productcount');
    });
    for (let i = orderedFilters.length - 1; i >= 0; i -= 1) {
      if (brandList.length < 5) {
        brandList.push(orderedFilters[i]);
      }
    }
  }
  return brandList;
};


/**
 * @desc Build up list of brands
 * @param {Elements} brandList
 * @param {Element} ref
 * @param {Boolean} isMobile
 */
const buildBrandList = (brandList, ref, positon) => {
  let isMobile = false;
  if (window.innerWidth < 1021) {
    isMobile = true;
  }
  if (brandList.length && ref) {
    if (!document.querySelector('.FL037-brands')) {
      ref.insertAdjacentHTML(positon, `
        <div class="FL037-brands">
          <div class="FL037-info">
            <p>Shop by Brand</p>
          </div>
          <div class="FL037-brands-wrap">
            ${brandList.map(brand => `<div class="FL037-brand">${brand.outerHTML}</div>`).join('')}
            <div id="FL037-more-brands"><p>More brands</p></div>
          </div>
        </div>
      `);
    }
  }
};

/**
 * Remove the onclick events from newly added.
 */
const removeEvents = () => {
  const addedBrands = document.querySelectorAll('.FL037-brands .FL037-brand a.FilterAnchor');
  if (addedBrands.length) {
    for (let i = 0; addedBrands.length > i; i += 1) {
      addedBrands[i].removeAttribute('onclick');
      addedBrands[i].querySelector('.FilterName').removeAttribute('data-parsedfiltername');
      // addedBrands[i].querySelector('.FilterName').setAttribute('parsedfiltername', '');
    }
  }
};

const removeExtraLabels = () => {
  setTimeout(() => {
    const labels = document.querySelectorAll('ul.selectedFilters li.selectedFilter .selectedFilterLabel');
    for (let i = 0; labels.length > i; i += 1) {
      if (labels[i].textContent === '') {
        labels[i].parentElement.parentElement.style.display = 'none';
      }
    }
  }, 600);
};

const checkActiveFilters = () => {
  setTimeout(() => {
    const addedFilters = document.querySelectorAll('.FL037-brands .FL037-brand .FilterListItem');
    if (addedFilters.length) {
      for (let i = 0; addedFilters.length > i; i += 1) {
        const isActive = addedFilters[i].querySelector('.SelectedFilter');
        if (isActive) {
          addedFilters[i].classList.add('FL037-active');
        } else {
          addedFilters[i].classList.remove('FL037-active');
        }
      }
    }
  }, 600);
};

const toggleFromOriginalFilters = () => {
  const oGFilters = document.querySelectorAll('#FiltersHeader .selectedFilters li.selectedFilter');
  const addedFilters = document.querySelectorAll('.FL037-brands .FL037-brand .FilterListItem');
  if (!oGFilters.length) {
    for (let i = 0; addedFilters.length > i; i += 1) {
      if (addedFilters[i] && addedFilters[i].classList.contains('FL037-active')) {
        addedFilters[i].classList.remove('FL037-active');
      }
      const span = addedFilters[i].querySelector('a.FilterAnchor > span');
      if (span && span.classList.contains('SelectedFilter')) {
        span.classList.remove('SelectedFilter');
        span.classList.add('SelectableFilter');
      }
      if (span && span.classList.contains('FirstSelectedFilter')) {
        span.classList.remove('FirstSelectedFilter');
      }
    }
  }

  if (oGFilters.length) {
    // Loop over added filters and compare
    for (let i = 0; oGFilters.length > i; i += 1) {
      const filterName = oGFilters[i].querySelector('.selectedFilterLabel');
      oGFilters[i].addEventListener('click', () => {
        for (let j = 0; addedFilters.length > j; j += 1) {
          const addedFilterName = addedFilters[j].querySelector('.FilterName');
          
          if (addedFilterName.textContent.trim().toUpperCase() === filterName.textContent.toUpperCase()) {
            if (addedFilters[j] && addedFilters[j].classList.contains('FL037-active')) {
              addedFilters[j].classList.remove('FL037-active');
            }
            const span = addedFilters[j].querySelector('a.FilterAnchor > span');
            if (span && span.classList.contains('SelectedFilter')) {
              span.classList.remove('SelectedFilter');
              span.classList.add('SelectableFilter');
            }
            if (span && span.classList.contains('FirstSelectedFilter')) {
              span.classList.remove('FirstSelectedFilter');
            }
          }
        }
      });
    }
  }
};

export { toggleFromOriginalFilters };
export { removeExtraLabels };
export { removeEvents };
export { getBrands };
export { buildBrandList };
export { checkActiveFilters };
export { setup }; // eslint-disable-line
