//get nearby stores
const setSelectedStore = (branchCode, storeName) => {
  return fetch('https://www.screwfix.com/prod/ffx-browse-bff/v1/SFXUK/account/selected-store', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      authorization: window.__NEXT_DATA__.props.clientConfig.tykToken,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ branchCode, storeName }),
    method: 'POST',
  })
    .then((response) => response.json())
    .catch((error) => console.error('Error updating store:', error));
};

export default setSelectedStore;
