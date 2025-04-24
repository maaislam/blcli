/**
 * Get weather and other GeoData from ABTasty API
 *
 * @return {Promise}
 */
export const getWeatherFromAPI = () => {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'https://dcinfos-cache.abtasty.com/v1/geoip')
    xhr.onload = function() {
      try {
        const result = JSON.parse(this.responseText);
        res(result);
      } catch(e) {}
    }
    xhr.send('{"weather": true}')
  });
};

/**
 * Scrape weather from AB Tasty Widget
 *
 * @param {HTMLEelement} widgetElm
 * @return {Object}
 */
export const scrapeWeatherFromABTastyWidget = (widgetElm) => {
  const result = {
    temperatureValue: '',
    temperatureUnit: '',
    city: '',
    image: '',
    condition: '',
  };

  const image = widgetElm.querySelector('.abtasty-weather__image');
  if(image) {
    result.image = (image.getAttribute('src') || '').trim();
    result.condition = (image.getAttribute('alt') || '').trim();
  }

  const temperatureInfoElm = widgetElm.querySelector('.abtasty-weather__temperature');
  if(temperatureInfoElm) {
    const temperatureValue = (temperatureInfoElm.innerText.match(/^\d+/) || [])[0];

    if(temperatureValue !== undefined) {
      result.temperatureValue = parseInt(temperatureValue);
    }

    const temperatureUnit = (temperatureInfoElm.innerText.match(/[^\s]+$/) || [])[0];
    result.temperatureUnit = temperatureUnit || '';

    const city = (document.querySelector('.abtasty-weather__city--text') || {}).innerText;
    if(city) {
      result.city = city.trim();
    }

  }

  return result;
};
