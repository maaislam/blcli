/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events,logMessage, setCookie, getCookie, observer, pollerLite } from '../../../../../lib/utils';
 import debounce from 'lodash/debounce';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
let userType = '';
let searchSelector = '';
let sliderInitialised = false;

const mostPopularStrategy = 137214;
const recentlyViewedStrategy = 137213;

let linksType = "trending";
let productsType = "trending";

let initialData = {
  recentSearches: [],
  recentlyViewedProducts: [],
  mostPopularProducts: [],
  lastModified: new Date(),
  productsViewed: [],
};

let mySwiper, contentHolder;

const initiateSlider = () => {
  // Run slick
  let slider = document.querySelector(`.${ID}-search-modal--productinner`);
  slider.classList.add('swiper-active');

  mySwiper = new Swiper(slider, {
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
      1100: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
      },
      850: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
      },
      767: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
      },
      550: {
        slidesPerView: 2.5,
        slidesPerGroup: 2,
        spaceBetween: 20,
      },
      350: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
      }, 
      150: {
        slidesPerView: 1,
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






let trendingLinksList = `
    
      <ul class="${ID}-search-links" data-linktype="trending">
        <li><a href="/men/clothing/jeans">Mens Jeans</a></li>
        <li><a href="/women/clothing/jackets-and-coats">Womens Jackets & Coats</a></li>
        <li><a href="/kids/boys/clothing">Boys Clothing</a></li>
        <li><a href="/kids/girls/clothing">Girls Clothing</a></li>
        <li><a href="/designers">Brands A-Z</a></li>
      </ul>

    `;

const storeSearchSubmission = (searchTerm) => {
  
  logMessage('SearchTerm stored: '+searchTerm);

  let searchTermArray = [];
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
      searchTermArray.unshift(searchTerm);
      initialData.recentSearches = searchTerm;
      localStorage.setItem(`${ID}-search-data`, JSON.stringify(initialData));
    }
  }
}

const getRecs = (strategy) => {
  logMessage("Recs API call made");
  return new Promise((resolve, reject) => {
      DYO.recommendationWidgetData(strategy, { maxProducts: 5 }, function (error, data) {          
        resolve(data);
      });
  });
}

