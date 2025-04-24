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
  if (VARIATION == 3) {
    events.send('FL097', 'FL097 Control', 'FL097 Control is active');
    return false;
  } else {
    events.send('FL097', `FL097 Variation ${VARIATION}`, 'FL097 Variation is active');
  }


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

    if (VARIATION == 2) { // Add title above list / below input
      
      const list = filterDupe.querySelector('.brandSearchSort');
      
      list ? list.insertAdjacentHTML('afterend', `<h4 class="${ID}-topBrands">Top Brands</h4>`) : null;

      // Swap list with top 6 only
      const listItems = filterDupe.querySelectorAll('.FilterListItem');
      Array.from(listItems).map((item) => item ? item.classList.add(`${ID}-hide`) : null);

      // Add top 6
      const html = config(window.location.pathname);
      const ref = filterDupe.querySelector(`h4.${ID}-topBrands`);
      
      ref ? ref.insertAdjacentHTML('afterend', html) : null;

    }


    // Change placeholder 
    const filterInput = filterDupe.querySelector('input[type="text"]');
    filterInput ? filterInput.setAttribute('placeholder', 'Search over 80 brands...') : null;

    return filterDupe.outerHTML;
  };


  const checkCookie = () => {
    let run = true;
    const ck = getCookie('FL097NoShow');
    const thisPathname = window.location.pathname;
    if (ck && ck == thisPathname) {
      run = false;
    } else {
      // Clear cookie if there is one and the page has changed
      deleteCookie('FL097NoShow');
      run = true;
    }

    return run;
  };


  if (!checkCookie()) {
    return false;
  }


  let scrollWatch = new window.IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        events.send('FL097', 'FL097 User Saw', 'FL097 User saw filter card');
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
      // case 98:
      //   countToUse = pageNumber > 1 ? (pageNumber * 100) + 99 : 99;
      //   eventNumber = 3;
      //     break;
      
      default:
        countToUse = null; 
        break;
    }


    if (!countToUse) return;
    let ref = prod;
    if (window.innerWidth < 479) {
      // ref = ref.nextElementSibling;
    }

    if (!ref) return;

    const heightOfProd = ref.clientHeight;

    if (document.querySelector(`li.FL097-card[data-ref="${countToUse}"]`)) return;

    // Build
    const html = `
      <li class="FL097-card" data-ref="${countToUse}">
        <div class="FL097-card--inner" style="min-height: ${heightOfProd - 30}px">
          <p>FILTER BY BRAND</p>
          <div class="FL097-card--center">
            ${filterDupe()}

            </div> 
          ${VARIATION == 2 ? `<a href="#" class="${ID}-bigLink" id="${ID}-seeAll">See All Brands</a>` : ''}
          <a href="#" class="${ID}-smallLink" id="${ID}-button">Use more filters</a>  
        </div>
      </li>
    `;

    // Insert
    ref.insertAdjacentHTML('afterend', html);

  }

  
  const prods = Array.from(prodList());

  prods.map((prod, index) => createCard(prod, index));

  let ogFiltersLink = document.querySelector('h2.FiltersTitle.toggleFilters');
  let ogFiltersContainer = document.querySelector('#ToggleFiltersContainer ul#filterlist');

  if (window.innerWidth < 1021) {
    ogFiltersLink = document.querySelector('.mobFilterContainer');
  }

  const filterMethods = (filterComponent) => {
    
    const searchInput = filterComponent.querySelector('.brandSearchSort input[type="text"]');
    const brandsList = filterComponent.querySelectorAll('.productFilterList > .FilterListItem');
    // const brandsListLinks = filterComponent.querySelectorAll('.productFilterList > .FilterListItem > a');
    const viewAll = filterComponent.querySelector('button');

    const methods = {
      showAll() { 
        Array.from(brandsList).map((item) => item.classList.remove(`${ID}-hide`));
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
        Array.from(brandsList).map((item) => {
          if (!item) return;
          const text = item.querySelector('a.FilterAnchor span.SelectableFilter');
          if (text && text.textContent) {
            let textVal = text.textContent.trim();
            
            if (textVal.charAt(0).toLowerCase() == characterInput.toLowerCase() || textVal.toLowerCase().indexOf(inputString.toLowerCase()) > -1) {
              item.classList.remove(`${ID}-hide`);
            } else {
              item.classList.add(`${ID}-hide`);
            }
          }
        }); 

      },

      filterClick(filterID) {

      }
    }


    Array.from(brandsList).map((link) => {
      link ? link.addEventListener('click', (e) => {
        const { currentTarget } = e;
        
        if (currentTarget && currentTarget.getAttribute('data-productname')) {
          const filterName = currentTarget.getAttribute('data-productname');
          // console.log('click', filterName);
          if (filterName) {
            ogFiltersLink.click(); // Open original filters
            const filterToClick = ogFiltersContainer.querySelector(`span[data-filtername="${filterName}"]`);
            // console.log(filterToClick);
            filterToClick ? filterToClick.click() : null;

            // Set cookie
            setCookie('FL097NoShow', window.location.pathname, '1');


            // Scroll to top
            window.scrollTo(0, 0);
          }
        }
      }) : null
    })


    searchInput ? searchInput.addEventListener('keyup', (e) => {
      methods.search(e.key);
      if (searchInput.value.length == 0) {
        methods.showAll();
      }
    }) : null;
  };

  const addEvents = () => {
    pollerLite(['.FL097-card a', 'h2.FiltersTitle.toggleFilters'], () => {
      const header = document.querySelector('#HeaderGroup');
      const filters = document.querySelector('#fixed-filters');
      // filterLink = document.querySelector('h2.FiltersTitle.toggleFilters');

      const seeAll = document.querySelectorAll('.FL097-card a.FL097-smallLink');
      for (let i = 0; seeAll.length > i; i += 1) {
        seeAll[i].addEventListener('click', (e) => {
          e.preventDefault();
          header.classList.remove('header-hidden');
          filters.classList.remove('fixed-filters-hidden');
          setTimeout(() => {
            ogFiltersLink.click();
          }, 1000);
        });
      };

      if (VARIATION == 2) {
        const toggleList = document.querySelectorAll('.FL097-card a.FL097-bigLink');
        if (toggleList) {
            for (let i = 0; toggleList.length > i; i+= 1) {
              toggleList[i].addEventListener('click', (e) => {
                e.preventDefault();
                const par = toggleList[i].parentElement;
                par ? par.classList.add('FL097-swap') : null;
              });
            }
        }
      }

    });
    const cards = document.querySelectorAll('.FL097-card');
    
    for (let i = 0; cards.length > i; i += 1) {
      filterMethods(cards[i]);
      scrollWatch.observe(cards[i]);
    }

  }

  addEvents();

  
  // Remove messages and set cookie
  const removeAndSet = () => {
    const messages = document.querySelectorAll('li.FL097-card');
    if (messages && messages.length) {
      for (let i = 0; messages.length > i; i += 1) {
        messages[i].parentNode.removeChild(messages[i]);
      }
    }

    // Set cookie to not fire again on this URL
    setCookie('FL097NoShow', window.location.pathname, 1);
  }

  // Trigger re render on pagniation change
  const wrap = document.querySelector('#ProductContainer ul#navlist');
  observer.connect(wrap, () => {
    prodList = () => document.querySelectorAll('ul#navlist > li');

    const newProds = Array.from(prodList());

    newProds.map((prod, index) => createCard(prod, index));

    addEvents();


    // Check for active filters and remove
    if (window.location.href.indexOf('&Filter') > -1) { // Filters have been used
      removeAndSet(); 
    }

  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    }
  })

};
