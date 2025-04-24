import shared from "../../../../../core-files/shared";
import {
  currentWeather,
  getForecast,
} from "../../../../../lib/utils/weatherApi";
import pushWeather from "./pushWeather";
import pushForecast from "./pushForecast";
import getWithExpiry from "../lib/getWithExpiry";
import setWithExpiry from "../lib/setWithExpiry";

const apiKey = "1b61d92e090749a28eb93425220107";

const { ID } = shared;

const handleWeather = () => {
  // Local storage key
  const weatherStorageKey = `${ID}`;
  const forecastStorageKey = `${ID}-forecast`;

  // Timing
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const twoDays = day * 2;
  const halfDay = day * 0.5;

  // Push to data layer if hasn't pushed weather within current 2 days.
  const cachedWeather = getWithExpiry(weatherStorageKey);
  if (!cachedWeather) {
    currentWeather(apiKey).then((weather) => {
      if (weather?.current) {
        pushWeather(weather);
        setWithExpiry(weatherStorageKey, weather, twoDays);
      }
    });
  }

  // forecast
  const cachedForecast = getWithExpiry(forecastStorageKey);
  if (!cachedForecast) {
    getForecast(apiKey, 5).then((weather) => {
      let result = [];
      (weather?.forecast?.forecastday || []).forEach((d) => {
        if (d?.day?.condition?.text) {
          result.push(
            [d.day.condition.text, d.day.daily_chance_of_rain].join("/")
          );
        }
      });

      if (result.length) {
        pushForecast(result.join("|"));
        setWithExpiry(forecastStorageKey, weather, halfDay);
      }
    });
  }
};

export default handleWeather;
