/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;
let debug = false;
let currencyCode = '£';
if (window.location.href.indexOf('mamasandpapas.ie') > -1) {
  currencyCode = '€';
}

const insertRecs = (data, title, placement, attachPoint, attachPointType, carouselStyleOverride, addToCartButton, variation) => {
  logMessage('Carousel Recs Data: ');
  logMessage(data);

  let widgetID = data.wId;
  let feedID = data.fId;
  let startCarousel = true;

  let recs = data.slots;
  let numSlides = recs.length;
  let progressWidth = 100 / (numSlides - 6.5);
  let categoryInsertOverride = '';

  if (placement == 'PLP' && window.outerWidth < 992) {
    recs = recs.slice(0, 4);
    startCarousel = true;
    categoryInsertOverride = '.filters-toolbar-wrapper';
  }

  let carouselHTML = `
  
    <div class="mpt-recs" style="${carouselStyleOverride}">
    
      <h2>${title} ${debug == true ? `(Debug Mode)` : ``}</h2>
      
      <button class="mpt-recs--prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18" fill="none"><path d="M12.1901 5.43986C12.1901 5.52653 12.1568 5.6032 12.0901 5.66986L8.16012 9.59986L12.0901 13.5299C12.1568 13.5965 12.1901 13.6732 12.1901 13.7599C12.1901 13.8465 12.1568 13.9232 12.0901 13.9899L11.5901 14.4899C11.5235 14.5565 11.4468 14.5899 11.3601 14.5899C11.2735 14.5899 11.1968 14.5565 11.1301 14.4899L6.47012 9.82986C6.40345 9.7632 6.37012 9.68653 6.37012 9.59986C6.37012 9.5132 6.40345 9.43653 6.47012 9.36986L11.1301 4.70986C11.1968 4.6432 11.2735 4.60986 11.3601 4.60986C11.4468 4.60986 11.5235 4.6432 11.5901 4.70986L12.0901 5.20986C12.1568 5.27653 12.1901 5.3532 12.1901 5.43986Z" fill="#717171"/></svg></button>
      <button class="mpt-recs--next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none"><path d="M11.7902 9.59986C11.7902 9.68653 11.7569 9.7632 11.6902 9.82986L7.03021 14.4899C6.96355 14.5565 6.88688 14.5899 6.80021 14.5899C6.71355 14.5899 6.63688 14.5565 6.57021 14.4899L6.07021 13.9899C6.00355 13.9232 5.97021 13.8465 5.97021 13.7599C5.97021 13.6732 6.00355 13.5965 6.07021 13.5299L10.0002 9.59986L6.07021 5.66986C6.00355 5.6032 5.97021 5.52653 5.97021 5.43986C5.97021 5.3532 6.00355 5.27653 6.07021 5.20986L6.57021 4.70986C6.63688 4.6432 6.71355 4.60986 6.80021 4.60986C6.88688 4.60986 6.96355 4.6432 7.03021 4.70986L11.6902 9.36986C11.7569 9.43653 11.7902 9.5132 11.7902 9.59986Z" fill="#717171"/></svg></button>

      <div class="mpt-recs--carousel" data-dy-widget-id="${widgetID}" data-dy-feed-id="${feedID}">
      
        ${recs
          .map((product) => {
            let rec = product.item;

            let newIn = false;
            if (rec.keywords.indexOf('New In!') > -1) {
              newIn = true;
            }
            let diff = 0;
            if (rec.compare_price !== '0.00' && rec.compare_price !== '') {
              let checkRecPrice = parseFloat(rec.price);
              let checkWasPrice = parseFloat(rec.compare_price);
              diff = checkWasPrice - checkRecPrice;

              let integerResult = diff - Math.floor(diff) !== 0;

              if (integerResult) {
                diff = currencyCode + diff.toFixed(2);
              } else {
                diff = currencyCode + diff.toFixed(0);
              }
            }

            let compareRecPrice = rec.compare_price;
            compareRecPrice = parseFloat(compareRecPrice);
            let compareRecPriceResult = compareRecPrice - Math.floor(compareRecPrice) !== 0;
            if (compareRecPriceResult) {
              compareRecPrice = currencyCode + compareRecPrice.toFixed(2);
            } else {
              compareRecPrice = currencyCode + compareRecPrice.toFixed(0);
            }

            let recPrice = rec.price;
            recPrice = parseFloat(recPrice);
            let recPriceResult = recPrice - Math.floor(recPrice) !== 0;
            if (recPriceResult) {
              recPrice = currencyCode + recPrice.toFixed(2);
            } else {
              recPrice = currencyCode + recPrice.toFixed(0);
            }

            let lozengeHTML = '';
            if (diff !== 0 && newIn == false) {
              lozengeHTML = `<span class="mpt-saletag">Sale</span>`;
            } else if (newIn == true) {
              lozengeHTML = `<span class="mpt-newintag">New In!</span>`;
            }

            return `
                
                  <div data-href="${rec.url}" data-sku="${rec.sku}" data-dy-product-id="${rec.sku}" data-dy-strategy-id="${
              product.strId
            }" class="mpt-recs--carouselitem">

                    <a href="${rec.url}">
                      <div class="mpt-recs--carouselitem--image">
                        ${lozengeHTML}
                        <img src="${rec.image_url}" alt="${rec.name} image" />
                      </div>
                      <div class="mpt-recs--carouselitem--content">
                      
                        <p class="mpt-recs--carouselitem--contentname" title="${rec.name}">${rec.name}</p>
                        <p class="mpt-recs--carouselitem--contentprice">${recPrice}${
              rec.compare_price !== '0.00' && rec.compare_price !== ''
                ? `<span class="mpt-recs--carouselitem--contentprice--was">Was ${compareRecPrice}</span>`
                : ``
            }</p>
                        ${
                          diff !== 0
                            ? `<p class="mpt-recs--carouselitem--contentsaving">Save ${diff}</p>`
                            : `<p class="mpt-recs--carouselitem--contentsaving">&nbsp;</p>`
                        }
                      </div>
                    </a> 
                    ${addToCartButton == true ? `<button class="mpt-recs--carouselitem--addtocart">Add to cart</button>` : ``}

                  </div>
                
                `;
          })
          .join('')}
      
      </div>  
      
    </div>
  
  `;

  let insertionPoint = document.querySelector(attachPoint);
  if (categoryInsertOverride !== '') {
    insertionPoint = document.querySelector(categoryInsertOverride);
    insertionPoint = insertionPoint.insertAdjacentHTML('beforebegin', carouselHTML);
  } else {
    insertionPoint.insertAdjacentHTML(attachPointType, carouselHTML);
  }

  let slidesToShow = 6.5;
  if (window.outerWidth < 1024) {
    slidesToShow = 5.5;
  } else if (window.outerWidth < 992) {
    slidesToShow = 4.5;
  } else if (window.outerWidth < 768) {
    slidesToShow = 3.5;
  } else if (window.outerWidth < 600) {
    slidesToShow = 2.5;
  } else if (window.outerWidth < 480) {
    slidesToShow = 1.5;
  }

  if (startCarousel == true) {
    $(`.mpt-recs--carousel`).slick({
      infinite: false,
      slidesToShow: slidesToShow,
      slidesToScroll: 3,
      dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5.5,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4.5,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3.5,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2.5,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1.5,
            slidesToScroll: 1,
          },
        },
      ],
    });

    // register DY elements

    let carousel = document.querySelector(`.mpt-recs--carousel`);
    window.DYO.recommendations.registerElements(carousel);

    let prevArrow = document.querySelector(`.mpt-recs--prev`);
    let nextArrow = document.querySelector(`.mpt-recs--next`);

    prevArrow.addEventListener('click', () => {
      window.jQuery(`.mpt-recs--carousel`).slick('slickPrev');
      fireEvent(`Click - carousel prev arrow clicked`);
    });

    nextArrow.addEventListener('click', () => {
      window.jQuery(`.mpt-recs--carousel`).slick('slickNext');
      fireEvent(`Click - carousel next arrow clicked`);
    });
  } else {
    document.querySelector(`.mpt-recs`).classList.add(`mpt-recs--plplayout`);
  }

  document.body.addEventListener('click', (e) => {
    if (
      (e.target.closest(`.mpt-recs--carouselitem`) || e.target.classList.contains(`mpt-recs--carouselitem`)) &&
      !e.target.classList.contains(`mpt-recs--carouselitem--addtocart`)
    ) {
      fireEvent(
        `Click - product from carousel on [${placement}] clicked to go to ${
          e.target.closest(`.mpt-recs--carouselitem > a`).href
        }`,
        true
      );
    }

    if (e.target.classList.contains(`mpt-recs--carouselitem--addtocart`)) {
      e.preventDefault();
      let atcSKU = e.target.closest(`.mpt-recs--carouselitem`).getAttribute('data-sku');
      let productHref = e.target.closest(`.mpt-recs--carouselitem`).getAttribute('data-href');
      checkSKUForAdding(atcSKU, productHref);
      fireEvent(
        `Click - add to cart button from carousel on [${placement}] clicked for SKU: [${atcSKU}] with href: [${productHref}]`,
        true
      );
    }
  });

  fireEvent(`Interaction - carousel placed on [${placement}] using strategy: ${data.wId}`, true);
};

