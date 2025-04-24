export const initWistia = (jsUrls) => {
  jsUrls.forEach((url) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `${url}`;
    script.setAttribute('async', true);
    document.querySelector('head').append(script);
  });
};

export const wistiaId = () => {
  const countryConfig = {
    uk: 'ardz5igi5r',
    usa: '6nsfw0l6yn',
    au: '801n0lnxqx',
    fr: 'br7fqwrlhs',
  };
  const getCountry = (str) => window.location.pathname.includes(str);
  const countryStr = getCountry('/fr') ? 'fr' : getCountry('en-au') ? 'au' : 'uk';
  return countryConfig[countryStr];
};
