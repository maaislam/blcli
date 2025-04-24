export const fetchBrochureSettings = () => {
  // eslint-disable-next-line no-undef
  return PDP_MANAGER.getBrochureSettings();
  //returns promise;
};

export const fetchCart = () => {
  // eslint-disable-next-line no-undef
  return PDP_MANAGER.getBasketData();
  //returns promise;
};

export const getProdDetails = (skusArr) => {
  // eslint-disable-next-line no-undef
  const { brochure_id, campaignNumber } = PDP_MANAGER['API_DATA'];

  const response = fetch(
    `https://api.we.avon.digital-catalogue.com/avon-mas/UK/product/view-data/${campaignNumber}/?brochureId=${brochure_id}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skus: skusArr }),
    }
  ).then((response) => response.json());
  //returns promise
  return response;
};

// get cart api version
export const getCart = (shopperID) => {
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

//To open basket progmatically
MainFrame.EventHandler.dispatch('closeLdcAndOpenBasket');

//get rep data when attached only

export const getRepData = () => {
  return fetch(`/api/sessionapi/getsessionhash?_=${Date.now()}`)
    .then((res) => res.json())
    .then((sessionData) => sessionData.Data.Representative)
    .then((repSessionId) => fetch(`/api/sessionapi/getcurrentrepresentativeformodule?cb=${repSessionId}`))
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const addToCart = (sku, quantity) => {
  const payload = {
    sku,
    quantity,
    // eslint-disable-next-line no-undef
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

//please also send add to cart event to DY
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
