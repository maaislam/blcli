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

  logMessage("FLAN-178");

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
        document.body.classList.add('FLAN-178-noscroll');
        events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION}`, `click on open FP search`);
      });
    }

    
  }

  const addAltLinkClickEvents = () => {


    let altLinks = document.querySelectorAll('.alt-link');

    [].slice.call(altLinks).forEach((altLink) => {

      altLink.addEventListener('click', (e) => {
        let destHref = e.currentTarget.href;
        events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION}`, `click on trending category link to go to: ${destHref}`);
      })

    });


  }

  const amendSearchFunctionality = () => {

     // search assignations
    

    searchBoxHolder.appendChild(autoComplete);
    searchBoxHolder.insertAdjacentHTML('afterbegin', '<h2 class="mobsearch-header"> Search </h2> <button id="close-fpsearch" class="close-fpsearch"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25" height="25" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata><g><path d="M500,442.7L79.3,22.6C63.4,6.7,37.7,6.7,21.9,22.5C6.1,38.3,6.1,64,22,79.9L442.6,500L22,920.1C6,936,6.1,961.6,21.9,977.5c15.8,15.8,41.6,15.8,57.4-0.1L500,557.3l420.7,420.1c16,15.9,41.6,15.9,57.4,0.1c15.8-15.8,15.8-41.5-0.1-57.4L557.4,500L978,79.9c16-15.9,15.9-41.5,0.1-57.4c-15.8-15.8-41.6-15.8-57.4,0.1L500,442.7L500,442.7z"/></g></svg></button>');

    let altLinkStyle = "list";
    if(VARIATION == 2) {
      altLinkStyle = "pills";
    }

    searchBoxHolder.insertAdjacentHTML('beforeend', `
      <div class="alt-links-holder ${altLinkStyle}">

        <h3> Trending Categories </h3>

        <div class="alt-links">

          <a href="https://www.flannels.com/searchresults?descriptionfilter=Men%27s%20Jackets" class="alt-link"> Men's Jackets </a>
          <a href="https://www.flannels.com/searchresults?descriptionfilter=Men%27s%20Trainers" class="alt-link"> Men's Trainers </a>
          <a href="https://www.flannels.com/searchresults?descriptionfilter=Women%27s%20Bags" class="alt-link"> Women's Bags </a>
          <a href="https://www.flannels.com/searchresults?descriptionfilter=Women%27s%20Sweatshirts" class="alt-link"> Women's Sweatshirts </a>
          <a href="https://www.flannels.com/searchresults?descriptionfilter=Sliders" class="alt-link"> Sliders </a>

        </div>

      </div>

    `);

    addAltLinkClickEvents();

    takeoverSearchClick("create");

    let newCloseButton = document.getElementById('close-fpsearch');
    newCloseButton.addEventListener('click', (e) => {
      e.preventDefault();
      events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION}`, `click on close search`);
      searchButton.value = "";
      autoComplete.classList.remove('active');
      searchBoxHolder.classList.remove('active');
      searchBoxHolder.classList.remove('search-in-use');
      document.body.classList.remove('FLAN-178-noscroll');
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
        document.body.classList.remove('FLAN-178-noscroll');
        searchBoxHolder.classList.remove('search-in-use');
        searchBoxHolder.classList.remove('active');
        takeoverSearchClick('remove');
      } else {
        if(searchBoxHolder.classList.contains('active')) {
          document.body.classList.add('FLAN-178-noscroll');
        }
      }
    }, false);

  }

  amendSearchFunctionality();

};
