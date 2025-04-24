/**
 * Last Viewed Product Scraper
 * If PDP was viewed, save up to the last 5 products viewed
 * If only PLP was viewed, save the first 5 products from that page
 * @author User Conversion
 */

/**
 * LocalStorage Key:
 * recommended_prods_1: Products from last viewed PDPs
 * recommended_prods_2: Products from last viewed PLP
 */
const lastViewedProductScraper = () => {
  const { poller } = window.UC;
  const URL = window.location.href;
  const isPDP = /merchoid.com\/product\/.+/.test(URL);
  const isPLP = /merchoid.com\/(brand|stuff)\/.+/.test(URL);

  const pageScrapers = {
    PDP: () => {
      const cache = window.localStorage.recommended_prods_1;
      let cachedProductData = cache ? JSON.parse(cache) : [];
      let newProduct = true;

      const data = {
        name: document.querySelector('.mobile-target-product-title').innerText.trim(),
        price: document.querySelector('.product-info .price .amount').innerText.trim(),
        image: document.querySelector('.product-gallery-slider .first img').src,
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
      window.localStorage.recommended_prods_1 = JSON.stringify(cachedProductData);
    },

    PLP: () => {
      /**
       * Scrapes product data from an element
       * @param {HTMLElement} productEl
       * @returns {object} All product data in an object
       */
      const scrapeProductData = (productEl) => {
        const name = productEl.querySelector('p.name').innerText.trim();
        const price = productEl.querySelector('.amount').innerText.trim();
        const image = productEl.querySelector('.front-image img').src;
        const link = productEl.querySelector('.woocommerce-LoopProduct-link').href;

        return {
          name,
          price,
          image,
          link,
        };
      };
      const products = document.querySelectorAll('.product-small');
      const first5 = Array.prototype.slice.call(products, 0, 5);
      const productData = first5.map(scrapeProductData);
      window.localStorage.recommended_prods_2 = JSON.stringify(productData);
    },
  };

  if (isPDP) {
    poller([
      '.mobile-target-product-title',
      '.product-info .price .amount',
      '.product-gallery-slider .first img',
    ], pageScrapers.PDP);
  } else if (isPLP) {
    poller([
      '.product-small p.name',
      '.product-small .amount',
      '.front-image img',
      '.woocommerce-LoopProduct-link',
    ], pageScrapers.PLP);
  }
};

try {
  lastViewedProductScraper();
} catch (e) {
  console.log(e);
}
