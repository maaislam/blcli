import { getCookie } from './getCookie';

const getDYData = () => {
  const payload = {
    selector: {
      names: ['PDP.Basket'],
      args: {
        'PDP.Basket': {
          realtimeRules: [
            {
              type: 'include',
              slots: [],
              query: {
                conditions: [
                  {
                    field: 'campaign_id',
                    arguments: [
                      {
                        action: 'CONTAINS',
                        value: PDP_MANAGER.API_DATA.campaignId,
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    },
    context: {
      page: {
        type: 'CART',
        data: DY.recommendationContext.data,
        location: location.href,
        referrer: document.referrer,
        locale: 'en_US',
      },
      device: {
        userAgent: window.navigator.userAgent,
      },
    },
    options: {
      isImplicitPageview: true,
    },
    user: {
      dyid: getCookie('_dyid'),
      dyid_server: getCookie('_dyid_server'),
    },
    session: {
      dy: getCookie('_dy_csc_ses'),
    },
  };
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'DY-API-Key': 'cc6a8dbcd1d3fd3b214a189bc415b9ace152faf65f24f27fb1116cd4f3333d7f',
    },
    body: JSON.stringify(payload),
  };

  return fetch('https://direct.dy-api.eu/v2/serve/user/choose', options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      return response.choices[0].variations[0].payload.data.slots.map((slot) => slot.productData);
    });
};

export default getDYData;
