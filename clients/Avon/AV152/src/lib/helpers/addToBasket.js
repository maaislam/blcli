const addToCart = (Sku, Quantity) => {
  const payload = {
    Sku,
    Quantity,
    Campaign: window._ShopContext.CampaignNumber,
  };

  const response = fetch(`/api/cartapi/add`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([payload]),
  }).then((response) => response.json());
  return response;
};
export default addToCart;