const insertRecs = (products) => {
  let productHTML = `
    
        <div class="${ID}-search-modal--productholder">
          <div class="${ID}-search-modal--productinner swiper-container">
            <div class="swiper-wrapper">
              ${products.map((product) => {

                return `

                  <a href="${product.item.url}" class="${ID}-search-modal--product swiper-slide">
                    <img src="${product.item.image_url}" alt="${product.item.name} image" />
                    <p class="${ID}-search-modal--productbrand">${product.item.brand}</p>
                    <p class="${ID}-search-modal--productname">${product.item.name}</p>
                    <p class="${ID}-search-modal--productprice"><span class="now-price">${formatPrice(product.item.price)}</span><span class="was-price">${formatPrice(product.item.ticket_price)}</span></span></p>
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

const setViewport = () => {
  setTimeout(() => {
    let searchElementHeight = window.visualViewport.height - 150;
    document.querySelector(`.${ID}-search-modal`).style.height = searchElementHeight + "px";
  }, 1000);
}

const populateSearchBox = () => {
  let trendingLinksHeader = 'Trending Searches';
  let trendingProductsHeader = 'Most Popular';

  let recentLinksHeader = 'Recently Searched';
  let recentProductsHeader = 'Recently Viewed';

  let linksList = ``;



  // Setting up the Links section
  if(linksType == "trending") {

    linksList = trendingLinksList;


  } else {

    let recentSearches = JSON.parse(localStorage.getItem(`${ID}-search-data`)).recentSearches;
    recentSearches = recentSearches.slice(0, 5);

    linksList = `
    
      <ul class="${ID}-search-links" data-linktype="recent">
        ${recentSearches.map((searches) => {
          let searchesProcessed = searches.toLowerCase();
          searchesProcessed = encodeURI(searchesProcessed.trim() );
          return `<li><a class="${ID}-recent-search-link" data-search="${searches}" href="/searchresults?descriptionfilter=${searchesProcessed}">${searches}</a><button class="${ID}-remove-search"> <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 11L11 1" stroke="#323232" stroke-linecap="round"/><path d="M1 1L11 11" stroke="#323232" stroke-linecap="round"/></svg> </button></li>`;        
        }).join('')}
      </ul>
      ${window.outerWidth > 767 ? `<button id="${ID}-clear-links" class="${ID}-clear-button">Clear All</button>` : '' }

    `;
  
  }

  // Setting up the products section
  let currProducts = {};
  let currSearchData = JSON.parse(localStorage.getItem(`${ID}-search-data`));

  let searchSectionHTML = `
  
    <div class="${ID}-search-modal">
      <div class="${ID}-search-modal--inner">
        <button id="${ID}-search-modal--exit" class="${ID}-search-modal--exit"> <svg width="20" fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><path fill="#000000" stroke="none" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></svg> </button>
        <div class="${ID}-search-modal--section mainsection">
          <div class="${ID}-search-modal--textlinks">
            <h2 class="${ID}-linkslist-heading"> ${linksType == "recent" ? recentLinksHeader : trendingLinksHeader} ${window.outerWidth < 767 && linksType == "recent" ? `<button id="${ID}-clear-links" class="${ID}-clear-button">Clear All</button>` : '' } </h2>
            <h2 class="${ID}-suggested-heading"> Suggested Searches </h2>
            ${linksList}

            
          </div>
          <div class="${ID}-search-modal--products">
            <h2> <span>${productsType == "recent" ? recentProductsHeader : trendingProductsHeader}</span> ${productsType == "recent" ? `<button id="${ID}-clear-prods" class="${ID}-clear-button">Clear All</button>` : ''}</h2>



          </div>
        </div>
      </div>
    </div>
  
  
  `;

  // Insert Search Modal
  let insertionPoint = document.querySelector('.ToplinksGroup');
  insertionPoint.insertAdjacentHTML('afterend', searchSectionHTML);

  // Insert Recommendations from cache/DY
  if(productsType == "trending") {
    currProducts = currSearchData.mostPopularProducts;
    insertRecs(currProducts.slots);
  } else if(productsType == "recent" && Object.keys(currSearchData.recentlyViewedProducts).length == 0) {
    getRecs(recentlyViewedStrategy).then((data) => {
        let currSearchData = JSON.parse(localStorage.getItem(`${ID}-search-data`))
        currSearchData.recentlyViewedProducts = data;
        localStorage.setItem(`${ID}-search-data`, JSON.stringify(currSearchData));

        insertRecs(currSearchData.recentlyViewedProducts.slots);

      });
  } else {
    currProducts = currSearchData.recentlyViewedProducts;
    insertRecs(currProducts.slots);
    let prodInner = document.querySelector(`.${ID}-search-modal--productinner`);
    prodInner.closest(`.${ID}-search-modal--products`).querySelector('h2 span').innerText = recentProductsHeader;
  }

  // Set up events/actions

  let searchModal = document.querySelector(`.${ID}-search-modal`);
  let headerOuter = document.getElementById('HeaderGroup');
  let exitButton = document.getElementById(`${ID}-search-modal--exit`);
  let clearRecentLinksButton = document.getElementById(`${ID}-clear-links`);
  let clearRecentProdsButton = document.getElementById(`${ID}-clear-prods`);
  let searchInput, searchSubmit, autocompleteUI;

  if(window.outerWidth > 1022) {
    searchInput = document.getElementById('txtSearch');
    searchSubmit = document.getElementById('cmdSearch');
  } else {
    searchInput = document.getElementById('MobtxtSearch');
    searchSubmit = document.getElementById('MobcmdSearch');
  }

  searchSelector = '#txtSearch';
  if(window.outerWidth < 1022) {
    searchSelector = '#MobtxtSearch';
  }

  exitButton.addEventListener('click', (e) => {
    document.documentElement.classList.remove(`${ID}-noscroll`);
    searchModal.classList.remove(`${ID}-active`);
    headerOuter.classList.remove(`${ID}-active`);
    fireEvent('Click - user clicks the close X to close the modal');
  });

  if(linksType == "recent") {
    let allDeleteButtons = document.querySelectorAll(`.${ID}-remove-search`);
    [].slice.call(allDeleteButtons).forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        let searchTBDeleted = e.currentTarget.previousElementSibling.getAttribute('data-search');
        let currData = JSON.parse(localStorage.getItem(`${ID}-search-data`));
        let currSearchTerms = currData.recentSearches;
        let updatedTerms = currSearchTerms.filter((searchTerm) => {
          if(searchTerm == searchTBDeleted) {
            return false;
          } else {
            return searchTerm;
          }
        });
        e.currentTarget.closest('li').remove();
        currData.recentSearches = updatedTerms;
        localStorage.setItem(`${ID}-search-data`, JSON.stringify(currData));

        if(updatedTerms.length <= 0) {
          let recentLinks = document.querySelector(`.${ID}-search-links`);
          recentLinks.closest(`.${ID}-search-modal--textlinks`).querySelector(`.${ID}-linkslist-heading`).innerText = trendingLinksHeader;
          document.getElementById(`${ID}-clear-links`).remove();
          recentLinks.insertAdjacentHTML('afterend', trendingLinksList);
          recentLinks.remove();
        }
        

      });
    })
  }

  if(window.outerWidth > 1022) {
    document.documentElement.addEventListener('click', (e) => {
      if(e.target.closest(searchSelector)) {
        document.documentElement.classList.add(`${ID}-noscroll`);
        searchModal.classList.add(`${ID}-active`);
        headerOuter.classList.add(`${ID}-active`);
  
        if(sliderInitialised == false) {
          initiateSlider();
          sliderInitialised = true;
        }
  
             
  
        fireEvent('Click - user clicks on search input to open the modal');
  
      } else if((e.target.classList.contains(`${ID}-noscroll`) || e.target.closest('#HeaderGroup') && !e.target.closest(`.${ID}-search-modal`))) {
        document.documentElement.classList.remove(`${ID}-noscroll`);
        searchModal.classList.remove(`${ID}-active`);
        headerOuter.classList.remove(`${ID}-active`);
  
        fireEvent('Click - user clicks outside the modal to close it');
  
      } 
    });
  } else {

    document.querySelector(searchSelector).addEventListener('click', (e) => {

      if(!searchModal.classList.contains(`${ID}-active`)) {
        document.documentElement.classList.add(`${ID}-noscroll`);
        searchModal.classList.add(`${ID}-active`);
        headerOuter.classList.add(`${ID}-active`);
  
        if(sliderInitialised == false) {
          initiateSlider();
          sliderInitialised = true;
        }
  
             
  
        fireEvent('Click - user clicks on search input to open the modal');
  
      } 

    });

    document.documentElement.addEventListener('click', (e) => {
      if((e.target.classList.contains(`${ID}-noscroll`) || e.target.closest('#HeaderGroup') && !e.target.closest(`.${ID}-search-modal`))) {
        document.documentElement.classList.remove(`${ID}-noscroll`);
        searchModal.classList.remove(`${ID}-active`);
        headerOuter.classList.remove(`${ID}-active`);
  
        fireEvent('Click - user clicks outside the modal to close it');
  
      } 
    });

  }
  

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
      localStorage.setItem(`${ID}-search-data`, JSON.stringify(currStorage));
  
      let productHolder = document.querySelector(`.${ID}-search-modal--productholder`);
      productHolder.closest(`.${ID}-search-modal--products`).querySelector('h2 span').innerText = trendingProductsHeader;
      if(mySwiper) {
        mySwiper.destroy(true, true);
      }
      productHolder.remove();
      currProducts = currSearchData.mostPopularProducts;
      insertRecs(currProducts.slots);
      
      setTimeout(() => {
        initiateSlider();
      }, 750);

      fireEvent(`Click - user has clicked on clear all to clear the recent products`)
  
    })
  }
  
  if(clearRecentLinksButton !== null) {
    clearRecentLinksButton.addEventListener('click', (e) => {

      e.currentTarget.remove();
  
      let currStorage = JSON.parse(localStorage.getItem(`${ID}-search-data`));
      currStorage.recentSearches = [];
      localStorage.setItem(`${ID}-search-data`, JSON.stringify(currStorage));
  
      let recentLinks = document.querySelector(`.${ID}-search-links`);
      recentLinks.closest(`.${ID}-search-modal--textlinks`).querySelector(`.${ID}-linkslist-heading`).innerText = trendingLinksHeader;
      
      recentLinks.insertAdjacentHTML('afterend', trendingLinksList);
      recentLinks.remove();

      fireEvent(`Click - user has clicked on clear all to clear the recent searches`)
  
    })
  }
  

  // to deal with search queries where the search icon is clicked
  searchSubmit.addEventListener('click', (e) => {
    storeSearchSubmission(searchInput.value);
  }, false);

  // to deal with queries where the user clicks on one of the auto-complete suggestions
  let bodyEvents = document.body.addEventListener('click', (e) => {
    var btn = e.target;
    if (btn.className.match(/ui-corner-all/)) {
      let autocompleteEle = e.target.innerHTML;
      let strippedText = autocompleteEle.replace(/(<([^>]+)>)/gi, "");
      storeSearchSubmission(strippedText);
      return true;
    } 
  });

  if(window.outerWidth < 767) {

    searchInput.addEventListener('focus', (e) => {
      setViewport();
    })

    searchInput.addEventListener('blur', (e) => {
      setViewport();
    })

    // window.addEventListener('resize', debounce(() => {
    //   setViewport();
    // }));

  }

  

  pollerLite(['#ui-id-1', `.${ID}-search-links`], () => {

    let autocomplete = document.getElementById('ui-id-1');
    if(window.outerWidth < 1022) {
      autocomplete = document.getElementById('ui-id-2');
    }
    let currSearchLinks = document.querySelector(`.${ID}-search-links`);
    let textLinksHolder = document.querySelector(`.${ID}-search-modal--textlinks`);
    autocomplete.classList.add(`${ID}-autocomplete`);
    currSearchLinks.after(autocomplete);

    // to deal with search queries where the enter button is pressed during submission
    searchInput.addEventListener('keyup', (e) => {
      if(e.key == "Enter") {
        storeSearchSubmission(searchInput.value);
      } 
      let display = autocomplete.style.display;
      if(display == "block" || searchInput.innerText.length > 3) {
        textLinksHolder.classList.add('suggestions-active');
      } else {
        textLinksHolder.classList.remove('suggestions-active');
      }

    });

  });
  


}

const startExperiment = () => {

  // Data Gathering

  if(!JSON.parse(localStorage.getItem(`${ID}-search-data`))) {
    getRecs(mostPopularStrategy).then((data) => {
      initialData.mostPopularProducts = data;
      localStorage.setItem(`${ID}-search-data`, JSON.stringify(initialData));
      populateSearchBox();
    });

  } else {
    
    if(parseInt(JSON.parse(localStorage.getItem(`${ID}-search-data`)).productsViewed.length) > 6) {
      productsType = "recent";
    } 

    if(parseInt(JSON.parse(localStorage.getItem(`${ID}-search-data`)).recentSearches.length ) == 5) {
      linksType = "recent";
    }

    if(document.body.classList.contains('ProdDetails')) {
      let storage = JSON.parse(localStorage.getItem(`${ID}-search-data`));
      let productsViewed = storage.productsViewed;
      if(Object.values(productsViewed).indexOf(window.location.href) == -1) {
        productsViewed.push(window.location.href);
      }
      
      storage.productsViewed = productsViewed;
      localStorage.setItem(`${ID}-search-data`, JSON.stringify(storage));
    }

    populateSearchBox();

  }

  


}

const formatPrice = (price) => {

  let defaultCurrency = '£';
  if (typeof price == "string" && price.indexOf('.') > 0) {
      price = parseFloat(price).toFixed(2);
  } else if (typeof price == "number" && Number.isInteger(price)) {
      price = price + ".00";
  } else {
      price = price.toFixed(2);
  }
  let currencySign = "";
  if(document.querySelector('.spanCurrencyLanguageSelector > p')) {
    let currencyText = document.querySelector('.spanCurrencyLanguageSelector > p').innerHTML;
    currencySign = currencyText.substring(0, currencyText.indexOf(' '));
    if (DY.recommendationContext.lng === 'en_EU') {
        price = price.replace('.', ',');
    }
  } else {
    currencySign = defaultCurrency;
  }
  
  price = currencySign + price;
  return price;
}

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

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
