/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, logMessage, pollerLite, observer } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const getParameterByName = (name, url) => {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&#]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

let currPageNo = window.location.href.indexOf('dcp=') > -1 ? getParameterByName('dcp', window.location.href) : 1;
let prevPageNo = currPageNo;
let currNumDisplayed = 100;
let pagHolderTop, pagHolderBottom;
let totalProducts;

const getAllFilters = () => {

  let theFilters = [];
  let currFilters = document.querySelectorAll('#filterlist .SelectedFilter');

  if(currFilters.length > 0) {
    currFilters.forEach((filter) => {
      let theFilter = filter.getAttribute('data-item');
      let theFilterArray = {'group': theFilter.split('^')[0], 'value': theFilter.split('^')[1]};
      theFilters.push(theFilterArray);
    });
  }

  let urlFilters = getParameterByName('Filter') ? getParameterByName('Filter') : '';

  if(urlFilters.indexOf('APRI') > -1) {
    theFilters.push({'group': 'APRI', 'value': `${document.querySelector('.PriceRTag #amount').innerText.replaceAll('£', '').replaceAll('$', '').replaceAll('€', '').replace(' TO ', '-')}`});
  }

  let theFiltersString = '';
  if(theFilters.length > 0) {
    let theCurrGroup = theFilters[0]['group'];

    theFilters.forEach((filter, index) => {

      if (theCurrGroup != filter.group || index == 0) {
        theFiltersString += `${index > 0 ? `|` : ``}${filter.group}^${filter.value}${index !== theFilters.length - 1 ? `,` : ``}`;
        theCurrGroup = filter.group;
      } else {
        theFiltersString += `${filter.value}${index !== theFilters.length - 1 ? `,` : ``}`;
      }

    });

    theFiltersString = theFiltersString.replaceAll(',|', '|');

    return theFiltersString;
  } else {
    return '100';
  }


  

}

const updateInfoPanel = () => {

  //let filterChange = checkFilterChange();
  
	totalProducts = document.querySelector('.totalProducts').innerText;
  currNumDisplayed = currPageNo * 100;
  if (currNumDisplayed > totalProducts && totalProducts > 100) {
    currNumDisplayed = totalProducts;
    document.querySelector(`.${ID}-loadmore`).classList.add(`${ID}-backtotop`);
    fireEvent('Interaction - user got to the last set of results for this session', true);
  } else {
    document.querySelector(`.${ID}-loadmore`).classList.remove(`${ID}-backtotop`);
  }
  
  document.getElementById(`${ID}-pagination--detailstotal`).innerHTML = totalProducts;
  document.getElementById(`${ID}-pagination--detailsnumber`).innerHTML = currNumDisplayed;
  let percentage = parseInt((currNumDisplayed / totalProducts) * 100);
  document.querySelector(`.${ID}-pagination--progressbar`).style.width = `${percentage >= 1 ? percentage : 1}%`;

  if(prevPageNo == 1 || currPageNo == 1) {
    pagHolderTop.classList.remove(`${ID}-pagination-holder--toppageactive`);
  }
	
	if (totalProducts < 100) {
		pagHolderTop.classList.add(`${ID}-hidden`);
    pagHolderBottom.classList.add(`${ID}-hidden`);
    currNumDisplayed = 100;
    currPageNo = 1;
	} else {
    pagHolderTop.classList.remove(`${ID}-hidden`);
    pagHolderBottom.classList.remove(`${ID}-hidden`);
	}
};

const loadProducts = (pageNo, direction) => {
	let currFilters = getAllFilters();
	let currSort = getParameterByName('OrderBy') ? getParameterByName('OrderBy') : 'no-sort';

	let catCode = document.querySelector('#productlistcontainer').getAttribute('data-category');
  if(direction == "forwards") {
    document.getElementById(`${ID}-loadmore--button`).innerText = 'Loading...';
  } else {
    document.getElementById(`${ID}-loadprev--button`).innerText = 'Loading...';
  }

	let theData = {
		categoryId: catCode,
		page: pageNo,
		sortOption: currSort,
		productsPerPage: 100,
		selectedFilters: currFilters == '' ? '' : currFilters,
		isSearch: false,
		searchText: '',
		columns: 3,
		mobileColumns: 2,
		clearFilters: false,
		pathName: window.location.pathname,
		searchTermCategory: '',
		selectedCurrency: 'GBP',
		portalSiteId: 12,
		searchCategory: ''
	};

	var productApiRequestUrl = '/api/productlist/v1/getforcategory';

	let currentGetProductsXhr = $.ajax({
		cache: true,
		type: 'GET',
		url: productApiRequestUrl,
		data: theData,
		dataType: 'json',
		success: function (returnedData) {
			if (returnedData) {
				let products = returnedData.products;
        if(direction == "backwards") {
          products = products.reverse();
        }
				let baseLi = document.querySelector('#navlist li');
				products.map((product) => {
					let clonedLi = baseLi.cloneNode(true);

					clonedLi.classList.add(`${ID}-infinitescrollprod`);
					clonedLi.classList.add(`${ID}-loading`);

					// li attributes
					clonedLi.setAttribute('li-productid', product.colourId);
					clonedLi.setAttribute('li-seq', product.sizeSequenceNumber);
					clonedLi.setAttribute('li-variant', product.colourName);
					clonedLi.setAttribute('li-url', product.url);
					clonedLi.setAttribute('li-brand', product.brand);
					clonedLi.setAttribute('li-imageurl', product.image);
					clonedLi.setAttribute('li-name', product.name);
					clonedLi.setAttribute('li-price', product.priceUnFormatted);
					clonedLi.setAttribute('li-sku', product.sku);

          

					// html updates
					clonedLi.querySelector('.MainImage').src = product.image;
					let allLinks = clonedLi.querySelectorAll('a');
					[].slice.call(allLinks).map((link) => {
						link.href = product.url;
					});

					clonedLi.querySelector('.hotspotbuy.hotspotquickbuy').setAttribute('data-colourvariantid', product.colourId);
					clonedLi.querySelector('.hotspotbuy.hotspotwishlist').setAttribute('data-colourvariantid', product.colourId);
					clonedLi.querySelector('.productdescriptionbrand').innerText = product.brand;
					clonedLi.querySelector('.productdescriptionname').innerText = product.name;

          clonedLi.querySelector('.s-producttext-price').classList.remove('s-producttext-withticket');
          clonedLi.querySelector('.curprice').innerText = product.price;

          if (product.ticketPrice !== null) {
            if(clonedLi.querySelector('.RefandPrice > span')) {
              clonedLi.querySelector('.RefandPrice > span').innerText = product.ticketPrice;
            }
            clonedLi.querySelector('.s-producttext-price').classList.add('s-producttext-withticket');
          } else {
            if(clonedLi.querySelector('.RefandPrice > span')) {
              clonedLi.querySelector('.RefandPrice > span').innerText = '';
            }
            
            clonedLi.querySelector('.s-producttext-price').classList.remove('s-producttext-withticket');
          }

          if(direction == "forwards") {
            document.querySelector('#navlist').insertAdjacentElement('beforeend', clonedLi);
            document.getElementById(`${ID}-loadmore--button`).innerText = 'Load more';
          } else {
            document.querySelector('#navlist').insertAdjacentElement('afterbegin', clonedLi);
            document.getElementById(`${ID}-loadprev--button`).innerText = 'Load previous';
          }
					
					

					setTimeout(() => {
						clonedLi.classList.remove(`${ID}-loading`);
					}, 1000);
				});

				window.initializeHotspotsQuickBuyAndWishListEvents(`.${ID}-infinitescrollprod`);
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			logMessage('Error');
			logMessage(errorThrown);
			if (textStatus != 'abort') console.error(textStatus + errorThrown);
		},
		complete: function (data) {
			currentGetProductsXhr = null;
		}
	});
};

const startExperiment = (theVariation) => {



  if(theVariation == 1) {

    document.documentElement.classList.add(`${ID}-variation1`);

    pollerLite(['#productlistcontainer', '.totalProducts', '.CurrentPageNumber'], () => {
      fireEvent(`Interaction - more than 100 products present, the infinite scroll is displayed`);
      totalProducts = document.querySelector('.totalProducts').innerText;
      currPageNo = parseInt(document.querySelector('.CurrentPageNumber').innerText);
      let percentage = parseInt((currNumDisplayed / document.querySelector('.totalProducts').innerText) * 100);
      let currHref = window.location.href;
      if (currHref.indexOf('dcp=') > -1) {
        currHref = currHref.replace(/dcp=\d+/g, `dcp=${currPageNo + 1}`);
      } else {
        currHref = currHref + `?dcp=${currPageNo + 1}`;
      }

      let prevButton = `
      
        <div id="${ID}-pagholder-top" class="${ID}-pagination-holder ${ID}-pagination-holder--toppage">

            <div class="${ID}-loadprev">
              <a href="${window.location.pathname}" id="${ID}-loadprev--button" class="${ID}-loadmore--button ${ID}-loadmore--normal">Load Previous</a>
            </div>
          
          </div>

      `;

      let loadMoreButton = `
        
          <div id="${ID}-pagholder-bottom" class="${ID}-pagination-holder">
          
            <div class="${ID}-pagination">
      
              <div class="${ID}-pagination--details">
                <p id="${ID}-pagination--detailstext"><span id="${ID}-pagination--detailsnumber">${currPageNo * 100}</span> out of <span id="${ID}-pagination--detailstotal">${document.querySelector('.totalProducts').innerText}</span> products</p>
              </div>

              <div class="${ID}-pagination--progress">
                <div class="${ID}-pagination--progressbar" style="width: ${percentage >= 1 ? percentage : 1}%;"></div>
              </div>
            
            </div>

            <div class="${ID}-loadmore">
              <a href="${currHref}" id="${ID}-loadmore--button" class="${ID}-loadmore--button ${ID}-loadmore--normal">Load More</a>
              <button id="${ID}-loadmore--backtotop" class="${ID}-loadmore--button ${ID}-loadmore--backtotop">Back to top</button>
            </div>
          
          </div>
          
        `;

      let paginationWrapper = document.querySelector('#productlistcontainer');
      paginationWrapper.insertAdjacentHTML('afterend', loadMoreButton);
      paginationWrapper.insertAdjacentHTML('beforebegin', prevButton);
      
      pagHolderBottom = document.getElementById(`${ID}-pagholder-bottom`);
      pagHolderTop = document.getElementById(`${ID}-pagholder-top`);

      if(currPageNo > 1) {
        pagHolderTop.classList.add(`${ID}-pagination-holder--toppageactive`);
      } else {
        pagHolderTop.classList.remove(`${ID}-pagination-holder--toppageactive`);
      }

      let loadMoreButtonEl = document.querySelector(`#${ID}-loadmore--button`);
      loadMoreButtonEl.addEventListener('click', (e) => {
        e.preventDefault();
        currPageNo++;
        loadProducts(currPageNo, 'forwards');

        // update url to be dcp = 2
        let newUrl = window.location.href;
        if (newUrl.indexOf('dcp=') > -1) {
          newUrl = newUrl.replace(/dcp=\d+/g, `dcp=${currPageNo}`);
        } else {
          newUrl = newUrl + `?dcp=${currPageNo}`;
        }
        window.history.pushState({ path: newUrl }, '', newUrl);
        document.getElementById(`${ID}-loadmore--button`).href = newUrl;
        fireEvent(`Click - user clicked load more button to load the next set`, true);


      });

      let loadPrevButtonEl = document.querySelector(`#${ID}-loadprev--button`);
      loadPrevButtonEl.addEventListener('click', (e) => {
        e.preventDefault();
        
        prevPageNo--;
        loadProducts(prevPageNo, 'backwards');

        fireEvent(`Click - user clicked load prev button to load the previous set`, true);


      });

      let backToTopButtonEl = document.querySelector(`#${ID}-loadmore--backtotop`);
      backToTopButtonEl.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fireEvent(`Click - user reached the end of the search results and clicked back to top`, true);
      });
    });


  } else {
    
    document.documentElement.classList.add(`${ID}-variation2`);

    pollerLite(['#FiltersAndProductsWrapper', '.MaxPageNumber', '#productlistcontainer'], () => {

      let currPageValue = currPageNo;
      let currNumber = parseInt(currPageValue);
      let totalPageNumber = document.querySelector('.MaxPageNumber').innerText;

      let paginationHolderHTML = `
    
        <div class="${ID}-pagination">
          <button id="${ID}-pagination--prev" class="${ID}-pagination--button ${ID}-pagination--prev ${currPageValue == 1 ? `${ID}-pagination--disabled` : ``}"><svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99991 19L1.42848 10L9.99991 1" stroke="black" stroke-miterlimit="10"/></svg></button>
          <div class="${ID}-pagination--holder"></div>
          <button id="${ID}-pagination--next" class="${ID}-pagination--button ${ID}-pagination--next ${currPageValue == totalPageNumber ? `${ID}-pagination--disabled` : ``}"><svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.00076 1L9.57219 10L1.00076 19" stroke="black" stroke-miterlimit="10"/></svg></button>        
        </div>
      `;

      let paginationWrapper = document.querySelector('#productlistcontainer');
      paginationWrapper.insertAdjacentHTML('afterend', paginationHolderHTML);

      fireEvent('Interaction - pagination is displayed', true);

      if (totalPageNumber < 8) {

        

        for (let i = 1; i <= totalPageNumber; i++) {
          let theUpdatedHref = window.location.href + "?dcp=" + i;
          if (window.location.href.indexOf('dcp=') > -1) {
            theUpdatedHref = window.location.href.replace('dcp=' + currNumber, 'dcp=' + i);
          }
          
          let baseURL = window.location.href.split('?')[0];

          let paginationButton = `
            <a href="${theUpdatedHref}" class="${ID}-pagination--link ${ID}-pagination--page ${i == currNumber ? `${ID}-pagination--active` : ``}" data-page="${i}">${i}</a>
          `;

          if (currNumber == 1 && i == 1) {
            paginationButton = `
              <span class="${ID}-pagination--link ${ID}-pagination--linkdisabled ${ID}-pagination--page ${i == currNumber ? `${ID}-pagination--active` : ``}" data-page="${i}">${i}</span>
            `;
          }

          document.querySelector(`.${ID}-pagination--holder`).insertAdjacentHTML('beforeend', paginationButton);
        }
      } else {

        let currNumberPrev = currNumber - 1;
        let currNumberNext = currNumber + 1;


        let toShowArray = [1, 'ellipsis', currNumberPrev, currNumber, currNumberNext, 'ellipsis', totalPageNumber];
        if (currNumber < 4) {
          toShowArray = [1, 2, 3, 4, 'ellipsis', totalPageNumber];
        }
        if (currNumber > totalPageNumber - 4) {
          toShowArray = [1, 'ellipsis', totalPageNumber - 3, totalPageNumber - 2, totalPageNumber - 1, totalPageNumber];
        }


        toShowArray.forEach((i) => {
          let theUpdatedHref = window.location.href + "?dcp=" + i;
          if (window.location.href.indexOf('dcp=') > -1) {
            theUpdatedHref = window.location.href.replace('dcp=' + currNumber, 'dcp=' + i);
          }

          let baseURL = window.location.href.split('?')[0];

          let paginationButton = `
            <a href="${i == 0 ? baseURL : theUpdatedHref}" class="${ID}-pagination--link ${ID}-pagination--page ${i == currNumber ? `${ID}-pagination--active` : ``}" data-page="${i}">${i}</a>
          `;

          if (currNumber == 1 && i == 1) {
            paginationButton = `
              <span class="${ID}-pagination--link ${ID}-pagination--linkdisabled ${ID}-pagination--page ${i == currNumber ? `${ID}-pagination--active` : ``}" data-page="${i}">${i}</span>
            `;
          }

          if (i == "ellipsis") {
            paginationButton = `
              <span class="${ID}-pagination--link ${ID}-pagination--ellipsis">...</span>
            `;
          }
          document.querySelector(`.${ID}-pagination--holder`).insertAdjacentHTML('beforeend', paginationButton);
        });

      }


      let prevButton = document.querySelector(`#${ID}-pagination--prev`);
      let nextButton = document.querySelector(`#${ID}-pagination--next`);

      prevButton.addEventListener('click', () => {
        let href = document.querySelector(`.${ID}-pagination--active`).previousElementSibling.getAttribute('href');
        if (document.querySelector(`.${ID}-pagination--active`).previousElementSibling.classList.contains(`${ID}-pagination--ellipsis`)) {
          href = document.querySelector(`.${ID}-pagination--active`).getAttribute('href');
          href = href.replace(`dcp=${currPageNo}`, 'dcp=' + (currPageNo - 1));
        }
        
        fireEvent('Click - user clicked on the previous button to go to the previous page', true);
        window.location.href = href;
      });

      nextButton.addEventListener('click', () => {
        let href = document.querySelector(`.${ID}-pagination--active`).nextElementSibling.getAttribute('href');
        if (document.querySelector(`.${ID}-pagination--active`).nextElementSibling.classList.contains(`${ID}-pagination--ellipsis`)) {
          href = document.querySelector(`.${ID}-pagination--active`).getAttribute('href');
          href = href.replace(`dcp=${currPageNo}`, 'dcp=' + (currPageNo + 1));
        }
        fireEvent('Click - user clicked on the next button to go to the next page', true);
        window.location.href = href;
      });

      document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains(`${ID}-pagination--link`)) {
          fireEvent(`Click - user clicked link to go to page ${e.target.getAttribute('data-page')}`, true);
        }
      });

    });



  }
};

