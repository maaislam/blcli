//get nearby stores
const getNearbyStores = async (lat, long) => {
  const { tykToken } = window.__NEXT_DATA__.props.clientConfig;
  const url = `/prod/ffx-browse-bff/v1/SFXUK/store/search?lat=${lat}&long=${long}&limit=2`;

  const headers = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    authorization: tykToken,
    'content-type': 'application/json',
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching Screwfix stock data:', error);
    return null;
  }
};

export default getNearbyStores;
