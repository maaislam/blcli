const getCart = () => {
  const timeStamp = Math.floor(Date.now() / 1000);
  const response = fetch(`/api/cartapi/Cart?_=${timeStamp}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
  return response;
};

export default getCart;
//ttps://www.avon.ro/api/Cartapi/Cart?_=1646303096027
