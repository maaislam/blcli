import settings from "../settings";

export default () => {
  const searchIcon = document.createElement('div');
  searchIcon.classList.add('MP146-searchbox');
  searchIcon.innerHTML = '<iuerySelector('.header.header_nav .col-xs-4.pt-sm-2 .no_hover.js-slidePanel');
  searchBox.insertAdjacentElement('beforebegin', searchIcon);

  /* On click of the search box, click the actual search button */
  const searchInput = document.querySelector('.MP146-searchbox');
  searchInput.addEventListener('click', (e) => {
    e.preventDefault();
    searchBox.click();
  });

  if (window.universal_variable.page.type !== 'Home') {
    searchIcon.classList.add('MP146-search_cat');
    searchIcon.nextSibling.classList.add('MP146-searchIcon_cat');
  } else {
    searchIcon.classList.remove('MP146-search_cat');
    searchIcon.nextSibling.classList.remove('MP146-searchIcon_cat');
  }

  if (settings.VARIATION === '2') {
    searchInput.querySelector('input').setAttribute('placeholder', 'Search');
  }
};
