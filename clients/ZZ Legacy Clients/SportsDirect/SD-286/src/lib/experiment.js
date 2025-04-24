/**
 * SD-286 - Trending Categories within search
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, pollerLite, logMessage } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met')

  logMessage(ID + " Variation: "+VARIATION);

  if(VARIATION == "control") {
    return;
  }

  pollerLite(['#MobtxtSearch', '#divMobSearch', '#ui-id-2'], () => {

    const body = document.body;
    const initialWindowHeight = window.innerHeight;
    let resizedHeight;
    let searchButtonListener;
    let searchButton = document.getElementById('MobtxtSearch');
    let searchBoxHolder = document.getElementById('divMobSearch');
    let autoComplete = document.getElementById('ui-id-2');

    const takeoverSearchClick = (method) => {

      if(method == "remove") {
        searchButton.removeEventListener('click', searchButtonListener);
      }

      if(method == "create") {
        searchButtonListener = searchButton.addEventListener('click', (e) => {
          e.preventDefault();
          searchBoxHolder.classList.add('active');
          document.body.classList.add('SD-286-noscroll');
          fireEvent(`click on open FP search`);
        });
      }

      
    }

    const addAltLinkClickEvents = () => {


      let altLinks = document.querySelectorAll('.alt-link');

      [].slice.call(altLinks).forEach((altLink) => {

        altLink.addEventListener('click', (e) => {
          let destHref = e.currentTarget.href;
          fireEvent(`click on trending category link to go to: ${destHref}`);
        })

      });


    }

    const amendSearchFunctionality = () => {

      // search assignations
      

      searchBoxHolder.appendChild(autoComplete);
      searchBoxHolder.insertAdjacentHTML('afterbegin', '<h2 class="mobsearch-header"> Search </h2> <button id="close-fpsearch" class="close-fpsearch">CLOSE</button>');

      let altLinkStyle = "list";
      if(VARIATION == 2) {
        altLinkStyle = "pills";
      }

      searchBoxHolder.insertAdjacentHTML('beforeend', `
        <div class="alt-links-holder ${altLinkStyle}">

          <h3> Trending Categories </h3>

          <div class="alt-links">

            <a href="https://www.sportsdirect.com/searchresults?descriptionfilter=Nike%20Trainers" class="alt-link"> Nike Trainers </a>
            <a href="https://www.sportsdirect.com/searchresults?descriptionfilter=Mens%20Football%20Boots" class="alt-link"> Men's Football Boots </a>
            <a href="https://www.sportsdirect.com/searchresults?descriptionfilter=Golf" class="alt-link"> Golf </a>
            <a href="https://www.sportsdirect.com/searchresults?descriptionfilter=Bikes" class="alt-link"> Bikes </a>
            <a href="https://www.sportsdirect.com/searchresults?descriptionfilter=Weights" class="alt-link"> Weights </a>
            <a href="https://www.sportsdirect.com/searchresults?descriptionfilter=Adidas%20Trainers" class="alt-link"> Adidas Trainers </a>

          </div>

        </div>

      `);

      addAltLinkClickEvents();

      takeoverSearchClick("create");

      let newCloseButton = document.getElementById('close-fpsearch');
      newCloseButton.addEventListener('click', (e) => {
        e.preventDefault();
        fireEvent(`click on close search`);
        searchButton.value = "";
        autoComplete.classList.remove('active');
        searchBoxHolder.classList.remove('active');
        searchBoxHolder.classList.remove('search-in-use');
        document.body.classList.remove('SD-286-noscroll');
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
          document.body.classList.remove('SD-286-noscroll');
          searchBoxHolder.classList.remove('search-in-use');
          searchBoxHolder.classList.remove('active');
          takeoverSearchClick('remove');
        } else {
          if(searchBoxHolder.classList.contains('active')) {
            document.body.classList.add('SD-286-noscroll');
          }
        }
      }, false);

    }

    amendSearchFunctionality();
  });

};
