import store from './store';

const fetch = {
  similarProducts(brandName, basketProducts) {
    let productId;
    // Get product and product Url.
    Array.from(basketProducts).forEach((prod) => {
      const title = prod.querySelector('a.productTitle');

      if (!title) return;
      const titleText = title.textContent.trim();
      if (titleText && titleText.match(brandName)) {
        const productUrl = title.getAttribute('href');
        productId = productUrl.match(/(\d{6})/g);
      }
    });

    if (productId.length > 1) {
      productId = productId[0];
    }
    
    // We have product URL and ID. Can replicate a request to their ProductDetail API.
    const ApiUrl = `https://www.flannels.com/DesktopModules/ProductDetail/API/ItemSuggestions/GetProductSuggestions?productId=${productId}&numPlacements=1&ItemType=product`;
    const products = new Promise((res, rej) => {
      const request = new XMLHttpRequest();
      request.open('GET', ApiUrl, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const data = JSON.parse(request.responseText);
          console.log('fetched data ', data);
          const { Products } = data[0];
          res(Products);
        } else {
          console.log('reached server but error returned');
        }
      };

      request.onerror = (err) => {
        console.log(err);
        rej(err);
      };

      request.send();
    });

    // Return products Promise.
    return products;
  },
  recentlyViewed() {
    const brands = store.brandStore();
    return brands;
  },
};

export default fetch;
