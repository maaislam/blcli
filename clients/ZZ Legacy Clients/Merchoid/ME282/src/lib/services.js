import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { fullStory } from '../../../../../lib/utils';
import shared from './shared';

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
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

export const generateLowPriceMessage = (prodUrl) => {
  const { ID, VARIATION } = shared;

  // --- GET PRODUCT NAME from breadcrumbs
  /*const breadcrumbs = document.querySelector('.breadcrumbs ul');
  const breadcrumbItems = breadcrumbs.children;
  const lastBreadcrumb = breadcrumbItems.length - 1;
  const prodTitle = breadcrumbItems[`${lastBreadcrumb}`].innerText.trim();
  document.querySelector('.breadcrumbs ul').children[3].innerText;*/

  const productName = document.querySelector('.page-title-wrapper h1');

  let lowPriceMsg = '';
  if (VARIATION == '1') {
    lowPriceMsg = `<p><span class="strong">Pssst! </span>You’ve found our <b>${productName.textContent.trim().replace(/^[^_]*:/, '')}</b> at its lowest ever price!</p>`;
  } else if (VARIATION == '2') {
    lowPriceMsg = `<p><span class="strong">Pssst! </span>You’ve found our <b>${productName.textContent.trim().replace(/^[^_]*:/, '')}</b> at its lowest ever price!<span class="${ID}-buyToday">Buy today to avoid disappointment</span></p>`;
  }

  const lowPriceContainer = `<div class="${ID}-lowPriceMsg__wrapper">
    <div class="${ID}-lowPriceMsg__container">
      ${lowPriceMsg}
    </div>
  </div>`;

  document.querySelector('.product-info-price').insertAdjacentHTML('afterbegin', lowPriceContainer);

  function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  const priceBlock = document.querySelector('.product-info-main .product-info-price');
  const priceMessage = document.querySelector(`.${ID}-lowPriceMsg__wrapper`);

  let seen = false;

  window.addEventListener("scroll", function() {
    if (isScrolledIntoView(priceBlock) && seen === false){
      seen = true;
      priceMessage.classList.add(`${ID}-msgShow`);
      storeProductInSessionStorage(prodUrl);
    }

    if(seen = true) {
      setTimeout(() => {
        document.querySelector(`.${ID}-lowPriceMsg__wrapper`).classList.remove(`${ID}-msgShow`);
      }, 5000);
    }
  });

  

  


  /*const detectScrolling = () => {
    const addToCartY = document.querySelector('.product-add-form').getBoundingClientRect().y;
    const pageTitleY = document.querySelector('h1.page-title').getBoundingClientRect().y;
    // if (addToCartY < 0) {
    if (pageTitleY < 200) {
      if (!document.querySelector(`.ME282-lowPriceMsg__container`)) {
        // document.querySelector('.product-description-wrapper.tabs-with-scrolling__tab-content-wrap').insertAdjacentHTML('beforebegin', lowPriceContainer);
        document.querySelector('.ME281-priceMessage .ME281-priceWrapper').insertAdjacentHTML('afterend', lowPriceContainer);
        storeProductInSessionStorage(prodUrl);

        // --- Get Bubble height
        const bubbleContainerHeight = document.querySelector(`.${ID}-lowPriceMsg__container`).getClientRects()[0].height;
        const priceWrapper = document.querySelector('.ME281-priceWrapper');
        // -- Amend Price Wrapper Margin to fit Bubble
        priceWrapper.setAttribute('style', `margin-bottom: ${bubbleContainerHeight}px !important;`);
      }
      
      setTimeout(() => {
        document.querySelector(`.ME282-lowPriceMsg__wrapper`).classList.add('visible');
        document.querySelector(`.ME282-lowPriceMsg__container`).classList.add('visible');
    
        setTimeout(() => {
          document.querySelector(`.ME282-lowPriceMsg__container span.strong`).classList.add('show');
          document.querySelectorAll(`.ME282-lowPriceMsg__container span.main-msg`)[0].classList.add('show');
          document.querySelectorAll(`.ME282-lowPriceMsg__container span.main-msg`)[1].classList.add('show');
          
          setTimeout(() => {
            document.querySelector(`.ME282-lowPriceMsg__container`).classList.remove('visible');

            setTimeout(() => {
              document.querySelector(`.ME282-lowPriceMsg__wrapper`).classList.remove('visible');
              // document.querySelector(`.ME282-lowPriceMsg__wrapper`).setAttribute('style', 'display: none !important;');
              const priceWrapper = document.querySelector('.ME281-priceWrapper');
              priceWrapper.setAttribute('style', `margin-bottom: 10px;`);
            }, 250);
          }, 6000);
            
        }, 150);
    
        
      }, 1000);
    }

  }

  window.addEventListener("scroll", detectScrolling , true); 
  
 
  detectScrolling(); */
  
  /**
   * @desc When bubble container has been added
   * Remove scroll event from window 
   * and add click event to bubble (dismiss bubble)
   */
  /*pollerLite([`.ME282-lowPriceMsg__container`], () => {
    window.removeEventListener("scroll", detectScrolling, true); 
    document.querySelector(`.ME282-lowPriceMsg__container`).addEventListener('click', () => {
      // document.querySelector('.product-info-main').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      document.querySelector(`.ME282-lowPriceMsg__container`).classList.remove('visible');
      document.querySelector(`.ME282-lowPriceMsg__wrapper`).classList.add('hide');

      setTimeout(() => {
        // document.querySelector(`.ME282-lowPriceMsg__wrapper`).setAttribute('style', 'display: none !important;');
        document.querySelector(`.ME282-lowPriceMsg__wrapper`).classList.remove('visible');
        const priceWrapper = document.querySelector('.ME281-priceWrapper');
        priceWrapper.setAttribute('style', `margin-bottom: 10px;`);
      }, 250);
    });
  });  */

};



export const storeProductInSessionStorage = (prodUrl) => {
  const { ID, VARIATION } = shared;

  let lowestPriceMsgShownOn = {};
  
  if (JSON.parse(sessionStorage.getItem(`${ID}-lowest-price-message`)) !== null) {
    lowestPriceMsgShownOn = JSON.parse(sessionStorage.getItem(`${ID}-lowest-price-message`));
    if (!lowestPriceMsgShownOn[`${prodUrl}`]) {
      lowestPriceMsgShownOn[`${prodUrl}`] = true;
      sessionStorage.setItem(`${ID}-lowest-price-message`, JSON.stringify(lowestPriceMsgShownOn));
    }
  } else {
    if (!lowestPriceMsgShownOn[`${prodUrl}`]) {
      lowestPriceMsgShownOn[`${prodUrl}`] = true;
      sessionStorage.setItem(`${ID}-lowest-price-message`, JSON.stringify(lowestPriceMsgShownOn));
    }
  }
};