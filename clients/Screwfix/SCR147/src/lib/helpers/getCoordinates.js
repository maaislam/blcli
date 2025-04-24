const getCoordinates = async (inputString) => {
  const apiKey = 'woos-4771e0ba-6613-3ed9-93a1-eddce3e48bd8';
  const url = `https://api.woosmap.com/localities/autocomplete?input=${encodeURIComponent(
    inputString
  )}&components=country:GB|country:IM&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data?.localities?.map(({ location }) => location) || [];
  } catch (error) {
    console.log('Error fetching Woosmap locations:', error);
    return [];
  }
};

export default getCoordinates;
