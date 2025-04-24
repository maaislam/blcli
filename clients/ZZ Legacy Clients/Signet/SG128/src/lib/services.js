import { fullStory } from '../../../../../lib/utils';
import { events, pollerLite } from './../../../../../lib/utils';
import shared from './shared';
import ej_data from './ej_data';
import hs_data from './hs_data';
import prodContentData from './prodContentData';
import initiateSlick from './initiateSlick';


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
 * Get Site from hoestname
 * EJ or HS
 */
export const getSiteFromHostname = () => {
  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.body.classList.add(siteIdent);
  }

  if(typeof s !== 'undefined'){
    s.eVar111 = `${ID} - V${VARIATION}`;
    s.tl();
  }
};

export const fireEvent = (label) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  events.sendAuto(VARIATION, label);

}

export const getSiteData = () => {
  let data = ej_data;
  if(getSiteFromHostname() == 'ernestjones') {
    // EJ-specific JS
    data = ej_data;
  }
  if(getSiteFromHostname() == 'hsamuel') {
    // HS-specific JS
    data = hs_data;
  }

  return data;
};

export const getProductDetails = (key, data, url, callback) => {
  const { ID, VARIATION } = shared;
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const temp = document.createElement('html');
      temp.innerHTML = request.responseText;

      let prodImage = temp.querySelector('picture.product-gallery__image-container img').src;
      prodImage = prodImage.replace('1490', '504');
      let prodPrice = temp.querySelector('.product-price .product-price--current').innerText.trim();
      let prodTitle = temp.querySelector('h1.product-name').innerText.trim();
      let freeGift = temp.querySelector('.detail-page__right-column .product-messages .product-messages__item.product-messages__item-sale');
      if (freeGift) {
        freeGift = freeGift.innerText.trim();
      }

      let prodDetails = {
        'position': key,
        'title': prodTitle,
        'price': prodPrice,
        'img': prodImage,
      };

      prodContentData[`${key}`] = prodDetails;
      
      let brand = '';
      let siteIdent = getSiteFromHostname();
      if(siteIdent == 'ernestjones') {
        // EJ-specific JS
        brand = 'Ernest Jones Collection';

        if (temp.querySelector('.product-accordion-item__content .product-specification tbody tr td')
        && temp.querySelectorAll('.product-accordion-item__content .product-specification tbody tr td')[1]
        && temp.querySelectorAll('.product-accordion-item__content .product-specification tbody tr td')[1].querySelector('a')) {
          // EJ
          brand = temp.querySelectorAll('.product-accordion-item__content .product-specification tbody tr td')[1].querySelector('a').innerText.trim();
          prodTitle = prodTitle.replace(`${brand} `, '');
        }
      }
      if(siteIdent == 'hsamuel') {
        // HS-specific JS
        brand = 'H.Samuel Collection';

        if (temp.querySelector('.product-accordion-item__content .product-specification li.product-specification__item span.product-specification__detail a')) {
          // HS
          brand = temp.querySelector('.product-accordion-item__content .product-specification li.product-specification__item span.product-specification__detail a').innerText.trim();
          prodTitle = prodTitle.replace(`${brand} `, '');
        }
      }
      
       

      let freeGiftBanner = '';
      if (freeGift && freeGift.indexOf('GIFT') > -1) {
        freeGiftBanner = `<div class="product-tile__corner-flag" style="background:#000000; color:#fff; font-weight:Normal;"> FREE GIFT </div>`;
      }
//<img src="${prodImage}" width="240">
      let prod = `<a href="${url}"><li class="SG128-bestSeller">
        <img class="SG128-prodImg" src='${prodImage}' width="170">
        ${freeGiftBanner}
        <div class="${ID}-bestSellerProd__description">
          <p class="${ID}-prodTitle brand">
            <strong>${brand}</strong> 
          </p>
          <p class="${ID}-prodTitle">${prodTitle}</p>
          <p class="${ID}-prodPrice">
            <strong>${prodPrice}</strong>
          </p>
        </div>
      </li></a>`;
      document.querySelector(`ul.${ID}-bestSellers__list`).insertAdjacentHTML('beforeend', prod);


      const pageUrl = window.location.pathname;
      let productSkus = data[`${pageUrl}`];
      let numOfProducts = document.querySelectorAll(`ul.${ID}-bestSellers__list li`).length;

      console.log(numOfProducts);
      console.log(productSkus.length)

      if (numOfProducts == productSkus.length) {
        // --- All Products Added
          initiateSlick();

          
          setTimeout(() => {
            document.querySelector(`.${ID}-bestSellers__content`).classList.add('visible');
          }, 500); 
        
      }

      callback(prodDetails);
    }
  };
  request.send();
};

export const generateProductContent = () => {
  const { ID, VARIATION } = shared;

  const pageUrl = window.location.pathname;
  let data = getSiteData();
  let productSkus = data[`${pageUrl}`];
  let prodContent = {};

  for (let i = 0; i <= productSkus.length; i += 1) {
    let sku = productSkus[i];

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
      getProductDetails(i, data, `https://www.ernestjones.co.uk/webstore/d/${sku}`, (prodDetails) => {});
    }
    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
      getProductDetails(i, data, `https://www.hsamuel.co.uk/webstore/d/${sku}`, (prodDetails) => {});
    }
    
  }

  
};



