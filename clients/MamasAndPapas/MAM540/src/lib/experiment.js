/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
let currencyCode = '£';
if (window.location.href.indexOf('mamasandpapas.ie') > -1) {
  currencyCode = '€';
}

// const qlSVG = `
// <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
//   <path d="M11.3846 0H2.23075C1.65951 0 1.11168 0.226922 0.707751 0.630847C0.303827 1.03477 0.0769043 1.58261 0.0769043 2.15385V13.4615C0.0769043 13.6043 0.133635 13.7413 0.234616 13.8423C0.335597 13.9433 0.472557 14 0.615366 14H10.3077C10.4505 14 10.5874 13.9433 10.6884 13.8423C10.7894 13.7413 10.8461 13.6043 10.8461 13.4615C10.8461 13.3187 10.7894 13.1818 10.6884 13.0808C10.5874 12.9798 10.4505 12.9231 10.3077 12.9231H1.15383C1.15383 12.6375 1.26729 12.3635 1.46925 12.1616C1.67121 11.9596 1.94513 11.8462 2.23075 11.8462H11.3846C11.5274 11.8462 11.6644 11.7894 11.7653 11.6884C11.8663 11.5875 11.9231 11.4505 11.9231 11.3077V0.538462C11.9231 0.395653 11.8663 0.258693 11.7653 0.157712C11.6644 0.0567306 11.5274 0 11.3846 0ZM10.8461 10.7692H2.23075C1.85258 10.7687 1.48101 10.8683 1.15383 11.058V2.15385C1.15383 1.86823 1.26729 1.59431 1.46925 1.39235C1.67121 1.19038 1.94513 1.07692 2.23075 1.07692H10.8461V10.7692Z" fill="#333333"/>
// </svg>`
const qlSVG = `
<img src="https://blcro.fra1.digitaloceanspaces.com/MAM540/MAM540-QL.svg" />`

// let windowObj = {
//   "/collections/pushchair-accessories": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/pushchair-accessories-what-do-you-need",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/nursery": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/how-to-style-and-furnish-your-babys-nursery",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/christmas": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/our-top-10-christmas-gift-ideas",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/car-seats": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/choosing-the-perfect-car-seat-for-your-baby",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/night-lights": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/choosing-the-best-nightlight",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/toys-gifts-by-recipient": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/the-ultimate-baby-gift-guide",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/baby-books": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/best-bed-time-reads-for-your-little-one",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/furniture": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/designing-your-perfect-nursery",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/soft-baby-toys": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/all-about-mamas-papas-soft-toys",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/baby-clothing": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/seasonal-new-born-clothing-buying-guide",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/bathing-changing": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/our-better-nights-sleep-shopping-guide",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/pushchairs": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/pushchair-buying-guide",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/highchairs": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/choosing-the-right-high-chair-for-weaning",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/bedside-cribs": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/bedside-cribs-everything-you-need",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/feeding-weaning": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/tips-and-products-for-bottle-breast-feeding",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/buggies-strollers": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/which-compact-travel-stroller-is-best-for-your-holiday",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   },
//   "/collections/baby-toys": {
//     "link": "https://www.mamasandpapas.com/blogs/advice-guidance/toys-theyll-want-to-play-with-everyday",
//     'buttonText': 'Pushchair Accessories',
//     'strategy': '206529'
//   }
// }

const getRecs = (strategy) => {
  logMessage('Recs API call made');
  return new Promise((resolve) => {
    window.DYO.recommendationWidgetData(strategy, { maxProducts: 20 }, function (error, data) {
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
          //console.log('🚀 ~ data', data);
          const filteredRecs = data.slots.filter((rec) => {
            let recSKU = rec.item.group_id;
            return !cartItemSKUs.includes(Number(recSKU));
          });
          data.slots = filteredRecs;
          // console.log('🚀 ~ file: experiment.js:426 ~ .then ~ data:', data);
          resolve(data);
        })
        .catch((error) => {
          console.log('error:', error);
        });
    });
  });
};

