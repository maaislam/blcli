const getCart = (shopperID) => {
  //const { shopperId } = PDP_MANAGER['API_DATA'];

  const response = fetch(`https://api.we.avon.digital-catalogue.com/avon-mas/UK/basket/${shopperID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
  return response;
};

export default getCart;
