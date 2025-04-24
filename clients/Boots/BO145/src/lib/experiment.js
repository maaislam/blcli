/**
 *  BO145 - Search Component Improvements
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { searchData } from '../searchData';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Experiment code
  // -----------------------------
  // ...

  const sessionCount = () => {
    if (localStorage.getItem("count") === null) {
      sessionStorage.setItem("count", 's');
      localStorage.setItem("count", 's');
    }
    else if (sessionStorage.getItem("count") === null) {
      var lsCount = localStorage.getItem("count");
      sessionStorage.setItem("count", lsCount + 's');
      localStorage.setItem("count", lsCount + 's');
    }

    var sessionRetrieve = sessionStorage.getItem("count");
    return sessionRetrieve.length;
  }


  // create the search box html
  const createSearchBox = () => {
    const searchBox = document.createElement('div');
    searchBox.classList.add(`${ID}-searchWrapper`);
    if(VARIATION === '2') {
      searchBox.innerHTML = `
      <div class="${ID}-searchContent">
        <h3>What are you looking for?</h3>
        <div class="${ID}-searchBar"></div>
        <div class="${ID}-popularContent">
          <div class="${ID}-termsContent">
            <span>Popular searches:</span>
            <div class="${ID}-terms"></div>
          </div>
        </div>
      </div>`;

    } else {
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
    }
   
    // insert box in to the dom
    document.querySelector('#main').insertAdjacentElement('beforebegin', searchBox);    
  }

  // move search bar
  const moveSearch = () => {
    const headerSearchBar = document.querySelector('#searchBar');
    document.querySelector(`.${ID}-searchWrapper .${ID}-searchBar`).appendChild(headerSearchBar);
  }

  const addTermsandBrands = () => {

    // if search terms have been added in to target use this
    const searchTerms = window.BO145SearchTerms;
   
    // if not use this...
    //const searchTerms = searchData;

    const url = window.location.pathname.split("/")[1];

    // if url is homepage
    if(url === "") {

      // loop through terms
      Object.keys(searchTerms['home'].terms).forEach((i) => {
        const termdata = searchTerms['home'].terms[i];
        const term = document.createElement('a');
        term.classList.add(`${ID}-term`);
        term.setAttribute('href', termdata.url);
        term.innerHTML = `<span class="${ID}-searchItem">${[i][0]}</span>`;
        document.querySelector(`.${ID}-terms`).appendChild(term);
      });

      // loop through brands
      Object.keys(searchTerms['home'].brands).forEach((i) => {
        const branddata = searchTerms['home'].brands[i];
        const brand = document.createElement('a');
        brand.classList.add(`${ID}-term`);
        brand.setAttribute('href', branddata.url);
        brand.innerHTML = `<span class="${ID}-searchItem">${[i][0]}</span>`;
        if(VARIATION === '2') {
          document.querySelector(`.${ID}-terms`).appendChild(brand);
        } else {
          document.querySelector(`.${ID}-brands`).appendChild(brand);
        }
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
      
            if(VARIATION === '2') {
              document.querySelector(`.${ID}-terms`).appendChild(term);
            } else {
              document.querySelector(`.${ID}-brands`).appendChild(term);
            }
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
          if(VARIATION !== 'control') {
            if(!localStorage.getItem(`${ID}-searched`)) {
              localStorage.setItem(`${ID}-searched`, 1);
            }
          }
        });
      }
    }

    const searchForm = document.querySelector('#searchBox');
    searchForm.addEventListener('submit', () => {

      // send event on search submit
      fireEvent('Search submitted');

      if(VARIATION !== 'control') {
        if(!localStorage.getItem(`${ID}-searched`)) {
          localStorage.setItem(`${ID}-searched`, 1);
        }
      }
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
        

        if(document.querySelector('#mobileLink_burger').classList.contains('active')){
          document.querySelector('#mobileLink_burger').click();
          scrollToElement(document.querySelector(`#header_link_container`));
        } else {
          scrollToElement(document.querySelector(`.${ID}-searchContent`));
        }
        if(VARIATION !== 'control') {
          document.querySelector('#AlgoliaSearchInput').focus();
        }
      });
    }
  }


  if(VARIATION === 'control') {
    createSearchBox();
    moveSearch();
    mobileScroll();
    addTermsandBrands();
    clickEvents();
  } else {
    sessionCount();

    // first visit
    if(localStorage.getItem("count") === 's') {
      // run
      createSearchBox();
      moveSearch();
      mobileScroll();
      addTermsandBrands();
      clickEvents();

    } else if(localStorage.getItem("count").indexOf('ss') > -1) {
       // if second visit and didn't interact before
      if(localStorage.getItem(`${ID}-searched`)) {
        createSearchBox();
        moveSearch();
        mobileScroll();
        addTermsandBrands();
        clickEvents();
      } else {
        return;
      }
    }    
  }
};
