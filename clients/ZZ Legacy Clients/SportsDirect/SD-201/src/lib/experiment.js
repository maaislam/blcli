/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import settings from './shared';
import { events, getCookie, deleteCookie, setCookie, pollerLite, logMessage } from '../../../../../lib/utils';


events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  logMessage("SD-201");

  const body = document.body;
  const initialWindowHeight = window.innerHeight;
  let resizedHeight;
  let searchButtonListener;
  let searchButton = document.getElementById('MobtxtSearch');
  let searchBoxHolder = document.getElementById('divMobSearch');
  let autoComplete = document.getElementById('ui-id-2');

  const { ID, VARIATION } = settings;

  const takeoverSearchClick = (method) => {

    if(method == "remove") {
      searchButton.removeEventListener('click', searchButtonListener);
    }

    if(method == "create") {
      searchButtonListener = searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        searchBoxHolder.classList.add('active');
        document.body.classList.add('SD-201-noscroll');
        events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION}`, `click on open FP search`);
      });
    }

    
  }

  const amendSearchFunctionality = () => {

     // search assignations

    searchBoxHolder.appendChild(autoComplete);
    searchBoxHolder.insertAdjacentHTML('afterbegin', '<h2 class="mobsearch-header"> Search </h2> <button id="close-fpsearch" class="close-fpsearch">CLOSE</button>');

    takeoverSearchClick("create");

    let newCloseButton = document.getElementById('close-fpsearch');
    newCloseButton.addEventListener('click', (e) => {
      e.preventDefault();
      events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION}`, `click on close search`);
      searchButton.value = "";
      searchBoxHolder.classList.remove('active');
      searchBoxHolder.classList.remove('search-in-use');
      document.body.classList.remove('SD-201-noscroll');
    });

    searchButton.addEventListener("keyup", (e) => {
      let valLength = e.target.value.length;
      if(valLength >= 1 && !searchBoxHolder.classList.contains('search-in-use')) {
        searchBoxHolder.classList.add('search-in-use');
        autoComplete.classList.add('active');
      }

      if(valLength == 0) {
        searchBoxHolder.classList.remove('search-in-use');
        autoComplete.classList.remove('active');
      }      
    });

    // Listen for orientation changes
    window.addEventListener("orientationchange", function() {
      // Announce the new orientation number
      if(screen.orientation.type == "landscape-primary") {
        document.body.classList.remove('SD-201-noscroll');
        searchBoxHolder.classList.remove('search-in-use');
        searchBoxHolder.classList.remove('active');
        takeoverSearchClick('remove');
      } else {
        if(searchBoxHolder.classList.contains('active')) {
          document.body.classList.add('SD-201-noscroll');
        }
      }
    }, false);

  }

  amendSearchFunctionality();

};
