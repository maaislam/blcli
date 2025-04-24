import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH044',
    VARIATION: '{{VARIATION}}',
  },

  globals: {
    itineryJSON: [],
    searchJSON: [],
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    events.setTrackerName('tracker2');
    services.tracking();
    document.body.classList.add(settings.ID);

    if (window.location.href.indexOf('/itineraries/') > -1) {
      pollerLite([
        '.destination-box h2',
        '.clearfix .blue-line',
      ], () => {
        components.storeInformation();
      });
    } else {
      /* eslint-disable */
      if (window.localStorage.NH044) {
        pollerLite([
          '#ctl00_LeftPane',
        ], () => {
          document.querySelector('.coloured-slider').style.display = 'none';
          components.addInformationToHomepage();
          components.moreInfoEvent();
          if (window.localStorage.NH044) {
            components.showLastSearch();
          }
        });
        pollerLite([
          '.holiday-search',
        ], () => {
          document.querySelector('#btnSearch').addEventListener('click', () => {
            components.savelastSearch();
            components.removeSearch();
          });
        });
      }
       /* eslint-enable */
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    storeInformation: () => {
      const { globals } = Experiment;

      // get all the trip details from the page
      const titleText = document.querySelector('.destination-box h2').textContent;
      const tripLength = document.querySelector('.clearfix .blue-line:first-child').textContent;
      const tripDate = document.querySelector('.clearfix .blue-line:nth-child(2)').textContent;

      let tripPrice;

      if (document.querySelector('.clearfix .blue-line:nth-child(3) .orange')) {
        const tripPriceNow = document.querySelector('.clearfix .blue-line:nth-child(3) .orange').textContent;
        const tripPriceWas = document.querySelector('.clearfix .blue-line:nth-child(3) .strike').textContent;

        tripPrice = `<span>${tripPriceWas}</span> <span>${tripPriceNow}</span>`;
      } else {
        tripPrice = document.querySelector('.clearfix .blue-line:nth-child(3').textContent;
      }

      // put in JSON structure
      const json = {
        name: titleText,
        duration: tripLength,
        dates: tripDate,
        price: tripPrice,
        url: window.location.pathname,
      };
      globals.itineryJSON.push(json);


      // store the urls
      const productData = (() => {
        const cached = window.localStorage.NH044;
        return cached ? JSON.parse(cached) : { site_Pages: [] };
      })();

      const storeDataInfo = function storeDataInfo() {
        // replace them if more than 2 pages visited
        if (productData.site_Pages.length >= 2) {
          productData.site_Pages.shift();
        }
        productData.site_Pages.push(globals.itineryJSON);
        const stringifiedProductData = JSON.stringify(productData);
        window.localStorage.NH044 = stringifiedProductData;
      };

      if (window.localStorage.NH044) {
        let pageAlreadyVisited;
        for (let i = 0; i < Object.keys(productData.site_Pages).length; i += 1) {
          const data = Object.entries(productData.site_Pages)[i];
          const category = data[1];
          if (category[0].url === window.location.pathname) {
            pageAlreadyVisited = true;
          } else {
            pageAlreadyVisited = false;
          }
        }
        if (pageAlreadyVisited === false) {
          storeDataInfo();
        }
      } else if (!window.localStorage.NH044) {
        storeDataInfo();
      }
    },
    addInformationToHomepage: () => {
      const lastViewedBox = document.createElement('div');
      lastViewedBox.classList.add('NH044-last_viewed-box');
      lastViewedBox.innerHTML = `
      <div class="NH044-last_viewed-trips">
        <h3>You last viewed</h3>
      </div>
      <div class="NH044-last_viewed-search">
        <h3>You last searched</h3>
        <div class="NH044-last_search"></div>
      </div>`;

      document.getElementById('ctl00_LeftPane').appendChild(lastViewedBox);

      // add the last viewed trips
      const productData = (() => {
        const cached = window.localStorage.NH044;
        return cached ? JSON.parse(cached) : { site_Pages: [] };
      })();

      /* eslint-disable */
      for (let i = Object.keys(productData.site_Pages).length - 1; i >= 0; --i) {
      /* eslint-enable */
        const data = Object.entries(productData.site_Pages)[i];
        const category = data[1];

        const tripDetails = document.createElement('div');
        tripDetails.classList.add('NH044-trip_info');
        tripDetails.innerHTML = `
        <div class="NH044-trip_details">
          <span class="NH044-trip_name">${category[0].name}</span>
          <p class="NH044-trip_length">${category[0].duration}</p>
          <p class="NH044-trip_date">${category[0].dates}</p>
          <p class="NH044-trip_price">${category[0].price}</p>
        </div>
        <a class="NH044-more_info" href="${category[0].url}">More Info</div>`;

        document.querySelector('.NH044-last_viewed-trips').appendChild(tripDetails);
      }
    },
    savelastSearch: () => {
      const { globals } = Experiment;

      const searchInformation = document.querySelector('.holiday-search');
      const departDateFirst = searchInformation.querySelector('#txtStartDateAlt');
      const departDatelast = searchInformation.querySelector('#txtEndDateSelector');
      const departureRegion = searchInformation.querySelector('.region-select-control').options[searchInformation.querySelector('.region-select-control').selectedIndex];
      const departureRegionValue = searchInformation.querySelector('.region-select-control').options[searchInformation.querySelector('.region-select-control').selectedIndex];
      const departureTown = searchInformation.querySelector('.point-select-control').options[searchInformation.querySelector('.point-select-control').selectedIndex];
      const departureTownValue = searchInformation.querySelector('.point-select-control').options[searchInformation.querySelector('.point-select-control').selectedIndex];

      // store the last search
      const json = {
        dateFirst: departDateFirst.value,
        dateLast: departDatelast.value,
        region: departureRegion.textContent,
        regionValue: departureRegionValue.value,
        town: departureTown.textContent,
        townValue: departureTownValue.value,
      };
      globals.searchJSON.push(json);

      const searchData = (() => {
        const cached = window.localStorage.NH044search;
        return cached ? JSON.parse(cached) : { search_Info: [] };
      })();

      const storeDataInfo = function storeDataInfo() {
        // replace them if more than 1
        if (searchData.search_Info.length >= 1) {
          searchData.search_Info.shift();
        }
        searchData.search_Info.push(globals.searchJSON);
        const stringifiedSearchData = JSON.stringify(searchData);
        window.localStorage.NH044search = stringifiedSearchData;
      };
      storeDataInfo();
    },
    showLastSearch: () => {
      const { settings, components } = Experiment;
      const searchInformation = document.querySelector('.holiday-search');
      const departDateFirst = searchInformation.querySelector('#txtStartDateAlt');
      const departDatelast = searchInformation.querySelector('#txtEndDateSelector');
      const departureRegion = searchInformation.querySelector('.region-select-control').options[searchInformation.querySelector('.region-select-control').selectedIndex];
      const departureRegionValue = searchInformation.querySelector('.region-select-control').options[searchInformation.querySelector('.region-select-control').selectedIndex];
      const departureTown = searchInformation.querySelector('.point-select-control').options[searchInformation.querySelector('.point-select-control').selectedIndex];
      const departureTownValue = searchInformation.querySelector('.point-select-control').options[searchInformation.querySelector('.point-select-control').selectedIndex];

      const searchData = (() => {
        const cached = window.localStorage.NH044search;
        return cached ? JSON.parse(cached) : { search_Info: [] };
      })();
      // get the last searched data from json and add to the HTML
      for (let i = 0; i < Object.keys(searchData.search_Info).length; i += 1) {
        const data = Object.entries(searchData.search_Info)[i];
        const category = data[1];

        document.querySelector('.NH044-last_search').innerHTML = `
        <div class="NH044-search_details">
          <p>Holidays departing between:</p>
          <span class="NH044-search_dates">${category[0].dateFirst} & ${category[0].dateLast}</span>
          <p class="NH044-departure">From ${category[0].region}, ${category[0].town} </p>
        </div>
        <div class="NH044-search_again">Search Again</div>`;

        document.querySelector('.NH044-search_again').addEventListener('click', () => {
          departDateFirst.value = category[0].dateFirst;
          departDatelast.value = category[0].dateLast;
          departureRegion.textContent = category[0].region;
          departureRegionValue.value = category[0].regionValue;
          departureTown.textContent = category[0].town;
          departureTownValue.value = category[0].townValue;
          document.getElementById('btnSearch').click();
          components.savelastSearch();
          events.send(settings.ID, 'Clicked', 'Previous Search');
        });
      }
    },
    moreInfoEvent: () => {
      const { settings } = Experiment;
      const moreInfo = document.querySelectorAll('.NH044-more_info');
      if (moreInfo) {
        for (let index = 0; index < moreInfo.length; index += 1) {
          const element = moreInfo[index];
          element.addEventListener('click', () => {
            events.send(settings.ID, 'Clicked', 'Previous Itinerary');
          });
        }
      }
    },
    removeSearch: () => {
      const lastSearchedBox = document.querySelector('.NH044-last_viewed-search');
      if (lastSearchedBox) {
        const searchText = lastSearchedBox.querySelector('.NH044-departure');
        if (searchText.textContent.indexOf('From Choose a region, Choose a town') > -1) {
          lastSearchedBox.remove();
        }
      }
    },
  },
};

export default Experiment;
