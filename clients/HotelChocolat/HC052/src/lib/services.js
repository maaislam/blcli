import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import offerPages from './offerPages';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
};
export const addBanner = (text) => {
  const { ID, VARIATION } = shared;

  if (!document.querySelector(`.${ID}-topOfferBanner__wrapper`)
  && text !== '') {
    let offerBannerAfterAdd = `<div class="${ID}-topOfferBanner__wrapper">
      <div class="${ID}-topOfferBanner__container">${text}</div>
    </div>`;
    document.querySelector('#pdpMain').insertAdjacentHTML('afterbegin', offerBannerAfterAdd);
  } else if (document.querySelector(`.${ID}-topOfferBanner__wrapper`)
  && text !== '') {
    document.querySelector(`.${ID}-topOfferBanner__container`).innerHTML = text;
  } else if (text == '') {
    let banner = document.querySelector(`.${ID}-topOfferBanner__wrapper`);
    if (banner) {
      banner.parentNode.removeChild(banner);
    }
  }

  // sessionStorage.setItem(`${ID}-promo-banner-shown-v${VARIATION}`, true);
}

export const addCarousel = (recommendedProdContainer) => {
  const { ID, VARIATION } = shared;

  /**
   * @desc For Desktop devices, add carousel and amend columns content
   */
  if (window.innerWidth > 767) {
    document.querySelector('#pdpMain .product-col-1.product-image-container .product-detail').insertAdjacentHTML('beforebegin', recommendedProdContainer);
    document.querySelector(`.${ID}-recommendations__wrapper`).setAttribute('style', 'position: absolute;');
    // --- Get Recommended Carousel height
    const carouselHeight = document.querySelector(`.${ID}-recommendations__wrapper`).getBoundingClientRect().height;

    const newColumns = `<div class="${ID}-product-col-1 product-col-1 product-image-container" style="padding-top: 425px;"></div>
    <div class="${ID}-product-col-2 product-col-2 product-detail" style="padding-top: 425px;"></div>`;

    document.querySelector('#pdpMain .product-col-2.product-detail').insertAdjacentHTML('afterend', newColumns);
    // --- MOVE Left side tabs content below the Carousel
    const prodTabs = document.querySelector('.product-tabs.product-tabs-move.ui-tabs.ui-corner-all.ui-widget.ui-widget-content');
    document.querySelector(`.${ID}-product-col-1`).insertAdjacentElement('afterbegin', prodTabs);
    // ------------------------------------------------------//
    // --- MOVE Right side columns content below the Carousel
    const allPaymentContent = document.querySelectorAll('.product-col-2.product-detail .content-zone');
    [].forEach.call(allPaymentContent, (el) => {
      document.querySelector(`.${ID}-product-col-2`).insertAdjacentElement('beforeend', el);
    });
    const prodInfo = document.querySelector('.product-col-2.product-detail .prod-info.prod-info-b');
    const prodDelivery = document.querySelector('.product-col-2.product-detail .prod-info.prod-info-c');
    document.querySelector(`.${ID}-product-col-2`).insertAdjacentElement('beforeend', prodInfo);
    document.querySelector(`.${ID}-product-col-2`).insertAdjacentElement('beforeend', prodDelivery);
    // ------------------------------------------------------//
  } else {
  /**
   * @desc Tablet and Mobile
   */
    // document.querySelector('.product-col-2.product-detail .tab-target-mobile').insertAdjacentHTML('beforebegin', recommendedProdContainer);
    document.querySelector('form.pdpForm').insertAdjacentHTML('afterend', recommendedProdContainer);
  }
};

export const getTopProductsForList = (promoProducts) => {
  const { ID, VARIATION } = shared;

  let list = "";
  if (promoProducts.length >= 9) {
    for (let i = 0; i < 9; i += 1) {
      const prod = promoProducts[i];
      list += prod.querySelector('.product-tile').outerHTML;
    }
  } else {
    for (let i = 0; i < promoProducts.length; i += 1) {
      const prod = promoProducts[i];
      list += prod.querySelector('.product-tile').outerHTML;
    }
  }

  return list;
};

