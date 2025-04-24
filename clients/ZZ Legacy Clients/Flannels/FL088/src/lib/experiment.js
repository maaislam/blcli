/**
 * FL088 - Search Invasion
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
import { addToLocalStorageObject } from './addObjectToStorage';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;
  let originalSearchInput;
  let originalMobileInput;
  pollerLite(['input[type="search"]'], () => {
    originalSearchInput = document.querySelector('.ToplinksGroup .search #txtSearch');
    originalMobileInput = document.querySelector('input#MobtxtSearch');

    originalSearchInput.addEventListener('click', () => {
      events.send(ID, 'FL088 Click', 'User clicks on search');
    });
    originalMobileInput.addEventListener('click', () => {
      events.send(ID, 'FL088 Click', 'User clicks on search');
    });
  });

  if (VARIATION == 2) {
    events.send(ID, 'FL088 Control', 'FL088 Control is active');
    return false;
  } else {
    events.send(ID, 'FL088 Variation 1', 'FL088 Variation 1 is active');
  }

  /**
   * @desc If productStorage, build up a list of products as HTML
   * @param {Arr} productStorage 
   */
  const buildProducts = (productStorage) => {
    if (!productStorage) return;
    // const flippedProductStorage = productStorage.reverse();
    return `
      <div class="FL088-recentProducts">
        <h2>Recently Viewed Items</h2>
        ${Object.keys(productStorage).reverse().map((prodUrl, index) => `
          ${index < 3 ? `<div class="FL088-product">
            <a href="${prodUrl}"></a>
            ${productStorage[prodUrl].img}
            ${productStorage[prodUrl].brand}
            ${productStorage[prodUrl].price}
          </div>` : ''} 
        `).join(' ')}
      </div>
    `;
  }

  /**
   * @desc Builds up the main container for this test. If no params are provided
   * then it will assume a new user.
   * @param {HTMl} productHTML 
   * @param {Arr} brandArr 
   */
  const buildSearchContainer = (productHTML, brandArr) => {
    const sortedBrandArr = JSON.parse(brandArr);
    const autoList = document.querySelector('ul#ui-id-1');
    
    return `
      <div class="FL088-searchContainer" style="visibility: hidden; opacity: 0;">
        <div class="FL088-wrap">
          <div class="FL088-close"></div>

          <div class="FL088-search">
            <div class="dvSearch col-xs-12" role="search">
              <span class="search-icon"></span>
                   
              <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="search" maxlength="128" class="ShowClearButton ui-autocomplete-input" mp_trans_searchkwd="value" autocomplete="off" placeholder="Search"><span class="TextBoxClear" style="display:none;"></span>
              <a id="cmdSearch" href="#"><span>Search</span></a>
              
              
              
            </div>
          </div>

          ${sortedBrandArr && productHTML ? `
            <div class="FL088-ib">
              ${productHTML}
            </div>
            <div class="FL088-ib">
              <h2>Recently Viewed Brands</h2>

              <ul class="FL088-brandList">
                ${sortedBrandArr.map((brand, index) => {
                  if (document.querySelector(`li[data-brand="${brand.word.replace(/\s/ig, '-').toLowerCase()}"]`)) return;
                  if (index > 7) return;
                  return `<li data-brand="${brand.word.replace(/\s/ig, '-').toLowerCase()}"><a href="https://www.flannels.com/${brand.word.replace(/\s/ig, '-').toLowerCase()}">${brand.word}</a></li>`;
                }).join(' ')}
              </ul>
            </div>
          ` : `
            <h2>Popular Searches</h2>

            <ul class="FL088-noStorage">
              <li><a href="https://www.flannels.com/men/clothing">Men's Clothing</a></li>
              <li><a href="https://www.flannels.com/mensclearancehome">Men's Outlet</a></li>
              <li><a href="https://www.flannels.com/women/clothing">Women's Clothing</a></li>
              <li><a href="https://www.flannels.com/men/shoes/trainers">Men's trainers</a></li>
              <li><a href="https://www.flannels.com/men/clothing/t-shirts">Men's t-shirts</a></li>
              <li><a href="https://www.flannels.com/women/shoes">Women's shoes</a></li>
            </ul>
          `}
        </div>
      </div>
    `;
  }

  let newUser = true;
  /**
   * @desc Checks the Local storage for storedProducts
   */
  const checkStorage = () => {
    const storedProducts = JSON.parse(window.localStorage.getItem('storedProducts'));

    if (storedProducts) {
      newUser = false;
      return buildProducts(storedProducts);
    } else {
      return null;
    }
  };
  
  // Run check storage first
  const productHTML = checkStorage();
  let html = '';
  let ref = document.querySelector('header');

  
  // Old users = Recently viewed products
  if (productHTML) {
    const brandList = window.localStorage.getItem('Sortedbrand');

    if (!document.querySelector('.FL088-searchContainer')) {
      html = buildSearchContainer(productHTML, brandList);
    }
    
  } else { // No stored products
    if (!document.querySelector('.FL088-searchContainer')) {
      html = buildSearchContainer(null, null);
    }
  }
  
  pollerLite(['.FL088-searchContainer input[type="search"]'], () => {
    // Add events
    const bodyWrap = document.querySelector('.BodyWrap');
    const addedContainer = document.querySelector('.FL088-searchContainer');
    const addedSearchInput = document.querySelector('.FL088-searchContainer input[type="search"]');
    const addedSubmit = document.querySelector('.FL088-searchContainer .search-icon');
    const pageForm = document.querySelector('form#Form');
    const closeButton = document.querySelector('.FL088-close');

    addedSearchInput.addEventListener('keyup', (e) => {
      originalSearchInput.value = e.target.value; 

      if (event.key === "Enter") {
        window.location.href = `https://www.flannels.com/SearchResults?DescriptionFilter=${encodeURI(originalSearchInput.value)}`;
      }
    });

    if (bodyWrap) {
      bodyWrap.addEventListener('click', (e) => {
        if (originalSearchInput.contains(e.target)) return;
        if (!addedContainer.contains(e.target)) {
          if (document.querySelector('.FL088-searchContainer.FL088-active')) {
            addedContainer.classList.remove('FL088-active');
            document.body.classList.remove('FL088-noScroll');
          }
        }
      });
    }

    // Open new search container
    originalSearchInput.addEventListener('click', () => {
      if (document.querySelector('.FL088-searchContainer.FL088-active')) return;
      addedContainer.classList.toggle('FL088-active');
      document.body.classList.add('FL088-noScroll');
      setTimeout(() => {
        addedSearchInput.focus();
      }, 500);

      events.send(ID, 'FL088 Seen', 'FL088 User sees variation');
    }); 
    originalMobileInput.addEventListener('click', () => {
      if (document.querySelector('.FL088-searchContainer.FL088-active')) return;
      addedContainer.classList.add('FL088-active');
      document.body.classList.add('FL088-noScroll');
      setTimeout(() => {
        addedSearchInput.focus();
      }, 500);
      events.send(ID, 'FL088 Seen', 'FL088 User sees variation');
    }); 


    // Copy search term into new box
    originalSearchInput.addEventListener('keyup', (e) => {
      addedSearchInput.value = e.target.value;
    });


    // Close
    closeButton.addEventListener('click', () => {
      addedContainer.classList.remove('FL088-active');
      document.body.classList.remove('FL088-noScroll');
    });


    // Outside click
    if (addedContainer) {
      const wrap = addedContainer.querySelectorAll('.FL088-wrap');
      addedContainer.addEventListener('click', (e) => {
        for (let i = 0; wrap.length > i; i += 1) {
          if (!wrap[i].contains(e.target)) {
            if (document.querySelector('.FL088-searchContainer.FL088-active')) {
              addedContainer.classList.remove('FL088-active');
              document.body.classList.remove('FL088-noScroll');
            }
          }
        }
      });
    }

    

  });


  // Add it
  if (ref && html) {
    ref.insertAdjacentHTML('beforeend', html);

    // Events
    const products = document.querySelectorAll('.FL088-searchContainer .FL088-product');
    if (products.length) {
      for (let i = 0; products.length > i; i += 1) {
        products[i].addEventListener('click', () => {
          events.send(ID, 'FL088 Click', 'FL088 Recently viewed items click');
        });
      }
    }

    const brands = document.querySelectorAll('.FL088-searchContainer .FL088-brandList');
    if (brands.length) {
      for (let i = 0; brands.length > i; i += 1) {
        brands[i].addEventListener('click', () => {
          events.send(ID, 'FL088 Click', 'FL088 Recently viewed brand click');
        });
      }
    }
  }
  

  const triggerIt = () => {
    const searches = document.querySelectorAll('.dvSearch');
    // if (searches.le)
  };

  /**
   * @desc Stores the current PDP product in LS.
   */
  const storeProduct = () => {
    pollerLite([
      '#productImages #productImageContainer .productImage img',
      '#productDetails .title > h1',
      '.pdpPrice',
    ], () => {
      const { pageCategory } = window.dataLayer[1];
      if (pageCategory && pageCategory == 'ProductDetail') {
        // Store this product
        const obj = {
          url: window.location.href, // We'll use this as the ID
          img: document.querySelector('#productImages #productImageContainer .productImage img').outerHTML,
          brand: document.querySelector('#productDetails .title > h1').outerHTML,
          price: document.querySelector('.pdpPrice').outerHTML,
        };
        
        const stringObj = JSON.stringify(obj);
        addToLocalStorageObject('storedProducts', obj.url, obj);
      }
    });
  };

  storeProduct(); // Run on every page load to store product
};
