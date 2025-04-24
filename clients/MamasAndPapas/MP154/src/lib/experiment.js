/**
 * MP154 - Remove Search Overlay
 * @author User Conversion
 */
import { setup, moveSearchForm, mimicSearch, buildResults } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import { observer } from '../../../../../lib/uc-lib';
import settings from './settings';

const activate = () => {
  setup();

  // Cache
  const formElement = cacheDom.get('#search_form');
  const moveToRef = cacheDom.get('.header.header_nav .col-xs-4.text-right.pt-sm-2');

  formElement.removeAttribute('action');
  formElement.removeAttribute('name');
  formElement.removeAttribute('id');
  // Move form
  moveSearchForm(formElement, moveToRef);
  if (formElement) {
    formElement.parentElement.removeChild(formElement);
  }

  // Change header classes to give more space.
  const headerNav = cacheDom.getAll('header .header.header_nav > div');
  for (let i = 0; headerNav.length > i; i += 1) {
    headerNav[0].classList.add('col-sm-5');
    headerNav[1].classList.add('col-sm-2');
    headerNav[2].classList.add('col-sm-5');
  }

  // Cache added form
  const addedForm = cacheDom.get('.MP154-form form');
  const resultArea = cacheDom.get('#js_searchFormResults');
  resultArea.insertAdjacentHTML('beforeend', '<div class="MP154-scrollWrap"></div>');
  const resultsRef = cacheDom.get('.MP154-scrollWrap');

  // Recent
  let recentSearches = window.localStorage.getItem('MP154-recentTerms');
  const recentSection = () => {
    resultsRef.insertAdjacentHTML('beforeend', `
      <div class="MP154-recentFixed">
        <div id="js_recentTitle" class="MP154-title MP154-recent text-left clearfix row">
          <div class="col-xs-12">
            <h4 class="d-inline">Recent Searches</h4>
          </div>

        </div>
        <div class="row MP154-recent pt-2 pb-2 text-left">
          ${recentSearches.split(',').map((term => `<a class="col-sm-4 col-xs-6 text-gray MP154-recentLink" href="/en-gb/search/?text=${term}">${term}</a>`)).join('')}
        </div>
      </div>
    `);
  };


  mimicSearch(addedForm, (result, value) => {
    // Pull out each section
    const { optimizedProductsSearchResultsData } = result;
    const { totalProductsFound } = optimizedProductsSearchResultsData;
    // const { categories } = result; not sure if using...
    const { stores } = result;
    
    const productsSection = () => {
      resultsRef.innerHTML = `
        <div id="js_productTitle" class="col-xs-12 col-md-12 mb-4 text-left MP154-title clearfix row" style="display: block;">
          <div>
            <h4 class="d-inline">Products</h4>
            <span class="d-inline text-gray">
              <span>(<span id="js_productNumber">${totalProductsFound}</span>)</span>
              <a id="js_productLink" href="/en-gb/search/?text=${value}" data-url="/en-gb/search/?text="><u>show all</u></a>
            </span>
          </div>
        </div>
      `;
      if (optimizedProductsSearchResultsData) {
        const { optimizedProducts } = optimizedProductsSearchResultsData;
        const html = buildResults(optimizedProducts);
        resultsRef.insertAdjacentHTML('beforeend', html);
      }
    };

    const storesSection = () => {
      resultsRef.insertAdjacentHTML('beforeend', `
        <div id="js_storeTitle" class="col-xs-12 col-md-12 mb-4 text-left MP154-title clearfix" style="display: block;">
          <div class="col-xs-12">
            <h4 class="d-inline">Stores</h4>
            <span class="d-inline text-gray">(<span id="js_storeNumber">${stores.length}</span>)</span>
          </div>
        </div>
        <div class="row pt-2 pb-2 text-left">
          ${stores.map((store => `<div class="col-xs-12 col-sm-6"><a href="${store.url}" class="text-gray" data-url="/en-gb/search/?text="><u>${store.displayName}</u></a></div>`)).join('')}
        </div>
      `);
    };

    productsSection();
    if (stores.length) {
      // storesSection();
    }

    recentSearches = window.localStorage.getItem('MP154-recentTerms');
    if (recentSearches) {
      recentSection();
      const links = document.querySelectorAll('.MP154-recentLink');
      for (let i = 0; links.length > i; i += 1) {
        links[i].addEventListener('click', () => {
          events.send('MP154', 'Click', 'Recent term clicked');
        });
      }
    }
  });

  // page load, if terms, add them.
  if (recentSearches) {
    recentSection();
    const links = document.querySelectorAll('.MP154-recentLink');
    for (let i = 0; links.length > i; i += 1) {
      links[i].addEventListener('click', () => {
        events.send('MP154', 'Click', 'Recent term clicked');
      });
    }
  }

  // Search click event on icon.
  const formSearchIcon = cacheDom.get('.MP154-form button.btn-link.btn-icon');
  const searchInput = cacheDom.get('.MP154-form input.siteSearchInput');

  if (formSearchIcon) {
    formSearchIcon.removeAttribute('type');
    formSearchIcon.addEventListener('click', (e) => {
      e.preventDefault();
      const inputVal = searchInput.value;
      const value = inputVal.replace(/\s/g, '+');
      if (inputVal) {
        let currentUrl = window.location.href;
        if (currentUrl.match(/c/)) {
          currentUrl.replace('/c/', '');
          window.location.href = `/search/?text=${value}`;
        } else {
          window.location.href = `search/?text=${value}`;
        }
      }
    });
  }

  // event
  searchInput.addEventListener('click', () => {
    events.send(settings.ID, 'Click', 'User clicked the search bar');
  });

  // Toggle search form on mobile.
  if (window.innerWidth < 767) {
    const searchIcon = cacheDom.get('#js-header span.js-slidePanel .ico-search');
    const form = document.querySelector('.MP154-form');
    if (searchIcon && form) {
      searchIcon.parentElement.removeAttribute('data-target');
      searchIcon.addEventListener('click', () => {
        form.classList.toggle('MP154-show');
        events.send('MP154', 'Click', 'User toggled the search bar on mobile');
      });
    }
  }

  // Click outside of search element to close.
  const bodyWrap = cacheDom.get('#page');
  const input = cacheDom.get('.MP154-form form input.siteSearchInput');
  const resultsDiv = cacheDom.get('#js_searchFormResults .MP154-scrollWrap');
  const container = cacheDom.get('.MP154-form');
  const form = cacheDom.get('.MP154-form form');
  if (bodyWrap) {
    bodyWrap.addEventListener('click', (e) => {
      if (container) {
        if (!container.contains(e.target)) {
          if (input) {
            input.value = '';
            resultsDiv.innerHTML = '';
            form.classList.remove('MP155-hasEls');
          }
        }
      }
    });
    if (window.innerWidth < 767) {
      bodyWrap.addEventListener('touchstart', (e) => {
        if (container) {
          if (!container.contains(e.target)) {
            if (input) {
              input.value = '';
              resultsDiv.innerHTML = '';
              form.classList.remove('MP155-hasEls');
            }
          }
        }
      });
    }
  }


  const productWrapper = document.querySelector('.MP154-scrollWrap');
  if (productWrapper) {
    observer.connect(productWrapper, () => {
      productWrapper.addEventListener('click', (e) => {
        if (!e.target.classList.contains('js_productTitle') || !e.target.classList.contains('MP154-recentFixed')) {
          events.send(settings.ID, 'Click', 'User clicked a searched product');
        }
      });
    }, {
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      }
    })
  }


  // Windows fix for duplicated scrollbar
  var OSName="Unknown OS";
  if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
  if (OSName === 'Windows') {
    document.body.classList.add('MP154-removeScroll');
  }
};

export default activate;