export const getPromoData = () => {
  const { ID, VARIATION } = shared;

  const promoMessage = document.querySelector('.promotion .promotion-callout').innerText.trim();
  let promoUrlPLP = '';
  let promoHeader = '';
  let data = {};
  for (let key in offerPages) {
    if (offerPages.hasOwnProperty(key)
    && promoMessage.indexOf(`${key}`) > -1) {
      promoUrlPLP = offerPages[key].url;
      promoHeader = offerPages[key].id;
      promoUrlPLP = offerPages[key].url;
      data.promoUrlPLP = offerPages[key].url;
      data.promoHeader = offerPages[key].id;
      data.promoQty = offerPages[key].qty;
      data.promoPrice = offerPages[key].price;
    }
  }

  return data;
};

export const generateCarouselContent = () => {
  const { ID, VARIATION } = shared;

  let promoData = getPromoData();
  const getProductsFromPromoPLP = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement('html');
        temp.innerHTML = request.responseText;
        const allProducts = temp.querySelectorAll('.search-result-content ul#search-result-items li.grid-tile');
        if (allProducts.length > 0) {
          let promoProducts = allProducts;

          callback(promoProducts);
        }
        
      }
    };
    request.send();
  };
  // Call 
  if (Object.keys(promoData).length > 0) {

    let savedProducts = '';
    if (JSON.parse(sessionStorage.getItem(`${ID}-saved-products`)) !== null) {
      savedProducts = JSON.parse(sessionStorage.getItem(`${ID}-saved-products`));
      if (!savedProducts[`${promoData.promoUrlPLP}`]) {
        // alert('data DOES NOT exist in session - call function');
        getProductsFromPromoPLP(`https://www.hotelchocolat.com${promoData.promoUrlPLP}`, (promoProducts) => {

          // --- GET LIST OF PRODUCTS - 9 first products
          let listOfRecommendedProducts = '';
          listOfRecommendedProducts = getTopProductsForList(promoProducts);

          let productsToSave = {};
          savedProducts[`${promoData.promoUrlPLP}`] = listOfRecommendedProducts;

          sessionStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));

          const recommendedProdContainer = `<div class="${ID}-recommendations__wrapper recommendations recommendations-pdp">
            <h4>Also in the</br>${promoData.promoHeader} Mix &amp; Match</h4>
            <div id="${ID}-carousel-recommendations">
              ${listOfRecommendedProducts}
              <a href="${promoData.promoUrlPLP}"><li class="${ID}-promoBanner grid-tile"><p>Shop all ${promoData.promoHeader}</br>Mix &amp; Match</p></li></a>
            </div>
          </div>`;

          // --- ADD CAROUSEL
          addCarousel(recommendedProdContainer);
        });

      // --- Product Data for this Offer already exist in Session Storage
      } else {
        let listOfRecommendedProducts = savedProducts[`${promoData.promoUrlPLP}`];
        const recommendedProdContainer = `<div class="${ID}-recommendations__wrapper recommendations recommendations-pdp">
          <h4>Also in the</br>${promoData.promoHeader} Mix &amp; Match</h4>
          <div id="${ID}-carousel-recommendations">
            ${listOfRecommendedProducts}
            <a href="${promoData.promoUrlPLP}"><li class="${ID}-promoBanner grid-tile"><p>Shop all</br>${promoData.promoHeader}</br>Mix &amp; Match</p></li></a>
          </div>
        </div>`;

        // --- ADD CAROUSEL
        addCarousel(recommendedProdContainer);
      }
    } 
  
    
  }


};

export const observeWindowWidthAndReload = () => {
  const { ID, VARIATION } = shared;

  let windowWidth = document.body.clientWidth;
  let device = '';
  if (windowWidth > 767) {
    device = 'desktop';
  } else {
    device = 'mobile';
  }
  window.addEventListener("resize", function(event) {
    if (document.body.clientWidth > 767 && device == 'mobile') {
      device = 'desktop';
      // --- Window re-size - From MOBILE to DESKTOP
      // -- Reload
      window.location.reload();
    } else if (document.body.clientWidth <= 767 && device == 'desktop') {
      device = 'mobile';
      // --- Window re-size - From DESKTOP to MOBILE
      // -- Reload
      window.location.reload();
    }
  });
  
};
