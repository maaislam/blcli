/**
 * Last Viewed Product Scraper
 * If PDP was viewed, save up to the last 5 products viewed
 */

/**
 * LocalStorage Key:
 * recommended_prods_1: Products from last viewed PDPs
 */
const lastViewedProductScraper = () => {
  const cache = window.localStorage.HS022recommended_prods_1;
  let cachedProductData = cache ? JSON.parse(cache) : [];
  let newProduct = true;

  const data = {
    name: document.querySelector('.buying-info__name').innerText.trim(),
    image: document.querySelector('#js-product-image img').src,
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

  // Keep cachedProductData limited to 5 products
  if (typeof cachedProductData.length === 'number') {
    while (cachedProductData.length > 5) cachedProductData.shift();
  }

  // Store product data in localStorage
  window.localStorage.HS022recommended_prods_1 = JSON.stringify(cachedProductData);
};

export default lastViewedProductScraper;
