/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { searchTerms, searchBrands, homeTerms, homeBrands } from './searchData';

export default () => {
  setup();

  const { ID, VARIATION } = shared;


  let title;
  const url = window.location.pathname.split("/")[1];

  if(VARIATION === '1') {
    title = 'What are you looking for?';
  } else if(VARIATION === '2'){
    if(url === "") {
      title = 'What are you looking for?';
    } else {
      title = `Search Boots.com ${url.replace('-', ' & ')}`;
    }
  }

  const createSearchBox = () => {
    const searchBox = document.createElement('div');
    searchBox.classList.add(`${ID}-searchWrapper`);
    searchBox.innerHTML = `
    <div class="${ID}-searchContent">
      <h3>${title}</h3>
      <div class="${ID}-searchBar"></div>
      <div class="${ID}-popularContent">
        <div class="${ID}-termsContent">
          <span>Popular terms:</span>
          <div class="${ID}-terms"></div>
        </div>
        ${window.location.href.indexOf('no7') === -1 ? 
        `<span class="${ID}-line">|</span>
        <div class="${ID}-brandsContent">
          <span>Popular brands:</span>
          <div class="${ID}-brands"></div>
        </div>`: ''}
      </div>
    </div>`;

    const ribbonBanner = document.querySelector('.cm-placement-main .cu-ribbon');
    const heading = document.querySelector('#estore_category_heading h1');
    if (heading) {
      heading.insertAdjacentElement('beforebegin', searchBox);
    } else if (ribbonBanner) {
      ribbonBanner.insertAdjacentElement('afterend', searchBox);
    } else {
      document.querySelector('.cm-placement-main').insertAdjacentElement('afterbegin', searchBox);
    }
  }

  // move search bar
  const moveSearch = () => {
    const headerSearchBar = document.querySelector('#searchBar');
    document.querySelector(`.${ID}-searchWrapper .${ID}-searchBar`).appendChild(headerSearchBar);
  }

  const addTermsandBrands = () => {

    // IF HOMEPAGE
    if(url === "") {
      Object.keys(homeTerms).forEach((i) => {
        const data = homeTerms[i];
 
        Object.keys(data).forEach((x) => {
          const termName = data[x];
          const term = document.createElement('a');
          term.classList.add(`${ID}-term`);
          term.setAttribute('href', termName.url);
          term.innerHTML = `<span class="${ID}-searchItem">${[x][0]}</span>`;
    
          document.querySelector(`.${ID}-terms`).appendChild(term);
        });

      });
      Object.keys(homeBrands).forEach((i) => {
        const data = homeBrands[i];
        Object.keys(data).forEach((x) => {
          const termName = data[x];
          const term = document.createElement('a');
          term.classList.add(`${ID}-term`);
          term.setAttribute('href', termName.url);
          term.innerHTML = `<span class="${ID}-searchItem">${[x][0]}</span>`;
    
          document.querySelector(`.${ID}-brands`).appendChild(term);
        });
        
     });
    } else {
    
      Object.keys(searchTerms).forEach((i) => {
        const data = searchTerms[i];
        if(url.indexOf([i]) > -1) {
          Object.keys(data).forEach((x) => {
            const termName = data[x];
            const term = document.createElement('a');
            term.classList.add(`${ID}-term`);
            
            term.setAttribute('href', termName.url);
            term.innerHTML = `<span class="${ID}-searchItem">${[x][0]}</span>`;
      
            document.querySelector(`.${ID}-terms`).appendChild(term);
          });
        }
      });

      if(window.location.href.indexOf('no7') === -1) {
        Object.keys(searchBrands).forEach((i) => {
          const data = searchBrands[i];
          if(url.indexOf([i]) > -1) {
            Object.keys(data).forEach((x) => {
              const brandName = data[x];
              const term = document.createElement('a');
              term.classList.add(`${ID}-term`);
              
              term.setAttribute('href', brandName.url);
              term.innerHTML = `<span class="${ID}-searchItem">${[x][0]}</span>`;
        
              document.querySelector(`.${ID}-brands`).appendChild(term);
            });
            
          }
      });
      }
    }
  }

  const mobileScroll = () => {
    function scrollToElement(element) {
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.getBoundingClientRect().top + window.scrollY,
      });
    }

    const searchIcon = document.querySelector(`#omniPresentLinksBar #mobileLink_search a`);
    if(searchIcon) {
      searchIcon.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
        scrollToElement(document.querySelector(`.${ID}-searchContent`));
      });
    }

  }

  createSearchBox();
  moveSearch();
  mobileScroll();
  addTermsandBrands();
};