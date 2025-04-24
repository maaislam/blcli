import settings from '../settings';

export default () => {
  const topFilter = document.createElement('div');
  topFilter.classList.add(`${settings.ID}-filterbar`);

  const filtersBeingShown = document.querySelectorAll('.browse__applied-filters__item');
  if (filtersBeingShown && filtersBeingShown.length > 1) {
    const allFilters = document.querySelectorAll('.browse__applied-filters__item').length - 1;
    topFilter.innerHTML = `<div class="${settings.ID}-filter ${settings.ID}-stickyFilter_active">Filter (${allFilters})</div>`;
  } else {
    topFilter.innerHTML = `<div class="${settings.ID}-filter">Filter</div>`;
  }
  document.querySelector('#js-header').insertAdjacentElement('afterend', topFilter);

  const outerfilterScroll = () => {
    const products = document.querySelector('#list');
    const topFilterBar = document.querySelector(`.${settings.ID}-filterbar`);
    // make the header in the filters sticky to remove title
    window.onscroll = () => {
      const allProducts = (products.getBoundingClientRect().y + window.scrollY);
      const scrollTop = (document.documentElement && document.documentElement.scrollTop)
      || document.body.scrollTop;
      if (scrollTop >= allProducts) {
        topFilterBar.classList.add(`${settings.ID}_fixed`);
      } else {
        topFilterBar.classList.remove(`${settings.ID}_fixed`);
      }
    };
  };

  outerfilterScroll();
};