const checkSKUForAdding = (sku, href) => {
  let productID = sku;
  let variantID = ``;
  let serviceID = ``;
  let cartID = window.getAPISessionId();

  let theData = {};

  fetch(href)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(returnedData => {
    // Parse returned data as HTML
    const parser = new DOMParser();
    const returnedPage = parser.parseFromString(returnedData, 'text/html');
    console.log('RETURNED PAGE:', returnedPage);

    // Extract necessary data
    const prodTemplate = returnedPage.getElementById('ProductJson-product-template');
    const json = JSON.parse(prodTemplate.innerText);
    const tags = json.tags;
    let serviceID = '';
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      if (tag.indexOf('SHIPPING|cserviceid|') > -1) {
        serviceID = tag.replace('SHIPPING|cserviceid|', '');
        break;
      }
    }

    const theProductName = returnedPage.querySelector('.product-single__title').innerText;

    // Handle different scenarios based on the presence of selectors
    if (returnedPage.querySelector('.single-option-selector')) {
      const allSingleOptionSelectors = Array.from(returnedPage.querySelectorAll('.single-option-selector'));
      const sizeModalHTML = `
        // Your size modal HTML template here
      `;
      document.body.insertAdjacentHTML('beforeend', sizeModalHTML);
      document.documentElement.classList.add(`mpt-noscroll`);

      // Add event listeners for size selection and modal closing
      document.documentElement.addEventListener('click', (e) => {
        // Handle click events
      });
    } else {
      // Handle scenario where single-option-selector is not found
      const variantID = returnedPage.getElementById('ProductSelect-product-template').querySelector('option').getAttribute('value');
      const theData = {
        form_type: 'product',
        utf8: '✓',
        size: '',
        id: variantID,
        'properties[_serviceId]': serviceID,
        'product-id': productID,
        'properties[_cartid]': cartID,
      };

      processAddToBag(theData);
      fireEvent(`Click - add to bag button clicked for ${theProductName}`, true);
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

  const processAddToBag = (theData) => {
    fetch('https://www.mamasandpapas.com/cart/add.js', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(theData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      window.location.reload(); // Reload the window upon successful response
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  };

 
};



const getRecs = (strategy) => {
  logMessage('Recs API call made');
  return new Promise((resolve) => {
    window.DYO.recommendationWidgetData(strategy, { maxProducts: 20 }, function (error, data) {
      logMessage("strategy");
      logMessage(strategy);
      logMessage("data");
      logMessage(data);
      // //get cart items
      if (!window.location.pathname.includes('cart')) {
        resolve(data);
        return;
      }
      fetch('/cart.js')
        .then((response) => response.json())
        .then((cartData) => {
          let cartItems = cartData.items;
          let cartItemSKUs = [];
          for (let i = 0; i < cartItems.length; i++) {
            let cartItem = cartItems[i];
            cartItemSKUs.push(cartItem.product_id);
          }
          const filteredRecs = data.slots.filter((rec) => {
            let recSKU = rec.item.group_id;
            return !cartItemSKUs.includes(Number(recSKU));
          });
          data.slots = filteredRecs;
          resolve(data);
        })
        .catch((error) => {
          console.log('error:', error);
        });
    });
  });
};

const createCarousel = (
  strategy,
  fallback,
  placement,
  title,
  attachPoint,
  attachPointType,
  carouselStyleOverride,
  addToCartButton,
  variation
) => {
  getRecs(strategy).then((data) => {
    if (data && data.slots.length > 5) {
      insertRecs(data, title, placement, attachPoint, attachPointType, carouselStyleOverride, addToCartButton, variation);
    } else {
      getRecs(fallback).then((fallbackData) => {
        const newData = [...data.slots, ...fallbackData.slots];
        console.log('🚀 ~ getRecs ~ newData:', newData);
        const removeDuplicates = (array, property) =>
          array.filter((obj, index, self) => self.findIndex((o) => o.item[property] === obj.item[property]) === index);
        const uniqueProducts = removeDuplicates(newData, 'sku');
        console.log('🚀 ~ getRecs ~ uniqueProducts:', uniqueProducts);
        data.slots = uniqueProducts;
        insertRecs(data, title, placement, attachPoint, attachPointType, carouselStyleOverride, addToCartButton, variation);
      });
    }
  });
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-PVM1K635XR';

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if (debug == true) {
    // Homepage Recs Object (DEBUG)
    window.recsObject = {
      recsStrategy: '204157',
      fallbackStrategy: '204157',
      recsTitle: 'Recommended For You',
      placement: 'Homepage',
      attachPoint: '#BL-Area',
      attachPointType: 'afterend',
      carouselStyleOverride: '40px 0',
      addToCartButton: false,
    };

    // Cart Recs Object (DEBUG)
    // window.recsObject = {
    //   recsStrategy: '202543',
    //   fallbackStrategy: '202543',
    //   recsTitle: 'Recommended For You',
    //   placement: 'Cart',
    //   attachPoint: '#shopify-section-footer',
    //   attachPointType: 'beforebegin',
    //   carouselStyleOverride: '',
    //   addToCartButton: 'true',
    //   variation: 'variation 1',
    // };

    // PDP Recs Object (DEBUG)
    // window.recsObject = {
    //   recsStrategy: '203904',
    //   fallbackStrategy: '200359',
    //   recsTitle: 'Recommended For You',
    //   placement: 'PDP',
    //   attachPoint: '.product-single__description',
    //   attachPointType: 'afterend',
    //   carouselStyleOverride: 'margin: 0 0 40px;',
    //   addToCartButton: false,
    //   variation: 'variation 2',
    // };

    // Collection Recs Object (DEBUG)
    // window.recsObject = {
    //   recsStrategy: '214047',
    //   fallbackStrategy: '214046',
    //   recsTitle: 'Recommended For You',
    //   placement: 'PLP',
    //   attachPoint: '#shopify-section-404-link-block > .csc-button-linkblock',
    //   attachPointType: 'afterbegin',
    //   carouselStyleOverride: 'margin: 0 0 40px;',
    //   addToCartButton: false,
    //   variation: 'variation 1',
    // };
  }

  pollerLite(
    [
      () => {
        return window.recsObject;
      },
    ],
    () => {
      pollerLite(
        [
          () => {
            return document.querySelector(window.recsObject.attachPoint);
          },
        ],
        () => {

          

          let recsStrategy = window.recsObject.recsStrategy;
          let fallbackStrategy = window.recsObject.fallbackStrategy;
          let placement = window.recsObject.placement;
          let recsTitle = window.recsObject.recsTitle;
          let attachPoint = window.recsObject.attachPoint;
          let attachPointType = window.recsObject.attachPointType;
          let carouselStyleOverride = window.recsObject.carouselStyleOverride;
          let addToCartButton = window.recsObject.addToCartButton == 'true' ? true : false;
          let variation = window.recsObject.variation;

          fireEvent(`Conditions Met - experiment started on ${placement}`, true);
          if (VARIATION == 'control') {
            fireEvent(`Conditions Met`);
            return;
          }
          console.log('RECSTRAT:', recsStrategy);
          createCarousel(
            recsStrategy,
            fallbackStrategy,
            placement,
            recsTitle,
            attachPoint,
            attachPointType,
            carouselStyleOverride,
            addToCartButton,
            variation
          );
        }
      );
    }
  );
};
