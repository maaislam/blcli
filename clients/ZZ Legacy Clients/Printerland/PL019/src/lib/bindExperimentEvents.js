import settings from './settings';
import { buildFilterUrl } from './services';
import { observer } from '../../../../../lib/uc-lib';
import preSelectedBrand from './preSelectedBrands';
import availableFilterBrands from './availableFilterBrands';
import queryBrands from './queryBrands';

function clickPriceRangeFilterBtn() {
  const filterBtn = document.querySelector('.PL019-ctaBtn');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      const minPrice = document.querySelector('#PL019-minHandle').innerText;
      const maxPrice = document.querySelector('#PL019-maxHandle').innerText;
      buildFilterUrl(minPrice, maxPrice);
    });
  }
}

function movedPriceSlider() {
  observer.connect([document.querySelector('.noUi-handle.noUi-handle-lower'), document.querySelector('.noUi-handle.noUi-handle-upper')], () => {
    // GA Event
    // events.send(settings.ID, `Variation ${settings.VARIATION}`, 'Moved - Price Slider', { sendOnce: true });
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
    },
  });
}

function brandCheckboxes() {
  const checkboxes = document.querySelectorAll('ul.PL019-brands__list li');
  const filterBrandsCheckboxes = document.querySelectorAll('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_ctl01_ddBrands .inner .checkbox');
  [].forEach.call(filterBrandsCheckboxes, (el) => {
    const brandValue = el.querySelector('a').innerText.trim();
    
    el.classList.add(`PL019-${brandValue}`);
    availableFilterBrands.availableBrands.push(brandValue);
    if (el.querySelector('a').classList.contains('selected') && preSelectedBrand.brandFilters.indexOf(`${brandValue}`) === -1) {
      preSelectedBrand.brandFilters.push(brandValue);
    }
  });
}

function sortByFilterSelection() {
  const newSortByButtons = document.querySelectorAll('.PL019-sortBy__btn');
  [].forEach.call(newSortByButtons, (btn) => {
    btn.addEventListener('click', () => {
      const selectedValue = btn.getAttribute('value');
      const sortBySelect = document.querySelector('select#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_drpDepartmentsSortBy');
      const sortByOptions = sortBySelect.options;
      sortBySelect.value = `${selectedValue}`;
      sortBySelect.dispatchEvent(new Event('change'));
    });
  });
}

export { clickPriceRangeFilterBtn, movedPriceSlider, brandCheckboxes, sortByFilterSelection }; // eslint-disable-line
