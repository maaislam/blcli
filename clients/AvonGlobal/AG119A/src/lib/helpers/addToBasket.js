export const addToCart = async (Sku, Quantity = 1) => {
  const payload = [
    {
      Sku,
      Quantity,
      Campaign: window._ShopContext.CampaignNumber,
    },
  ];

  const response = await fetch(`/api/cartapi/add`, {
    method: 'POST',
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'avon-post-type': 'angular',
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result;
};
