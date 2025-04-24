import { events, pollerLite } from './../../../../../lib/utils';
import { observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import responseData from './responseData';

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  // set up events
  events.setDefaultCategory('Experimentation');
  events.setDefaultAction(CLIENT + " - "+ID);

  if(LIVECODE == "true") {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  // adds document body classlist 
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  events.sendAuto(VARIATION, label);

}


/*  ----------------
  Cookie opt in check
  ------------------ */
  export const cookieOpt = () => {
    const { ID, VARIATION } = shared;

    pollerLite([
     () => {
      return !!window.ga
     }], () => {
       fireEvent(`${ID}-${VARIATION} Experiment Fired`);
     });
  }

export const checkIdInLocalStorage = () => {
  const { ID, VARIATION } = shared;

  let storedUserId = '';

  if (localStorage.getItem(`${ID}-user-id`) !== null) {
    // Get item content
    storedUserId = localStorage.getItem(`${ID}-user-id`);
  }

  return storedUserId;
}

export const sendClickTrackingURL = (prodId, prodUrl) => {
  const { ID, VARIATION } = shared;

  // edw
  window.jQuery.ajax({
    url: `${prodUrl}`,
      success : function (response) {
        fireEvent(`Click - Send Click Tracking URL for Product ID: ${prodId}`);
      }
    });
}

export const storeInLocalStorage = (userId) => {
  const { ID, VARIATION } = shared;

  let storedUserId = '';

  if (localStorage.getItem(`${ID}-user-id`) == null) {
    localStorage.setItem(`${ID}-user-id`, userId);
  } else {
    storedUserId = localStorage.getItem(`${ID}-user-id`);
    if (storedUserId !== '') {
      localStorage.setItem(`${ID}-user-id`, userId);
    }
  }
}
  
export const getPreviouslyBoughtProducts = (pageType) => {
  const { ID, VARIATION } = shared;

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  var sessionID = getCookie('userVisitId');
  var userIDextract = getCookie('CM_REG');
  var userID = userIDextract.match(/([\d]+)/gmi)[0];
  let searchTerm;
  if (window.location.href.indexOf('sitesearch') > -1){
    searchTerm = window.location.search.replace('?searchTerm=', '').replace('%20', ' ')
  }
  let clickTrackURL;
  // --- Test
  // var userID = 'testuser2';
  storeInLocalStorage(userID);

  let returnProdArray = [];

  if (sessionID && userID){
    if (pageType == 'plp') {
      //IF page is PLP Pages
      var checkR3 = setInterval(function () {
        if (window.R3_CATEGORY) {
            clearInterval(checkR3);
            runPLP();
        }
      }, 500)
    
      function runPLP(){
          
      // var categoryID = R3_CATEGORY.id;
      window.jQuery.ajax({
        url: 'https://recs.richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiKey=021e247385c72eb5&apiClientKey=403fb9c803e2b729&sessionId=' + sessionID + '&userId=' + userID + '&placements=category_page.replenishment&includeStrategyData=true&excludeItemAttributes=true&categoryData=false&excludeHtml=true',
          success : function (response) {
          if (response.placements
          && response.placements[0].recommendedProducts) {

            let responseProducts = response.placements[0].recommendedProducts;

            for (var k in responseProducts) {
              if (responseProducts.hasOwnProperty(k)) {
                  var productId = responseProducts[k].id;
                  if (responseProducts[k].clickTrackingURL) {
                    var clickTrackURL = responseProducts[k].clickTrackingURL;
                    responseData.data[`${productId}`] = clickTrackURL;
                  }
                  
                  returnProdArray.push(productId);
              }
            }

            document.querySelector('ul.grid_mode.grid').setAttribute('data-bo101-products', returnProdArray);
          }
          
          //loop through all products within recommendedProducts & check ID vs. list
          //default to max products in view
          //if there's a match apply CSS and bring to top of page
          //within each product object, get clickTrackingURL and fire pageview via AJAX if the click on the product or add to bag
          }
        });
    }
    // checkR3();
    } else if (pageType == 'srp') {
      //IF Page is Search Page
      window.jQuery.ajax({
        url: 'https://recs.richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiKey=021e247385c72eb5&apiClientKey=403fb9c803e2b729&sessionId=' + sessionID + '&userId=' + userID + '&placements=search_page.replenishment&includeStrategyData=true&excludeItemAttributes=true&categoryData=false&excludeHtml=true&searchTerm=' + searchTerm + '',
          success : function (response) {
          // alert('success - srp');
          // console.log('success - srp')
          if (response.placements
          && response.placements[0].recommendedProducts) {
            let responseProducts = response.placements[0].recommendedProducts;

            for (var k in responseProducts) {
              if (responseProducts.hasOwnProperty(k)) {
                  var productId = responseProducts[k].id;
                  if (responseProducts[k].clickTrackingURL) {
                    var clickTrackURL = responseProducts[k].clickTrackingURL;
                    responseData.data[`${productId}`] = clickTrackURL;
                  }
                  returnProdArray.push(productId);
              }
            }

            // --- Test - Dummy Data
            // returnProdArray = ['10282075', '10275933'];
            document.querySelector('ul.grid_mode.grid').setAttribute('data-bo101-products', returnProdArray);
          }
          //loop through all products within recommendedProducts & check ID vs. list
          //default to max products in view
          //if there's a match apply CSS and bring to top of page
          //within each product object, get clickTrackingURL and fire pageview via AJAX if the click on the product or add to bag
        }
      });
    }
  }

}
  

export const checkListProductsAndUpdate = (prevOrderedProducts, productContainer) => {
  const { ID, VARIATION } = shared;

  let allProducts = document.querySelector('.product_listing_container').querySelectorAll('ul.grid_mode.grid li');
console.log(allProducts);
  for (let i = 0; i < allProducts.length; i += 1) {
    let prod = allProducts[i];
    let prodId = '';
    if (prod.querySelector('.estore_product_container')) {
      // --- PLP
      prodId = prod.querySelector('.estore_product_container').getAttribute('data-productid').replace('.P', '');
    } else {
      // --- SRP
      if (prod.hasAttribute('data-productid')) {
        prodId = prod.getAttribute('data-productid').replace('.P', '');
      }
      
    }
    
    let prodName = '';
    if (prod.querySelector('input')) {
      prod.querySelector('input').getAttribute('value');
    }

    if (prevOrderedProducts.indexOf(`${prodId}`) > -1) {
      prod.classList.add(`${ID}-previously-bought`);
      prod.querySelector('.button_text.button_text_redesign.desktop').innerText = 'Buy Again';
      prod.querySelector('.button_text.button_text_redesign.mobile').innerText = 'Buy Again';

      // --- CLICK EVENTS 
      prod.querySelector('.button_text.button_text_redesign.desktop').addEventListener('click', (e) => {
        fireEvent('Click - Buy Again CTA - desktop');
      });
      prod.querySelector('.button_text.button_text_redesign.mobile').addEventListener('click', (e) => {
        fireEvent('Click - Buy Again CTA - mobile');
      });

      // --- NEW - CLICK EVENT ON PRODUCT TILE
      prod.addEventListener('click', (e) => {
        fireEvent(`Click - On Product Tile - ${prodId}`);
        // --- CLICK TRACKING URL
        if (!!responseData.data[`${prodId}`]) {
          sendClickTrackingURL(prodId, responseData.data[`${prodId}`]);
        }
      });
      
      if (window.location.href.indexOf('searchTerm') > -1) {
      document.querySelector('.product_listing_container').querySelector('ul').insertAdjacentElement('afterbegin', prod);
      }
    }

    prod.classList.add(`${ID}-prod-checked`);
  }

}

export const plpPageObserver = () => {
  const { ID, VARIATION } = shared;
  //  /**
  //    * @desc Observe URL changes and re-attach content observer
  //    * and new content
  //    */
  //   let oldHref = document.location.href;
  //   let bodyList = document.querySelector("body");
  //   const observerUrl = new MutationObserver(function(mutations) {
  //         mutations.forEach(function(mutation) {
  //             if (oldHref != document.location.href) {
  //                 oldHref = document.location.href;
                  
  //                 observer.connect(document.querySelector('.product_listing_container ul'), () => {
  //                   // console.log('SOMETHING HAS CHANGED-------');
  //                   setTimeout(() => {
  //                     pollerLite([
  //                       '.product_listing_container',
  //                       '.product_listing_container ul li',
  //                     ], activate);
  //                   }, 500);
                    
  //                 }, {
  //                   throttle: 200,
  //                   config: {
  //                     attributes: false,
  //                     childList: true,
  //                     // subtree: true,
  //                   },
  //                 });
                
                  
                  

  //               ////////
  //             }
  //         });
  //     });
  //     const config = {
  //       childList: true,
  //       subtree: true
  //   };

  //   observerUrl.observe(bodyList, config);
  //   //=========

  //   document.querySelector('body').classList.add(`${ID}-observerUrl`);

}


export const srpObserver = (prodListCount) => {
  const { ID, VARIATION } = shared;

  const productContainer = document.querySelector('.product_listing_container');
  
  observer.connect(document.querySelector('.product_listing_container ul.grid_mode.grid'), () => {
    // console.log('SOMETHING HAS CHANGED-------');
    let previouslyBoughtIDs = document.querySelector('ul.grid_mode.grid').getAttribute('data-bo101-products');
    previouslyBoughtIDs = previouslyBoughtIDs.split(",");
    // --- Test - Dummy Data
    // previouslyBoughtIDs = ['10282075', '10275933'];
    // console.log(previouslyBoughtIDs);

    let allProducts = productContainer.querySelectorAll('ul.grid_mode.grid li');

    for (let i = 0; i < allProducts.length; i += 1) {
      let prod = allProducts[i];
      if (!prod.classList.contains(`${ID}-prod-checked`)) {
        let prodId = '';
        if (prod.querySelector('.estore_product_container')) {
          // --- PLP
          prodId = prod.querySelector('.estore_product_container').getAttribute('data-productid').replace('.P', '');
        } else {
          // --- SRP
          if (prod.hasAttribute('data-productid')) {
            prodId = prod.getAttribute('data-productid').replace('.P', '');
          }
          
        }
        
        let prodName = '';
        if (prod.querySelector('input')) {
          prod.querySelector('input').getAttribute('value');
        }
    
        if (previouslyBoughtIDs.indexOf(`${prodId}`) > -1
        && !prod.classList.contains(`${ID}-previously-bought`)) {
          fireEvent('Previously Bought Did Trigger')
          prod.classList.add(`${ID}-previously-bought`)
          // prod.querySelector('.button_text').innerText = 'Buy Again';
          prod.querySelector('.button_text.button_text_redesign.desktop').innerText = 'Buy Again';
          prod.querySelector('.button_text.button_text_redesign.mobile').innerText = 'Buy Again';

          // --- CLICK EVENTS 
          prod.querySelector('.button_text.button_text_redesign.desktop').addEventListener('click', (e) => {
            fireEvent('Click - Buy Again CTA - desktop');
          });
          prod.querySelector('.button_text.button_text_redesign.mobile').addEventListener('click', (e) => {
            fireEvent('Click - Buy Again CTA - mobile');
          });

          // --- CLICK TRACKING URL
          if (!!responseData.data[`${prodId}`]) {
            sendClickTrackingURL(prodId, responseData.data[`${prodId}`]);
          }
        }
    
        if (i == allProducts.length - 1) {
          prod.classList.add(`${ID}-last-list-prod`);
          prod.classList.add(`${ID}-last-prod__${prodListCount}`);
          prodListCount += 1;
        }
    
        prod.classList.add(`${ID}-prod-checked`);
      }

    }
  }, {
    throttle: 200,
    config: {
      attributes: false,
      childList: true,
      // subtree: true,
    },
  });
}