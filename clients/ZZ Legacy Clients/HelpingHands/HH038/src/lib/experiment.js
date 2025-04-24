import settings from './settings';
import { setup } from './services';
import CountySearch from './components/county-search';
import { events } from '../../../../../lib/utils';

/**
 * Helper build search by county box
 */
const buildCountySearch = () => {
  const mainContainer = document.querySelector('#main > .container > .row');
  if(mainContainer) {
    mainContainer.insertAdjacentHTML('afterend', `
      <div class="${settings.ID}-search-container"></div>
    `);

    const searchContainer = document.querySelector(`.${settings.ID}-search-container`);

    const countySearch = new CountySearch((component) => {
      searchContainer.innerHTML = component.render();
    });
  }
};

/**
 * Helper - reframe search
 */
const reframeSearch = () => {
  const locationsSearch = document.querySelector('.locations-search');
  if(locationsSearch) {
    locationsSearch.insertAdjacentHTML('afterbegin', `<p class="${settings.ID}-loc-title"><span>Find your nearest Helping Hands branch</span></p>`);

    const btn = locationsSearch.querySelector('.btn-primary');
    if(btn) {
      btn.innerHTML = 'Find branch<span> &nbsp;&gt;</span>';

      btn.addEventListener('click', () => {
        events.send(
          `${settings.ID}-${settings.VARIATION}`,
          'did-click-search-form-submit-btn'
        );
      });
    }

    const input = locationsSearch.querySelector('input[type=text]');
    if(input) {
      input.setAttribute('placeholder', 'Enter town or postcode...');
    }

  }
};

/**
 * Entry point for experiment
 */
const activate = () => {
  setup();

  const h1 = document.querySelector('h1');
  if(h1) {
    h1.innerHTML = '<span>Find your local branch</span>';
    h1.classList.add('entry-title');
  }

  reframeSearch();
  buildCountySearch();

  // Events
  const locInput = document.querySelector('[name=loc]');
  if(locInput) {
    locInput.addEventListener('keyup', () => {
      events.send(
        `${settings.ID}-${settings.VARIATION}`,
        'did-type-in-search-box',
        '',
        {
          sendOnce: true
        }
      );
    });
  }
};

export default activate;
