/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite, observer, setCookie, getCookie } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

let currFilteredProductsHolder, currPagination, sortedProds;
let experimentLoaded = false;
let currencySigns = {
  'en_EU': '€',
  'en_GB': '£',
  'en_US': '$'
};

const startExperiment = () => {

  if (window.location.href.indexOf('?_=pf') == -1 && window.location.href.indexOf('?sort=') == -1 && (window.location.pathname == '/collections/pushchairs' || window.location.pathname == '/collections/pushchairs/')) {
    logMessage("? not found, sort not found & pathname: " + window.location.pathname);
    setupPushchairsExperiment();

  } else if (window.location.href.indexOf('pf_t_other=DYtest:pushchairBundle') > -1 && (window.location.pathname == '/collections/pushchairs' || window.location.pathname == '/collections/pushchairs/')) {
    logMessage("? & pathname: " + window.location.pathname);
    showPushchairFilterItem();
    updateTag();

  } else if (window.location.href.indexOf('?sort=') > -1 && (window.location.pathname == '/collections/pushchairs' || window.location.pathname == '/collections/pushchairs/')) {
    logMessage("sort found & pathname: " + window.location.pathname);
    updateTag();

  } else {
    logMessage("? found & pathname: " + window.location.pathname);
    showPushchairFilterItem();
  }

  

}

const updateTag = () => {

  pollerLite(['.bc-sf-filter-selection-wrapper .selected-item'], () => {
    if (document.querySelector('.bc-sf-filter-selection-wrapper .selected-item strong').innerText == "DYtest:pushchairBundle") {
      document.querySelector('.bc-sf-filter-selection-wrapper .selected-item strong').innerText = "Bundles";
    }


  });

}

