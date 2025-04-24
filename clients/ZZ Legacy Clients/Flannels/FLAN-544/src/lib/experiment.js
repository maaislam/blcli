/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events,logMessage, pollerLite } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
let searchSelector = '';
let sliderInitialised = false;

let initialData = {
  recentSearches: [],
  recentlyViewedProducts: [],
  lastModified: new Date(),
  productsViewed: [],
  productsClicked: [],
};

let searchInput, searchSubmit;

const initiateSlider = () => {
  // Run slick
  let slider = document.querySelector(`.${ID}-search-modal--productinner`);
  slider.classList.add('swiper-active');

  new Swiper(slider, {
    // Optional parameters
    init: true,
    loop: false,
    // If we need pagination
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 20,
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    // Responsive breakpoints
    breakpoints: {
      2000: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
      },
      1400: {
        slidesPerView: 3.5,
        slidesPerGroup: 3,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3.5,
        slidesPerGroup: 3,
        spaceBetween: 20,
      },
      550: {
        slidesPerView: 3.5,
        slidesPerGroup: 3,
        spaceBetween: 20,
      },
      450: {
        slidesPerView: 2.5,
        slidesPerGroup: 2,
        spaceBetween: 20,
      },
      200: {
        slidesPerView: 1.5,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
    },
    pagination: {
        el: `.${ID}-carousel-pagination`,
        type: 'bullets',
        clickable: true,
    }
  
  })

}

const storeSearchSubmission = (searchTerm) => {
  
  logMessage('SearchTerm stored: '+searchTerm);

  if(searchTerm.length > 2) {
    if(localStorage.getItem(`${ID}-search-data`)) {
      let currData = JSON.parse(localStorage.getItem(`${ID}-search-data`));
      let currSearchTerms = currData.recentSearches;

      if(!Object.values(currSearchTerms).includes(searchTerm)) {
        currSearchTerms.unshift(searchTerm);
        if(currSearchTerms.length > 5) {
          currSearchTerms.pop();
        }
        currData.recentSearches = currSearchTerms;
        localStorage.setItem(`${ID}-search-data`, JSON.stringify(currData));
      } else { 
        logMessage("Not stored, duplicate value");
      }

      
    } else {
      
      initialData.recentSearches = [searchTerm];
      localStorage.setItem(`${ID}-search-data`, JSON.stringify(initialData));
    }
  }
}

const insertRecs = (products) => {
  let productHTML = `
    
        <div class="${ID}-search-modal--productholder">
          <div class="${ID}-search-modal--productinner swiper-container">
            <div class="swiper-wrapper">
              ${products.map((product) => {
                  return `

                    <a href="${product.href}" class="${ID}-search-modal--product swiper-slide">
                      <img src="${product.image}" alt="${product.name} image" />
                      <p class="${ID}-search-modal--productbrand">${product.brand.toLowerCase()}</p>
                      <p class="${ID}-search-modal--productname">${product.name.toLowerCase()}</p>
                      ${VARIATION == 2 ? `<div class="${ID}-search-modal--productprice ${product.price == product.wasPrice ? 'identical-prices' : 'sale-prices'}"><div class="now-price">${product.price}</div><div class="was-price">${product.wasPrice}</div></div>` : ''}
                    </a>
                  
                  `;

              }).join('')}
            </div>
            
          </div>
          <div class="${ID}-carousel-pagination"></div>
        </div>
      
      `;

      document.querySelector(`.${ID}-search-modal--products`).insertAdjacentHTML('beforeend', productHTML)

      let allProductRecs = document.querySelectorAll(`.${ID}-search-modal--productinner a`);
      [].slice.call(allProductRecs).forEach((rec) => {
        rec.addEventListener('click', (e) => {
          fireEvent(`Click - user has clicked on one of the ${e.currentTarget.closest(`.${ID}-search-modal--products`).querySelector('h2 span').innerText} recommendations taking them to ${e.currentTarget.href}`);
        });
      })

}

