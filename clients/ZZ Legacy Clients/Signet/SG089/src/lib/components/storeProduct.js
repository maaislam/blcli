import { getSiteFromHostname } from "../services";

/**
 * Store the last viewed products
 * 
 */

const lastViewedProductScraper = () => {
    let cache;
    if(getSiteFromHostname() === 'ernestjones') {
        cache = window.localStorage.EJ089recommended_prods_1;
    } else {
        cache = window.localStorage.HS089recommended_prods_1;
    }

    let cachedProductData = cache ? JSON.parse(cache) : [];
    let newProduct = true;
  
    // get data from page
    const data = {
      name: document.querySelector('.product-summary .product-name ').innerText.trim(),
      image: document.querySelector('.product-gallery__image-container img').src,
      link: window.location.href,
    };
  
    for (let i = 0; i < cachedProductData.length; i += 1) {
      const cachedData = cachedProductData[i];
      if (data.name === cachedData.name) {
        // Product already exists, move it to the end of the array
        const productToMove = cachedProductData.splice(i, 1);
        cachedProductData = cachedProductData.concat(productToMove);
        newProduct = false;
        break;
      }
    }
  
    // Push product data if new product
    if (newProduct) cachedProductData.push(data);
  
    // Keep cachedProductData limited to 8 products
    if (typeof cachedProductData.length === 'number') {
      while (cachedProductData.length > 8) cachedProductData.shift();
    }
  
    // Store product data in localStorage
    if(getSiteFromHostname() === 'ernestjones') {
        window.localStorage.EJ089recommended_prods_1 = JSON.stringify(cachedProductData);
    } else {
        window.localStorage.HS089recommended_prods_1 = JSON.stringify(cachedProductData);
    }
};

const lastViewedCategoryScraper = () => {
    let cache;
    if(getSiteFromHostname() === 'ernestjones') {
        cache = window.localStorage.EJ089recommended_cats_1;
    } else {
        cache = window.localStorage.HS089recommended_cats_1;
    }

    let cachedCatData = cache ? JSON.parse(cache) : [];
    let newCategory = true;
  
    // get data from page
    const data = {
      name: document.querySelector('.page-heading').innerText.trim().replace('shop', '').replace('Shop', ''),
      link: window.location.href,
    };
  
    for (let i = 0; i < cachedCatData.length; i += 1) {
      const cachedData = cachedCatData[i];
      if (data.name === cachedData.name) {
        // Product already exists, move it to the end of the array
        const productToMove = cachedCatData.splice(i, 1);
        cachedCatData = cachedCatData.concat(productToMove);
        newCategory = false;
        break;
      }
    }
  
    // Push product data if new product
    if (newCategory) cachedCatData.push(data);
  
    // Keep cachedProductData limited to 8 products
    if (typeof cachedCatData.length === 'number') {
      while (cachedCatData.length > 8) cachedCatData.shift();
    }
  
    // Store product data in localStorage
    if(getSiteFromHostname() === 'ernestjones') {
        window.localStorage.EJ089recommended_cats_1 = JSON.stringify(cachedCatData);
    } else {
        window.localStorage.HS089recommended_cats_1 = JSON.stringify(cachedCatData);
    }
};
  
export { lastViewedProductScraper, lastViewedCategoryScraper };
  