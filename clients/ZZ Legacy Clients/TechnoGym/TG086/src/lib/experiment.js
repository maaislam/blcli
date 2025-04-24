/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import TopHeader from './components/topHeader';
import topFilterBar from './components/topFilterBar';
import slideOutFilter from './components/slideOutFilter';
import settings from './settings';
import treadmillsPage from './components/TG064Markup/treadmillsPage';
import slideOutFiltersDesktop from './components/slideOutDesktop';
import DesktopSearch from './components/desktopSearch';


const activate = () => {

  const { ID } = settings;

  setup();

  // add the header
  const topHeader = new TopHeader();
 // add the top filters bar
  topFilterBar();

 // make changes to the slide out filters on mobile
  slideOutFilter();

  // ---- functions for observer
  const checkIfTreadmills = () => {
    if(window.location.href.indexOf('/product_type-treadmills.html') > -1) {
      document.body.classList.add(`${ID}-treadmills`);
      treadmillsPage();
    } else {
      document.body.classList.remove(`${ID}-treadmills`);
    }
  }
  checkIfTreadmills();

  // wrap the empty filter titles in div
  const putTitleInDiv = () => {
    const allFilterTitles = document.querySelectorAll('#narrow-by-list dt');
    for (let index = 0; index < allFilterTitles.length; index += 1) {
        const element = allFilterTitles[index];

        const org_html = element.innerHTML;
        const new_html = `<div class="${ID}-filterType_title">${org_html}</div>`;
        element.innerHTML = new_html;
    }
  }
  putTitleInDiv();

  const addPageLoader = () => {
    const loader = document.createElement('div');
    loader.classList.add(`${ID}-loader`);
    loader.innerHTML = `<span></span>`;

    document.body.appendChild(loader);
  }
  addPageLoader();

  // fix the search bar when there's no results
  const fixSearch = () => {
    const searchBar = document.querySelector('#form-sidebar-search #search-sidebar');
    searchBar.addEventListener('keyup', () => {
      if(searchBar.value === '') {
            const searchBox = document.querySelector('.category-view.category-view-product-search');
            searchBox.style.display = 'none';
            const overlay = document.querySelector('.category-view-search-overlay.modal-backdrop.fade.in');
            if(overlay) {
              overlay.click();
            }
        }
    });
  }
  fixSearch();

  // force the page to reload on any filter clicks
  const forceRefresh = () => {
    const allFilterLinks = document.querySelectorAll('#narrow-by-list li a');
    const loader = document.querySelector(`.${ID}-loader`);
    for (let index = 0; index < allFilterLinks.length; index += 1) {
      const element = allFilterLinks[index];
      element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        // show the loader
        if(window.innerWidth > 767) {
          loader.classList.add(`${ID}-loader_active`);
          const pageLoc = element.getAttribute('href');
          window.location = pageLoc;
        } 
      });
    }
    if(window.innerWidth < 767) {
      // on mobile, once filters are clicked, apply the filters button will redirect
      const applyFilters = document.querySelector(`.${ID}-applyAll`);
      applyFilters.addEventListener('click', () => {
        const newFilterURL = window.location.href;
        loader.classList.add(`${ID}-loader_active`);
        window.location.href = newFilterURL;
      });
    }
  }

  if(settings.VARIATION === '2') {
    if(window.innerWidth >= 1024) {
      const desktopFilters = new slideOutFiltersDesktop();
      // move the search bar on desktop for V2
      const search = new DesktopSearch();
    }
  }
  forceRefresh();
};

export default activate;
