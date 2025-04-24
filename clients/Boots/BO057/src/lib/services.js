import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import data from './data';

const { ID, VARIATION } = shared;

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
};

/**
 * Generate a search URL
 *
 * This is what is used to query the Boots Pharmacy GP gateway API
 *
 * Example URL: 
 * https://www.boots.com/online/pharmacy/gateway/api/1.0/search/gp?type=geo&latitude=53.4807593&longitude=-2.2426305&radius=3&from=0
 */
const generateSearchUrl = (latitude, longitude, pageIndex = 0, radius = 3) => {
  return `https://www.boots.com/online/pharmacy/gateway/api/1.0/search/gp?type=geo&latitude=${latitude}&longitude=${longitude}&radius=${radius}&from=${pageIndex}`;
};

/**
 * Geocode search
 *
 * Returns latitude and longitude for a search term
 */
const geocodeSearch = (searchTerm) => {

  return new Promise((res, rej) => {
    const geo = new google.maps.Geocoder();

    geo.geocode({ 'address': searchTerm}, (results) => {
      const lat = results[0]?.geometry?.location?.lat();
      const lng = results[0]?.geometry?.location?.lng();

      res({
        latitude: lat,
        longitude: lng
      });
    });
  });
};

/**
 * Camelize
 */
const camelize = (str) => {
  return str.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
}

/**
 * Search for a GP surgery
 */
const gpSurgerySearch = (searchTerm, pageIndex) => {
  return new Promise((res, rej) => {
    geocodeSearch(searchTerm).then(({latitude, longitude}) => {
      const searchUrl = generateSearchUrl(latitude, longitude, pageIndex);
      jQuery.ajax({
        url: searchUrl,
        success: (data) => {
          res(data);
        }
      });
    });
  });
};

/**
 * Update GP Request
 *
 * A helper function if we know the cart ID, cart version and practice ID
 */
const updateGPRequest = (endpoint = '/online/pharmacy/cart', cartId, cartVersion, practiceId) => {
  return new Promise((res, rej) => {
    const target = `${endpoint}/${cartId}/gpInfo/${cartVersion}`;

    // Payload request
    jQuery.ajax({
      url: target,
      type: "PUT",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ id: practiceId })
    });
  });
};

/**
 * Append search results helper
 *
 * page is 0, 10, 20, and so on
 */
const searchAPage = (term, page) => {
  // alert('>>>> SEARCH PAGE');
    gpSurgerySearch(term, page).then((response) => {
      const searchList = document.querySelector(`#${shared.ID}-searchList`);
      if (document.querySelector(`.${ID}-noResults`)) {
        document.querySelector(`.${ID}-noResults`).parentNode.removeChild(document.querySelector(`.${ID}-noResults`));
      }

      response.results.forEach((result) => {
        searchList.insertAdjacentHTML('beforeend', `
          <li class="styles-module__searchListContainer--t7Reo" id="gpList-${result.practiceId}">
            <div class="styles-module__contractContainer--178VJ">
              <div class="styles-module__pharmacySearchListHeading--2vxPo">
                <span class="styles-module__searchListHeading--35aVE" id="searchName-${result.practiceId}"
                  >${camelize(result.practiceName)}</span>
                <div class="styles-module__searchListItemText--3Ice5">
                  <div>
                    <span>${camelize(result.addressLine1)}<br></span>
                    <span>${camelize(result.addressLine2)}<br></span>${camelize(result.addressLine3)}${
                      result.addressLine4 != 'null' ? (', ' + camelize(result.addressLine4)) : ''
                    } 
                  </div>${result.postcode}
                </div>
              </div>
              <div>
                <button class="styles-module__tertiary--3JL2k styles-module__tertiary--dark--2QpPV" 
                  type="button"
                  data-id="${result.practiceId}"
                  >Select</button>
              </div>
            </div>
          </li>
        `);
      });

      // ---------------
      // Add event listeners to the 'select' buttons against an item
      //
      // When you choose an item, remember the practice ID that they chose
      // We can use this later
      // ---------------
      document.querySelector('.styles-module__spinnerWrapper--30r45').classList.remove('show');
    });
    
};

/**
 * Gp event listeners
 */
