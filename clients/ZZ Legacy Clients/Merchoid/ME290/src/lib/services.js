import { fullStory } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { brandLinks, categoryLinks } from './data';
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
  document.documentElement.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
};

export const addNewTabHeaders = () => {
  const { ID, VARIATION } = shared;

  const newTabHeadersContainer = `<div class="${ID}-section-title section-title">
    <div class="section-title-inner">
      <div class="product-title active" data-title="Clothing" data-header="clothing">
        <h3 class="wrapper-head">Clothing</h3>
      </div>
      <div class="product-title" data-title="Home &amp; Office" data-header="homeOffice">
        <h3 class="wrapper-head">Home &amp; Office</h3>
      </div>
      <div class="product-title" data-title="Gadgets &amp; Toys" data-header="gadgetsToys">
        <h3 class="wrapper-head">Gadgets &amp; Toys</h3>
      </div>
    </div>
  </div>`;

  document.querySelector('.brand-section-content .section-title').insertAdjacentHTML('afterend', newTabHeadersContainer);
};

export const newTabsEvents = () => {
  const { ID, VARIATION } = shared;

  const allTabTitles = document.querySelectorAll(`.${ID}-section-title .product-title`);
  [].forEach.call(allTabTitles, (title) => {
    title.addEventListener('click', () => {
      if (document.querySelector(`.${ID}-section-title .product-title.active`)) {
        document.querySelector(`.${ID}-section-title .product-title.active`).classList.remove('active');
      }

      title.classList.add('active');
      // --- Update CTA
      pollerLite([`#${ID}-brand-category`], () => {
        const tabTitleText = title.getAttribute('data-title');
        const tabType = title.getAttribute('data-header');
        const ctaLink = document.querySelector(`#${ID}-brand-category a`);
        const brandPageUrl = ctaLink.getAttribute('data-url');
        ctaLink.setAttribute('href', `${brandPageUrl}?type=${tabType}`);
        ctaLink.innerText = `Shop all ${tabTitleText}`;
      });


      const tabCat = title.getAttribute('data-header');
      if (document.querySelector(`.${ID}-section-content.section-content.visible`)) {
        document.querySelector(`.${ID}-section-content.section-content.visible`).classList.remove('visible');
      }
      document.querySelector(`.${ID}-section-content.section-content.${tabCat}-section`).classList.add('visible');
    });
  });
  
};

export const loadProductImages = () => {
  const { ID, VARIATION } = shared;

  const products = document.querySelectorAll('.products.wrapper.grid.products-grid .item.product.product-item');
  for (let index = 0; index < products.length; index += 1) {
    const element = products[index];
    // make image src that actual product image to avoid blank lazy load
    const imageData = element.querySelector('img').getAttribute('data-original');
    element.querySelector('img').setAttribute('src', imageData);
  }

};

export const generateNewSection = (type, arr) => {
  const { ID, VARIATION } = shared;

  const getAllProducts = document.querySelectorAll(`.ME290-${type} ol.products.list.items.product-items li`);

  if (getAllProducts.length > 0) {
    let prodList = '';
    let productsArr = [];
    for (let i = 0; i < getAllProducts.length; i += 1) {
      let prod = getAllProducts[i];
      productsArr.push(prod.outerHTML);
    }

    let array = shuffle(productsArr);
    for (let i = 0; i < 5; i += 1) {
      let prod = array[i];
      prodList += prod;
    }

    let visible = '';
    if (type == 'clothing') {
      visible = 'visible';
    }

    const newSection = `<div class="${ID}-section-content ${type}-section section-content ${visible}">
      <div class="products wrapper grid products-grid brand-section-grid initial ME290-${type}">
        <ol class="products list items product-items">${prodList}</ol>
      </div>
    </div>`;

    document.querySelector('.section-content').insertAdjacentHTML('beforebegin', newSection);
  } else {
    document.querySelector(`.${ID}-section-title .product-title[data-header="${type}"]`).setAttribute('style', 'display: none !important;');
  }

  
};

export const shuffle = (array) => {
  const { ID, VARIATION } = shared;

  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

/**
 * @desc ME289 function
 */
export const getBrand = () => {
  const brandName = document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/);
  if(brandName[0] && brandName[0].indexOf('geek') === -1) {
    return brandName[0];
  }
}

/**
 * @desc ME289 function
 */
export const getBrandLink = () => {
  let brandLink;
  if(brandLinks[getBrand()]) {
    brandLink = brandLinks[getBrand()].link;
    return brandLink;
  }
}
