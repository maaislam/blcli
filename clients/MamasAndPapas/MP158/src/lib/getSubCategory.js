import gaEventParameters from './gaEventParameters';

export default (subCat) => {
  const categoryGoTo = subCat.getAttribute('data-goto-category');
  document.querySelector(`.nav_category.bg-white.pb-3[data-category="${categoryGoTo}"] ul.nav_group.list-unstyled`).classList.add('MP158-subLevel');
  document.querySelector(`.nav_category.bg-white.pb-3[data-category="${categoryGoTo}"] ul.nav_group.list-unstyled`).classList.add('current');
  const subCategoriesContainer = document.querySelector(`.nav_category.bg-white.pb-3[data-category="${categoryGoTo}"] ul.nav_group.list-unstyled`);
  subCat.insertAdjacentElement('beforeend', subCategoriesContainer);
};