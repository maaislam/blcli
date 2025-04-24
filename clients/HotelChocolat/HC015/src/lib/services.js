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
  document.body.classList.add(`${ID}-${VARIATION}`);
};

export const grabProductData = (prod, data) => {
  const { ID, VARIATION } = shared;

  let prodUrl = prod.querySelector('.product-image a').getAttribute('href');
  let prodImg = prod.querySelector('.product-image img').getAttribute('src').replace('sw=180', 'sw=500').replace('sh=180', 'sh=500');
  let prodTitle = prod.querySelector('.product-name').innerHTML;
  let prodPrice = prod.querySelector('.product-pricing').outerHTML;
  let prodStars = '';
  if (prod.querySelector('.product-review-links.product-review.product-review-links-top')) {
    prodStars = prod.querySelector('.product-review-links.product-review.product-review-links-top').outerHTML;
  }

  data = {
    prodUrl: prodUrl,
    prodImg: prodImg,
    prodTitle: prodTitle,
    prodPrice: prodPrice,
    prodStars: prodStars,
  };

  return data;
};

export const generateBestSellersBanners = (page, bestSellersData) => {
  const { ID, VARIATION } = shared;

  let bestSellerContainer = '';

  const allProducts = document.querySelectorAll('ul#search-result-items li.grid-tile');
  const tileHeight = document.querySelector('.product-tile').getAttribute('style');

  for (let i = 0; i < allProducts.length; i += 1) {
    const product = allProducts[i];
    let data = {};
    let prod;
    if (bestSellersData[`${page}`]) {
      if (i == 10) {
        data = bestSellersData[`${page}`][1];
      } else if (i == 14) {
        data = bestSellersData[`${page}`][2];
      } else if (i == 30) {
        data = bestSellersData[`${page}`][3];
      } else if (i == 34) {
        data = bestSellersData[`${page}`][4];
      }
    } else {
      if (i == 10) {
        prod = allProducts[0];
        data = grabProductData(prod, data);
      } else if (i == 14) {
        prod = allProducts[1];
        data = grabProductData(prod, data);
      } else if (i == 30) {
        prod = allProducts[2];
        data = grabProductData(prod, data);
      } else if (i == 34) {
        prod = allProducts[3];
        data = grabProductData(prod, data);
      }
    }
    
    if (Object.keys(data).length !== 0
    && VARIATION == '1') {
      bestSellerContainer = `<div class="HC015-bestSeller__wrapper" id="best-seller__${i}" style="${tileHeight}">
        <div class="${ID}-bestSeller__img">
          <a href="${data.prodUrl}"><img class="product" src="${data.prodImg}"></a>
        </div>
        <div class="HC015-productDetails">
          <img src="https://dl.airtable.com/.attachmentThumbnails/5086fd1fd682e71e1c63a439f9f4726e/cb6d895b" style="width: 100%; margin-bottom: 30px; max-width: 140px;">
          ${data.prodTitle}
          ${data.prodPrice}
          ${data.prodStars}
        </div>
      </div>
      <li class="grid-tile HC015-tile" data-colors-to-show=""></li>
      <li class="grid-tile HC015-tile" data-colors-to-show=""></li>`;
      if (!document.querySelector(`#best-seller__${i}`)) {
        product.insertAdjacentHTML('beforebegin', bestSellerContainer);
      }
      
    }
    
  }

  if (!bestSellersData[`${page}`]
  && VARIATION == '2') {
    let favouriteProducts = '';
    for (let i = 0; i < 4; i += 1) {
      const product = allProducts[i];
      const prodHtml = product.outerHTML;
      favouriteProducts += `${prodHtml}`;
    }
    const allFavouriteContainer = `<div class="${ID}-allFavourite__wrapper">
      <div class="header__wrapper">
        <img class="header" src="https://dl.airtable.com/.attachmentThumbnails/12d1fa769e07943cb09527145f51cc29/3d102e81">
      </div>
      <div class="content__wrapper">
        <div class="content">${favouriteProducts}</div>
      </div>
    </div>`;
    if (allProducts[11]) {
      allProducts[11].insertAdjacentHTML('afterend', allFavouriteContainer);
    }
  } else if (bestSellersData[`${page}`]
    && VARIATION == '2') {
    let favouriteProducts = '';
    for (let i = 1; i < 5; i += 1) {
      const prod = bestSellersData[`${page}`][i];
      favouriteProducts += `<li class="grid-tile">
        <div class="product-tile" >
          <div class="product-image">
                <a class="thumb-link" href="${prod.prodUrl}">
                  <img src="${prod.prodImg}">
              </a>  
          </div>
        <div class="tile-wrapper">
            <div class="product-name">
              ${prod.prodTitle}
            </div>
              ${prod.prodPrice}
              ${prod.prodStars}
            </div>
        </div>
      </li>`;
    }
    const allFavouriteContainer = `<div class="${ID}-allFavourite__wrapper">
      <div class="header__wrapper">
        <img class="header" src="https://editor-assets.abtasty.com/48343/5ffd98711d99b1610455153.png">
      </div>
      <div class="content__wrapper">
        <div class="content">${favouriteProducts}</div>
      </div>
    </div>`;
    if (allProducts[11]) {
      allProducts[11].insertAdjacentHTML('afterend', allFavouriteContainer);
    }
  }
};
