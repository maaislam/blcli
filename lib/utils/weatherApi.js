
/**
 * Get weather from WeatherAPI
 *
 * @return {Promise}
 */
export const currentWeather = (apiKey) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip`;
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('post', url)
        xhr.onload = function() {
        try {
            const result = JSON.parse(this.responseText);
            res(result);
        } catch(e) {}
        }
        xhr.send();
    });
};

/**
 * Get forecasted weather
 *
 * @param {String} apiKey
 * @param {Number} days
 * @param {String} aqi Get air quality data?
 * @param {String} alerts Get alerts data?
 * @return {Promise}
 */
export const getForecast = (apiKey, days = 5, aqi = 'no', alerts = 'no') => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=auto:ip&days=${days}&aqi=${aqi}&alerts=${alerts}`;
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url)
        xhr.onload = function() {
        try {
            const result = JSON.parse(this.responseText);
            res(result);
        } catch(e) {}
        }
        xhr.send();
    });
};

