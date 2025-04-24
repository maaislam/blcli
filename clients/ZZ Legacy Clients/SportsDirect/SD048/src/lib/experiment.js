/**
 * SD048 - Product count to involve filters
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
    events.send('SD048', 'SD048 Control', 'SD048 Control is active');
    return false;
  } else {
    events.send('SD048', 'SD048 Variation 1', 'SD048 Variation is active');
  }


  const checkCookie = () => {
    let run = true;
    const ck = getCookie('SD048NoShow');
    const thisPathname = window.location.pathname;
    if (ck && ck == thisPathname) {
      run = false;
    } else {
      // Clear cookie if there is one and the page has changed
      deleteCookie('SD048NoShow');
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


  let filterLink = document.querySelector('.showFilterButton');
  let mobFilterLink = document.querySelector('#mobSortFilter .mobFilterContainer');

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

    if (document.querySelector(`li.SD048-card[data-ref="${countToUse}"]`)) return;

    // Build
    const html = `
      <li class="SD048-card" data-ref="${countToUse}">
        <div class="SD048-card--inner" style="height: ${heightOfProd}px">
          <div class="SD048-card--center">
            <p>You've viewed</p>
            <div class="SD048-prodcount"><span class="count">${countToUse}</span>/<span class="total">${getTotal()}</span></div>
            <p>products</p>

            <p class="SD048-small">Why not refine your search?</p>

            <button class="SD048-btn addToBag" data-event="${eventNumber ? eventNumber : 1}">FILTER PRODUCTS</button>
          </div>
        </div>
      </li>
    `;

    // Insert
    ref.insertAdjacentHTML('afterend', html);

  }

  const addEvents = () => {
    pollerLite(['.SD048-card button'], () => {

      const buttons = document.querySelectorAll('.SD048-card button');
      for (let i = 0; buttons.length > i; i += 1) {
        buttons[i].addEventListener('click', (e) => {
          
          e.preventDefault();

          if (window.innerWidth > 1024) {
            pollerLite(['.showFilterButton'], () => {
              filterLink = document.querySelector('.showFilterButton');
              setTimeout(() => {
                filterLink.click();
              }, 200);
            }) 
          } else {
            pollerLite(['#mobSortFilter .mobFilterContainer'], () => {
              mobFilterLink = document.querySelector('#mobSortFilter .mobFilterContainer');
              setTimeout(() => {
                mobFilterLink.click();
              }, 200);
            });
          }
          
          const { target } = e;
          const elId = target.getAttribute('data-event');

          events.send(ID, `${ID} Click`, `${ID} Clicked Number ${elId} of 3`);
        });
      }
    });
  }
  let prods = Array.from(prodList());
  if (prods.length < 98) {
    prods = Array.from(prodList());
  }
  
  prods.map((prod, index) => createCard(prod, index));

  

  addEvents();
  // document.addEventListener('DOMContentLoaded', () => {

  // });

  // Remove messages and set cookie
  const removeAndSet = () => {
    const messages = document.querySelectorAll('li.SD048-card');
    if (messages && messages.length) {
      for (let i = 0; messages.length > i; i += 1) {
        messages[i].parentNode.removeChild(messages[i]);
      }
    }

    // Set cookie to not fire again on this URL
    setCookie('SD048NoShow', window.location.pathname, 1);
  }

  // Trigger re render on pagniation change
  const wrap = document.querySelector('#ProductContainer ul#navlist');
  observer.connect(wrap, () => {

    if (!document.querySelector('.SD048-card')) {
      prodList = () => document.querySelectorAll('ul#navlist > li');

      const newProds = Array.from(prodList);
  
      newProds.map((prod, index) => createCard(prod, index));
  
      addEvents();
  
    }
    
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


  const recalcCardHeights = () => {
    let firstProdHeight = document.querySelector('#navlist > li:first-of-type').clientHeight;
    
    let allCards = document.querySelectorAll('.SD048-card--inner');
    for (let i = 0; allCards.length > i; i += 1) {
      allCards[i].setAttribute('style', 'height: '+firstProdHeight+'px;');
    }
  }


  let columnSelectorLinks = document.querySelectorAll('.columnselector > li > a');

  for (let i = 0; columnSelectorLinks.length > i; i += 1) {
    columnSelectorLinks[i].addEventListener('click', (e) => {
      
      setTimeout(function() {
        recalcCardHeights();
      }, 750);
        

      return true;
    });
  }


};