export const gpEventListeners = () => {
  const { ID, VARIATION } = shared;
  // alert('gp events');
  sessionStorage.setItem(`events`, true);
  let allGPs = document.querySelectorAll(`ul.styles-module__searchList--1MYrV li`);
  for (let i = 0; i < allGPs.length; i += 1) {
    const gp = allGPs[i];
    // gp.setAttribute('style', 'background-color: lightcoral;');
    const selectCta = gp.querySelector('button');
    if (!gp.classList.contains(`${ID}-gp-item`)) {
      gp.classList.add(`${ID}-gpItem`);
      gp.classList.add(`${ID}-gpItem__${i}`);
      if (selectCta && !selectCta.classList.contains(`${ID}-select`)) {
        selectCta.classList.add(`${ID}-select`);
        selectCta.addEventListener('click', (e) => {
          const inputFieldValue = document.querySelector(`#${shared.ID}-searchInput`).value;
          const gpID = selectCta.getAttribute('data-id');
          const gpName = gp.querySelector('.styles-module__searchListHeading--35aVE').innerText.trim();
          let userData = {};
          userData = {
            'input-value': `${inputFieldValue}`,
            'gp-id' : `${gpID}`,
            'gp-name': `${gpName}`,
          };
          sessionStorage.setItem(`${shared.ID}-user-data`, JSON.stringify(userData));

          /**
           * @desc HIDE GP Search field/results
           * SHOW Medicine search
           */
          document.querySelector(`.${ID}-new-search`).setAttribute('style', 'display: none;');

          [].forEach.call(document.querySelectorAll(`.${ID}-gpSearchResults`), (g) => {
            g.setAttribute('style', 'display: none;');
          });

          document.querySelector(`.styles-module__searchMedicineContainer--2vjtW`).classList.add('show');
          window.scrollTo({top: 0, behavior: 'smooth'});

          const mainContainer = document.querySelector('#main-container');
          if(mainContainer) {
            mainContainer.classList.remove(`${shared.ID}-gp-hijack`);
          }
        });
      }
    }
  }
};

