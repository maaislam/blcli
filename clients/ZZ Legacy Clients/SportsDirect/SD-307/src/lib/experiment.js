/**
 * SD-307 - Recent Searches
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, pollerLite } from '../../../../../lib/utils';

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
    let searchButtonListener, searchBarListener;
    let searchBar = document.getElementById('MobtxtSearch');
    let searchButton = document.getElementById('MobcmdSearch');
    let searchBoxHolder = document.getElementById('divMobSearch');
    let autoComplete = document.getElementById('ui-id-2');

    const takeoverSearchClick = (method) => {

      if(method == "remove") {
        searchBar.removeEventListener('click', searchBarListener);
        searchButton.removeEventListener('click', searchButtonListener);
      }

      if(method == "create") {
        searchBarListener = searchBar.addEventListener('click', (e) => {
          e.preventDefault();
          searchBoxHolder.classList.add('active');
          document.body.classList.add('SD-307-noscroll');
        });

        searchButtonListener = searchButton.addEventListener('click', (e) => {
          e.preventDefault();
          searchBoxHolder.classList.add('active');
          document.body.classList.add('SD-307-noscroll');
        });
      }

      
    }

    const addAltLinkClickEvents = () => {


      let altLinks = document.querySelectorAll('.alt-link');

      [].slice.call(altLinks).forEach((altLink) => {

        altLink.addEventListener('click', (e) => {
          let destHref = e.currentTarget.href;
          fireEvent(`click on recent search link to go to: ${destHref}`);
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

      let recentSearches = JSON.parse(localStorage.getItem('SD-324-user-search-terms'));
      
      if(recentSearches !== null) {

        recentSearches = recentSearches.map((rs) => {

          let escapedName = encodeURI(rs);
          let transformedURL = "https://www.sportsdirect.com/searchresults?descriptionfilter=" + escapedName;
          return {'name': rs, 'url': transformedURL};

        });

        recentSearches = recentSearches.slice(0, 5);

        searchBoxHolder.insertAdjacentHTML('beforeend', `
          <div class="alt-links-holder ${altLinkStyle}">

            <h3> Your Recent Searches </h3>

            <div class="alt-links">
            
              
            </div>

          </div>

        `);

        let altLinkHolder = document.querySelector('.alt-links');

        recentSearches.forEach((rs) => {
          let newLink = '<a href="'+rs['url']+'" class="alt-link"> '+rs['name']+' </a>';
          altLinkHolder.insertAdjacentHTML('beforeend', newLink);
        })

        addAltLinkClickEvents();

      } 

      takeoverSearchClick("create");

      let newCloseButton = document.getElementById('close-fpsearch');
      newCloseButton.addEventListener('click', (e) => {
        e.preventDefault();
        fireEvent(`click on close search`);
        searchBar.value = "";
        autoComplete.classList.remove('active');
        searchBoxHolder.classList.remove('active');
        searchBoxHolder.classList.remove('search-in-use');
        document.body.classList.remove('SD-307-noscroll');
      });

      searchBar.addEventListener("keyup", (e) => {
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
          document.body.classList.remove('SD-307-noscroll');
          searchBoxHolder.classList.remove('search-in-use');
          searchBoxHolder.classList.remove('active');
          takeoverSearchClick('remove');
        } else {
          if(searchBoxHolder.classList.contains('active')) {
            document.body.classList.add('SD-307-noscroll');
          }
        }
      }, false);

    }

    amendSearchFunctionality();


  });

  

};
