/**
 * BV023 - Pop up mobile
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { getCookie, events, getUrlParameter, logMessage } from '../../../../../lib/utils';
import shared from './shared';
import { getWeatherFromAPI } from '../../../lib/weather';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
// Overrides all other checks
const RUN_ANYWAY = false;
  
// Weather blacklist
const blacklist = [/rain/, /storm/, /drizzle/, /snow/, /dust/, /fog/, /haze/, /mist/, /overcast/, /sleet/];

// Weather whitelist if we really want to reign in showing it
const whitelist = [/clear sky/, /sunny/];

// Min temperature required
const TEMP_THRESHOLD = 20;

/**
 * Capitalize string words
 */
const capitalise = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());

/**
 * Helper is blacklisted weather
 */
const isBlacklistedWeather = (weatherInfo) => blacklist.some((regex) => regex.test(weatherInfo.weather.description));

/**
 * Hepler is whitelisted weather
 */
const isWhitelistedWeather = (weatherInfo) => whitelist.some((regex) => regex.test(weatherInfo.weather.description));

/**
 * Helper meets temp threshold
 */
const meetsThreshold = (weatherInfo) => weatherInfo.weather.temperature > TEMP_THRESHOLD;

/**
 * Custom widget html
 */

const cToF = (celsius) => {
  var cTemp = celsius;
  var cToFahr = cTemp * 9 / 5 + 32;
  var message = cTemp+'\xB0C is ' + cToFahr + ' \xB0F.';
  return cToFahr;
}

const getCustomWidgetHtml = (data) => {
  return `
    <a class="${ID}-weather" href="/collections/all-swimwear/">
      <div class="${ID}-weather__intro">
        Looks like perfect weather for swimwear!
      </div>
      <div class="${ID}-weather__link">
        <span>Shop Swimwear</span>
      </div>
      <div class="${ID}-weather__meta">
        <div class="${ID}-weather__temp">
          <img src="data:image/gif;base64,R0lGODlhQABAANU/ALrLRKzLUvLODNrQJXvCgeTSGtXNKcHKPUa6tXbBhvnWBrLLS+HRHf/VAMvOM1q8oWG+moLCeki6s6LGW2m/k1O8qY7GbvXUCv/RAOnTFk27rvHVDZvGYpvKYl69npTFaP/ZAMjQNu7UEp7HX9TQK1e8pG7AjqfIV2zAkJfGZr7OQMbZOYvDc7bQSK7JT//XAP7WAfzWBLfFRlfApUS6uHXCh+TUGnq/g4fEdsHTPObSGKPIW/XTCsHIPP/WAEK5uSH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjExQzMwRkFDQ0MxMTFFQUJBOEFBMjkxNEIzNDBBRDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjExQzMwRkJDQ0MxMTFFQUJBOEFBMjkxNEIzNDBBRDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTFDMzBGOENDQzExMUVBQkE4QUEyOTE0QjM0MEFEMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MTFDMzBGOUNDQzExMUVBQkE4QUEyOTE0QjM0MEFEMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAD8ALAAAAABAAEAAAAb/wJ9wSCwaj8LTZnNCOp/QqHPkq/pG0qx2q7P6dNuw+Ni1gsdoMcPLSLu1a2v7TX/Gq/O6vnj35fdOCScWWxleGVsWJwljVD4vJAhZBl4kWQgkL49YWw9ePgMSUiYwVTAmUhIDDV4PWwmaVi+hUhAnAR6pA7FVLzVbGjG8jwOSewi7nzEaYTcgwyAGxnSYwz4gN2MRL8MvKUgIFDgjJycjOBTTRR/dLxFp214vB0YEAIafVRkABEYH3e/cxKvSgNAQAqvy5WswoN8QCw1YPQr4JoKCUj2GaFDhQ6LCT6xUMBPSo4oCinRKsPglBEKZjzB9ZIAwpAaLEoCKUFAQs6cP/wUUciJ5wNNnTwWuhBYpYNRoAaVEAlhrqvBFAKg/PHikGrNBLqU5MHD1iSGH0godx/ZkVUHoB7VNPwh1MBXupxcOwkgowbdv2yEIRNS1K0uEugp9+4oSkkIEjMePffBYMMQDYaNffyy44ANyKRHfCGz9tEOIics+Uf2YEJPACgyjrSD6kQB1T0Y/8CnEsKKFWIUMhdSwHZNln08YWnhQELF5cx8OURCHiUIIgRfOnSvIBWFBiO/gVeD+USHG9Hwx/tJWAR78gsxSCgy+/OJpTgDzCb8AIFR0frXYOQQIDRvEdlkDG9CgVAe/TYdBB1AhcMF/VL1wgTo5XTfdCwJCtfwAhT69QBlWQzhgW14kEmEiYShCZUEICyT1gwt2uTDEA94ZVAcArDQgwAxDRFBARPlh10ABFM0gQGT80YGfF1cB1oENBlrRgA0dqBOAPE2m8aQXXQ5Bww0uDLCBFxsM4MINChYBwF1hhiGDNS+Md4QGEFBAAQQjIVEDnTKMEUCDvXCixwjDRBSlFlpBM4FQE4Agj1ev3NWEFBwwUMA3UpxgjZ1RaMBZFSBcGsVbVsjVqaRVXNBnFigwpQAHWjBlhX2YMldAdWIggAJOWrz0xRYloIAhiX38keIYyS7rRrPOogFttGLoJhO1YwzgxQDYigELkaB2OwoAAKgGSBAAOw==
">
          <span>
            ${cToF(Math.ceil(data.weather.temperature))}
            °F
            Sunny
          </span>
        </div>
        ${data.city ? `
          <div class="${ID}-weather__location">${data.city}</div>
        ` : ''}
        
      </div>
    </div>
  `;
};



/**
 * Entry point post polling
 */
const activate = () => {
  // Scrape weather
  const main = document.querySelector('.c-page');

  if(main) {
    getWeatherFromAPI().then(weatherInfo => {

      logMessage(weatherInfo);

      if(weatherInfo && weatherInfo.city && weatherInfo.weather) {

        if(RUN_ANYWAY || (!isBlacklistedWeather(weatherInfo) && meetsThreshold(weatherInfo) && isWhitelistedWeather(weatherInfo)) || getUrlParameter('force')) {
          const html = getCustomWidgetHtml(weatherInfo);

          setup();

          logMessage(ID + " Variation: "+VARIATION);

          if(VARIATION != 'control') {
            main.insertAdjacentHTML('afterbegin', html);

            const banner = document.querySelector(`.${ID}-weather`);
            if(banner) {
              banner.addEventListener('click', () => {
                fireEvent('clicked-weather-banner');
              });
            }
          }

          let fireMessage = 'displayed-weather - temperature: '+weatherInfo.weather.temperature+' city: '+weatherInfo.city+' condition: '+weatherInfo.weather.main;
          logMessage(fireMessage);
          fireEvent(fireMessage);
        } 
      } 
    });
  }

};

export default activate;
