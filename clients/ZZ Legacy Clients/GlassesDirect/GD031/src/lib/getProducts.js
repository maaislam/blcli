export default (currentPrice, cb) => {
  /**
   * first = 20-59
   * second = 59-89
   * third = 89-119
   * fourth = 119-249
   */
  let nextLevelPrice = 0;
  if (currentPrice < 20) {
    nextLevelPrice = 1;
  } else if (currentPrice >= 20 && currentPrice <= 59) {
    nextLevelPrice = 2;
  } else if (currentPrice > 59 && currentPrice <= 89) {
    nextLevelPrice = 3;
  } else if (currentPrice > 89 && currentPrice <= 119) {
    nextLevelPrice = 4;
  } else if (currentPrice > 119 && currentPrice <= 249) {
    nextLevelPrice = 4;
  }

  /**
   * Hard coded 'male' products (no way to determine gender at the moment)
   */
  const priceHrefs = {
    1: 'https://www.glassesdirect.co.uk/gender/male/price/20:59/',
    2: 'https://www.glassesdirect.co.uk/gender/male/price/59:89/',
    3: 'https://www.glassesdirect.co.uk/gender/male/price/89:119/',
    4: 'https://www.glassesdirect.co.uk/gender/male/price/119:249/',
  };

  const hrefToUse = priceHrefs[nextLevelPrice];

  const fetchProducts = (url) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = () => {
      /**
       * products object
       */
      const products = [];

      if (request.status >= 200 && request.status < 400) {
        // Success!
        const data = request.responseText;
        const div = document.createElement('div');
        div.innerHTML = data;
        /**
         * Loop over products and pull the top 5
         */
        const productList = div.querySelectorAll('.search-product-list .product');
        if (productList.length) {
          for (let i = 0; productList.length > i; i += 1) {
            if (i === 6) break;
            const thisProduct = productList[i];
            products.push({
              name: thisProduct.querySelector('h4 span.name'),
              price: thisProduct.querySelector('.price-display .price-display__current.price.current-price').textContent,
              link: thisProduct.querySelector('a.product-link').href,
              brand: thisProduct.querySelector('.brand-name'),
              image: thisProduct.querySelector('img.product-image'),
              rating: thisProduct.querySelector('span.product__rating.stars'),
            });
          }
        }
        cb(products);
      } else {
        // We reached our target server, but it returned an error
        console.error('products not found');
      }
    };

    request.onerror = () => {
    // There was a connection error of some sort
    };

    request.send();
  };
  fetchProducts(hrefToUse);
};
