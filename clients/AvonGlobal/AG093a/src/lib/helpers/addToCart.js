const addToCart = (sku, quantity) => {
  const payload = {
    sku,
    quantity,
    campaignNumber: PDP_MANAGER['API_DATA'].campaignNumber,
  };

  const response = fetch(
    `https://api.we.avon.digital-catalogue.com/avon-mas/${PDP_MANAGER['API_DATA'].mrktCd}/basket/${window.AG093aSpperId}/add-product`,
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
export default addToCart;