const setupPushchairsExperiment = () => {

  pollerLite(['#bc-sf-filter-products', '#bc-sf-filter-options-wrapper', '.filters-toolbar-wrapper', '.filters-toolbar__product-count'], () => {

    if (window.innerWidth > 767) {
      let filtersToolbar = document.querySelector('.filters-toolbar-wrapper');
      document.querySelector('#bc-sf-filter-right').insertAdjacentElement('afterbegin', filtersToolbar);
    }



    currFilteredProductsHolder = document.getElementById('bc-sf-filter-products');
    currPagination = document.getElementById('bc-sf-filter-bottom-pagination');

    let fullURL = `https://services.mybcapps.com/bc-sf-filter/filter?t=1646220967867&shop=mamas-papas-uk.myshopify.com&sort=manual&limit=70&&pf_t_category%5B%5D=Pushchair+Only&product_available=false&variant_available=false&event_type=init`;

    logMessage('Full URL used: ' + fullURL);

    currFilteredProductsHolder.insertAdjacentHTML('afterend', `
        
        <div class="${ID}-pushchair-takeover loading">
      
          <div class="${ID}-pushchair-takeover--loading">
            
            <svg width="38" height="38" class="${ID}-spinner" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#000">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="2">
                        <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                            
                        </path>
                    </g>
                </g>
            </svg>
            <p> Loading Products </p>
          </div>
        
          <div class="${ID}-pushchair-takeover--inner grid grid--uniform">
          

          </div>
        
        
        </div>
        
        `);

    let currentGetProductsXhr = $.ajax({
      cache: true,
      type: 'GET',
      url: fullURL,
      success: function (returnedData) {

        let products = returnedData.products;
        let ocarroArray = [];
        let airoArray = [];
        let stradaArray = [];
        let flipArray = [];
        let cybexArray = [];
        let joieArray = [];
        let bugabooArray = [];
        let babyzenArray = [];
        let restArray = [];
        products.map((product) => {
          if (product.title.toLowerCase().indexOf('ocarro') > -1) {
            ocarroArray.push(product);
          } else if (product.title.toLowerCase().indexOf('airo') > -1) {
            airoArray.push(product);
          } else if (product.title.toLowerCase().indexOf('strada') > -1) {
            stradaArray.push(product);
          } else if (product.title.toLowerCase().indexOf('flip') > -1) {
            flipArray.push(product);
          } else if (product.title.toLowerCase().indexOf('cybex') > -1) {
            cybexArray.push(product);
          } else if (product.title.toLowerCase().indexOf('joie') > -1) {
            joieArray.push(product);
          } else if (product.title.toLowerCase().indexOf('bugaboo') > -1) {
            bugabooArray.push(product);
          } else if (product.title.toLowerCase().indexOf('babyzen') > -1) {
            babyzenArray.push(product);
          } else {
            restArray.push(product);
          }
        });

        sortedProds = ocarroArray.concat(airoArray, stradaArray, flipArray, cybexArray, joieArray, bugabooArray, babyzenArray, restArray);
        sortedProds.reverse();
        setCookie(`${ID}-pushchair-origprods`, parseInt(document.querySelector('.filters-toolbar__product-count').innerText));
        setCookie(`${ID}-pushchair-prods`, sortedProds.length);
        document.querySelector('.filters-toolbar__product-count').innerHTML = `${sortedProds.length} products`;

        currFilteredProductsHolder.classList.add(`${ID}-hidden`);
        currPagination.classList.add(`${ID}-hidden`);

        

        sortedProds.map((product) => {

          let singleItemHTML = `
            
            <div class="${ID}-pushchair-takeover--item grid__item grid__item--collection-template-sub-category small--one-half medium-up--one-fifth">
              <div class="grid-view-item product-card">
                <a class="grid-view-item__link grid-view-item__image-container full-width-link" href="/collections/pushchairs/products/${product.handle}">
                  <span class="visually-hidden">${product.title}</span>
                </a>
                <style>#ProductCardImage-collection-template-sub-category-6173059743909 {
                    max-width: 207.0393374741201px;
                    max-height: 250px;
                  }
                
                  #ProductCardImageWrapper-collection-template-sub-category-6173059743909 {
                    max-width: 207.0393374741201px;
                  }
                </style>
                <div class="product-card__image-with-placeholder-wrapper" data-image-with-placeholder-wrapper="">
                <div id="ProductCardImageWrapper-collection-template-sub-category-6173059743909" class="grid-view-item__image-wrapper product-card__image-wrapper js">
                <div style="padding-top:120.74999999999999%;">
                  <img rel="preload" src="${product.images[1]}" id="ProductCardImage-collection-template-sub-category-6173059743909" class="grid-view-item__image lazyautosizes lazyloaded" alt="${product.title}" />
                </div>
                </div>
                <div class="placeholder-background placeholder-background--animation hide" data-image-placeholder=""></div>
                </div>
                <noscript>
                    <img rel="preload" class="grid-view-item__image" src="${product.images[1]}" alt="${product.title}" style="max-width: 207.0393374741201px;">
                  </noscript>
                <div class="h4 grid-view-item__title product-card__title" aria-hidden="true">${product.title}</div>
                <dl class="price price--on-sale" data-price="">
                  <div class="price__sale">
                    <dd><span class="price-item price-item--sale" data-sale-price=""><span class="${ID}-pushchair-takeover--frompricetext">From</span> <span class="${ID}-pushchair-takeover--price">${formatPrice(product.price_min)}</span></span> </dd>
                  </div>
                </dl>
                </div>
            </div>

            
            
          `;

          document.querySelector(`.${ID}-pushchair-takeover--inner`).insertAdjacentHTML('afterbegin', singleItemHTML);



        });

        pollerLite([
          () => { return document.querySelectorAll(`.${ID}-pushchair-takeover--item`).length > 20 },
        ], () => {
          document.querySelector(`.${ID}-pushchair-takeover--inner`).id = "bc-sf-filter-products";

          setTimeout(() => {
            document.querySelector(`.${ID}-pushchair-takeover`).classList.remove('loading');
          }, 2000);
          



          let bannerHTML = `
        
            <a href="https://www.mamasandpapas.com/collections/pushchairs?_=pf&pf_t_other=DYtest:pushchairBundle" class="${ID}-banner">
            
              <div class="${ID}-banner--content">
                
                <h2>Save with Bundles</h2>
                <p>From car seat to carrycot and beyond, get all your travel essentials in one place with our pushchair bundles. </p>
                <span class="${ID}-banner--contentlink">Shop Now</span>
              
              </div>

              ${window.innerWidth > 1300 ? '<img src="https://blcro.fra1.digitaloceanspaces.com/MAM-440/bundlesbanner.jpg" alt="bundles image" />' : '<img src="https://blcro.fra1.digitaloceanspaces.com/MAM-440/mobilebundlesbannerimage1.png" alt="mobile bundles image 1" /><img src="https://blcro.fra1.digitaloceanspaces.com/MAM-440/mobilebundlesbannerimage2.png" alt="mobile bundles image 2" />'}

            
            </div>        
          
          `;

          if(window.outerWidth > 1280) {
            document.querySelector(`.${ID}-pushchair-takeover--item:nth-of-type(9)`).insertAdjacentHTML('beforebegin', bannerHTML);
          } else if(window.outerWidth > 992 && window.outerWidth < 1279) {
            document.querySelector(`.${ID}-pushchair-takeover--item:nth-of-type(7)`).insertAdjacentHTML('beforebegin', bannerHTML);
          } else {
            document.querySelector(`.${ID}-pushchair-takeover--item:nth-of-type(5)`).insertAdjacentHTML('beforebegin', bannerHTML);
          }
            
          
         

          fireEvent('Visible - pushchair changes made', true);

          let bundleBanner = document.querySelector(`.${ID}-banner`);
          bundleBanner.addEventListener('click', () => {
            fireEvent(`Click - user has clicked on the bundles banner`, true);
          });

          let allItems = document.querySelectorAll(`.${ID}-pushchair-takeover--item a`);

          [].slice.call(allItems).forEach((item) => {
            item.addEventListener('click', (e) => {
              setCookie(`${ID}-last-prod-clicked`, e.currentTarget.href);
              fireEvent(`Click - user has clicked on one of the filtered pushchair only items to go to ${e.currentTarget.href}`, true);
            })
          });

          showFilteredPushchairSelector();
          showPushchairFilterItem();

          experimentLoaded = true;

          pollerLite(['.bc-sf-filter-clear-all'], () => {
            let clearAll = document.querySelector('.bc-sf-filter-clear-all');
            clearAll.onclick = "";
            clearAll.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
        
              window.location.href = "/collections/pushchairs/";
            })
          })

        });



      },
      error: function (xhr, textStatus, errorThrown) {
        logMessage("Error");
        logMessage(errorThrown);
        if (textStatus != "abort")
          console.error(textStatus + errorThrown);
      },
      complete: function (data) {
        currentGetProductsXhr = null;
      }
    });


  });



}

