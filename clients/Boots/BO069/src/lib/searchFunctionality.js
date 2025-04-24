import { searchBrands, searchTerms } from "./searchData";
import shared from "./shared";

export default () => {

    const { ID } = shared;

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
            <span class="${ID}-line">|</span>
            <div class="${ID}-brandsContent">
              <span>Popular brands:</span>
              <div class="${ID}-brands"></div>
            </div>
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
        const category = document.querySelector('#estore_category_heading h1');
        
        Object.keys(searchTerms).forEach((i) => {
            const data = searchTerms[i];
            console.log([i]);
            console.log(category.textContent.trim());
            if(category.textContent.trim() === [i][0]) {
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
        Object.keys(searchBrands).forEach((i) => {
            const data = searchBrands[i];
            if(category.textContent.trim() === [i][0]) {
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
}