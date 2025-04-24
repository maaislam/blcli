import { pollerLite } from "../../../../../../lib/uc-lib";

/**
 * Last Viewed Product Scraper
 * If PDP was viewed, save up to the last 5 products viewed
 */

/**
 * LocalStorage Key:
 * recommended_prods_1: Products from last viewed PDPs
 */
const lastViewedProducts = () => {
  const cache = window.localStorage.TG089recommended_prods_1;
  let cachedProductData = cache ? JSON.parse(cache) : [];
  let newProduct = true;

  let productImage;

  const saveProduct = () => {
    const data = {
      name: document.querySelector('.product-name h1').innerText.trim(),
      image: productImage,
      link: window.location.href,
    };

    for (let i = 0; i < cachedProductData.length; i += 1) {
      const cachedData = cachedProductData[i];
      if (cachedData) {
        if (data.name === cachedData.name) {
          // Product already exists, move it to the end of the array
          const productToMove = cachedProductData.splice(i, 1);
          cachedProductData = cachedProductData.concat(productToMove);
          newProduct = false;
          break;
        }
      }
    }

    // Push product data if new product
    if (newProduct) cachedProductData.push(data);

    // Keep cachedProductData limited to 3 products
    if (typeof cachedProductData.length === 'number') {
      while (cachedProductData.length > 3) cachedProductData.shift();
    }

    // Store product data in localStorage
    window.localStorage.TG089recommended_prods_1 = JSON.stringify(cachedProductData);
  };

  if (document.querySelector('.product-gallery')) {
    pollerLite(['.product-gallery .gallery-image.lazy-loaded'], () => {
      productImage = document.querySelector('.product-gallery .gallery-image.lazy-loaded').src;
      saveProduct();
    });
  } else {
    pollerLite(['.product-img-box #image'], () => {
      productImage = document.querySelector('.product-img-box #image').src;
      saveProduct();
    });
  }
};

export default lastViewedProducts;