export const medicineSearch = () => {
  const userData = sessionStorage.getItem(`${shared.ID}-user-data`);
  if(userData) {
    return;
  }

  const existing = document.querySelector(`.${shared.ID}-new-search`);
  if(existing) {
    existing.parentNode.removeChild(existing);
  }

  const mainContainer = document.querySelector('#main-container');
  if(mainContainer) {
    mainContainer.classList.add(`${shared.ID}-gp-hijack`);

    mainContainer.insertAdjacentHTML('afterbegin', `
      <div class="${shared.ID}-new-search">
        <div>
          <h1 class="styles-module__pageTitle--BYJpH"><span class="">GP surgery</span></h1>
        </div>
        <label class="styles-module__label--27gBu">Enter postcode, surgery name or town</label>
        <div class="searchInputContainer">
          <div class="searchInputFieldContainer">
            <input autocomplete="off" class="styles-module__searchStyle--2w7KN is-invalid" 
              id="${shared.ID}-searchInput" maxlength="150" name="searchInput" 
              placeholder="Enter here" title="search input" value="">

              <button class="${shared.ID}-btn styles-module__searchIcon--18x2t"
                class="styles-module__searchIcon--18x2t" type="button"><img alt="" aria-hidden="true" id="btn-medicine-search" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMjQuNywyMy4zIEwyMC4yLDE4LjggQzIxLjMsMTcuNCAyMiwxNS41IDIyLDEzLjUgQzIyLDguOCAxOC4yLDUgMTMuNSw1IEM4LjgsNSA1LDguOCA1LDEzLjUgQzUsMTguMiA4LjgsMjIgMTMuNSwyMiBDMTUuNSwyMiAxNy4zLDIxLjMgMTguOCwyMC4yIEwyMy4zLDI0LjcgQzIzLjUsMjQuOSAyMy44LDI1IDI0LDI1IEMyNC4yLDI1IDI0LjUsMjQuOSAyNC43LDI0LjcgQzI1LjEsMjQuMyAyNS4xLDIzLjcgMjQuNywyMy4zIFogTTcsMTMuNSBDNyw5LjkgOS45LDcgMTMuNSw3IEMxNy4xLDcgMjAsOS45IDIwLDEzLjUgQzIwLDE1LjMgMTkuMywxNi45IDE4LjEsMTguMSBDMTguMSwxOC4xIDE4LjEsMTguMSAxOC4xLDE4LjEgQzE4LjEsMTguMSAxOC4xLDE4LjEgMTguMSwxOC4xIEMxNi45LDE5LjMgMTUuMywyMCAxMy41LDIwIEM5LjksMjAgNywxNy4xIDcsMTMuNSBaIiBpZD0icGF0aC0xIi8+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iSWNvbi0vLVN5c3RlbS0vLVNlYXJjaCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUuMDAwMDAwLCAtNS4wMDAwMDApIj4KICAgICAgICAgICAgPG1hc2sgaWQ9Im1hc2stMiIgZmlsbD0id2hpdGUiPgogICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIi8+CiAgICAgICAgICAgIDwvbWFzaz4KICAgICAgICAgICAgPHVzZSBpZD0iTWFzayIgZmlsbD0iIzAwMDAwMCIgZmlsbC1ydWxlPSJub256ZXJvIiB4bGluazpocmVmPSIjcGF0aC0xIi8+CiAgICAgICAgICAgIDxnIGlkPSIqLS8tQ29sb3VyLS8tTWFzdGVyYnJhbmQtLy1NaWRuaWdodC1CbHVlIiBtYXNrPSJ1cmwoI21hc2stMikiIGZpbGw9IiMwMTIxNjkiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgICAgICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="></button>
          </div>
        </div>
      </div>

      <div class="${ID}-gpSearchResults styles-module__searchContainer--1F8nd">
        <div class="styles-module__searchListViewContainer--Zs78q">
          <div class="styles-module__searchResultsContainer--1OzQa">

            <h1 class="label styles-module__searchResultText--1r2ec">Results</h1>
            <div class="styles-module__spinnerWrapper--30r45"><svg class="styles-module__spinner--327yd" viewBox="0 0 50 50"><circle class="styles-module__spinnerCircle--3KudE" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg><div>Loading content</div></div>
            <ul class="styles-module__searchList--1MYrV" id="${shared.ID}-searchList">


            </ul>
          </div>
        </div>
        <div class="styles-module__showMorecenter--11Z_5 ${ID}-showMore"><button type="button" id="transparentButtonShowmore" class="styles-module__transparentButton--1QECb">Show more</button></div>
        <fieldset class="styles-module__container--1Uc8s ${ID}-helpInfo"><legend class="styles-module__caption--1EgtT"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path fill="#012169" fill-rule="evenodd" d="M20.223 11.333l-5.642 5.641-5.64-5.641a1.14 1.14 0 0 0-1.609 0 1.139 1.139 0 0 0 0 1.608l5.974 5.974.472.471a1.135 1.135 0 0 0 1.608 0l1.142-1.14 5.303-5.305a1.137 1.137 0 0 0-1.608-1.608"></path></svg><button class="styles-module__captionText--iiOtD" tabindex="0" type="button">Can't find your GP surgery?</button></legend><div class="styles-module__expandedContainer--bGn5m ${ID}-helpInfo-text" style="display: none;"><div>Please visit your local Boots pharmacy or contact your GP to order your prescription.</div></div></fieldset>
        <div class="styles-module__backToTopStyle--IAi5F ${ID}-backToTop__wrapper"><button type="button" class="styles-module__backToTopButton--3GAFV" id="${ID}-backToTop">Back To Top</button></div>
      </div>
    `);
  
    // --- HELP INFO FIELD click
    const helpInfoField = document.querySelector(`.${ID}-helpInfo`);
    helpInfoField.addEventListener('click', (e) => {
      helpInfoField.querySelector('legend').classList.toggle(`styles-module__expandedCaption--BJzCm`);
      if (helpInfoField.querySelector('legend').classList.contains(`styles-module__expandedCaption--BJzCm`)) {
        helpInfoField.querySelector(`.${ID}-helpInfo-text`).setAttribute('style', 'display: block;');
      } else {
        helpInfoField.querySelector(`.${ID}-helpInfo-text`).setAttribute('style', 'display: none;');
      }
    });
    
    // --- BACK TO TOP click  
    const backToTopEl = document.querySelector(`.${ID}-backToTop__wrapper`);
    backToTopEl.addEventListener('click', (e) => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    });

    const btn = document.querySelector(`.${shared.ID}-btn`);
    const input = document.querySelector(`#${shared.ID}-searchInput`);
  
    /**
     * --- SEARCH INPUT --- click ----------------------------------------------
     */
    if(btn && input) {
      btn.addEventListener('click', () => {
        data.numberToCall = [0];
        const searchList = document.querySelector(`#${shared.ID}-searchList`);
        searchList.innerHTML = '';

        searchAPage(input.value, data.numberToCall[0]);

        let counter = data.numberToCall.length;
        let numberToCall = 0;
        let previousCountNumber = 0;
        if (counter > 0) {
          previousCountNumber = data.numberToCall[counter - 1];
          data.numberToCall.push(previousCountNumber + 10);
        }

        // --- Show Loader
        document.querySelector('.styles-module__spinnerWrapper--30r45').classList.add('show');
        // --- Hide More Results
        document.querySelector(`.${ID}-showMore`).classList.remove('show');
        // --- Hide Back To Top
        document.querySelector(`.${ID}-backToTop__wrapper`).classList.remove('show');
      });

      input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          btn.click();
        }
      });
    }

    /**
     * --- SHOW MORE --- click
     */
    const showMoreCta = document.querySelector(`.${ID}-showMore`);
    if (showMoreCta) {
      showMoreCta.addEventListener('click', () => {
        const searchList = document.querySelector(`#${shared.ID}-searchList`);
        searchList.innerHTML = '';
        const searchPageCalls = data.numberToCall;
        for (let i = 0; i < searchPageCalls.length; i += 1) {
          const callCount = searchPageCalls[i];
          searchAPage(input.value, callCount);
        }
        
        let counter = data.numberToCall.length;
        let numberToCall = 0;
        let previousCountNumber = 0;
        if (counter > 0) {
          previousCountNumber = data.numberToCall[counter - 1];
          data.numberToCall.push(previousCountNumber + 10);
        }
        setTimeout(() => {
          gpEventListeners();
        }, 500);
        
      });
    }
  }

  // return;


  // Write experiment code here
  // if (JSON.parse(sessionStorage.getItem(`${shared.ID}-user-data`)) == null) {
  /**
   * @desc Check and Observe LIST CONTENT
   */
    pollerLite(['ul.styles-module__searchList--1MYrV'], () => {
      // alert('call 02');
      // gpEventListeners();
      observer.connect(document.querySelector('ul.styles-module__searchList--1MYrV'), () => {
        // alert('call 03');
        setTimeout(() => {
          if (document.querySelector('ul.styles-module__searchList--1MYrV li')) {
            // --- Show Results title
            document.querySelector('.label.styles-module__searchResultText--1r2ec').classList.add('show');
            // --- Show More Results
            document.querySelector(`.${ID}-showMore`).classList.add('show');
            // --- Show Help Info
            document.querySelector(`.${ID}-helpInfo`).classList.add('show');
            // --- Show Back To Top
            document.querySelector(`.${ID}-backToTop__wrapper`).classList.add('show');
            gpEventListeners();
          }
        }, 250);

        setTimeout(() => {
          if (!document.querySelector('ul.styles-module__searchList--1MYrV li')) {
            // --- Show Results title
            document.querySelector('.label.styles-module__searchResultText--1r2ec').classList.add('show');
            // --- Show Help Info
            document.querySelector(`.${ID}-helpInfo`).classList.add('show');
            // --- Hide Loader
            document.querySelector('.styles-module__spinnerWrapper--30r45').classList.remove('show');
            // --- Hide More Results
            document.querySelector(`.${ID}-showMore`).classList.remove('show');
            // --- Hide Back To Top
            document.querySelector(`.${ID}-backToTop__wrapper`).classList.remove('show');
            if (!document.querySelector(`.${ID}-noResults`)) {
              document.querySelector('ul.styles-module__searchList--1MYrV').insertAdjacentHTML('beforeend', `
                <div class="${ID}-noResults styles-module__searchResultsContainer--1OzQa"><div class="styles-module__errorSection--ptocC"><div id="searchErrorIrcon"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iOTAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA5MCA4MCI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMCAwaDkwLjAwMnY4MEgweiIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8bWFzayBmaWxsPSIjZmZmIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjYSIvPgogICAgICAgIDwvbWFzaz4KICAgICAgICA8cGF0aCBmaWxsPSIjRTVFRkY5IiBkPSJNNTAuMDAxIDUxLjEzNWMwIDIuNjg4LTIuMjM4IDQuODY1LTUgNC44NjVzLTUtMi4xNzctNS00Ljg2NXYtMjYuMjdjMC0yLjY4NyAyLjIzOC00Ljg2NSA1LTQuODY1czUgMi4xNzggNSA0Ljg2NXYyNi4yN3ptLTUgMTguODY1YTUgNSAwIDEgMSAwLTEwIDUgNSAwIDEgMSAwIDEwem00NC4yNDIgMS40M0w0OS45MiAyLjg1OEE1LjY3NyA1LjY3NyAwIDAgMCA0NS4wMDMgMGE1LjY3IDUuNjcgMCAwIDAtNC45MTYgMi44NThMLjc2IDcxLjQzYTUuNzU1IDUuNzU1IDAgMCAwIDAgNS43MTNBNS42NzYgNS42NzYgMCAwIDAgNS42NzcgODBoNzguNjQ4YTUuNjc2IDUuNjc2IDAgMCAwIDQuOTE4LTIuODU3IDUuNzU1IDUuNzU1IDAgMCAwIDAtNS43MTN6IiBtYXNrPSJ1cmwoI2IpIi8+CiAgICA8L2c+Cjwvc3ZnPgo=" alt="search error icon"></div><div id="seachErrorText" class="styles-module__errorText--H_-V6">No results found, please try another search term.</div></div></div>
              `);
            }
            
          }
        }, 3000);
        
      }, {
        throttle: 200,
        config: {
          attributes: false,
          childList: true,
          // subtree: true,
        },
      });
  
    });
  // }
  // -----------
};