const showFilteredPushchairSelector = () => {

  if(!document.querySelector(`.${ID}-pushchair-filter`)) {
    let filterHTML = ``;
    if(!document.querySelector('.bc-sf-filter-selection-wrapper')) {
      filterHTML = `
            
        <div class="bc-sf-filter-selection-wrapper ${ID}-pushchair-filter">
            
            <div class="bc-sf-filter-selected-items">
              <div class="selected-item bc-sf-filter-option-label">
              <a href="#" id="${ID}-pushchair-remove">
                <span class="selected-type"><span>Category</span>: <strong>Pushchairs</strong></span><span class="bc-sf-filter-clear"></span>
              
              </a></div>
            </div>
        </div>
      
      `;
      document.getElementById('bc-sf-filter-tree').insertAdjacentHTML('afterbegin', filterHTML);
    } else {
      filterHTML = `
            

              <div class="selected-item bc-sf-filter-option-label">
                <a href="#" id="${ID}-pushchair-remove">
                  <span class="selected-type"><span>Category</span>: <strong>Pushchairs</strong></span><span class="bc-sf-filter-clear"></span>
                
                </a>
              </div>
      
      `;
      document.querySelector('.bc-sf-filter-selected-items').insertAdjacentHTML('beforeend', filterHTML);
    }
    

    

    let removePushchairElement = document.getElementById(`${ID}-pushchair-remove`);
    removePushchairElement.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.querySelector(`.${ID}-pushchair-filter`).classList.add(`${ID}-hidden`);
      document.querySelector(`.${ID}-banner`).classList.add(`${ID}-hidden`);
      document.querySelector(`.${ID}-pushchair-takeover`).classList.add(`${ID}-hidden`);
      currPagination.classList.remove(`${ID}-hidden`);
      currFilteredProductsHolder.classList.remove(`${ID}-hidden`);
      let pushchairFilterElement = document.getElementById(`${ID}-filterbypushchairs`);
      pushchairFilterElement.classList.remove('selected');
      document.querySelector('.filters-toolbar__product-count').innerHTML = `${getCookie(`${ID}-pushchair-origprods`)} products`;
    });



    document.querySelector('a[data-title="Pushchairs"]').closest('li').remove();
    document.querySelector('a[data-title="Pushchair"]').closest('li').remove();

  }

}

