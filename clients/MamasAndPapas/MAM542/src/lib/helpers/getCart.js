import getProductData from './getShopifyProductData';

const getCart = () => {
  const response = fetch(`/cart.js`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(({ items }) => {
      console.log('🚀 ~ file: getCart.js:13 ~ .then ~ items:', items);
      const urlsToFetch = items.map((item) => `/products/${item.handle}`);

      console.log('🚀 ~ file: experiment.js:83 ~ getCart ~ urlsToFetch:', urlsToFetch);
      // Call the helper function
      return getProductData(urlsToFetch);
    });
  return response;
};

export default getCart;