/**
 * GP Search Page
 */
export const gpSearch = () => {

  const clickButton = () => new Promise((res, rej) => {
    setTimeout(() => {
      const button = document.querySelector('#searchInput + button');
      button.click();

      res();
    }, 1000);
  });

  const populateInput = (inputValue) => new Promise((res, rej) => {
    const searchInput = document.querySelector('#searchInput');

    // -------------
    // Update the search and trigger all events feedigng into synthetic events
    // -------------
    searchInput.value = inputValue;

    const keyEvent = document.createEvent("KeyboardEvent");
    keyEvent.initEvent("keyup", true, true);
    searchInput.dispatchEvent(keyEvent);

    res();
  });                        

  const clickShowMore = () => new Promise((res, rej) => {
    const more = document.querySelector('#transparentButtonShowmore');
    if(more) {
      more.click();

      setTimeout(() => {
        res();
      }, 2000);
    } else {
      res();
    }
  });

  const findGpRow = (gpId) => new Promise((res, rej) => {
    const gpRow = document.querySelector(`#gpList-${gpId}`);

    if(!gpRow) {
      const more = document.querySelector('#transparentButtonShowmore');
      if(more) {
        clickShowMore().then(findGpRow);
      } else {
        rej();
      }
    } else {
      res(gpRow);
    }

  });                        

  const wait1s = () => new Promise((res, rej) => setTimeout(res, 1000));
  const wait2s = () => new Promise((res, rej) => setTimeout(res, 2000));
  const wait3s = () => new Promise((res, rej) => setTimeout(res, 3000));
  const wait4s = () => new Promise((res, rej) => setTimeout(res, 4000));

  let userData = sessionStorage.getItem(`${shared.ID}-user-data`);
  if(userData) {
    userData = JSON.parse(userData);

    const inputValue = userData['input-value'];
    const gpId = userData['gp-id'];

    const mainContainer = document.querySelector('[class*=styles-module__appContainer]');

    if (userData 
      && mainContainer
      && inputValue 
      && gpId 
      //&& document.querySelectorAll(`[class*=styles-module__searchList] li`).length == 0
    ) {
      mainContainer.classList.add(`${shared.ID}-bypass-gp`);

      mainContainer.insertAdjacentHTML('afterbegin', `
        <div class="${shared.ID}-spinner styles-module__spinnerWrapper--30r45"><svg class="styles-module__spinner--327yd" viewBox="0 0 50 50"><circle class="styles-module__spinnerCircle--3KudE" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg><div>Loading...</div></div>
      `);

      sessionStorage.removeItem(`${shared.ID}-user-data`)

      pollerLite([`#searchInput`, '#searchInput + button'], () => {
        clickButton()
          .then(() => populateInput(inputValue))
          .then(clickButton)
          .then(wait2s)
          .then(() => findGpRow(gpId))
          .then((gpRow) => {
            const btn = gpRow.querySelector('button[type=button]');
            if(btn) {
              btn.click();
            } else {
              setTimeout(() => {
                if(gpRow.querySelector('[class*=gpNotStyle]')) {
                  window.scrollTo({
                    top: gpRow.getBoundingClientRect().top + window.scrollY, 
                    behavior: 'smooth'
                  });
                }
              }, 1500);
            }
          })
          .then(wait1s)
          .then(() => {
            mainContainer.classList.remove(`${shared.ID}-bypass-gp`);

            const spinner = document.querySelector(`.${shared.ID}-spinner`);
            if(spinner) {
              spinner.parentNode.removeChild(spinner);
            }
          })
          .catch(() => {
            mainContainer.classList.remove(`${shared.ID}-bypass-gp`);

            const spinner = document.querySelector(`.${shared.ID}-spinner`);
            if(spinner) {
              spinner.parentNode.removeChild(spinner);
            }
          });
      });

      // --
      // Fallback - wait no more than a few seconds - if we're still on the page, remove the bypass-gp class
      // --
      setTimeout(() => {
        if(mainContainer) {
          mainContainer.classList.remove(`${shared.ID}-bypass-gp`);
        }
        const spinner = document.querySelector(`.${shared.ID}-spinner`);
        if(spinner) {
          spinner.parentNode.removeChild(spinner);
        }
      }, 11000);
    }
  }
};