const insertRecs = (data, title, placement, attachPoint, attachPointType, carouselStyleOverride, addToCartButton, variation) => {
  logMessage('Carousel Recs Data: ');
  logMessage(data);

  let debug = false;
  let widgetID = data.wId;
  let feedID = data.fId;
  let startCarousel = true;

  let recs = data.slots;
  let numSlides = recs.length;
  let progressWidth = 100 / (numSlides - 6.5);
  let categoryInsertOverride = '';

  if (placement == 'PLP' && window.outerWidth < 992) {
    recs = recs.slice(0, 4);
    startCarousel = false;
    categoryInsertOverride = '.filters-toolbar-wrapper';
  }

  let carouselHTML = `
  
    <div class="${ID}-recs" style="${carouselStyleOverride}">
    
      <h2>${title} ${debug == true ? `(Debug Mode)` : ``}</h2>
      
      <button class="${ID}-recs--prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18" fill="none"><path d="M12.1901 5.43986C12.1901 5.52653 12.1568 5.6032 12.0901 5.66986L8.16012 9.59986L12.0901 13.5299C12.1568 13.5965 12.1901 13.6732 12.1901 13.7599C12.1901 13.8465 12.1568 13.9232 12.0901 13.9899L11.5901 14.4899C11.5235 14.5565 11.4468 14.5899 11.3601 14.5899C11.2735 14.5899 11.1968 14.5565 11.1301 14.4899L6.47012 9.82986C6.40345 9.7632 6.37012 9.68653 6.37012 9.59986C6.37012 9.5132 6.40345 9.43653 6.47012 9.36986L11.1301 4.70986C11.1968 4.6432 11.2735 4.60986 11.3601 4.60986C11.4468 4.60986 11.5235 4.6432 11.5901 4.70986L12.0901 5.20986C12.1568 5.27653 12.1901 5.3532 12.1901 5.43986Z" fill="#717171"/></svg></button>
      <button class="${ID}-recs--next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none"><path d="M11.7902 9.59986C11.7902 9.68653 11.7569 9.7632 11.6902 9.82986L7.03021 14.4899C6.96355 14.5565 6.88688 14.5899 6.80021 14.5899C6.71355 14.5899 6.63688 14.5565 6.57021 14.4899L6.07021 13.9899C6.00355 13.9232 5.97021 13.8465 5.97021 13.7599C5.97021 13.6732 6.00355 13.5965 6.07021 13.5299L10.0002 9.59986L6.07021 5.66986C6.00355 5.6032 5.97021 5.52653 5.97021 5.43986C5.97021 5.3532 6.00355 5.27653 6.07021 5.20986L6.57021 4.70986C6.63688 4.6432 6.71355 4.60986 6.80021 4.60986C6.88688 4.60986 6.96355 4.6432 7.03021 4.70986L11.6902 9.36986C11.7569 9.43653 11.7902 9.5132 11.7902 9.59986Z" fill="#717171"/></svg></button>

      <div class="${ID}-recs--carousel" data-dy-widget-id="${widgetID}" data-dy-feed-id="${feedID}">
      
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
              lozengeHTML = `<span class="${ID}-saletag">Sale</span>`;
            } else if (newIn == true) {
              lozengeHTML = `<span class="${ID}-newintag">New In!</span>`;
            }

            return `
                
                  <div data-href="${rec.url}" data-sku="${rec.sku}" data-dy-product-id="${rec.sku}" data-dy-strategy-id="${
              product.strId
            }" class="${ID}-recs--carouselitem">

                    <a href="${rec.url}">
                      <div class="${ID}-recs--carouselitem--image">
                        ${lozengeHTML}
                        <img src="${rec.image_url}" alt="${rec.name} image" />
                      </div>
                      <div class="${ID}-recs--carouselitem--content">
                      
                        <p class="${ID}-recs--carouselitem--contentname" title="${rec.name}">${rec.name}</p>
                        <p class="${ID}-recs--carouselitem--contentprice">${recPrice}${
              rec.compare_price !== '0.00' && rec.compare_price !== ''
                ? `<span class="${ID}-recs--carouselitem--contentprice--was">Was ${compareRecPrice}</span>`
                : ``
            }</p>
                        ${
                          diff !== 0
                            ? `<p class="${ID}-recs--carouselitem--contentsaving">Save ${diff}</p>`
                            : `<p class="${ID}-recs--carouselitem--contentsaving">&nbsp;</p>`
                        }
                      </div>
                    </a> 
                    ${addToCartButton == true ? `<button class="${ID}-recs--carouselitem--addtocart">Add to cart</button>` : ``}

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

  let slidesToShow = 4.5;
  if (window.outerWidth < 1024) {
    slidesToShow = 4.5;
  } else if (window.outerWidth < 992) {
    slidesToShow = 4.5;
  } else if (window.outerWidth < 768) {
    slidesToShow = 3.5;
  } else if (window.outerWidth < 600) {
    slidesToShow = 2.5;
  } else if (window.outerWidth < 480) {
    slidesToShow = 2.5;
  }

  if (startCarousel == true) {
    $(`.${ID}-recs--carousel`).slick({
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

    let carousel = document.querySelector(`.${ID}-recs--carousel`);
    // window.DYO.recommendations.registerElements(carousel);

    let prevArrow = document.querySelector(`.${ID}-recs--prev`);
    let nextArrow = document.querySelector(`.${ID}-recs--next`);

    prevArrow.addEventListener('click', () => {
      window.jQuery(`.${ID}-recs--carousel`).slick('slickPrev');
      fireEvent(`Click - carousel prev arrow clicked`);
    });

    nextArrow.addEventListener('click', () => {
      window.jQuery(`.${ID}-recs--carousel`).slick('slickNext');
      fireEvent(`Click - carousel next arrow clicked`);
    });
  } else {
    document.querySelector(`.${ID}-recs`).classList.add(`${ID}-recs--plplayout`);
  }

  document.body.addEventListener('click', (e) => {
    if (
      (e.target.closest(`.${ID}-recs--carouselitem`) || e.target.classList.contains(`${ID}-recs--carouselitem`)) &&
      !e.target.classList.contains(`${ID}-recs--carouselitem--addtocart`)
    ) {
      fireEvent(
        `Click - product from carousel clicked to go to ${
          e.target.closest(`.${ID}-recs--carouselitem > a`).href
        }`,
        true
      );

      localStorage.setItem(`${ID}-PDP-viewed`, 'true')
    }

    if (e.target.classList.contains(`${ID}-recs--carouselitem--addtocart`)) {
      e.preventDefault();
      let atcSKU = e.target.closest(`.${ID}-recs--carouselitem`).getAttribute('data-sku');
      let productHref = e.target.closest(`.${ID}-recs--carouselitem`).getAttribute('data-href');
      checkSKUForAdding(atcSKU, productHref);
      fireEvent(
        `Click - add to cart button from carousel on [${placement}] clicked for SKU: [${atcSKU}] with href: [${productHref}]`,
        true
      );
    }
  });

  fireEvent(`Interaction - carousel placed on [${placement}] using strategy: ${data.wId}`, true);
};

const startExperiment = () => {
  // ADDING QL BUTTONS
  pollerLite(['.collection-header .csc-header-banner .sub-category .btn',
  () => typeof window.DYO === 'object' &&
  typeof window.DYO.recommendationWidgetData === 'function'
  // () => { return window.recsObject;}
  ], () => {
    // console.log('startExpeirment PLP');

    let currentUrl = window.location.pathname;
    // console.log(currentUrl, 'currentUrl');

    const createLink = (link, buttonText) => {
      return `
        <a class="btn btn--secondary btn--small ${ID}-button" href="${link}">${qlSVG} ${buttonText}</a>
      `
    };

    let windowObj = window.MAM540quicklinks;

    Object.keys(windowObj).forEach((item, index) => {
      if(currentUrl.includes(item)) {
        // console.log('match');
 
        // console.log(item, 'windowObj.item.link');
        const buttonHtml = createLink(windowObj[item]["link"], windowObj[item]["buttonText"]);
        // console.log(buttonHtml, 'buttonHtml');
        
        const qlTarget = document.querySelector('.collection-header .csc-header-banner .sub-category');
        qlTarget.insertAdjacentHTML('afterbegin', buttonHtml);

        const buttonDOM = document.querySelector(`.collection-header .csc-header-banner .${ID}-button`);
        buttonDOM.addEventListener('click', () => {
          fireEvent(`Click - User clicks on buying guide quick link`);
        });

      }
    });

    // let recsStrategy = window.recsObject.recsStrategy;
    let recsStrategy = windowObj[currentUrl]["strategy"];
    // let fallbackStrategy = window.recsObject.fallbackStrategy;
    let fallbackStrategy = windowObj[currentUrl]["strategy"];
    // let placement = window.recsObject.placement;
    // let recsTitle = window.recsObject.recsTitle;
    // let attachPoint = window.recsObject.attachPoint;
    // let attachPointType = window.recsObject.attachPointType;
    // let carouselStyleOverride = window.recsObject.carouselStyleOverride;
    // let addToCartButton = window.recsObject.addToCartButton == 'true' ? true : false;
    // let variation = window.recsObject.variation;

    getRecs(recsStrategy).then((data) => {
      if (data.slots.length > 5) {
        // console.log('RECS STRATEGY');
        data.shopAllURL = window.location.pathname;
        // insertRecs(data, title, placement, attachPoint, attachPointType, carouselStyleOverride, addToCartButton, variation);
        const buyingGuideButton = document.querySelector(`.collection-header .csc-header-banner .${ID}-button`);
        if(buyingGuideButton) {
          buyingGuideButton.addEventListener('click', () => {
            localStorage.setItem(`${ID}-recsData`, JSON.stringify(data));
          });
        }
        // console.log('data', data);

      } else {
        getRecs(fallbackStrategy).then((data) => {
          if (data.slots.length > 5) {
            // console.log('RECS STRATEGY');
            data.shopAllURL = window.location.pathname;
            // insertRecs(data, title, placement, attachPoint, attachPointType, carouselStyleOverride, addToCartButton, variation);
            const buyingGuideButton = document.querySelector(`.collection-header .csc-header-banner .${ID}-button`);
            if(buyingGuideButton) {
              buyingGuideButton.addEventListener('click', () => {
                localStorage.setItem(`${ID}-recsData`, JSON.stringify(data));
              });
            }
            // console.log('data', data);

          }
        }
        );
      }
    });
  });


  // ADDING CAROUSEL
  pollerLite(['.main-content #shopify-section-article-template .csc-button-linkblock',
  () => typeof window.DYO === 'object' && typeof window.DYO.recommendations === 'object' 
  ], () => {
    // console.log('blog page experiment');    
    let recsData = JSON.parse(localStorage.getItem(`${ID}-recsData`));
    if(recsData){
    // console.log(recsData, 'recsData');

    insertRecs(recsData, 'Recommended For You', 'Blog', '.main-content #shopify-section-article-template .csc-button-linkblock[aria-label="Tags"]', 'beforebegin', '', false, 1);

    const shopAllButton = `
    <div class="${ID}-shopall">
      <h2>Recommended For You</h2>
      <a href="${recsData.shopAllURL}" class="btn btn--secondary btn--small ${ID}-button">Shop all</a>
    </div>`

    const originalH2 = document.querySelector(`.main-content #shopify-section-article-template .${ID}-recs h2`);
    originalH2.style.display = 'none';

    const shopAllTarget = document.querySelector(`.${ID}-recs h2`);
    shopAllTarget.insertAdjacentHTML('afterend', shopAllButton);

    const shopAllDOM = document.querySelector(`.${ID}-shopall .${ID}-button`);
    shopAllDOM.addEventListener('click', () => {
      fireEvent(`Click - User clicks on shop all button`);
    });
    localStorage.removeItem(`${ID}-recsData`);
    }
  });

  //TRACK PDP ATB
  pollerLite(['#shopify-section-product-template .product-single__wrapper .product-form__controls-group--submit'], () => {
    // console.log('PDP ATB experiment');
    const pdpViewed = localStorage.getItem(`${ID}-PDP-viewed`);
    if(pdpViewed) {
    const atbButton = document.querySelector('#shopify-section-product-template .product-single__wrapper .product-form__controls-group--submit button[aria-label="Add to Bag"]');
    // console.log(atbButton, 'atbButton');
    atbButton.addEventListener('click', () => {
      fireEvent(`Click - PDP ATB clicked`);
    });
    localStorage.removeItem(`${ID}-PDP-viewed`);
  }});
};

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
  startExperiment();
};