const setViewport = (type) => {

  if(type == "focus") {
    document.querySelector(`.${ID}-search-modal`).classList.add(`${ID}-keyboard-open`);
  } else {
    document.querySelector(`.${ID}-search-modal`).classList.remove(`${ID}-keyboard-open`);
  }

  setTimeout(() => {
    let searchElementHeight = window.visualViewport.height - 160;
    document.querySelector(`.${ID}-search-modal`).style.height = searchElementHeight + "px";
  }, 1000);
}

const populateSearchBox = () => {

  let recentLinksHeader = 'Recently Searched';
  let recentProductsHeader = 'Recently Viewed';

  let linksList = ``;

  let recentSearches = JSON.parse(localStorage.getItem(`${ID}-search-data`)).recentSearches;
  recentSearches = recentSearches.slice(0, 5);

  linksList = `
  
    <ul class="${ID}-search-links" data-linktype="recent">
      ${recentSearches.map((searches) => {
        let searchesProcessed = searches.toLowerCase();
        searchesProcessed = encodeURI(searchesProcessed.trim() );
        return `<li><a class="${ID}-recent-search-link" data-search="${searches}" href="/searchresults?descriptionfilter=${searchesProcessed}">${searches}</a></li>`;        
      }).join('')}
    </ul>
    

  `;
  // Setting up the products section
  let currSearchData = JSON.parse(localStorage.getItem(`${ID}-search-data`));

  let searchSectionHTML = `
  
    <div class="${ID}-search-modal">
      <div class="${ID}-search-modal--inner">
        <button id="${ID}-search-modal--exit" class="${ID}-search-modal--exit"> CLOSE </button>
        <div class="${ID}-search-modal--section mainsection">
          <div class="${ID}-search-modal--textlinks">
            <h2 class="${ID}-linkslist-heading"> ${recentLinksHeader} </h2>
            <h2 class="${ID}-suggested-heading"> Suggested Searches </h2>
            ${linksList}

            
          </div>
          <div class="${ID}-search-modal--products">
            <h2> <span>${recentProductsHeader}</span> </h2>



          </div>
        </div>
        
      </div>
      
    </div>
  
  
  `;

  // Insert Search Modal
  let insertionPoint = document.getElementById('txtSearch');
  insertionPoint.insertAdjacentHTML('afterend', searchSectionHTML);

  // Insert Recommendations from cache/DY

  let insertedRecs = currSearchData.productsViewed.reverse().slice(0, 5);
  insertRecs(insertedRecs);
  let prodInner = document.querySelector(`.${ID}-search-modal--productinner`);
  prodInner.closest(`.${ID}-search-modal--products`).querySelector('h2 span').innerText = recentProductsHeader;


  // Set up events/actions

  let searchModal = document.querySelector(`.${ID}-search-modal`);
  let headerOuter = document.getElementById('HeaderGroup');
  let exitButton = document.getElementById(`${ID}-search-modal--exit`);
  let clearRecentProdsButton = document.getElementById(`${ID}-clear-prods`);

  document.documentElement.classList.add(`${ID}-search-takeover-active`);
  

  searchInput = document.getElementById('txtSearch');
  searchSubmit = document.getElementById('cmdSearch');

  searchSelector = '#txtSearch';

  exitButton.addEventListener('click', () => {
    document.documentElement.classList.remove(`${ID}-noscroll`);
    searchModal.classList.remove(`${ID}-active`);
    headerOuter.classList.remove(`${ID}-active`);
    fireEvent('Click - user clicks the close X to close the modal');
  });

  document.documentElement.addEventListener('click', (e) => {

    if(e.target.closest(searchSelector)) {
      document.documentElement.classList.add(`${ID}-noscroll`);
      searchModal.classList.add(`${ID}-active`);
      headerOuter.classList.add(`${ID}-active`);

      if(sliderInitialised == false) {
        initiateSlider();
        sliderInitialised = true;
      }

      fireEvent(`Click - user clicks on search input to open the modal`);

    } else if((e.target.classList.contains(`${ID}-noscroll`) || e.target.closest('#HeaderGroup') && !e.target.closest(`.${ID}-search-modal`))) {
      document.documentElement.classList.remove(`${ID}-noscroll`);
      searchModal.classList.remove(`${ID}-active`);
      headerOuter.classList.remove(`${ID}-active`);

      fireEvent('Click - user clicks outside the modal to close it');

    } 
  });

  let allRecentSearches = document.querySelectorAll(`.${ID}-search-links li a`);
  [].slice.call(allRecentSearches).forEach((searchLink) => {
    searchLink.addEventListener('click', (e) => {
      fireEvent(`Click - user clicked on the ${e.target.closest('ul').getAttribute('data-linktype')} search link with href: ${e.target.href}`);
    });
  });

  if(clearRecentProdsButton !== null) {
    clearRecentProdsButton.addEventListener('click', (e) => {

      e.currentTarget.remove();
  
      let currStorage = JSON.parse(localStorage.getItem(`${ID}-search-data`));
      currStorage.productsViewed = [];
      currStorage.recentlyViewedProducts = [];
      currStorage.recentSearches = [];
      localStorage.setItem(`${ID}-search-data`, JSON.stringify(currStorage));
  
      window.location.reload();

      fireEvent(`Click - user has clicked on clear all to clear the recent products`)
  
    })
  }
  

  if(window.outerWidth < 767) {

    searchInput.addEventListener('focus', () => {
      setViewport("focus");
    })

    searchInput.addEventListener('blur', () => {
      setViewport("blur");
    })

  }

  pollerLite(['#ui-id-1'], () => {

    let autocomplete = document.getElementById('ui-id-1');

    let currSearchLinks = document.querySelector(`.${ID}-search-links`);
    autocomplete.classList.add(`${ID}-autocomplete`);
    currSearchLinks.after(autocomplete);

  });

  if(document.body.classList.contains('ProdDetails')) {

    let products = JSON.parse(localStorage.getItem(`${ID}-search-data`)).productsClicked;
    let prodViewed = false;
    let currViewedProductType = "";
    [].slice.call(products).forEach((product) => {
      if(product.href == window.location.href) {
        prodViewed = true;
        currViewedProductType = product.type;
      }
    })

    if(prodViewed == true) {
      fireEvent(`Interaction - user has viewed PDP after clicking a product from the search box`);
      let atbButton = document.querySelector('#aAddToBag');
      atbButton.addEventListener('click', (e) => {
        fireEvent(`Click - user has clicked on ATB button for product: ${e.currentTarget.closest('#productDetails').querySelector('#lblProductName').innerText} which was from the: ${currViewedProductType} carousel after clicking a product from the search box`);
      })
    }

  }
  


}

