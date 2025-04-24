import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import plpPages from './plp-pages';

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

export const getProductsFromCategory = (url, page, type, callback) => {
  const { ID, VARIATION } = shared;

  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const temp = document.createElement('html');
      temp.innerHTML = request.responseText;
      
      const allProducts = temp.querySelectorAll('ol.products.list.items.product-items li');
      let carouselProducts = '';
      for (let i = 0; i < 8; i += 1) {
        const prod = allProducts[i];
        const url = prod.querySelector('.product-item-info a.product').getAttribute('href');
        const img = prod.querySelector('span.product-image-wrapper img.product-image-photo').getAttribute('src');
        const name = prod.querySelector('strong.product.name.product-item-name').innerHTML;
        
        const price = prod.querySelector('.price-wrapper.price-excluding-tax .price').innerText.trim();

        carouselProducts += `<li class="product-item" data-scarabitem="more-from-brand">
          <div class="product-item-info">
              <a href="${url}" class="product photo product-item-photo">
                <img class="photo image" src="${img}" alt="" width="240" height="300">
              </a>
            <div class="product-item-details">
              <strong class="product name product-item-name">
                ${name}
              </strong>
              <div class="price-box price-final_price" data-role="priceBox" data-product-id="" data-price-box="">
                <span class="normal-price">
                  <span class="price-container price-final_price tax weee">
                    <span id="${ID}-brand-product_${i}" data-label="ex. VAT" data-price-amount="" data-price-type="basePrice" class="price-wrapper price-excluding-tax">
                      <span class="price">${price}</span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </li>`;
      }

      let brandName = '';
      let categoryToGo = '';
      let headerTitle = '';
      let carouselId = '';
      if (type == 'brand' && plpPages[`${page}`]) {
        headerTitle = 'More from Brand';
        brandName = plpPages[`${page}`].brandName;
        categoryToGo = `${brandName} `;
        carouselId = `${ID}-more-from-brand`;
      } else if (type == 'main' && plpPages[`${page}`]) {
        headerTitle = 'Popular on Category';
        categoryToGo = `${plpPages[`${page}`].catName} `;
        carouselId = `${ID}-more-from-category`;
      }

      const productsData = `<div id="${carouselId}" class="block-emarsys">
        <div class="block-title">
          <strong>${headerTitle}</strong>
        </div>
        <div class="block-content">
          <ol class="products list items product-items" style="width: 1320px;">
            ${carouselProducts}
          </ol>
        </div>
        <a href="${url}" class="block-title link"><strong>View all ${categoryToGo}products</strong></a>
      </div>`;
      callback(productsData);
    }
  };
  request.send();
};
