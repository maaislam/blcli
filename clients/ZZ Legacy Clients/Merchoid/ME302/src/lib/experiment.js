/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import SearchBox from './components/fullSearch';
import { setup, fireEvent } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  const getPrice = () => {
    const url = window.location.href;
    let currency;
    if(url.indexOf('/uk/') > -1) {
      currency = '£19.99';
    } else if(url.indexOf('eu') > -1) {
      currency = '€65.99';
    } else {
      currency = '€18.99';
    }

    return currency;
  }

  const mobileHeader = document.querySelector('.page-header');
    
  // move nav
  const headerChanges = () => {
    const header = mobileHeader.querySelector('.header .container');
    const navToggle = mobileHeader.querySelector('.nav-toggle');
    header.insertAdjacentElement('afterbegin', navToggle);
  }

  const createSearch = () => {

    const newSearchBox = document.createElement('div');
    newSearchBox.classList.add(`${ID}-search`);
    newSearchBox.innerHTML = `
    <div class="${ID}-searchForm">
    <div class="${ID}-searchSuggestions">
      <div class="${ID}-quickLinks">
        <h3>Popular Searches</h3>
        <ul>
          <li><a href="/brands">View all brands</a></li>
          <li><a href="/brand/dc-comics-batman">Batman</a></li>
          <li><a href="/brand/harry-potter">Harry potter</a></li>
          <li><a href="/brand/dc-comics-superman">Superman</a></li>
          <li><a href="/brand/star-wars">Star wars</a></li>
          <li><a href="/nintendo-legend-of-zelda">Zelda</a></li>
          <li><a href="/brand/lord-of-the-rings">Lord of the rings</a></li>
        </ul>
      </div>
      <div class="${ID}-offer">
      <a href="/nasa-retro-digital-watch/">
        <div class="${ID}-product">
          <div class="${ID}-prodImage" style="background-image:url(https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/mf_webp/jpg/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/3/6/3699_nasa-watch-1.webp)"></div>
          <p><b>NASA</b>Retro Digital Watch Preorder</p>
          <span>${getPrice()}</span>
        </div>
      </a>
    </div>
    </div>`;

    const searchBox = document.querySelector(`.footer-top .form.minisearch`);
    searchBox.querySelector('#footer-search').setAttribute('placeholder', 'Search our site...');

    if(VARIATION !== '3') {
      document.querySelector('.page-header').appendChild(newSearchBox);
      
      // add overlay
      document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);

      // move footer search to header
      document.querySelector(`.${ID}-search .${ID}-searchForm`).insertAdjacentElement('afterbegin', searchBox);
    } else {

      document.querySelector(`.${ID}-searchBox .${ID}-searchBar`).insertAdjacentElement('beforeend', searchBox);
     
    }

    
  }

  const showSearch = () => {
    const overlay = document.querySelector(`.${ID}-overlay`);
    const searchSuggestionBox = document.querySelector(`.${ID}-searchSuggestions`);

    document.querySelector('#footer-search').addEventListener('click', () => {
        overlay.classList.add(`${ID}-overlayShow`);
        searchSuggestionBox.classList.add(`${ID}-suggestionsShow`);
    });
    overlay.addEventListener('click', () => {
      overlay.classList.remove(`${ID}-overlayShow`);
      searchSuggestionBox.classList.remove(`${ID}-suggestionsShow`);
    });

    document.querySelector('.action.nav-toggle').addEventListener('click', () => {
      overlay.classList.remove(`${ID}-overlayShow`);
      searchSuggestionBox.classList.remove(`${ID}-suggestionsShow`);
    });
  }

  const addSearchIcon = () => {
    const overLay = document.querySelector(`.${ID}-overlay`);
    const searchSuggestionBox = document.querySelector(`.${ID}-searchSuggestions`);
    const newSearchIcon = document.createElement('div');
    newSearchIcon.classList.add(`${ID}-searchIcon`);
    newSearchIcon.innerHTML = `<span></span>`;
    mobileHeader.querySelector('.header-right-links__cart-links').insertAdjacentElement('afterbegin', newSearchIcon);

    if(VARIATION !== '3') {
      const searchBar = document.querySelector(`.${ID}-search`);
      newSearchIcon.addEventListener('click', () => {
        if(searchBar.classList.contains(`${ID}-searchShow`)) {
          searchBar.classList.remove(`${ID}-searchShow`);
          overLay.classList.remove(`${ID}-overlayShow`);
          searchSuggestionBox.classList.remove(`${ID}-suggestionsShow`);
          
        } else {
          searchBar.classList.add(`${ID}-searchShow`);
        }
      });
    }

  }


  // search bar always showing
  if(VARIATION === 'control') {
    headerChanges();
    createSearch();
    showSearch();
  }

  // search bar hidden behind search icon
  if(VARIATION === '1' || VARIATION === '2') {
    headerChanges();
    createSearch();
    addSearchIcon();
    showSearch();
  }

  // full page search
  if(VARIATION === '3') {
    headerChanges();
    addSearchIcon();
    new SearchBox();
    createSearch();
  }
};
