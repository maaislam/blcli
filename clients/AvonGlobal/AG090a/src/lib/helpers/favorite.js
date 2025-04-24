export const manageFavorite = (productId, operation) => {
  const payload = {
    productId,
  };

  const response = fetch(`/api/wishlistapi/${operation}/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json());
  return response;
};

export const isFavorite = () => fetch(`/api/wishlistapi/get/?_=${Date.now()}`).then((response) => response.json());
