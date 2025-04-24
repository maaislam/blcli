import { getCookie } from '../../../../../../lib/utils';

const getFacets = async (categoryArr) => {
  const url = '/online/api/search/v2/multiple-query/uk';
  const userToken = getCookie('x-search-usertoken');
  const headers = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    adrum: 'isAjax:true',
    'content-type': 'application/json',
    priority: 'u=1, i',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'x-client-id': window.__HEADERFOOTER_STATE__.searchClientId,
    'x-search-usertoken': userToken,
    'x-user-token': userToken,
  };

  const body = JSON.stringify({
    query: '',
    indices: {
      products: {
        paging: { index: 0, size: 48 },
        criteria: categoryArr,
        sortBy: 'mostRelevant',
      },
    },
    returnHits: true,
    returnSuggestions: false,
    returnFacets: true,
    returnChanel: false,
    searchRequired: true,
    adRequired: false, // Keep this false
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
};

export default getFacets;
