/**
 * MP181 - Mobile Navigation Design
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';
import { config } from './config';

export default () => {
  setup();
  const navBarRef = document.querySelector('nav.slide-panel-left-nav');

  const addSearch = () => {
    const searchBar = document.querySelector('form#search_form');
    const searchBarCopy = searchBar.cloneNode(true);

    navBarRef.insertAdjacentElement('afterbegin', searchBarCopy);

    // Disable default functionality on added form
    const addedSearchBar = navBarRef.querySelector('form');
    const input = addedSearchBar.querySelector('input[type="text"]');
    let searchTerm = '';
    input.addEventListener('keyup', (e) => {
      searchTerm = e.target.value;
    });
    addedSearchBar.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchUrl = window.location.href;
      window.location.href = `https://www.mamasandpapas.com/en-gb/search/?text=${encodeURI(searchTerm)}`;
    });
  };

  const addImages = (jsonConfig, navItemEl) => {
    // console.log('item ', navItemEl);
    if (!jsonConfig) return;
    if (navItemEl) {

      if (!jsonConfig[navItemEl.textContent.trim()]) return; // Ensure the object exists
      
      navItemEl.insertAdjacentHTML('afterbegin', `
        <img src="${jsonConfig[navItemEl.textContent.trim()]}" alt="${navItemEl.textContent.trim()}"/>
      `);
      navItemEl.parentElement ? navItemEl.parentElement.classList.add('MP181-hasImg') : null;
    }
  };

  const addViewAll = () => {
    const headerNavItems = document.querySelectorAll('div[data-goto-category="nav_primary"]');
    if (!headerNavItems) return;

    for (let i = 0; headerNavItems.length > i; i += 1) {
      const aTag = headerNavItems[i].querySelector('a');
      let aTagClone = aTag.cloneNode(true);
      aTagClone.textContent = `View All ${aTagClone.textContent}`;
      aTagClone.classList.add('MP181-viewAll');

      headerNavItems[i].insertAdjacentElement('afterend', aTagClone); 
    }
  };

  pollerLite(['.cartSlider form.search-panel__form + .nav_category > ul > li > a'], () => {
    const navItems = document.querySelectorAll('.slide-panel-left-nav ul.nav_group li.nav_groupLink > a');
    // console.log('list ', navItems);
    for (let i = 0; navItems.length > i; i += 1) {
      // console.log('item  loop  ', navItems[i]);
      addImages(config, navItems[i]);
    }

    addViewAll();
  });

  addSearch();
};
