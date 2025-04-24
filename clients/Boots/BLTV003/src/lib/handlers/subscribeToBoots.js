const subscribeToBoots = async (email) => {
  const url = 'https://www.boots.com/online/api/marketing/v1/subscription';

  const headers = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    adrum: 'isAjax:true',
    'content-type': 'application/json',
    priority: 'u=1, i',
    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    triggeredfrom: 'https://www.boots.com/',
  };

  const body = JSON.stringify({
    signupCountry: 'GB',
    signupChannelType: 'email',
    signupChannelValue: email,
    profileInfo: [],
    subscriptionItems: [
      {
        itemCode: '100-1000',
        itemType: 'consent',
        value: 1,
      },
    ],
    lastUpdatedBy: 'EMAIL_LITE',
  });

  try {
    const response = await fetch(url, {
      headers,
      referrer: 'https://www.boots.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body,
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error during subscription:', error);
    throw error;
  }
};

export default subscribeToBoots;