const addTracking = () => {

  if(document.body.classList.contains('flanProdList')) {
    document.body.addEventListener('click', (e) => {

      if (e.target.closest('#navlist li')) {
        fireEvent(`Click - user clicked on a product to go to ${e.target.closest('#navlist li').getAttribute('li-url') ? e.target.closest('#navlist li').getAttribute('li-url') : `url not found`} - this product ${e.target.closest('#navlist li').classList.contains(`${ID}-infinitescrollprod`) ? `was` : `was not`} loaded by infinite scroll`, true);
        localStorage.setItem(`${ID}-productClicked`, e.target.closest('#navlist li').getAttribute('li-url'));
      }

    });
  } else if(document.body.classList.contains('ProdDetails')) {
    if (window.location.href.indexOf(localStorage.getItem(`${ID}-productClicked`)) > -1) {
      pollerLite(['#aAddToBag'], () => {
        document.querySelector('#aAddToBag').addEventListener('click', () => {
          fireEvent(`Click - user clicked add to bag on ${window.location.href}`);
        });
      })
    }
  }

  



};

export default () => {
	events.analyticsReference = window.ga ? 'ga' : '_gaUAT';

	setup();

	fireEvent('Conditions Met');

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	addTracking();

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == 'control') {
		return;
	}

	// Write experiment code here
	// ...
  if(VARIATION == 1 && document.body.classList.contains('flanProdList')) {
    totalProducts = document.querySelector('.totalProducts').innerText;
    if (totalProducts > 100 && !document.querySelector(`.${ID}-pagination-holder`)) {
      startExperiment(VARIATION);
    } else {
      fireEvent(`Interaction - less than 100 products present, the infinite scroll is not displayed`, true);
    }

    observer.connect(
      document.querySelector('#navlist'),
      () => {
        currPageNo = window.location.href.indexOf('dcp=') > -1 ? getParameterByName('dcp', window.location.href) : 1;
        totalProducts = document.querySelector('.totalProducts').innerText;
        if (totalProducts > 100 && !document.querySelector(`.${ID}-pagination-holder`)) {
          startExperiment(VARIATION);
        }

        if (document.querySelector(`.${ID}-pagination-holder`)) {
          setTimeout(() => {
            updateInfoPanel();
          }, 200);

        }
      },
      {
        childList: true,
        subtree: true,
        attributes: true
      }
    );


  } else if(VARIATION == 2 && document.body.classList.contains('flanProdList')) {

    startExperiment(VARIATION);

    observer.connect(
      document.querySelector('#navlist'),
      () => {
        setTimeout(() => {
          document.querySelector(`.${ID}-pagination`).remove();
          currPageNo = window.location.href.indexOf('dcp=') > -1 ? getParameterByName('dcp', window.location.href) : 1;
          startExperiment(VARIATION);
        },1000);
        
      },
      {
        childList: true,
        subtree: true,
        attributes: true
      }
    );

  }
  
};
