/**
 * PJ061 - Weather API Integration - Null Hypothesis
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';

const activate = () => {
  setup();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const url = 'https://fcc-weather-api.glitch.me/api/current?lat=' +  position.coords.latitude + '&lon=' + position.coords.longitude;
      window.jQuery.getJSON(url, function(data) {
       sessionStorage.setItem('weather', data.weather[0].main);
       sessionStorage.setItem('temp', data.main.temp);
      });
    });
  }
  
};

export default activate;
