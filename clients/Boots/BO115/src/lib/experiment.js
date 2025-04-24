/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { fireEvent, setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;



  const createSearchBox = () => {
    const searchBox = document.createElement('div');
    searchBox.classList.add(`${ID}-searchWrapper`);
    searchBox.innerHTML = `
    <div class="${ID}-searchContent">
      <h3>What are you looking for?</h3>
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

    document.querySelector('#main').insertAdjacentElement('beforebegin', searchBox);    
  }

  // move search bar
  const moveSearch = () => {
    const headerSearchBar = document.querySelector('#searchBar');
    document.querySelector(`.${ID}-searchWrapper .${ID}-searchBar`).appendChild(headerSearchBar);
  }

  const addTermsandBrands = () => {

    const searchTerms =  window.BO115SearchTerms;
   
    const url = window.location.pathname.split("/")[1];
    // if home else 
    if(url === "") {

      Object.keys(searchTerms['home'].terms).forEach((i) => {
        const termdata = searchTerms['home'].terms[i];
        console.log(termdata);
        const term = document.createElement('a');
        term.classList.add(`${ID}-term`);
        term.setAttribute('href', termdata.url);
        term.innerHTML = `<span class="${ID}-searchItem">${[i][0]}</span>`;
        document.querySelector(`.${ID}-terms`).appendChild(term);
      });

      Object.keys(searchTerms['home'].brands).forEach((i) => {
        const branddata = searchTerms['home'].brands[i];
        const brand = document.createElement('a');
        brand.classList.add(`${ID}-term`);
        brand.setAttribute('href', branddata.url);
        brand.innerHTML = `<span class="${ID}-searchItem">${[i][0]}</span>`;
        document.querySelector(`.${ID}-brands`).appendChild(brand);
      });

    } else {
      Object.keys(searchTerms).forEach((i) => {
        const data = searchTerms[i];
        if(url.indexOf([i]) > -1) {
          Object.keys(data.terms).forEach((x) => {
            const termName = data.terms[x];
            const term = document.createElement('a');
            term.classList.add(`${ID}-term`);
            
            term.setAttribute('href', termName.url);
            term.innerHTML = `<span class="${ID}-searchItem">${[x][0]}</span>`;
      
            document.querySelector(`.${ID}-terms`).appendChild(term);
          });
          Object.keys(data.brands).forEach((x) => {
            const termName = data.brands[x];
            const term = document.createElement('a');
            term.classList.add(`${ID}-term`);
            
            term.setAttribute('href', termName.url);
            term.innerHTML = `<span class="${ID}-searchItem">${[x][0]}</span>`;
      
            document.querySelector(`.${ID}-brands`).appendChild(term);
          });
        }
      });
    }
    
  }

  const clickEvents = () => {
    const allTerms = document.querySelectorAll(`.${ID}-searchContent .${ID}-term`);
    if(allTerms) {
      for (let index = 0; index < allTerms.length; index += 1) {
        const element = allTerms[index];
        element.addEventListener('click', () => {
          fireEvent('Clicked Quick Link');
        });
        
      }
    }

    const searchForm = document.querySelector('#searchBox');
    searchForm.addEventListener('submit', () => {
      fireEvent('Search submitted');
    });
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
  clickEvents();
};