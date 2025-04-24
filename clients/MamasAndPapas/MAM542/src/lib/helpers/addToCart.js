const addToCart = (sku, quantity = 1) => {
  //get variant id

  const payload = {
    id: sku,
    quantity,
  };

  const response = fetch(`/cart/add.js`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json());
  return response;
};

export default addToCart;