const showPushchairFilterItem = () => {

    pollerLite(['.bc-sf-filter-option-block[data-id="pf_t_category"]'], () => {



      let travelAccessoriesFilter = document.querySelector('.bc-sf-filter-option-block[data-id="pf_t_category"]').querySelector('li');
      let pushchairFilter = travelAccessoriesFilter.cloneNode(true);
      pushchairFilter.querySelector('a').id = `${ID}-filterbypushchairs`;
      pushchairFilter.querySelector('a').setAttribute('data-title', 'Pushchairs');
      pushchairFilter.querySelector('a').setAttribute('aria-label', 'Pushchairs');
      pushchairFilter.querySelector('a').removeAttribute('onclick');
      pushchairFilter.querySelector('a').removeAttribute('data-value');
      if (window.location.href.indexOf('?_=pf') == -1 && (window.location.pathname == '/collections/pushchairs' || window.location.pathname == '/collections/pushchairs/')) {
        pushchairFilter.querySelector('a').classList.add('selected');
      }
      pushchairFilter.querySelector('a').href = "#";
  
      pushchairFilter.querySelector('.bc-sf-filter-option-value').innerHTML = "Pushchairs";
      pushchairFilter.querySelector('.bc-sf-filter-option-amount').innerHTML = `(${getCookie(`${ID}-pushchair-prods`)})`;
  
      travelAccessoriesFilter.insertAdjacentElement('afterend', pushchairFilter);
  
  
  
  
  
      pushchairFilter.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.location.href.indexOf('?_=pf') > -1 && (window.location.pathname == '/collections/pushchairs' || window.location.pathname == '/collections/pushchairs/')) {
          window.location.href = "/collections/pushchairs";
        } else {
          document.querySelector(`.${ID}-pushchair-filter`).classList.remove(`${ID}-hidden`);
          document.querySelector(`.${ID}-banner`).classList.remove(`${ID}-hidden`);
          document.querySelector(`.${ID}-pushchair-takeover`).classList.remove(`${ID}-hidden`);
          currPagination.classList.add(`${ID}-hidden`);
          currFilteredProductsHolder.classList.add(`${ID}-hidden`);
          let pushchairFilterElement = document.getElementById(`${ID}-filterbypushchairs`);
          pushchairFilterElement.classList.add('selected');
          document.querySelector('.filters-toolbar__product-count').innerHTML = `${getCookie(`${ID}-pushchair-prods`)} products`;
        }
  
  
      });
  
  
    });
  
  

}

