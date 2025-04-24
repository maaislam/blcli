export const addToCart = (sku, quantity) => {
  const payload = {
    sku,
    quantity,
    campaignNumber: PDP_MANAGER['API_DATA'].campaignNumber,
  };

  const response = fetch(
    `https://api.we.avon.digital-catalogue.com/avon-mas/${PDP_MANAGER['API_DATA'].mrktCd}/basket/${window.AG100aSpperId}/add-product`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  ).then((response) => response.json());
  return response;
};

export const emitDYAddToCart = (res, quantity) => {
  const eventTotal = (res['final_price'] / 100) * quantity;

  const atcJson = {
    name: 'Add to Cart',
    properties: {
      dyType: 'add-to-cart-v1',
      value: eventTotal,
      currency: 'GBP',
      productId: res.sku,
      quantity: quantity,
    },
  };
  //emit DY event
  DY.API('event', atcJson);
};
