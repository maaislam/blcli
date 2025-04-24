/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
import { getUrlParameter, events } from './../../../../../lib/utils';
import { pollerLite } from './../../../../../lib/uc-lib';

/**
 * Persist local data
 */
const persistLocalData = (data) => {
  localStorage.setItem(settings.ID, JSON.stringify(data));
};

/**
 * Write
 */
const getLocalData = () => {
  const localData = localStorage.getItem(settings.ID);
  let data = null
  if(localData) {
    data = JSON.parse(localData);
  } else {
    data = {};
  }

  return data;
};

/**
 * Entry point for running experiment
 */
const activate = () => {
  setup();

  if(window.location.pathname.match(/search-results/i)) {
    // ----------------------------------------------------------------
    // Whenever a user searches, store the search in local storage
    // ----------------------------------------------------------------
    pollerLite([
      '#ddlRegion',
      '#ddlPoint',
    ], () => {
      let departDate = null;
      let endDate = null;
      let regionText = null;
      let regionValue = null;
      let departureTown = null;
      let departureValue = null;

      const ddlRegion = document.querySelector('#ddlRegion');
      if(ddlRegion) {
        regionValue = ddlRegion.value;

        const regionOption = ddlRegion.options[ddlRegion.selectedIndex];
        if(regionOption) {
          regionText = regionOption.innerText.trim();
        }
      }

      const ddlPoint = document.querySelector('#ddlPoint');
      if(ddlPoint) {
        departureValue = ddlPoint.value;

        const departureOption = ddlPoint.options[ddlPoint.selectedIndex];
        if(departureOption) {
          departureTown = departureOption.innerText.trim();
        }
      }

      const minDate = getUrlParameter('min', window.location.href);
      const maxDate = getUrlParameter('max', window.location.href);
      if(minDate) {
        departDate = minDate.split('-').reverse().join('/');  
      }
      if(maxDate) {
        endDate = maxDate.split('-').reverse().join('/');  
      }

      const d = getLocalData();
      persistLocalData(Object.assign(d, {
        searchUrl: window.location.href,
        dateFirst: departDate,
        dateLast: endDate,
        region: regionText,
        regionValue: regionValue,
        town: departureTown,
        townValue: departureValue
      }));
    });
  } else {
    // ----------------------------------------------------------------
    // Show banner
    // ----------------------------------------------------------------
    pollerLite([
      '.page-wrapper',
      '.blue-bar',
    ], () => {
      const localData = getLocalData();
      if(localData && localData.searchUrl) {
        const pageWrapperHeader = document.querySelector('.blue-bar');
        pageWrapperHeader.insertAdjacentHTML('afterend', `
          <div class="${settings.ID}-banner">
            <div class="container">
              <p class="${settings.ID}-title">Welcome back to National Holidays</p>

              <p class="${settings.ID}-cta">
                <a class="${settings.ID}-cta__btn" href="${localData.searchUrl}">View your last search</a>
              </p>
            </div>
            
          </div>
        `);

        events.send(`${settings.ID}`, 'did-show-banner-at-top');

        const link = document.querySelector(`.${settings.ID}-cta__btn`);
        if(link) {
          link.addEventListener('click', () => events.send(`${settings.ID}`, 'did-click-cta-btn'));
        }
      }
    });
  }
};

export default activate;
