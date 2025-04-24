const getProducts = (skusArr) => {
  const runtimeData = window.__NEXT_DATA__.runtimeConfig;
  const { apiRoot, tenantId, tykToken } = runtimeData;
  const productUrl = `${apiRoot}/v1/${tenantId}/search/products/suggested?skuIds=${skusArr.join(',')}`;
  return fetch(productUrl, {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      authorization: tykToken,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data', data);
      return data?.products;
    });
};

export default getProducts;
