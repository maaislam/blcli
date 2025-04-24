/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { events, pollerLite, observer, setCookie, getCookie, deleteCookie, logMessage } from '../../../../../lib/utils';


events.analyticsReference = '_gaUAT';

export default () => {
  setup();
  
  const { ID, VARIATION } = settings;
  
  logMessage(ID + " Variation: " + VARIATION);

  let heightOfProd = 0;

  let bodyEvents;
  let eventListeners = [];


  const getBrandFilter = () => {
    const filterItems = document.querySelectorAll('#filterlist .productFilter');
    if (filterItems.length) {
      for (let i = 0; filterItems.length > i; i += 1) {
        const el = filterItems[i];
        const title = el.querySelector('h3.productFilterTitle');
        if (title) {
          const text = title.textContent.trim();
          if (text && text == 'Top Brands') {
            const elToReturn = el.querySelector('.productFilterList');
            if (elToReturn) {
              return elToReturn;
            }
          }
        }
      }
    }
  }

  const filterDupe = (eventNumber) => {
    const filter = getBrandFilter();

    const filterDupe = filter ? filter.cloneNode(true) : null;

    // Remove dupe ID's
    const IDEls = filterDupe.querySelectorAll('[id]');
    if (IDEls.length) {
      for (let i = 0; IDEls.length > i; i += 1) {
        // IDEls[i].setAttribute('id', '');
        IDEls[i].removeAttribute('id');
      }
    }

    const list = filterDupe.querySelector('.brandSearchSort');

    list.remove();

    return filterDupe.outerHTML;
  };

  let scrollWatch = new window.IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        events.send(ID, `${ID} Variation ${VARIATION}`, 'HOF-7 User saw filter card');
      }
    });
  }, { root: null });
  

  const getPageNumber = () => {
    const el = document.querySelector('span.CurrentPageNumber');
    if (!el) return 1;

    const num = parseFloat(el.textContent);
    if (num) {
      return num;
    }
  }

  let ogFiltersLink = document.querySelector('h2.FiltersTitle.toggleFilters');
  let ogFiltersContainer = document.querySelector('#FilterContainer ul#filterlist');

  if (window.innerWidth < 1021) {
    ogFiltersLink = document.querySelector('.mobFilterContainer');
  }
  let filterLink = document.querySelector('h2.FiltersTitle.toggleFilters');
  const mobFilterLink = document.querySelector('#mobSortFilter .mobFilterContainer');

  let prodList = () => document.querySelectorAll('ul#navlist > li');

  const createCard = (prod, prodCount) => {
    if (!prodCount) return;

    let countToUse = null;
    let eventNumber = null;
    const pageNumber = getPageNumber();
    
    switch (prodCount) {
      case 20:
        countToUse = pageNumber > 1 ? (pageNumber * 100) + 21 : 21;
        eventNumber = 1;
        break;
      case 49:
        countToUse = pageNumber > 1 ? (pageNumber * 100) + 50 : 50;
        eventNumber = 2;
        break;
       case 99:
        countToUse = pageNumber > 1 ? pageNumberCalculation + 100 : 100;
        eventNumber = 3;
          break;
      case 169:
        countToUse = pageNumber > 1 ? pageNumberCalculation + 169 : 169;
        eventNumber = 4;
          break;
      case 239:
        countToUse = pageNumber > 1 ? pageNumberCalculation + 239 : 239;
        eventNumber = 5;
          break;
      
      default:
        countToUse = null; 
        break;
    }


    if (!countToUse) return;

    let ref = prod;
    if (window.innerWidth < 450 && countToUse == 21) {
      ref = ref.nextElementSibling;
    } else if(window.innerWidth < 450 && countToUse == 50) {
      ref = ref.nextElementSibling.nextElementSibling;
    }

    if (!ref) return;

    if(heightOfProd == 0) {
      heightOfProd = ref.clientHeight;
    }
    

    if (document.querySelector(`li.HOF-7-card[data-ref="${countToUse}"]`)) return;

    // Build
    let html = '';

      html = `
        <li class="HOF-7-card" data-ref="${countToUse}">
          <div class="HOF-7-card--inner" style="height: ${heightOfProd}px">
            <p>FILTER BY BRAND</p>
            <div class="HOF-7-card--center">
              <div class="HOF-7-search-holder">
                <div class="HOF-7-search-element">
                  <input type="text" class="HOF-7-brandsearch" placeholder="Search over 80 brands..." name="HOF-7-brandsearch" />
                  <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                </div>
              </div>
              ${filterDupe(eventNumber)}

            </div>
            <a href="#" class="${ID}-smallLink" id="${ID}-button">Use more filters</a>  
          </div>
        </li>
      `;
    

    // Insert
    ref.insertAdjacentHTML('afterend', html);

    
    

    let currCard = document.querySelector('.HOF-7-card[data-ref="'+countToUse+'"]');

    let allFilterItems = [].slice.call(currCard.querySelectorAll('.FilterListItem'));

    allFilterItems = allFilterItems.sort((a,b) => b.getAttribute('data-productcount') - a.getAttribute('data-productcount'));

    allFilterItems = allFilterItems.slice(0, 6);

    let topBrandFilterHTML = "";

    [].slice.call(allFilterItems).forEach((item) => {

      item.classList.add('top-brand-filter');
      topBrandFilterHTML += item.outerHTML;
    });

    let topBrandHTML = `

      <div class="topbrand-filters">
        <h3> Top Brands </h3>

        ${topBrandFilterHTML}

        <a href="#" class="see-all-brands" id="see-all-brands"> See all brands </a>

      </div>

    `;

    currCard.querySelector('.HOF-7-search-holder').insertAdjacentHTML('afterend', topBrandHTML);

    let allTBFilters = document.querySelectorAll('.top-brand-filter');

    [].slice.call(allTBFilters).forEach((filter) => {
      filter.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const { currentTarget } = e;
        if (currentTarget && currentTarget.getAttribute('data-productname')) {
          const filterName = currentTarget.getAttribute('data-productname');
          if (filterName) {
            //ogFiltersLink.click(); // Open original filters
            const filterToClick = ogFiltersContainer.querySelector(`span[data-filtername="${filterName}"]`);
            filterToClick ? filterToClick.click() : null;
            events.send
            // Scroll to top
            window.scrollTo(0, 0);
          }
        }
      });
    });


  }

  const initProdCards = (method) => {

    const prods = [].slice.call(prodList());

    prods.map((prod, index) => createCard(prod, index));

    addEvents(method);

    let seeAllBrandsButtons = document.querySelectorAll('.see-all-brands');

    [].slice.call(seeAllBrandsButtons).forEach((seeAllBrandsButton) => {
      seeAllBrandsButton.addEventListener('click', (e) => {
        e.preventDefault();
        let topBrands = e.currentTarget.parentElement;
        let tbParent = e.currentTarget.parentElement.parentElement;
        let cardFilterList = tbParent.querySelector('.productFilterList');
        topBrands.remove();
        cardFilterList.classList.add('active');
      });
    })
    

    if(method == "create") {

      

      // Trigger re render on pagniation change
      const wrap = document.querySelector('#ProductContainer ul#navlist');
      observer.connect(wrap, () => {
        if(!document.querySelector('.HOF-7-card')) {
          initProdCards("update");
        }
      }, {
        config: {
          attributes: true,
          childList: true,
          subtree: false,
        }
      })
    }

  }
  
  

  const filterMethods = (filterComponent) => {
    const searchInput = filterComponent.querySelector('.HOF-7-brandsearch');
    let topBrandsList = filterComponent.querySelector('.topbrand-filters');
    let normalBrandsList = filterComponent.querySelector('.productFilterList');
    let brandsList = filterComponent.querySelectorAll('.productFilterList > .FilterListItem');
    // const brandsListLinks = filterComponent.querySelectorAll('.productFilterList > .FilterListItem > a');
    const viewAll = filterComponent.querySelector('button');

    const methods = {
      showAll() { 
        normalBrandsList.classList.add('active');
        [].slice.call(brandsList).map((item) => item.classList.remove(`${ID}-hide`));
      },

      hideItem(item) {
        item.classList.add(`${ID}-hide`);
      },

      search(characterInput) { // Ran each time a keypress occurs
        let inputString = searchInput.value;

        // If cI doesn't match first Char of brand or entire string, hide
        [].slice.call(brandsList).map((item) => {
          if (!item) return;
          const text = item.querySelector('a.FilterAnchor span.SelectableFilter');
          if (text && text.textContent) {
            let textVal = text.textContent.trim();
            
            if (textVal.toLowerCase().indexOf(inputString.toLowerCase()) > -1) {
              item.classList.remove(`${ID}-hide`);
            } else {
              item.classList.add(`${ID}-hide`);
            }
          }
        }); 

      },

      filterClick(filterID) {

      }
    };



    [].slice.call(brandsList).map((link) => {
    
      link.addEventListener('click', (e) => {
        const { currentTarget } = e;
        if (currentTarget && currentTarget.getAttribute('data-productname')) {
          const filterName = currentTarget.getAttribute('data-productname');
          if (filterName) {
            //ogFiltersLink.click(); // Open original filters
            const filterToClick = ogFiltersContainer.querySelector(`span[data-filtername="${filterName}"]`);
            filterToClick ? filterToClick.click() : null;

            // Scroll to top
            window.scrollTo(0, 0);
          }
        }
      });

    })


    searchInput.addEventListener('keyup', (e) => {
      methods.search(e.key);
      if(!topBrandsList.classList.contains('hidden')) {
        topBrandsList.classList.add('hidden');
        normalBrandsList.classList.add('active');
      }
      
    });

  };

  const addEvents = (method) => {


      pollerLite(['.HOF-7-card a', 'h2.FiltersTitle.toggleFilters, .mobFilterContainer'], () => {
        const header = document.querySelector('#HeaderGroup');
        const filters = document.querySelector('#fixed-filters');
        // filterLink = document.querySelector('h2.FiltersTitle.toggleFilters');

        const seeAll = document.querySelectorAll('.HOF-7-card a.HOF-7-smallLink');

        if(method == "update") {
          document.body.removeEventListener('click', bodyEvents);
        }

        bodyEvents = document.body.addEventListener('click', (e) => {
          var btn = e.target;
          if (btn.className.match(/HOF-7-smallLink/)) {
            e.preventDefault();
            e.stopPropagation();
            let showFilterButton = document.querySelector('.showFilterButton');
            showFilterButton.click();
          } 
        });

        

      });

      const cards = document.querySelectorAll('.HOF-7-card');
    
      for (let i = 0; cards.length > i; i += 1) {
        filterMethods(cards[i]);
        scrollWatch.observe(cards[i]);
      }

    
    

  }
  
  initProdCards("create");

  

};
