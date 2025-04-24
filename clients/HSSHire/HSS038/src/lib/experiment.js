/**
 * HSS038 - Weather Forecast Widget
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const weatherData = JSON.parse(localStorage.getItem('HSSWeather-forecast'));
  /**
   * @desc Get weather forecast
   */
  const fiveDayForecast = weatherData?.value?.forecast?.forecastday;
  let today = '';
  let weatherIds = [];

  if (fiveDayForecast) {
    for (let i = 0; i < fiveDayForecast.length; i += 1) {
      if (i == 0) {
        today = fiveDayForecast[1].day.condition.text;
      }

      // --- SET WEATHER WIDGET IDs
      let weatherCondition = fiveDayForecast[i].day.condition.text.toLowerCase();
      switch(true) {
        case (weatherCondition.indexOf('mostly sunny') > -1):
          weatherIds.push('mostlySunny');
          break;
        case (weatherCondition.indexOf('sunny') > -1):
          weatherIds.push('sunny');
          break;
        case (weatherCondition.indexOf('rain') > -1):
          weatherIds.push('rain');
          break;
        case (weatherCondition.indexOf('cloud') > -1):
          weatherIds.push('cloudy');
          break;
        case (weatherCondition.indexOf('snow') > -1):
          weatherIds.push('snow');
          break;
        case (weatherCondition.indexOf('storms') > -1):
          weatherIds.push('storms');
          weatherId = 'storms';
          break;
        case (weatherCondition.indexOf('wind') > -1):
          weatherIds.push('windy');
          weatherId = 'windy';
          break;

        // --- Overcast
        case (weatherCondition.indexOf('overcast') > -1):
          weatherIds.push('cloudy');
          break;

        default:
          weatherIds.push('mostlySunny');
      }

    }

    
    const mainNav = document.querySelector('#menu nav.main_nav .center_block');

    // --- DESKTOP
    mainNav.insertAdjacentHTML('beforeend', `<div class="${ID}-right"></div>`);

    let weatherNav = `<!--<div class="location">${weatherData.value.location.name}</div>-->
    <div class="day icon" id="${weatherIds[1]}" data-weather="${today}">Tomorrow</div>
    <div class="widget">Local 5 Day Forecast</div>
    <div class="widget-content desktop hidden">
      <!--<div class="${ID}-today-forecast">
        <span class="local">${weatherData.value.location.name} <p>Current conditions</p></span>
        <span class="icon today desktop" id="${weatherIds[0]}"></span>
        <span class="temp">${weatherData.value.current.temp_c}˚C <p>${today}</p></span>
      </div>-->
      <div class="${ID}-weekly-forecast">
        <ul></ul>
      </div>
    </div>`;

    if (!document.querySelector(`#menu nav.main_nav .center_block .${ID}-right .widget-content.desktop`)) {
      document.querySelector(`#menu nav.main_nav .center_block .${ID}-right`).insertAdjacentHTML('afterbegin', weatherNav);
    }
    

    // --- Generate full week forecast
    function getDayOfWeek(date) {
      const dayOfWeek = new Date(date).getDay();    
      return isNaN(dayOfWeek) ? null : 
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];
    }
    let weeklyForecast = '';
    for (const key in fiveDayForecast) {

      if (fiveDayForecast.hasOwnProperty(key) && key !== 0) {

          const id = weatherIds[key];
          const day = fiveDayForecast[key].date;
          const maxTemp = fiveDayForecast[key].day.maxtemp_c;
          const minTemp = fiveDayForecast[key].day.mintemp_c;

          weeklyForecast += `<li>
            <span class="day">${getDayOfWeek(day)}</span>
            <!--<span class="icon ${window.innerWidth > 767 ? 'desktop' : 'mobile'}" id="${id}"></span>-->
            <span class="icon desktop" id="${id}"></span>
            <span class="temp max_temp">${maxTemp}˚C</span>
            <span class="temp min_temp">${minTemp}˚C</span>
          <li>`;
      }
    }

    if (document.querySelectorAll(`.${ID}-right .widget-content.desktop .${ID}-weekly-forecast ul li`).length == 0) {
      document.querySelector(`.${ID}-right .widget-content.desktop .${ID}-weekly-forecast ul`).insertAdjacentHTML('afterbegin', weeklyForecast);
    }
    

    // --- MOBILE
    let weatherMobileNav = `<div class="widget-content mobile">
      <div class="${ID}-today-forecast">
        <!--<div class="location">${weatherData.value.location.name} <p>5 day forecast</p></div>-->
        <div class="location"><p>Local 5 Day Forecast</p></div>
      </div>
      <div class="${ID}-weekly-forecast">
        <ul>${weeklyForecast}</ul>
      </div>
    </div>`;

    if (!document.querySelectorAll(`ul#nav .sub_menu`)[0].querySelector('.widget-content.mobile')) {
      document.querySelectorAll(`ul#nav .sub_menu`)[0].insertAdjacentHTML('afterbegin', weatherMobileNav);
    }
    if (!document.querySelectorAll(`ul#nav .sub_menu`)[1].querySelector('.widget-content.mobile')) {
      document.querySelectorAll(`ul#nav .sub_menu`)[1].insertAdjacentHTML('afterbegin', weatherMobileNav);
    }

    /**
     * @desc Events / GA Tracking
     */
    // --- Mobile - Swipe
    const allMobileWidgets = document.querySelectorAll(`.widget-content.mobile`);
    [].forEach.call(allMobileWidgets, (mobileWidget) => {
      mobileWidget.addEventListener('scroll', (e) => {
        fireEvent(`Click - Mobile Weather Forecast Widget - Swipe`);
      });
    });
    
    // --- Show / Hide Desktop Weather Widget
    document.querySelector(`.${ID}-right .widget`).addEventListener('mouseover', (e) => {
      // document.querySelector(`.${ID}-right .widget-content`).classList.remove('hidden');
      // document.querySelector(`.${ID}-right .widget`).classList.toggle('active');

      fireEvent(`Conditions Met - Weather Forecast Widget - Hover`);
    });
    document.querySelector(`.${ID}-right .widget`).addEventListener('click', (e) => {
      document.querySelector(`.${ID}-right .widget-content`).classList.toggle('hidden');
      
      if (document.querySelector(`.${ID}-right .widget-content`).classList.contains('hidden')) {
        document.querySelector(`.${ID}-right .widget`).classList.remove('active');
      } else {
        document.querySelector(`.${ID}-right .widget`).classList.add('active')
      }

      fireEvent(`Click - Weather Forecast Widget CTA`);
    });


    pollerLite(['.sub_menu.hire_mega_menu.drop_show', `.${ID}-right .widget-content`], () => {
      const allDropdownMenus = document.querySelectorAll('.sub_menu.hire_mega_menu.drop_show');
      [].forEach.call(allDropdownMenus, (menu) => {
        observer.connect(menu, () => {
          if (menu.classList.contains('openednow')) {
            document.querySelector(`.${ID}-right .widget-content`).classList.add('hidden');
          }
      
          if (document.querySelector(`.${ID}-right .widget-content`).classList.contains('hidden')) {
            document.querySelector(`.${ID}-right .widget`).classList.remove('active');
          } else {
            document.querySelector(`.${ID}-right .widget`).classList.add('active')
          }
        }, {
          throttle: 200,
          config: {
            attributes: true,
            childList: false,
            // subtree: true,
          },
        });
      });
    });
  }
  
};
