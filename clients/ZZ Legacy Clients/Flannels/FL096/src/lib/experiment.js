/**
 * FL096 - Product count to involve filters
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { events, pollerLite, observer, setCookie, getCookie, deleteCookie } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();
  
  const { ID, VARIATION } = settings;
  if (VARIATION == 2) {
    events.send('FL096', 'FL096 Control', 'FL096 Control is active');
    return false;
  } else {
    events.send('FL096', 'FL096 Variation 1', 'FL096 Variation is active');
  }


  const checkCookie = () => {
    let run = true;
    const ck = getCookie('FL096NoShow');
    const thisPathname = window.location.pathname;
    if (ck && ck == thisPathname) {
      run = false;
    } else {
      // Clear cookie if there is one and the page has changed
      deleteCookie('FL096NoShow');
      run = true;
    }

    return run;
  };


  if (!checkCookie()) {
    return false;
  }


  const getTotal = () => {
    const el = document.querySelector('span.totalProducts');
    if (!el) {
      return null;
    } else {
      return el.textContent;
    }
  }


  const getPageNumber = () => {
    const el = document.querySelector('span.CurrentPageNumber');
    if (!el) return 1;

    const num = parseFloat(el.textContent);
    if (num) {
      return num;
    }
  }


  const filterLink = document.querySelector('h2.FiltersTitle.toggleFilters');
  const mobFilterLink = document.querySelector('#mobSortFilter .mobFilterContainer');

  let prodList = () => document.querySelectorAll('ul#navlist > li');

  const createCard = (prod, prodCount) => {
    if (!prodCount) return;

    let countToUse = null;
    let eventNumber = null;
    const pageNumber = getPageNumber();
    switch (prodCount) {
      case 21:
        countToUse = pageNumber > 1 ? (pageNumber * 100) + 22 : 22;
        eventNumber = 1;
        break;
      case 51:
        countToUse = pageNumber > 1 ? (pageNumber * 100) + 52 : 52;
        eventNumber = 2;
        break;
      case 99:
        countToUse = pageNumber > 1 ? (pageNumber * 100) + 100 : 100;
        eventNumber = 3;
          break;
      
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

    if (document.querySelector(`li.FL096-card[data-ref="${countToUse}"]`)) return;

    // Build
    const html = `
      <li class="FL096-card" data-ref="${countToUse}">
        <div class="FL096-card--inner" style="min-height: ${heightOfProd - 30}px">
          <div class="FL096-card--center">
            <p>You've viewed</p>
            <span>${countToUse}/${getTotal()}</span>
            <p class="products-text">products</p>

            <p class="FL096-small">Why not refine your search?</p>

            <button class="FL096-btn addToBag" data-event="${eventNumber ? eventNumber : 1}">FILTER PRODUCTS</button>
          </div>
        </div>
      </li>
    `;

    // Insert
    ref.insertAdjacentHTML('afterend', html);

  }

  const addEvents = () => {
    pollerLite(['.FL096-card button', 'h2.FiltersTitle.toggleFilters', '#mobSortFilter', '#HeaderGroup', '#fixed-filters'], () => {
      const header = document.querySelector('#HeaderGroup');
      const filters = document.querySelector('#fixed-filters');
      // Add button events
      const buttons = document.querySelectorAll('.FL096-card button');
      console.log('buttons ', buttons);
      for (let i = 0; buttons.length > i; i += 1) {
        buttons[i].addEventListener('click', (e) => {
          
          e.preventDefault();

          let breadcrumbs = document.querySelector('.BreadcrumbGroupWrapper');
          breadcrumbs.scrollIntoView();

          if (window.innerWidth > 479) {
            // window.scrollBy({ 
            //   top: -200,
            //   left: 0, 
            //   behavior: 'smooth' 
            // });
            header.classList.remove('header-hidden');
            filters.classList.remove('fixed-filters-hidden');
            
            setTimeout(() => {
              filterLink.click();
              console.log('filter link click, ' , filterLink);
            }, 400);
          } else {
            setTimeout(() => {
              mobFilterLink.click();
            }, 400);
          }
          
          const { target } = e;
          const elId = target.getAttribute('data-event');

          events.send(ID, `${ID} Click`, `${ID} Clicked Number ${elId} of 3`);
        });
      }
    });
  }
  

  window.onload = function(){
    let prods = Array.from(prodList());
    if (prods.length < 98) {
      prods = Array.from(prodList());
    }
    
    prods.map((prod, index) => createCard(prod, index));
    
    
    // document.addEventListener('DOMContentLoaded', () => {
      
    // });
    addEvents();

  };

  // Remove messages and set cookie
  const removeAndSet = () => {

    const messages = document.querySelectorAll('li.FL096-card');
    if (messages && messages.length) {
      for (let i = 0; messages.length > i; i += 1) {
        messages[i].parentNode.removeChild(messages[i]);
      }
    }

    // Set cookie to not fire again on this URL
    setCookie('FL096NoShow', window.location.pathname, 1);
  }

  addEvents();
  // Check for active filters and remove
  if (window.location.href.indexOf('&Filter') > -1) { // Filters have been used
    removeAndSet();
  }

  // Trigger re render on pagniation change
  const wrap = document.querySelector('#ProductContainer ul#navlist');
  observer.connect(wrap, () => {
    
    pollerLite([() => {
      let run = false;
      if (document.querySelectorAll('#navlist > li').length == 100 || document.querySelector('.selectedFilters').length <= 0) {
        run = true;
      }
      return run;
    }], () => {
      if (!document.querySelector('.FL096-card')) {
          if(document.querySelector('.selectedFilters').length <= 0) {
            setTimeout(function() {
              //header.scrollIntoView();
              let prodList = document.querySelectorAll('#navlist > li');

              const newProds = [].slice.call(prodList);
              newProds.map((prod, index) => createCard(prod, index));
          
              addEvents();
            }, 1000);
          
          } else {
            removeAndSet();
          }
        }
        
        // Check for active filters and remove
        if (window.location.href.indexOf('&Filter') > -1) { // Filters have been used
          removeAndSet();
        }
    })

    setTimeout(() => {
    
      if (!document.querySelector('.FL096-card')) {
        prodList = () => document.querySelectorAll('ul#navlist > li');
  
        const newProds = Array.from(prodList);
    
        newProds.map((prod, index) => createCard(prod, index));
    
        addEvents();
    
      }
    }, 3000);
    
    // Check for active filters and remove
    if (window.location.href.indexOf('&Filter') > -1 && window.location.href.indexOf('&Filter=none') === -1) { // Filters have been used
      removeAndSet();
    }

  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    }
  })

  if(typeof IntersectionObserver === 'function') {
    var io = new IntersectionObserver(
      entries => {
        if(entries[0].isIntersecting == true) {
          events.send(ID, `${ID} Click`, `${ID} user viewed a filter card`);
          io.disconnect();
        }
      }
    );
    // Start observing an element
    io.observe(document.querySelector('.FL096-card'));
  }


  



};
