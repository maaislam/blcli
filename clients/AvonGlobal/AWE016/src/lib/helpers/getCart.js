export const getCart = () =>
  fetch(`/api/Cartapi/Cart?_=${Date.now()}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