const formatPrice = (price) => {

  let defaultCurrency = '£';

  let currencySign = currencySigns[DY.recommendationContext.lng] || defaultCurrency;

  if (DY.recommendationContext.lng === 'en_EU') {
    price = price.replace('.', ',');
  }

  price = parseFloat(price).toFixed(2);
  price = currencySign + price;

  return price;
}

export default () => {

  setup();

  logMessage(ID + " Variation: " + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if (document.body.classList.contains('template-collection')) {



    startExperiment();

    pollerLite(['#bc-sf-filter-tree', '#bc-sf-filter-top-sorting'], () => {
      // observer for the filter tree
      observer.connect(document.getElementById('bc-sf-filter-tree'), (e) => {

        setTimeout(() => {
          if (!document.getElementById(`${ID}-filterbypushchairs`) && window.location.href.indexOf('?sort=') == -1) {
            showPushchairFilterItem();
            
            if (window.location.href.indexOf('?_=pf') > -1 && (window.location.pathname == '/collections/pushchairs' || window.location.pathname == '/collections/pushchairs/')) {
              document.getElementById(`${ID}-filterbypushchairs`).classList.remove('selected');
              document.querySelector(`.${ID}-pushchair-takeover--inner`).id = "";
              document.querySelector(`.${ID}-pushchair-takeover`).classList.add(`${ID}-hidden`);
              currFilteredProductsHolder.classList.remove(`${ID}-hidden`);
              currPagination.classList.remove(`${ID}-hidden`);
              updateTag();
              pollerLite(['.bc-sf-filter-clear-all'], () => {
                let clearAll = document.querySelector('.bc-sf-filter-clear-all');
                clearAll.onclick = "";
                clearAll.addEventListener('click', (e) => {
                  e.preventDefault();
                  e.stopPropagation();
  
                  window.location.href = "/collections/pushchairs/";
                })
              })
              
            } else if (window.location.href.indexOf('?_=pf') == -1 && experimentLoaded !== false && (window.location.pathname == '/collections/pushchairs' || window.location.pathname == '/collections/pushchairs/')) {
              showPushchairFilterItem();
              showFilteredPushchairSelector();
              document.querySelector(`.${ID}-pushchair-takeover`).classList.remove(`${ID}-hidden`);
              currPagination.classList.add(`${ID}-hidden`);
              currFilteredProductsHolder.classList.add(`${ID}-hidden`);
              document.querySelector('.filters-toolbar__product-count').innerHTML = `${getCookie(`${ID}-pushchair-origprods`)} products`;
              document.querySelector(`.${ID}-pushchair-takeover--inner`).id = "bc-sf-filter-products";
              document.querySelector(`.${ID}-pushchair-takeover`).classList.remove(`${ID}-hidden`);
              
            }
          }



          
        }, 500);



      }, {
        config: {
          attributes: true,
          childList: true,
          subtree: true,
        }
      });

      // observer for the sort method
      observer.connect(document.getElementById('bc-sf-filter-top-sorting'), (e) => {
        setTimeout(() => {
          if (window.location.href.indexOf('?sort=') > -1 && (window.location.pathname == '/collections/pushchairs' || window.location.pathname == '/collections/pushchairs/')) { 
            document.querySelector(`#${ID}-pushchair-remove`).click();
            document.querySelector(`#${ID}-filterbypushchairs`).remove();
          }
        }, 500);
      }, {
        config: {
          attributes: true,
          childList: true,
          subtree: true,
        }
      });

      // observer for orientation change

      window.addEventListener('orientationchange', (e) => {
        window.location.reload();
      })


    });

  }

  else if (document.body.classList.contains('template-product')) {
    if(document.referrer.indexOf('/collections/pushchairs') > -1) {

      pollerLite(['button[type="submit"].product-form__cart-submit'], () => {

        document.querySelector('button[type="submit"].product-form__cart-submit').addEventListener('click', (e) => {
          fireEvent(`Click - user has clicked add to cart on PDP after clicking on pushchair from PLP - pushchair url: ${getCookie(`${ID}-last-prod-clicked`)}`, true);
        });

      })

    }
  }


};
