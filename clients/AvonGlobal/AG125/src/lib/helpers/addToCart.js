/*eslint-disable no-underscore-dangle */
const addToCart = (skus) => {
  const addToCartEndpoint = '/api/cartapi/add';
  const payloads = skus.split(',').map((sku) => {
    return {
      Campaign: window._ShopContext.CampaignNumber,
      Quantity: 1,
      Sku: sku.trim(),
    };
  });
  console.log(payloads);

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payloads),
  };

  return fetch(addToCartEndpoint, options).then((respnse) => respnse.json());
};

export default addToCart;