const startExperiment = () => {

  // Data Gathering



    if(document.body.classList.contains('ProdDetails')) {
      let storage = JSON.parse(localStorage.getItem(`${ID}-search-data`));
      if(storage) {
        let productsViewed = storage.productsViewed;

        let alreadyAdded = false;
        [].slice.call(productsViewed).forEach((product) => {
          if(product.href == window.location.href) {
            alreadyAdded = true;
          }
        })
  
        pollerLite(['#imgProduct_1', '#lblSellingPrice'], () => {
          if(alreadyAdded == false) {
            productsViewed.push(
              {
                href: window.location.href,
                image: document.getElementById('imgProduct_1').getAttribute('data-src') ? document.getElementById('imgProduct_1').getAttribute('data-src') : document.getElementById('imgProduct_1').getAttribute('src'),
                name: document.getElementById('lblProductName').innerText.trim(),
                price: document.getElementById('lblSellingPrice').innerText.trim(), 
                wasPrice: document.getElementById('lblTicketPrice').innerText.trim(),
                brand: document.getElementById('lblProductBrand').innerText.trim(),
              }
            );
          }
          
          storage.productsViewed = productsViewed;
          localStorage.setItem(`${ID}-search-data`, JSON.stringify(storage));
        });
      } else {
        
        
        localStorage.setItem(`${ID}-search-data`, JSON.stringify(initialData));
        let storage = JSON.parse(localStorage.getItem(`${ID}-search-data`));
        let productsViewed = storage.productsViewed;
        pollerLite(['#imgProduct_1.swiper-lazy-loaded', '#lblSellingPrice'], () => {

          productsViewed.push(
            {
              href: window.location.href,
              image: document.getElementById('imgProduct_1').getAttribute('src'),
              name: document.getElementById('lblProductName').innerText,
              price: document.getElementById('lblSellingPrice').innerText, 
              wasPrice: document.getElementById('lblTicketPrice').innerText,
            }
          );

          
          storage.productsViewed = productsViewed;
          localStorage.setItem(`${ID}-search-data`, JSON.stringify(storage));
        });


      
      }
      

      
    }



    searchInput = document.getElementById('txtSearch');
    searchSubmit = document.getElementById('cmdSearch');
    
    // to deal with search queries where the search icon is clicked
    searchSubmit.addEventListener('click', () => {
      storeSearchSubmission(searchInput.value);
    }, false);

    // to deal with queries where the user clicks on one of the auto-complete suggestions
    document.body.addEventListener('click', (e) => {
      var btn = e.target;
      if (btn.className.match(/ui-corner-all/)) {
        let autocompleteEle = e.target.innerHTML;
        let strippedText = autocompleteEle.replace(/(<([^>]+)>)/gi, "");
        storeSearchSubmission(strippedText);
        return true;
      } 
    });

    // to deal with search queries where the enter button is pressed during submission
    searchInput.addEventListener('keyup', (e) => {
      if(e.key == "Enter") {
        storeSearchSubmission(searchInput.value);
      } 

      if(document.documentElement.classList.contains(`${ID}-search-takeover-active`)) {
        
        let textLinksHolder = document.querySelector(`.${ID}-search-modal--textlinks`);
        if(searchInput.value.length > 1) {
          textLinksHolder.classList.add('suggestions-active');
        } else {
          textLinksHolder.classList.remove('suggestions-active');
        }
      }
      

    });

    logMessage("PV LENGTH: "+JSON.parse(localStorage.getItem(`${ID}-search-data`)).productsViewed.length);
    logMessage("RS LENGTH: "+JSON.parse(localStorage.getItem(`${ID}-search-data`)).recentSearches.length);
    let storage = JSON.parse(localStorage.getItem(`${ID}-search-data`));
    if(storage.productsViewed.length > 5 && storage.recentSearches.length >= 5) {
      populateSearchBox();
    }
    


  


}

const addEvents = () => {

  let thisSearchSelector = '#txtSearch';

  if(VARIATION == "control") {
    document.documentElement.addEventListener('click', (e) => {

      if(e.target.closest(thisSearchSelector)) {
  
        fireEvent(`Click - user clicks on search input to open the modal`);
  
      } 
    });
  }
  

  if(window.location.href.indexOf('searchresults') > -1) {
    localStorage.setItem(`${ID}-search-used`, true);
  }

  if(document.body.classList.contains('ProdDetails') && localStorage.getItem(`${ID}-search-used`) == 'true') {
    fireEvent(`Interaction - user has viewed PDP after using search`);
    localStorage.setItem(`${ID}-search-used`, false);
    let atbButton = document.querySelector('#aAddToBag');
    atbButton.addEventListener('click', (e) => {
      fireEvent(`Click - user has clicked on ATB button for product after using search: ${e.currentTarget.closest('#productDetails').querySelector('#lblProductName').innerText}`);
    })
    
  }

}

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  addEvents(); 

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  startExperiment();
};
