export const countryConfig = {
  'us/': 'us',
  'au/': 'au',
  '/fr': 'fr',
  '/de': 'de',
};
export const partnerUrlsConfig = {
  uk: '/partners/',
  us: '/en-us/partners/',
  au: '/en-au/partners/',
  fr: '/fr-fr/partenaires/',
  de: '/de-de/partner/',
};
export const getCountry = (countryConfig) => {
  const countryString = Object.keys(countryConfig).find((key) => window.location.pathname.includes(key) && key);
  const country = countryConfig[countryString] || 'uk';
  return { country, countryString };
};

export default getCountry;
