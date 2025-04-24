/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { events, pollerLite, observer, setCookie, getCookie, deleteCookie } from '../../../../../lib/utils';
import { config } from './config';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();
  
  const { ID, VARIATION } = settings;

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

          if (text && text == 'Brand') {
            const elToReturn = el.querySelector('.productFilterList');
            if (elToReturn) {
              return elToReturn;
            }
          }
        }
      }
    }
  }

  const filterDupe = () => {
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

    const listInner = filterDupe.querySelector('.brandSearchSort > div');
      
    list ? list.insertAdjacentHTML('afterend', `<h4 class="${ID}-topBrands">Top Brands</h4>`) : null;

    listInner ? listInner.insertAdjacentHTML('afterbegin', `<button class="FLAN-14-clear-input">X</button>`) : null;

      // Swap list with top 6 only
      const listItems = filterDupe.querySelectorAll('.FilterListItem');
      [].slice.call(listItems).map((item) => item ? item.classList.add(`${ID}-hide`) : null);

      // Add top 6
      const html = config(window.location.pathname);
      const ref = filterDupe.querySelector(`h4.${ID}-topBrands`);
      if(html != "none") {
        ref ? ref.insertAdjacentHTML('afterend', html) : null;
      } else {
        pollerLite(['.FLAN-14-card--inner'], () => {
          let currCards = document.querySelectorAll('.FLAN-14-card--inner');
          [].slice.call(currCards).forEach(function(card) {
            card.classList.add('FLAN-14-swap');
          });
        });
      }
      

    // Change placeholder 
    const filterInput = filterDupe.querySelector('input[type="text"]');
    filterInput ? filterInput.setAttribute('placeholder', 'Search over 80 brands...') : null;

    return filterDupe.outerHTML;
  };

  let scrollWatch = new window.IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        events.send('FLAN-14', 'FLAN-14 User Saw', 'FLAN-14 User saw filter card');
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
  let ogFiltersContainer = document.querySelector('#ToggleFiltersContainer ul#filterlist');

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

    const heightOfProd = ref.clientHeight;

    if (document.querySelector(`li.FLAN-14-card[data-ref="${countToUse}"]`)) return;

    // Build
    let html = '';

      html = `
        <li class="FLAN-14-card" data-ref="${countToUse}">
          <div class="FLAN-14-card--inner" style="min-height: ${heightOfProd - 30}px">
            <p>FILTER BY BRAND</p>
            <div class="FLAN-14-card--center">
              ${filterDupe()}

              </div> 
            <a href="#" class="${ID}-bigLink" id="${ID}-seeAll">See All Brands</a>
            <a href="#" class="${ID}-smallLink" id="${ID}-button">Use more filters</a>  
          </div>
        </li>
      `;
    

    // Insert
    ref.insertAdjacentHTML('afterend', html);

  }

  const initProdCards = (method) => {

    const prods = [].slice.call(prodList());

    prods.map((prod, index) => createCard(prod, index));

    addEvents(method);

    if(method == "create") {

      

      // Trigger re render on pagniation change
      const wrap = document.querySelector('#ProductContainer ul#navlist');
      observer.connect(wrap, () => {
        if(!document.querySelector('.FLAN-14-card')) {
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

    let cardInner = filterComponent.querySelector('.FLAN-14-card--inner');
    const searchInput = filterComponent.querySelector('.brandSearchSort input[type="text"]');
    let brandsList = filterComponent.querySelectorAll('.productFilterList > .FilterListItem');
    let clearInput = filterComponent.querySelector('.FLAN-14-clear-input');
    // const brandsListLinks = filterComponent.querySelectorAll('.productFilterList > .FilterListItem > a');
    const viewAll = filterComponent.querySelector('button');

    const methods = {
      showAll() { 
        [].slice.call(brandsList).map((item) => item.classList.remove(`${ID}-hide`));
      },

      hideItem(item) {
        item.classList.add(`${ID}-hide`);
      },

      search(characterInput) { // Ran each time a keypress occurs
        let inputString = searchInput.value;

        if (!characterInput) {
          showAll();
          return;
        }

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


    searchInput ? searchInput.addEventListener('keyup', (e) => {
      if(!clearInput.classList.contains('active')) {
        clearInput.classList.add('active');
        cardInner.classList.add('FLAN-14-noTopBrands');
      }
      methods.search(e.key);
      if (searchInput.value.length == 0) {
        methods.showAll();
        clearInput.classList.remove('active');
      }
    }) : null;

    clearInput.addEventListener('click', () => {
      cardInner.classList.remove('FLAN-14-noTopBrands');
      clearInput.classList.remove('active');
      searchInput.value = "";
      methods.showAll();
    })
  };

  const addEvents = (method) => {



    pollerLite(['.FLAN-14-card a', 'h2.FiltersTitle.toggleFilters, .mobFilterContainer', '.FLAN-14-bigLink', '.FLAN-14-smallLink'], () => {
      const header = document.querySelector('#HeaderGroup');
      const filters = document.querySelector('#fixed-filters');
      const seeAll = document.querySelectorAll('.FLAN-14-card a.FLAN-14-smallLink');

      let bigLinks = document.querySelectorAll('.FLAN-14-bigLink');
      
      [].slice.call(bigLinks).forEach((bigLink) => {
        bigLink.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const toggleList = e.target;
          const par = toggleList.parentElement;
          par ? par.classList.add('FLAN-14-noTopBrands') : null;
          let filterItems = par.querySelectorAll('.FilterListItem');
          [].slice.call(filterItems).forEach((item) => {
            item.classList.remove('FLAN-14-hide');
          });
        });
      });

      let smallLinks = document.querySelectorAll('.FLAN-14-smallLink');

      [].slice.call(smallLinks).forEach((smallLink) => {
        smallLink.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          header.classList.remove('header-hidden');
          filters.classList.remove('fixed-filters-hidden');
          if (window.innerWidth < 1021) {
            document.querySelector('.mobFilterContainer').click();
          } else {
            document.querySelector('h2.FiltersTitle.toggleFilters').click();
          }
        });
      });

      

    });


    

    
    const cards = document.querySelectorAll('.FLAN-14-card');
    
    for (let i = 0; cards.length > i; i += 1) {
      filterMethods(cards[i]);
      scrollWatch.observe(cards[i]);
    }

  }
  
  initProdCards("create");

  

};
